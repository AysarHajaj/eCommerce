import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { TextField, FormControl, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  selectGetSubCategories,
  getSubCategories,
} from '../../../ProductSubCategory/subCategorySlice';
import { selectGetCategories, getCategories } from '../../../ProductCategory/categorySlice';
import {
  getProductById,
  selectGetProductById,
  updateProduct,
  selectUpdateProduct,
  postProduct,
  selectPostProduct,
} from '../../productSlice';
import useAuth from '../../../../hooks/useAuth';
import formUtils from './formUtils';
import ROUTES from '../../../../routes/_paths';
import './style.scss';
import ImageUploader from '../../../../components/ImageUploader';
import ProductGroupChoices from '../ProductGroupChoices/ProductGroupChoices';
import ProductChoices from '../ProductChoices/ProductGroupChoices';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetProductById);
  const { data: categories } = useSelector(selectGetCategories);
  const { data: subCategories } = useSelector(selectGetSubCategories);
  const { isLoading: updateIsLoading, error: putError } = useSelector(selectUpdateProduct);
  const { isLoading: postIsLoading, error: postError } = useSelector(selectPostProduct);
  const isEdit = !!id;
  const navigate = useNavigate();
  const {
    auth: {
      user: { id: userId },
    },
  } = useAuth();

  const [data, setData] = useState({ ...formUtils.initialValues });
  const [openGroupChoicesDialog, setOpenGroupChoicesDialog] = useState(false);
  const [choicesDialogData, setChoicesDialogData] = useState(false);

  const initialValidData = useMemo(() => formUtils.getValidData(initialData), [initialData]);

  const enableSave = useMemo(() => {
    let enable = formUtils.isValid(data);
    if (enable && isEdit && initialValidData && formUtils.isEqual(data, initialValidData)) {
      enable = false;
    }
    return enable;
  }, [isEdit, data, initialValidData]);

  const imageURL = useMemo(() => {
    if (!data.image) return undefined;
    if (typeof data.image === 'object') {
      return URL.createObjectURL(data.image);
    }
    return data.image;
  }, [data.image]);

  const filteredSubCategories = useMemo(
    () => subCategories.filter((item) => item.product_category_id === data.product_category_id),
    [data.product_category_id, subCategories],
  );

  const handleChangeImage = (e) => {
    const { files } = e.target;
    const property = e.target.name;
    if (files?.length) {
      const file = e.target.files[0];
      setData({ ...data, [property]: file });
    }
  };

  const handleChange = (e) => {
    const property = e.target.name;
    const { value } = e.target;
    const newData = { ...data, [property]: value };
    if (property === 'product_category_id') {
      newData.product_sub_category_id = '';
    }
    setData(newData);
  };

  const handleDeleteChoice = (groupId, choiceId) => {
    const newData = { ...data, product_choice_groups: [...data.product_choice_groups] };
    const groupIndex = newData.product_choice_groups?.findIndex((_group) => _group.id === groupId);
    if (groupIndex >= 0) {
      newData.product_choice_groups[groupIndex] = {
        ...newData.product_choice_groups[groupIndex],
        product_choices: newData.product_choice_groups[groupIndex]?.product_choices?.filter(
          (choice) => choice.id !== choiceId,
        ),
      };
      setData(newData);
    }
  };

  const handleSubmitChoices = (choice) => {
    const { id: choiceId, product_choice_group_id: groupId } = choice;
    const groupIndex = data.product_choice_groups?.findIndex((group) => group.id === groupId);
    if (groupIndex >= 0) {
      const group = { ...data.product_choice_groups[groupIndex] };
      if (choiceId) {
        const oldChoiceIndex = group.product_choices.findIndex(
          (_choice) => _choice.id === choiceId,
        );
        if (oldChoiceIndex >= 0) {
          group.product_choices[oldChoiceIndex] = choice;
        }
        const newGroups = [...data.product_choice_groups];
        newGroups[groupIndex] = group;
        setData({ ...data, product_choice_groups: newGroups });
      } else {
        group.product_choices.push({ ...choice, id: Date.now() });
      }
    }
    setChoicesDialogData();
  };

  const handleSubmitProductGroupChoices = (group) => {
    const { id: groupId } = group;
    if (groupId)
      setData({
        ...data,
        product_choice_groups: [...data.filter((_group) => _group.id === groupId), { ...group }],
      });
    else
      setData({
        ...data,
        product_choice_groups: [...data.product_choice_groups, { ...group, id: Date.now() }],
      });
    setOpenGroupChoicesDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (isEdit) {
      result = dispatch(
        updateProduct({
          ...data,
          user_id: userId,
          image: typeof data.image === 'object' ? data.image : undefined,
        }),
      );
    } else {
      result = dispatch(postProduct({ ...data, user_id: userId }));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(ROUTES.PRODUCTS.path);
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    if (isEdit) {
      dispatch(getProductById(id)).then(({ payload }) => {
        setData(formUtils.getValidData(payload.result));
      });
    }
  }, []);

  return (
    <section className="create-product-container">
      <ProductChoices
        open={!!choicesDialogData}
        handleClose={() => setChoicesDialogData()}
        groupName={choicesDialogData?.group?.english_name}
        groupId={choicesDialogData?.group?.id}
        onSubmit={handleSubmitChoices}
        initialValues={choicesDialogData?.group?.product_choices?.find(
          (choice) => choice.id === choicesDialogData?.choice?.id,
        )}
      />
      <ProductGroupChoices
        open={openGroupChoicesDialog}
        handleClose={() => setOpenGroupChoicesDialog(false)}
        productName={data.english_name}
        onSubmit={handleSubmitProductGroupChoices}
      />
      <Button startIcon={<ListIcon />} onClick={() => navigate(ROUTES.PRODUCTS.path)}>
        View Products
      </Button>
      <form onSubmit={handleSubmit} className="create-product-form">
        <FormHelperText error={!!(postError || putError)}>{postError || putError}</FormHelperText>

        <div className="left-side">
          <ImageUploader
            label="Product Image"
            name="image"
            onChange={handleChangeImage}
            src={imageURL}
          />
        </div>

        <div className="right-side">
          <TextField
            label="English Name"
            name="english_name"
            value={data.english_name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Arabic Name"
            name="arabic_name"
            value={data.arabic_name}
            onChange={handleChange}
          />

          <TextField
            label="English Description"
            name="english_description"
            value={data.english_description}
            onChange={handleChange}
          />

          <TextField
            label="Arabic Description"
            name="arabic_description"
            value={data.arabic_description}
            onChange={handleChange}
          />

          <FormControl>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              name="product_category_id"
              value={data.product_category_id}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="sub-category-label">Sub Category Category</InputLabel>
            <Select
              labelId="sub-category-label"
              label="SubCategory Category"
              name="product_sub_category_id"
              value={data.product_sub_category_id}
              onChange={handleChange}
            >
              {filteredSubCategories.map((childCategory) => (
                <MenuItem key={childCategory.id} value={childCategory.id}>
                  {childCategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price"
            name="price"
            type="number"
            value={data.price}
            onChange={handleChange}
          />

          <TextField
            label="Discount"
            name="discount"
            type="number"
            value={data.discount}
            onChange={handleChange}
            InputProps={{
              endAdornment: <b>%</b>,
            }}
          />

          <TextField
            label="Variation Price From"
            name="variation_price_from"
            type="number"
            value={data.variation_price_from}
            onChange={handleChange}
          />

          <TextField
            label="Variation Price To"
            name="variation_price_to"
            type="number"
            value={data.variation_price_to}
            onChange={handleChange}
          />

          <TextField
            label="Stock Quantity"
            name="stock_quantity"
            type="number"
            value={data.stock_quantity}
            onChange={handleChange}
          />
          <Button
            style={{ verticalAlign: 'middle', textTransform: 'capitalize' }}
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => setOpenGroupChoicesDialog(true)}
          >
            Add Product Choice Group
          </Button>
        </div>

        {!!data.product_choice_groups.length && (
          <div className="product-choice-groups">
            <Typography padding="10px" fontSize="1.2em">
              Product Choice Groups
            </Typography>
            {data.product_choice_groups.map((group) => (
              <Accordion
                style={{
                  borderRadius: '10px',
                  margin: '4px',
                }}
                variant="outlined"
                key={group.id}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel1a-content-${group.id}`}
                  id={`panel1a-header-${group.id}`}
                >
                  <Typography color="primary">{group.english_name}</Typography>
                  <Typography marginRight="10px" marginLeft="auto">
                    Min number: {group.min_number}
                  </Typography>{' '}
                  <b>-</b>
                  <Typography marginLeft="10px" marginRight="10px">
                    Max number: {group.max_number}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    className="details-header"
                  >
                    <Button
                      style={{
                        verticalAlign: 'middle',
                        textTransform: 'capitalize',
                      }}
                      startIcon={<AddIcon />}
                      onClick={() =>
                        setChoicesDialogData({
                          group,
                        })
                      }
                    >
                      Add Product Choices
                    </Button>
                  </div>

                  {!!group.product_choices?.length && (
                    <div className="product-choices">
                      <Typography padding="10px" fontSize="1.2em">
                        Product Choices
                      </Typography>
                      <div className="content">
                        <div className="content-header">
                          <div className="column">Name</div>
                          <div className="column">Price</div>
                          <div className="column">Action</div>
                        </div>
                        {group.product_choices.map((choice) => (
                          <div key={choice.id} className="product-row">
                            <div className="column">{choice.english_name}</div>
                            <div className="column">{choice.price}</div>
                            <div className="column">
                              <IconButton onClick={() => setChoicesDialogData({ choice, group })}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteChoice(group.id, choice.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}
        <LoadingButton
          style={{ marginTop: '15px' }}
          loading={updateIsLoading || postIsLoading}
          type="submit"
          disabled={!enableSave}
        >
          {isEdit ? 'Update' : 'Save'}
        </LoadingButton>
      </form>
    </section>
  );
}

export default Form;

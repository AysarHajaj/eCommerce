import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, FormControl, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import ListIcon from '@mui/icons-material/List';
import { getChildCategories } from '../../../ChildCategory/childCategorySlice';
import { selectGetSubCategories, getSubCategories } from '../../../SubCategory/subCategorySlice';
import { selectGetCategories, getCategories } from '../../../Category/categorySlice';
import {
  getProductById,
  selectGetProductById,
  updateProduct,
  selectUpdateProduct,
  postProduct,
  selectPostProduct,
} from '../../productSlice';
import constant from '../../../../constant';
import useAuth from '../../../../hooks/useAuth';
import formUtils from './formUtils';
import ROUTES from '../../../../routes/routesPath';
import './style.scss';
import ImageUploader from '../../../../components/ImageUploader';

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
      user: { type: userType, id: userId },
    },
  } = useAuth();
  const isVendor = userType === constant.USER_ROLES.VENDOR;

  const [data, setData] = useState({ ...formUtils.initialValues });

  const initialValidData = useMemo(() => formUtils.getValidData(initialData), [initialData]);

  const enableSave = useMemo(() => {
    let enable = formUtils.isValid(data);
    if (enable && isEdit && formUtils.isEqual(data, initialValidData)) {
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
    () => subCategories.filter((item) => item.id === data.category_id),
    [data.category_id, subCategories],
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
    setData({ ...data, [property]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (isEdit) {
      result = dispatch(
        updateProduct({
          ...data,
          ...(isVendor ? { user_id: userId } : {}),
          banner_image: typeof data.banner_image === 'object' ? data.banner_image : undefined,
          thumbnail_image:
            typeof data.thumbnail_image === 'object' ? data.thumbnail_image : undefined,
        }),
      );
    } else {
      result = dispatch(postProduct({ ...data, ...(isVendor ? { user_id: userId } : {}) }));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(constant.ROUTES.PRODUCTS.path);
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getChildCategories());
    if (isEdit) {
      dispatch(getProductById(id)).then(({ payload }) => {
        setData(formUtils.getValidData(payload.data));
      });
    }
  }, []);

  return (
    <section className="create-product-container">
      <Button startIcon={<ListIcon />} onClick={() => navigate(ROUTES.PRODUCTS.path)}>
        View Products
      </Button>
      <form onSubmit={handleSubmit} className="create-product-form">
        <FormHelperText error={!!(postError || putError)}>{postError || putError}</FormHelperText>

        <div className="left-side">
          <ImageUploader
            label="Product Image"
            name="thumbnail_image"
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
            required
          />

          <TextField
            label="English Description"
            name="english_description"
            value={data.english_description}
            onChange={handleChange}
            required
          />

          <TextField
            label="Arabic Description"
            name="arabic_description"
            value={data.arabic_description}
            onChange={handleChange}
            required
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
            <InputLabel id="sub-category-label">SubCategory Category</InputLabel>
            <Select
              labelId="sub-category-label"
              label="SubCategory Category"
              name="product_sub_category_id"
              value={data.product_sub_category_id}
              onChange={handleChange}
              required
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
        </div>
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

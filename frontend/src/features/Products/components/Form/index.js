import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, OutlinedInput, FormControl, Select, MenuItem, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import Avatar from '@mui/material/Avatar';
import ListIcon from '@mui/icons-material/List';
import {
  selectGetChildCategories,
  getChildCategories,
} from '../../../ChildCategory/childCategorySlice';
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
  const { data: childCategories } = useSelector(selectGetChildCategories);
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

  const thumbnailImageURL = useMemo(() => {
    if (!data.thumbnail_image) return undefined;
    if (typeof data.thumbnail_image === 'object') {
      return URL.createObjectURL(data.thumbnail_image);
    }
    return data.thumbnail_image;
  }, [data.thumbnail_image]);

  const bannerImageURL = useMemo(() => {
    if (!data.banner_image) return undefined;
    if (typeof data.banner_image === 'object') {
      return URL.createObjectURL(data.banner_image);
    }
    return data.banner_image;
  }, [data.banner_image]);

  const filteredSubCategories = useMemo(
    () => subCategories.filter((item) => item.id === data.category_id),
    [data.category_id, subCategories],
  );

  const filteredChildCategories = useMemo(
    () => childCategories.filter((item) => item.id === data.sub_category_id),
    [childCategories, data.sub_category_id],
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

        <ImageUploader
          label="Product Image"
          name="thumbnail_image"
          onChange={handleChangeImage}
          src={thumbnailImageURL}
        />

        <FormControl style={{ marginTop: '15px' }}>
          <Avatar src={bannerImageURL} />
        </FormControl>

        <FormControl style={{ marginTop: '15px' }}>
          <OutlinedInput
            name="banner_image"
            type="file"
            label="Banner Image"
            onChange={handleChangeImage}
          />
        </FormControl>
        <TextField
          placeholder="Short Name"
          name="short_name"
          value={data.short_name}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Slug"
          name="slug"
          value={data.slug}
          onChange={handleChange}
          required
        />

        <FormControl style={{ marginTop: '15px' }}>
          <Select
            placeholder="Category"
            name="category_id"
            value={data.category_id}
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

        <FormControl style={{ marginTop: '15px' }}>
          <Select
            placeholder="SubCategory Category"
            name="sub_category_id"
            value={data.sub_category_id}
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

        <FormControl style={{ marginTop: '15px' }}>
          <Select
            placeholder="Child Category"
            name="child_category_id"
            value={data.child_category_id}
            onChange={handleChange}
            required
          >
            {filteredChildCategories.map((childCategory) => (
              <MenuItem key={childCategory.id} value={childCategory.id}>
                {childCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          placeholder="Price"
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
        />

        <TextField
          placeholder="Offer Price"
          name="offer_price"
          type="number"
          value={data.offer_price}
          onChange={handleChange}
        />

        <TextField
          placeholder="Stock Quantity"
          name="stock_quantity"
          type="number"
          value={data.stock_quantity}
          onChange={handleChange}
        />

        <TextField
          placeholder="Short Description"
          name="short_description"
          value={data.short_description}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Long Description<"
          name="long_description"
          value={data.long_description}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="SEO Title<"
          name="seo_title"
          value={data.seo_title}
          onChange={handleChange}
        />

        <TextField
          placeholder="SEO Description"
          name="seo_description"
          value={data.seo_description}
          onChange={handleChange}
        />

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

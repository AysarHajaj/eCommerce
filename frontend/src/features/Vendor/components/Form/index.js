import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ImageUploader from '../../../../components/ImageUploader';
import {
  getVendorById,
  selectGetVendorById,
  updateVendor,
  selectUpdateVendor,
  postVendor,
  selectPostVendor,
} from '../../vendorSlice';
import { getCurrencies, selectGetCurrencies } from '../../../Currencies/currencySlice';
import {
  getShopCategories,
  selectGetShopCategories,
} from '../../../ShopCategory/shopCategorySlice';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetVendorById);
  const { data: currencies } = useSelector(selectGetCurrencies);
  const { data: shopCategories } = useSelector(selectGetShopCategories);
  const { isLoading: updateIsLoading } = useSelector(selectUpdateVendor);
  const { isLoading: postIsLoading } = useSelector(selectPostVendor);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    image: undefined,
    shop_category_id: '',
    currency_id: '',
  });

  const imageURL = useMemo(() => {
    if (!data.image) return undefined;
    if (typeof data.image === 'object') {
      return URL.createObjectURL(data.image);
    }
    return data.image;
  }, [data.image]);

  const enableSave = useMemo(() => {
    let result = true;
    if (!isEdit) {
      if (
        data.image === undefined ||
        data.name === '' ||
        data.email === '' ||
        data.password === '' ||
        data.password !== data.confirm_password ||
        data.shop_category_id === '' ||
        data.currency_id === ''
      ) {
        result = false;
      }
    } else {
      if (
        data.image === initialData.image &&
        data.name === initialData.name &&
        data.email === initialData.email &&
        data.shop_category_id === initialData.shop_category_id &&
        data.currency_id === initialData.currency_id &&
        data.password === ''
      ) {
        result = false;
      }
      if (data.password) {
        if (data.password === data.confirm_password) {
          result = false;
        }
      }
    }
    // if (
    //   isEdit &&
    //   initialData.name === data.name &&
    //   initialData.email === data.email &&
    //   data.image === undefined &&
    //   data.password === ''
    // ) {
    //   result = false;
    // } else if ((!isEdit && data.name === '') || data.email === '' || data.password === '') {
    //   result = false;
    // } else if (data.password !== data.confirm_password) {
    //   result = false;
    // }
    return result;
  }, [isEdit, data, initialData]);

  const handleChangeImage = (e) => {
    const { files } = e.target;
    if (files?.length) {
      const file = e.target.files[0];
      setData({ ...data, image: file });
    }
  };

  const handleChange = (e) => {
    const property = e.target.name;
    const newData = { ...data, [property]: e.target.value };
    setData(newData);
  };

  const handleSubmit = () => {
    let result;
    if (isEdit) {
      result = dispatch(
        updateVendor({
          ...data,
          image: typeof data.image === 'object' ? data.image : undefined,
        }),
      );
    } else {
      result = dispatch(postVendor(data));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate('/vendors');
      }
    });
  };

  const getValidData = (fields) => ({
    id: fields.id || data.id,
    name: fields.name || data.name,
    email: fields.email || data.email,
    password: '',
    confirm_password: '',
    image: fields.image || data.image,
    shop_category_id: fields.shop_category_id || data.shop_category_id,
    currency_id: fields.currency_id || data.currency_id,
  });

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getShopCategories());
    if (isEdit) {
      dispatch(getVendorById(id)).then(({ payload }) => {
        setData(getValidData(payload.result));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      style={{
        maxWidth: '500px',
        margin: '50px auto',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '3px',
      }}
    >
      <ImageUploader
        src={imageURL}
        name="image"
        onChange={handleChangeImage}
        label="Choose Image"
      />

      <FormControl style={{ marginTop: '15px' }}>
        <TextField
          placeholder="Name"
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </FormControl>

      <FormControl style={{ marginTop: '15px' }}>
        <TextField
          placeholder="Email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </FormControl>

      <FormControl style={{ marginTop: '15px' }}>
        <TextField
          placeholder="Password"
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="password"
        />
      </FormControl>

      <FormControl style={{ marginTop: '15px' }}>
        <TextField
          placeholder="Confirm Password"
          id="confirm_password"
          value={data.confirm_password}
          onChange={(e) => setData({ ...data, confirm_password: e.target.value })}
          type="password"
        />
      </FormControl>

      <FormControl style={{ marginTop: '15px' }}>
        <InputLabel id="category-label">Shop Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          name="shop_category_id"
          value={data.shop_category_id}
          onChange={handleChange}
        >
          {shopCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ marginTop: '15px' }}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          label="Currency"
          name="currency_id"
          value={data.currency_id}
          onChange={handleChange}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.id} value={currency.id}>
              {currency.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LoadingButton
        style={{ display: 'block', marginTop: '15px', marginLeft: 'auto' }}
        loading={updateIsLoading || postIsLoading}
        onClick={handleSubmit}
        disabled={!enableSave}
      >
        {isEdit ? 'Update' : 'Save'}
      </LoadingButton>
    </form>
  );
}

export default Form;

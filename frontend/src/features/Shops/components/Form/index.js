import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, OutlinedInput, FormControl } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import {
  getShopByVendorId,
  selectGetShopByVendorId,
  updateShop,
  selectUpdateShop,
} from '../../shopSlice';
import formUtils from './formUtils';
import './style.scss';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetShopByVendorId);
  const { isLoading: updateIsLoading, error: putError } = useSelector(selectUpdateShop);
  const navigate = useNavigate();

  const [data, setData] = useState({ ...formUtils.initialValues });

  const initialValidData = useMemo(() => formUtils.getValidData(initialData), [initialData]);

  const enableSave = useMemo(() => {
    let enable = formUtils.isValid(data);
    if (enable && formUtils.isEqual(data, initialValidData)) {
      enable = false;
    }
    return enable;
  }, [data, initialValidData]);

  const bannerImageURL = useMemo(() => {
    if (!data.banner_image) return undefined;
    if (typeof data.banner_image === 'object') {
      return URL.createObjectURL(data.banner_image);
    }
    return data.banner_image;
  }, [data.banner_image]);

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

    const result = dispatch(
      updateShop({
        ...data,
        banner_image: typeof data.banner_image === 'object' ? data.banner_image : undefined,
      }),
    );

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    dispatch(getShopByVendorId(id)).then(({ payload }) => {
      setData(formUtils.getValidData(payload.data));
    });
  }, []);

  return (
    <section className="create-shop-container">
      <form onSubmit={handleSubmit} className="create-shop-form">
        <FormHelperText error={!!putError}>{putError}</FormHelperText>

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
          placeholder="Shop Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Opens at"
          name="opens_at"
          type="time"
          value={data.opens_at}
          onChange={handleChange}
        />

        <TextField
          placeholder="Closed at"
          name="closed_at"
          type="time"
          value={data.closed_at}
          onChange={handleChange}
        />

        <TextField
          placeholder="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Greeting Message"
          name="greeting_message"
          value={data.greeting_message}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="Description"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />

        <TextField
          placeholder="SEO Title"
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
          loading={updateIsLoading}
          type="submit"
          disabled={!enableSave}
        >
          Update
        </LoadingButton>
      </form>
    </section>
  );
}

export default Form;

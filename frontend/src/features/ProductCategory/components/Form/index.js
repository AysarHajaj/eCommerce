import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import {
  getCategoryById,
  selectGetCategoryById,
  updateCategory,
  selectUpdateCategory,
  postCategory,
  selectPostCategory,
} from '../../categorySlice';
import ImageUploader from '../../../../components/ImageUploader';
import ROUTES from '../../../../routes/_paths';
import useAuth from '../../../../hooks/useAuth';

function Form() {
  const {
    auth: {
      user: { id: userId },
    },
  } = useAuth();

  const { id } = useParams();

  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetCategoryById);
  const { isLoading: updateIsLoading } = useSelector(selectUpdateCategory);
  const { isLoading: postIsLoading } = useSelector(selectPostCategory);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: '',
    image: undefined,
    user_id: id,
  });

  const imageURL = useMemo(() => {
    if (!data.image) return undefined;
    if (typeof data.image === 'object') {
      return URL.createObjectURL(data.image);
    }
    return data.image;
  }, [data.image]);

  const enableSave = useMemo(() => {
    let result = !!data.name;
    if (isEdit && initialData.name === data.name && data.image === undefined) {
      result = false;
    } else if (!isEdit && data.name === '' && data.image === undefined) {
      result = false;
    }
    return result;
  }, [isEdit, data, initialData]);

  const handleChangeImage = (e) => {
    const { files } = e.target;
    if (files?.length) {
      const file = e.target.files[0];
      setData({ ...data, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (isEdit) {
      result = dispatch(
        updateCategory({
          ...data,
          user_id: userId,
          image: typeof data.image === 'object' ? data.image : undefined,
        }),
      );
    } else {
      result = dispatch(postCategory({ ...data, user_id: userId }));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(ROUTES.PRODUCT_CATEGORY.path);
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getCategoryById(id)).then(({ payload }) => {
        setData({ ...payload.result });
      });
    }
  }, []);

  return (
    <form
      style={{
        maxWidth: '480px',
        margin: '100px auto',
        boxShadow: '0px 4px 8px rgb(0,0,0, .09)',
        border: '1px solid rgb(0,0,0, .08',
        borderRadius: '10px',
        padding: '10px 15px',
      }}
      onSubmit={handleSubmit}
    >
      <ImageUploader
        src={imageURL}
        name="image"
        label="Choose Category Image"
        onChange={handleChangeImage}
        style={{ display: 'flex', maxWidth: '400px' }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '15px',
          maxWidth: '400px',
        }}
      >
        <TextField
          id="name"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <LoadingButton
          loading={updateIsLoading || postIsLoading}
          disabled={!enableSave}
          type="submit"
        >
          {isEdit ? 'Update' : 'Save'}
        </LoadingButton>
      </div>
    </form>
  );
}

export default Form;

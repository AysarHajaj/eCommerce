import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, OutlinedInput, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  getVendorById,
  selectGetVendorById,
  updateVendor,
  selectUpdateVendor,
  postVendor,
  selectPostVendor,
} from '../../vendorSlice';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetVendorById);
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
  });

  const enableSave = useMemo(() => {
    let result = true;
    if (
      isEdit &&
      initialData.name === data.name &&
      initialData.email === data.email &&
      data.image === undefined &&
      data.password === ''
    ) {
      result = false;
    } else if ((!isEdit && data.name === '') || data.email === '' || data.password === '') {
      result = false;
    } else if (data.password !== data.confirm_password) {
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

  useEffect(() => {
    if (isEdit) {
      dispatch(getVendorById(id)).then(({ payload }) => {
        setData({ ...payload.data, image: undefined, password: '' });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form>
      <FormControl>
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
        <OutlinedInput id="image" type="file" label="Image" onChange={handleChangeImage} />
      </FormControl>
      <LoadingButton
        style={{ marginTop: '15px' }}
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

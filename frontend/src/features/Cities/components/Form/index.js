import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import ListIcon from '@mui/icons-material/List';
import {
  getCityById,
  selectGetCityById,
  updateCity,
  selectUpdateCity,
  postCity,
  selectPostCity,
} from '../../citySlice';
import formUtils from './formUtils';
import ROUTES from '../../../../routes/_paths';
import './style.scss';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetCityById);
  const { isLoading: updateIsLoading, error: putError } = useSelector(selectUpdateCity);
  const { isLoading: postIsLoading, error: postError } = useSelector(selectPostCity);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({ ...formUtils.initialValues });

  const initialValidData = useMemo(() => formUtils.getValidData(initialData), [initialData]);

  const enableSave = useMemo(() => {
    let enable = formUtils.isValid(data);
    if (enable && isEdit && initialValidData && formUtils.isEqual(data, initialValidData)) {
      enable = false;
    }
    return enable;
  }, [isEdit, data, initialValidData]);

  const handleChange = (e) => {
    const property = e.target.name;
    setData({ ...data, [property]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (isEdit) {
      result = dispatch(
        updateCity({
          ...data,
        }),
      );
    } else {
      result = dispatch(postCity({ ...data }));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(ROUTES.CITIES.path);
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getCityById(id)).then(({ payload }) => {
        setData(formUtils.getValidData(payload.result));
      });
    }
  }, []);

  return (
    <section className="create-city-container">
      <Button startIcon={<ListIcon />} onClick={() => navigate(ROUTES.CITIES.path)}>
        View Cities
      </Button>
      <form onSubmit={handleSubmit} className="create-city-form">
        <FormHelperText error={!!(postError || putError)}>{postError || putError}</FormHelperText>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
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

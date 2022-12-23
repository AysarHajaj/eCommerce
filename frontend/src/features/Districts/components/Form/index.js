import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import ListIcon from '@mui/icons-material/List';
import {
  getDistrictById,
  selectGetDistrictById,
  updateDistrict,
  selectUpdateDistrict,
  postDistrict,
  selectPostDistrict,
} from '../../districtSlice';
import formUtils from './formUtils';
import ROUTES from '../../../../routes/_paths';
import './style.scss';
import { selectGetCities, getCities } from '../../../Cities/citySlice';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetDistrictById);
  const { data: cities } = useSelector(selectGetCities);
  const { isLoading: updateIsLoading, error: putError } = useSelector(selectUpdateDistrict);
  const { isLoading: postIsLoading, error: postError } = useSelector(selectPostDistrict);
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
        updateDistrict({
          ...data,
        }),
      );
    } else {
      result = dispatch(postDistrict({ ...data }));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(ROUTES.DISTRICTS.path);
      }
    });
  };

  useEffect(() => {
    dispatch(getCities());
    if (isEdit) {
      dispatch(getDistrictById(id)).then(({ payload }) => {
        setData(formUtils.getValidData(payload.result));
      });
    }
  }, []);

  return (
    <section className="create-district-container">
      <Button startIcon={<ListIcon />} onClick={() => navigate(ROUTES.DISTRICTS.path)}>
        View Districts
      </Button>
      <form onSubmit={handleSubmit} className="create-district-form">
        <FormHelperText error={!!(postError || putError)}>{postError || putError}</FormHelperText>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <FormControl style={{ marginTop: '15px' }}>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            label="City"
            name="city_id"
            value={data.city_id}
            onChange={handleChange}
            required
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
import { Typography, Select, FormControl, InputLabel } from '@mui/material';
import {
  getShopByVendorId,
  selectGetShopByVendorId,
  updateShop,
  selectUpdateShop,
} from '../../shopSlice';
import ImageUploader from '../../../../components/ImageUploader';
import formUtils from './formUtils';
import ROUTES from '../../../../routes/routesPath';
import './style.scss';
import Map from '../../../../components/Map';

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

  const mapPosition = useMemo(() => {
    const result = data.map_location.split(',');
    if (result.length === 2 && !isNaN(result[0]) && !isNaN(result[1])) {
      return { lat: +result[0], lng: +result[1] };
    }
    return null;
  }, [data.map_location]);

  const imageURL = useMemo(() => {
    if (!data.image) return undefined;
    if (typeof data.image === 'object') {
      return URL.createObjectURL(data.image);
    }
    return data.image;
  }, [data.image]);

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

  const handleChangeLocation = (position) => {
    setData({ ...data, map_location: `${position.lat},${position.lng}` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = dispatch(
      updateShop({
        ...data,
        image: typeof data.image === 'object' ? data.image : undefined,
      }),
    );

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(ROUTES.DASHBOARD.path);
      }
    });
  };

  useEffect(() => {
    dispatch(getShopByVendorId(id)).then(({ payload }) => {
      setData(formUtils.getValidData(payload.result));
    });
  }, []);

  return (
    <section className="create-shop-container">
      <form onSubmit={handleSubmit} className="create-shop-form">
        <FormHelperText error={!!putError}>{putError}</FormHelperText>

        <div className="form-header">
          <ImageUploader
            name="image"
            src={imageURL}
            label="Choose shop image"
            onChange={handleChangeImage}
          />
          <Map zoom={17} position={mapPosition} onChange={handleChangeLocation} />
          <TextField
            placeholder="Location (lat,lng)"
            name="map_location"
            value={data.map_location}
            onChange={handleChange}
            style={{ alignSelf: 'center' }}
          />
        </div>

        <div className="form-content">
          <TextField
            placeholder="Name"
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
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />

          <TextField
            placeholder="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
            required
          />

          <FormControl>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              label="City"
              name="city_id"
              value={data.city_id}
              onChange={handleChange}
            >
              {/* {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="district-label">District</InputLabel>
            <Select
              labelId="district-label"
              label="District"
              name="district_id"
              value={data.district_id}
              onChange={handleChange}
            >
              {/* {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="category-label">Shop Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              name="shop_category_id"
              value={data.shop_category_id}
              onChange={handleChange}
            >
              {/* {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              label="Currency"
              name="currency_id"
              value={data.currency_id}
              onChange={handleChange}
            >
              {/* {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>

          <table className="shop-working-duration-table">
            <caption>
              <Typography fontSize="1.2em">Manage Working hours</Typography>
            </caption>
            <thead className="header">
              <tr>
                <th />
                <th className="column">Monday</th>
                <th className="column">Tuesday</th>
                <th className="column">Wednesday</th>
                <th className="column">Thursday</th>
                <th className="column">Friday</th>
                <th className="column">Saturday</th>
                <th className="column">Friday</th>
              </tr>
            </thead>
            <tbody>
              <tr className="row-data">
                <td>
                  <b>Opens at</b>
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="monday_opens_at"
                    type="time"
                    value={data.monday_opens_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="tuesday_opens_at"
                    type="time"
                    value={data.tuesday_opens_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="wednesday_opens_at"
                    type="time"
                    value={data.wednesday_opens_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="thursday_opens_at"
                    type="time"
                    value={data.thursday_opens_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="friday_opens_at"
                    type="time"
                    value={data.friday_opens_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="saturday_opens_at"
                    type="time"
                    value={data.saturday_opens_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    placeholder="Opens at"
                    name="sunday_opens_at"
                    type="time"
                    value={data.sunday_opens_at}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr className="row-data">
                <td>
                  <b>Closed At </b>
                </td>
                <td className="column">
                  <TextField
                    name="monday_closed_at"
                    type="time"
                    value={data.monday_closed_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    name="tuesday_closed_at"
                    type="time"
                    value={data.tuesday_closed_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    name="wednesday_closed_at"
                    type="time"
                    value={data.wednesday_closed_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    name="thursday_closed_at"
                    type="time"
                    value={data.thursday_closed_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    name="friday_closed_at"
                    type="time"
                    value={data.friday_closed_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    name="saturday_closed_at"
                    type="time"
                    value={data.saturday_closed_at}
                    onChange={handleChange}
                  />
                </td>
                <td className="column">
                  <TextField
                    name="sunday_closed_at"
                    type="time"
                    value={data.sunday_closed_at}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '15px' }} className="form-footer">
          <LoadingButton loading={updateIsLoading} type="submit" disabled={!enableSave}>
            Update
          </LoadingButton>
        </div>
      </form>
    </section>
  );
}

export default Form;

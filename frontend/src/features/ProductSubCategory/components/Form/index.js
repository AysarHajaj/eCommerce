import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { selectGetCategories, getCategories } from '../../../ProductCategory/categorySlice';
import {
  getSubCategoryById,
  selectGetSubCategoryById,
  updateSubCategory,
  selectUpdateSubCategory,
  postSubCategory,
  selectPostSubCategory,
} from '../../subCategorySlice';
import ROUTES from '../../../../routes/routesPath';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetSubCategoryById);
  const { data: categories } = useSelector(selectGetCategories);
  const { isLoading: updateIsLoading } = useSelector(selectUpdateSubCategory);
  const { isLoading: postIsLoading } = useSelector(selectPostSubCategory);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: '',
    product_category_id: '',
  });

  const enableSave = useMemo(() => {
    let result = !!data.name && !!data.product_category_id;
    if (isEdit && initialData.name === data.name && data.category_id === initialData.category_id) {
      result = false;
    } else if (!isEdit && data.name === '' && data.category_id === undefined) {
      result = false;
    }
    return result;
  }, [isEdit, data, initialData]);

  const handleChangeCategory = (event) => {
    setData({ ...data, category_id: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (isEdit) {
      result = dispatch(updateSubCategory(data));
    } else {
      result = dispatch(postSubCategory(data));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate(ROUTES.PRODUCT_SUB_CATEGORY.path);
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    if (isEdit) {
      dispatch(getSubCategoryById(id)).then(({ payload }) => {
        // eslint-disable-next-line camelcase
        const { name, product_category_id } = payload.result;
        // eslint-disable-next-line camelcase
        setData({ ...data, name, product_category_id });
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
        padding: '15px',
      }}
      onSubmit={handleSubmit}
    >
      <FormControl>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          name="product_category_id"
          value={data.product_category_id}
          onChange={handleChangeCategory}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

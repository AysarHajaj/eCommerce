import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {
  getShopCategories,
  selectGetShopCategories,
  deleteShopCategory,
  changeShopCategoryStatus,
} from './shopCategorySlice';
import SwitchButton from '../../components/SwitchButton';
import ROUTES from '../../routes/routesPath';

function ShopCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetShopCategories);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteShopCategory(id));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id) => {
      dispatch(changeShopCategoryStatus(id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getShopCategories());
  }, []);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      {
        field: 'image',
        headerName: 'Image',
        width: 130,
        renderCell: (params) => <Avatar src={params.row.image} />,
      },
      { field: 'name', headerName: 'Name', width: 130 },
      {
        field: 'status',
        headerName: 'Status',
        width: 130,
        renderCell: (params) => (
          <SwitchButton
            checked={!params.row.deactivated_at}
            changeStatus={() => changeStatus(params.row.id)}
          />
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        renderCell: (params) => (
          <React.Fragment>
            <IconButton
              onClick={() => navigate(ROUTES.EDIT_SHOP_CATEGORY.dynamicPath(params.row.id))}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        ),
      },
    ],
    [],
  );

  return (
    <div className="wrapper shop-category-wrapper">
      <div className="container-header">
        <Button onClick={() => navigate(ROUTES.CREATE_SHOP_CATEGORY.path)} startIcon={<AddIcon />}>
          Add New Sub Category
        </Button>
      </div>
      <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export default ShopCategory;

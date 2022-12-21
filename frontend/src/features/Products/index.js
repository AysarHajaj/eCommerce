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
  getVendorProducts,
  selectGetProducts,
  deleteProduct,
  changeProductStatus,
} from './productSlice';
import SwitchButton from '../../components/SwitchButton';
import useAuth from '../../hooks/useAuth';
import ROUTES from '../../routes/routesPath';

function Products() {
  const {
    auth: {
      user: { id: userId },
    },
  } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetProducts);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteProduct(id));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id) => {
      dispatch(changeProductStatus(id));
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      {
        field: 'image',
        headerName: 'Image',
        width: 130,
        renderCell: (params) => <Avatar src={params.row.image} />,
      },
      { field: 'english_name', headerName: 'Name', width: 130 },
      { field: 'price', headerName: 'Price', width: 130 },
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
            <IconButton onClick={() => navigate(`/product/edit/${params.row.id}`)}>
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

  useEffect(() => {
    dispatch(getVendorProducts(userId));
  }, []);

  return (
    <div className="wrapper category-wrapper">
      <div className="container-header">
        <Button onClick={() => navigate(ROUTES.CREATE_PRODUCT.path)} startIcon={<AddIcon />}>
          Add New Product
        </Button>
      </div>
      <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export default Products;

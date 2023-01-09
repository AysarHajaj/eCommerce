/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOrdersByStatus, selectGetOrders, deleteOrder } from './orderSlice';
import ROUTES from '../../routes/_paths';
import useAuth from '../../hooks/useAuth';

function Orders({ status }) {
  const {
    auth: {
      user: { id: userId },
    },
  } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetOrders);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteOrder(id));
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      {
        field: 'customer_id',
        headerName: 'Customer',
        width: 100,
        valueGetter: (params) => params.row.customer?.name || 'guest',
      },
      { field: 'date', headerName: 'Date', width: 120 },
      { field: 'quantity', headerName: 'Quantity', width: 70 },
      { field: 'total', headerName: 'Amount', width: 70 },
      { field: 'status', headerName: 'Order Status', width: 120 },
      { field: 'payment_status', headerName: 'Payment', width: 120 },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        renderCell: (params) => (
          <React.Fragment>
            {/* <IconButton onClick={() => navigate(ROUTES.EDIT_PRODUCT.dynamicPath(params.row.id))}>
              <EditIcon />
            </IconButton> */}
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
    dispatch(getOrdersByStatus({ status, vendor_id: userId }));
  }, [status, dispatch, userId]);

  return (
    <div className="wrapper category-wrapper">
      <div className="container-header">
        <Button onClick={() => navigate(ROUTES.CREATE_PRODUCT.path)} startIcon={<AddIcon />}>
          Add New Product
        </Button>
      </div>
      <DataGrid rows={data || []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

Orders.propTypes = {
  status: PropTypes.string.isRequired,
};
export default Orders;
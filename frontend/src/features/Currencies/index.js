import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import {
  getCurrencies,
  selectGetCurrencies,
  deleteCurrency,
  changeCurrencyStatus,
} from './currencySlice';
import SwitchButton from '../../components/SwitchButton';
import ROUTES from '../../routes/_paths';

function Currencies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetCurrencies);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteCurrency(id));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id) => {
      dispatch(changeCurrencyStatus(id));
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 230 },
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
            <IconButton onClick={() => navigate(ROUTES.EDIT_CURRENCY.dynamicPath(params.row.id))}>
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
    dispatch(getCurrencies());
  }, []);

  return (
    <div className="wrapper currency-wrapper">
      <div className="container-header">
        <Button onClick={() => navigate(ROUTES.CREATE_CURRENCY.path)} startIcon={<AddIcon />}>
          Add New Currency
        </Button>
      </div>
      <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export default Currencies;

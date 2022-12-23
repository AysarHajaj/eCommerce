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
  getDistricts,
  selectGetDistricts,
  deleteDistrict,
  changeDistrictStatus,
} from './districtSlice';
import SwitchButton from '../../components/SwitchButton';
import ROUTES from '../../routes/_paths';

function Districts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetDistricts);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteDistrict(id));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id) => {
      dispatch(changeDistrictStatus(id));
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 230 },
      {
        field: 'city',
        headerName: 'City',
        width: 130,
        valueGetter: (params) => params.row.city.name,
      },
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
            <IconButton onClick={() => navigate(ROUTES.EDIT_DISTRICT.dynamicPath(params.row.id))}>
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
    dispatch(getDistricts());
  }, []);

  return (
    <div className="wrapper district-wrapper">
      <div className="container-header">
        <Button onClick={() => navigate(ROUTES.CREATE_DISTRICT.path)} startIcon={<AddIcon />}>
          Add New District
        </Button>
      </div>
      <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export default Districts;

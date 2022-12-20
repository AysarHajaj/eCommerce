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
import { getVendors, selectGetVendors, deleteVendor, changeVendorStatus } from './vendorSlice';
import SwitchButton from '../../components/SwitchButton';
import ROUTES from '../../routes/routesPath';

function Vendor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetVendors);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteVendor(id));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id) => {
      dispatch(changeVendorStatus(id));
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'email', headerName: 'Email', width: 130 },
      {
        field: 'image',
        headerName: 'Image',
        width: 130,
        renderCell: (params) => <Avatar src={params.row.image} />,
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
            <IconButton onClick={() => navigate(`/vendor/edit/${params.row.id}`)}>
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
    dispatch(getVendors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wrapper vendor-wrapper">
      <div className="container-header">
        <Button onClick={() => navigate(ROUTES.CREATE_VENDOR.path)} startIcon={<AddIcon />}>
          Add New Vendor
        </Button>
      </div>
      <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export default Vendor;

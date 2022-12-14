import React, { useMemo } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AppSwitch from "../../../../app/components/AppSwitch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Divider } from '@mui/material';
import './style.scss';

const DashboardTable = () => {
  const columns = useMemo(() => {
    return [
      { field: "sn", headerName: "SN", width: 70 },
      {
        field: "customer",
        headerName: "Customer",
        width: 130,
        valueGetter: (params) => params.row.customer.name,
      },
      {
        field: "order_id",
        headerName: "Order Id",
        width: 130,
      },
      {
        field: "date",
        headerName: "Date",
        width: 130,
        valueGetter: (params) => params.row.date,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 130,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 130,
      },
      {
        field: "order_status",
        headerName: "Order Status",
        width: 130,
        renderCell: (params) => {
          return (
            <AppSwitch
              isActive={!params.row.deactivated_at}
              changeStatus={() => { }}
            />
          );
        },
      },
      {
        field: "payment",
        headerName: "Payment",
        width: 130,
      },
      {
        field: "action",
        headerName: "Payment",
        width: 100,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <IconButton>
                <EditIcon
                  onClick={() => {}}
                />
              </IconButton>
              <IconButton onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          );
        },
      },
    ];
  }, []);

  return (
    <div className="dashboard-table-container">
      <h2 className="table-title">Today New Order</h2>
      <Divider />
      <div className="table-controls">
        <Autocomplete
          freeSolo
          id="table-search-field"
          disableClearable
          // options={top100Films.map((option) => option.title)}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
      <DataGrid
        rows={[]}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default DashboardTable;

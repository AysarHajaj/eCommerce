import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AppSwitch from "../../app/components/AppSwitch";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  getChildCategories,
  selectGetChildCategories,
  deleteChildCategory,
  changeChildCategoryStatus,
} from "./childCategorySlice";
import { NavLink } from "react-router-dom";

const ChildCategory = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetChildCategories);

  const handleDelete = useCallback((id) => {
    dispatch(deleteChildCategory(id));
  });

  const changeStatus = useCallback((id) => {
    dispatch(changeChildCategoryStatus(id));
  });

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "category",
        headerName: "Category",
        width: 130,
        valueGetter: (params) => params.row.category.name,
      },
      {
        field: "sub_category",
        headerName: "Sub Category",
        width: 130,
        valueGetter: (params) => params.row.sub_category.name,
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          return (
            <AppSwitch
              isActive={!params.row.deactivated_at}
              changeStatus={() => changeStatus(params.row.id)}
            />
          );
        },
      },
      {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          );
        },
      },
    ];
  }, []);

  useEffect(() => {
    dispatch(getChildCategories());
  }, []);
  return (
    <div className="wrapper category-wrapper">
      <div className="container-header">
        <Button
          variant="contained"
          LinkComponent={NavLink}
          to="/"
          startIcon={<AddIcon />}
        >
          Add New Child Category
        </Button>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default ChildCategory;

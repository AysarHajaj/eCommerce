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
  getSubCategories,
  selectGetSubCategories,
  deleteSubCategory,
  selectDeleteSubCategories,
} from "./subCategorySlice";
import { NavLink } from "react-router-dom";

const SubCategory = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetSubCategories);

  const handleDelete = useCallback((id) => {
    dispatch(deleteSubCategory(id));
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
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          const changeStatus = (checked) => {
            console.log(
              "from sub category log checked",
              checked,
              params.row.id
            );
          };
          return (
            <AppSwitch
              isActive={!params.row.deactivated_at}
              changeStatus={changeStatus}
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
    dispatch(getSubCategories());
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        LinkComponent={NavLink}
        to="/"
        startIcon={<AddIcon />}
      >
        Add New Sub Category
      </Button>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default SubCategory;

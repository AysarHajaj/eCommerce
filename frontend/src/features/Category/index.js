import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import SwitchButton from "../../components/SwitchButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  getCategories,
  selectGetCategories,
  deleteCategory,
  changeCategoryStatus,
} from "./categorySlice";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import constant from "../../constant";
import ROUTES from "../../routes/routesConfig";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetCategories);

  const handleDelete = useCallback((id) => {
    dispatch(deleteCategory(id));
  });

  const changeStatus = useCallback((id) => {
    dispatch(changeCategoryStatus(id));
  });

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "image",
        headerName: "Image",
        width: 130,
        renderCell: (params) => {
          return <Avatar src={params.row.image} />;
        },
      },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          return (
            <SwitchButton
              checked={!params.row.deactivated_at}
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
              <IconButton
                onClick={() => navigate(`/category/edit/${params.row.id}`)}
              >
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
    dispatch(getCategories());
  }, []);
  return (
    <div className="wrapper category-wrapper">
      <div className="container-header">
        <Button
          onClick={() => navigate(ROUTES.CREATE_CATEGORY.path)}
          startIcon={<AddIcon />}
        >
          Add New Category
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

export default Category;

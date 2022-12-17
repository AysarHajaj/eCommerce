import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCategoryById,
  selectGetSubCategoryById,
  updateSubCategory,
  selectUpdateSubCategory,
  postSubCategory,
  selectPostSubCategory,
} from "../../subCategorySlice";
import {
  selectGetCategories,
  getCategories,
} from "../../../Category/categorySlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Form = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetSubCategoryById);
  const { data: categories } = useSelector(selectGetCategories);
  const { isLoading: updateIsLoading } = useSelector(selectUpdateSubCategory);
  const { isLoading: postIsLoading } = useSelector(selectPostSubCategory);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: "",
    category_id: 0,
  });

  const enableSave = useMemo(() => {
    let result = true;
    if (
      isEdit &&
      initialData.name === data.name &&
      data.category_id === initialData.category_id
    ) {
      result = false;
    } else if (!isEdit && data.name === "" && data.category_id === undefined) {
      result = false;
    }
    return result;
  }, [isEdit, data, initialData]);

  const handleChangeCategory = (event) => {
    setData({ ...data, category_id: event.target.value });
  };

  const handleSubmit = () => {
    let result;
    if (isEdit) {
      result = dispatch(updateSubCategory(data));
    } else {
      result = dispatch(postSubCategory(data));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate("/sub_category");
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    if (isEdit) {
      dispatch(getSubCategoryById(id)).then(({ payload }) => {
        const { name, category_id } = payload.data;
        setData({ ...data, name, category_id });
      });
    }
  }, []);
  console.log("aysar", typeof data.category_id);

  return (
    <form>
      <FormControl>
        <label>Name</label>
        <TextField
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </FormControl>

      <FormControl style={{ marginTop: "15px" }}>
        <label>Category</label>
        <Select
          id="category"
          value={data.category_id}
          onChange={handleChangeCategory}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LoadingButton
        style={{ marginTop: "15px" }}
        loading={updateIsLoading || postIsLoading}
        onClick={handleSubmit}
        disabled={!enableSave}
      >
        {isEdit ? "Update" : "Save"}
      </LoadingButton>
    </form>
  );
};

export default Form;

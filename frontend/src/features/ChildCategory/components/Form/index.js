import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChildCategoryById,
  selectGetChildCategoryById,
  updateChildCategory,
  selectUpdateChildCategory,
  postChildCategory,
  selectPostChildCategory,
} from "../../childCategorySlice";
import {
  selectGetCategories,
  getCategories,
} from "../../../Category/categorySlice";
import {
  selectGetSubCategories,
  getSubCategories,
} from "../../../SubCategory/subCategorySlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Form = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetChildCategoryById);
  const { data: categories } = useSelector(selectGetCategories);
  const { data: subCategories } = useSelector(selectGetSubCategories);
  const [subCategoriesState, setSubCategoriesState] = useState([]);

  const { isLoading: updateIsLoading } = useSelector(selectUpdateChildCategory);
  const { isLoading: postIsLoading } = useSelector(selectPostChildCategory);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: "",
    sub_category_id: undefined,
    category_id: undefined,
  });

  const enableSave = useMemo(() => {
    let result = true;
    if (
      isEdit &&
      initialData.name === data.name &&
      data.sub_category_id === initialData.sub_category_id &&
      data.category_id === initialData.category_id
    ) {
      result = false;
    } else if (
      !isEdit &&
      data.name === "" &&
      data.sub_category_id === undefined &&
      data.category_id === undefined
    ) {
      result = false;
    }
    return result;
  }, [isEdit, data, initialData]);

  const handleSubmit = () => {
    let result;
    if (isEdit) {
      result = dispatch(updateChildCategory(data));
    } else {
      result = dispatch(postChildCategory(data));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate("/child_category");
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getChildCategoryById(id)).then(({ payload }) => {
        setData(payload.data);
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, []);

  const handleChangeCategory = (event) => {
    setData({ ...data, category_id: event.target.value });
    setSubCategoriesState(
      subCategories.filter(
        (subCategory) => subCategory.category_id === event.target.value
      )
    );
    setData({ ...data, sub_category_id: undefined });
  };
  const handleChangeSubCategory = (event) => {
    setData({ ...data, sub_category_id: event.target.value });
  };
  console.log(categories);
  return (
    <form>
      <FormControl fullWidth>
        <label>Name</label>
        <TextField
          id="name"
          variant="outlined"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          fullWidth
        />
      </FormControl>

      <FormControl style={{ marginTop: "15px" }} fullWidth>
        <label>Category</label>
        <Select
          id="category"
          value={data.category_id}
          onChange={handleChangeCategory}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ marginTop: "15px" }} fullWidth>
        <label>Sub Category</label>
        <Select
          id="sub_category"
          value={data.sub_category_id}
          onChange={handleChangeSubCategory}
          fullWidth
        >
          {subCategoriesState.map((subCategory) => (
            <MenuItem key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LoadingButton
        style={{ marginTop: "15px" }}
        variant="contained"
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

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

  const { isLoading: updateIsLoading } = useSelector(selectUpdateChildCategory);
  const { isLoading: postIsLoading } = useSelector(selectPostChildCategory);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: "",
    sub_category_id: 0,
    category_id: 0,
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
      data.name === "" ||
      data.sub_category_id === 0 ||
      data.category_id === 0
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
    dispatch(getCategories());
    dispatch(getSubCategories());
    if (isEdit) {
      dispatch(getChildCategoryById(id)).then(({ payload }) => {
        const { name, sub_category_id, category_id } = payload.data;
        setData({ ...data, name, sub_category_id, category_id });
      });
    }
  }, []);

  const handleChangeCategory = (event) => {
    setData({ ...data, category_id: event.target.value, sub_category_id: 0 });
  };
  const handleChangeSubCategory = (event) => {
    setData({ ...data, sub_category_id: event.target.value });
  };
  const filteredSubCategories = useMemo(() => {
    return subCategories.filter(
      (subCategory) => subCategory.category_id === data.category_id
    );
  }, [data.category_id]);
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

      <FormControl style={{ marginTop: "15px" }}>
        <label>Sub Category</label>
        <Select
          id="sub_category"
          value={data.sub_category_id}
          onChange={handleChangeSubCategory}
        >
          {filteredSubCategories.map((subCategory) => (
            <MenuItem key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
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

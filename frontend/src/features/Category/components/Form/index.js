import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryById,
  selectGetCategoryById,
  updateCategory,
  selectUpdateCategory,
  postCategory,
  selectPostCategory,
} from "../../categorySlice";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, OutlinedInput, FormControl } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Form = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetCategoryById);
  const { isLoading: updateIsLoading } = useSelector(selectUpdateCategory);
  const { isLoading: postIsLoading } = useSelector(selectPostCategory);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [data, setData] = useState({
    id,
    name: "",
    image: undefined,
  });

  const enableSave = useMemo(() => {
    let result = true;
    if (isEdit && initialData.name === data.name && data.image === undefined) {
      result = false;
    } else if (!isEdit && data.name === "" && data.image === undefined) {
      result = false;
    }
    return result;
  }, [isEdit, data, initialData]);

  const handleChangeImage = (e) => {
    const files = e.target.files;
    if (files?.length) {
      const file = e.target.files[0];
      setData({ ...data, image: file });
    }
  };

  const handleSubmit = () => {
    let result;
    if (isEdit) {
      result = dispatch(updateCategory(data));
    } else {
      result = dispatch(postCategory(data));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate("/category");
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getCategoryById(id)).then(({ payload }) => {
        setData({ ...payload.data, image: undefined });
      });
    }
  }, []);

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
        <label>Image</label>
        <OutlinedInput
          id="image"
          type="file"
          variant="outlined"
          fullWidth
          label="Image"
          onChange={handleChangeImage}
        />
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

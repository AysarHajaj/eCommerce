import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  selectGetProductById,
  updateProduct,
  selectUpdateProduct,
  postProduct,
  selectPostProduct,
} from "../../productSlice";
import {
  selectGetCategories,
  getCategories,
} from "../../../Category/categorySlice";
import {
  selectGetSubCategories,
  getSubCategories,
} from "../../../SubCategory/subCategorySlice";
import {
  selectGetChildCategories,
  getChildCategories,
} from "../../../ChildCategory/childCategorySlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import FormHelperText from '@mui/material/FormHelperText';
import constant from "../../../../constant";
import useAuth from "../../../../hooks/useAuth";
import "./style.scss";

const Form = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetProductById);
  const { data: categories } = useSelector(selectGetCategories);
  const { data: subCategories } = useSelector(selectGetSubCategories);
  const { data: childCategories } = useSelector(selectGetChildCategories);
  const { isLoading: updateIsLoading, error: putError } = useSelector(selectUpdateProduct);
  const { isLoading: postIsLoading, error: postError } = useSelector(selectPostProduct);
  const isEdit = !!id;
  const navigate = useNavigate();
  const {
    auth: { user },
  } = useAuth();

  const navigatePath = useMemo(() => { 
    return user?.type === constant.USER_ROLES.VENDOR
      ? `${constant.ROUTES.VENDOR_PRODUCTS.path.replace("/:id", `/${user?.id}`)}`
      : constant.ROUTES.PRODUCTS.path;
  }, [user]);

  const [data, setData] = useState({
    id,
    name: "",
    price: 0,
    thumbnail_image: undefined,
    banner_image: undefined,
    short_name: "",
    slug: "",
    category_id: 0,
    sub_category_id: 0,
    child_category_id: 0,
    user_id: undefined,
    offer_price: 0,
    stock_quantity: 0,
    short_description: "",
    long_description: "",
    deactivated_at: null,
    seo_title: "",
    seo_description: "",
  });

  // const enableSave = useMemo(() => {
  //   let result = true;
  //   if (
  //     isEdit &&
  //     initialData.name === data.name &&
  //     data.image === initialData.image
  //   ) {
  //     result = false;
  //   } else if (!isEdit && data.name === "" && data.image === "") {
  //     result = false;
  //   }
  //   return result;
  // }, [isEdit, data, initialData]);

  const filteredSubCategories = useMemo(
    () => subCategories.filter((item) => item.id === data.category_id),
    [data.category_id]
  );

  const filteredChildCategories = useMemo(
    () => childCategories.filter((item) => item.id === data.sub_category_id),
    [data.sub_category_id]
  );

  const handleChangeImage = (e) => {
    const files = e.target.files;
    const property = e.target.name;
    if (files?.length) {
      const file = e.target.files[0];
      setData({ ...data, [property]: file });
    }
  };

  const handleChange = (e) => {
    const property = e.target.name;
    setData({ ...data, [property]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (isEdit) {
      result = dispatch(updateProduct({...data, ...(user?.type === constant.USER_ROLES.VENDOR ? {user_id: user?.id} : {})}));
    } else {
      result = dispatch(postProduct({...data, ...(user?.type === constant.USER_ROLES.VENDOR ? {user_id: user?.id} : {})}));
    }

    result.then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate(navigatePath);
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getChildCategories());
    if (isEdit) {
      dispatch(getProductById(id)).then(({ payload }) => {
        setData(payload.data);
      });
    }
  }, []);

  return (
    <section className="create-product-container">
      <Button
        variant="contained"
        onClick={() => navigate(navigatePath)}
      >
        Products
      </Button>
      <form onSubmit={handleSubmit} className="create-product-form">
        <FormHelperText error={!!(postError || putError)}>
          {postError || putError}
        </FormHelperText>
        <FormControl style={{ marginTop: "15px" }} fullWidth>
          <label>Thumnail Image</label>
          <OutlinedInput
            name="thumbnail_image"
            type="file"
            variant="outlined"
            fullWidth
            label="Thumbnail Image"
            onChange={handleChangeImage}
          />
        </FormControl>
        <FormControl style={{ marginTop: "15px" }} fullWidth>
          <label>Banner Image</label>
          <OutlinedInput
            name="banner_image"
            type="file"
            variant="outlined"
            fullWidth
            label="Banner Image"
            onChange={handleChangeImage}
          />
        </FormControl>
        <FormControl fullWidth>
          <label>Short Name</label>
          <TextField
            name="short_name"
            variant="outlined"
            value={data.short_name}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Name</label>
          <TextField
            name="name"
            variant="outlined"
            value={data.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Slug</label>
          <TextField
            name="slug"
            variant="outlined"
            value={data.slug}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl style={{ marginTop: "15px" }} fullWidth>
          <label>Category</label>
          <Select
            name="category_id"
            value={data.category_id}
            onChange={handleChange}
            fullWidth
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: "15px" }} fullWidth>
          <label>SubCategory Category</label>
          <Select
            name="sub_category_id"
            value={data.sub_category_id}
            onChange={handleChange}
            fullWidth
            required
          >
            {filteredSubCategories.map((childCategory) => (
              <MenuItem key={childCategory.id} value={childCategory.id}>
                {childCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: "15px" }} fullWidth>
          <label>Child Category</label>
          <Select
            name="child_category_id"
            value={data.child_category_id}
            onChange={handleChange}
            fullWidth
            required
          >
            {filteredChildCategories.map((childCategory) => (
              <MenuItem key={childCategory.id} value={childCategory.id}>
                {childCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <label>Price</label>
          <TextField
            name="price"
            variant="outlined"
            type="number"
            value={data.price}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Offer Price</label>
          <TextField
            name="offer_price"
            variant="outlined"
            type="number"
            value={data.offer_price}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Stock Quantity</label>
          <TextField
            name="stock_quantity"
            variant="outlined"
            type="number"
            value={data.stock_quantity}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Short Description</label>
          <TextField
            name="short_description"
            variant="outlined"
            value={data.short_description}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Long Description</label>
          <TextField
            name="long_description"
            variant="outlined"
            value={data.long_description}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>SEO Title</label>
          <TextField
            name="seo_title"
            variant="outlined"
            value={data.seo_title}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <label>SEO Description</label>
          <TextField
            name="seo_description"
            variant="outlined"
            value={data.seo_description}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <LoadingButton
          style={{ marginTop: "15px" }}
          variant="contained"
          loading={updateIsLoading || postIsLoading}
          type="submit"
          // disabled={!enableSave}
        >
          {isEdit ? "Update" : "Save"}
        </LoadingButton>
      </form>
    </section>
  );
};

export default Form;

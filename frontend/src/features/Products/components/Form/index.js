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
import FormHelperText from '@mui/material/FormHelperText';
import Avatar from "@mui/material/Avatar";
import ListIcon from "@mui/icons-material/List";
import constant from "../../../../constant";
import useAuth from "../../../../hooks/useAuth";
import formUtils from './formUtils';
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

  const [data, setData] = useState({ ...formUtils.initialValues });

  const initialValidData = useMemo(() => formUtils.getValidData(initialData), [initialData]);

  const enableSave = useMemo(() => {
    let enable = formUtils.isValid(data);
    if (enable && isEdit && formUtils.isEqual(data, initialValidData)) {
      enable = false;
    }
    return enable;
  }, [isEdit, data, initialValidData]);

  const thumbnailImageURL = useMemo(() => { 
    if (!data.thumbnail_image) return undefined;
    if (typeof data.thumbnail_image === 'object') {
      return URL.createObjectURL(data.thumbnail_image);
    }
    return data.thumbnail_image;
  }, [data.thumbnail_image]);

  const bannerImageURL = useMemo(() => {
    if (!data.banner_image) return undefined;
    if (typeof data.banner_image === "object") {
      return URL.createObjectURL(data.banner_image);
    }
    return data.banner_image;
  }, [data.banner_image]);


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
      result = dispatch(
        updateProduct({
          ...data,
          ...(user?.type === constant.USER_ROLES.VENDOR
            ? { user_id: user?.id }
            : {}),
          banner_image:
            typeof data.banner_image === "object"
              ? data.banner_image
              : undefined,
          thumbnail_image:
            typeof data.thumbnail_image === "object"
              ? data.thumbnail_image
              : undefined,
        })
      );
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
        setData(formUtils.getValidData(payload.data));
      });
    }
  }, []);

  return (
    <section className="create-product-container">
      <Button startIcon={<ListIcon />} onClick={() => navigate(navigatePath)}>
        View Products
      </Button>
      <form onSubmit={handleSubmit} className="create-product-form">
        <FormHelperText error={!!(postError || putError)}>
          {postError || putError}
        </FormHelperText>

        <FormControl style={{ marginTop: "15px" }}>
          <label>Thumnail Image Preview</label>
          <Avatar src={thumbnailImageURL} />
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <label>Thumnail Image</label>
          <OutlinedInput
            name="thumbnail_image"
            type="file"
            label="Thumbnail Image"
            onChange={handleChangeImage}
          />
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <label>Banner Image Preview</label>
          <Avatar src={bannerImageURL} />
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <label>Banner Image</label>
          <OutlinedInput
            name="banner_image"
            type="file"
            label="Banner Image"
            onChange={handleChangeImage}
          />
        </FormControl>
        <FormControl>
          <label>Short Name</label>
          <TextField
            name="short_name"
            value={data.short_name}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <label>Name</label>
          <TextField
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <label>Slug</label>
          <TextField
            name="slug"
            value={data.slug}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <label>Category</label>
          <Select
            name="category_id"
            value={data.category_id}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <label>SubCategory Category</label>
          <Select
            name="sub_category_id"
            value={data.sub_category_id}
            onChange={handleChange}
            required
          >
            {filteredSubCategories.map((childCategory) => (
              <MenuItem key={childCategory.id} value={childCategory.id}>
                {childCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: "15px" }}>
          <label>Child Category</label>
          <Select
            name="child_category_id"
            value={data.child_category_id}
            onChange={handleChange}
            required
          >
            {filteredChildCategories.map((childCategory) => (
              <MenuItem key={childCategory.id} value={childCategory.id}>
                {childCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <label>Price</label>
          <TextField
            name="price"
            type="number"
            value={data.price}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <label>Offer Price</label>
          <TextField
            name="offer_price"
            type="number"
            value={data.offer_price}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <label>Stock Quantity</label>
          <TextField
            name="stock_quantity"
            type="number"
            value={data.stock_quantity}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <label>Short Description</label>
          <TextField
            name="short_description"
            value={data.short_description}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <label>Long Description</label>
          <TextField
            name="long_description"
            value={data.long_description}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <label>SEO Title</label>
          <TextField
            name="seo_title"
            value={data.seo_title}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <label>SEO Description</label>
          <TextField
            name="seo_description"
            value={data.seo_description}
            onChange={handleChange}
          />
        </FormControl>

        <LoadingButton
          style={{ marginTop: "15px" }}
          loading={updateIsLoading || postIsLoading}
          type="submit"
          disabled={!enableSave}
        >
          {isEdit ? "Update" : "Save"}
        </LoadingButton>
      </form>
    </section>
  );
};

export default Form;

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopByVendorId,
  selectGetShopByVendorId,
  updateShop,
  selectUpdateShop,
} from "../../shopSlice";
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
import FormHelperText from "@mui/material/FormHelperText";
import constant from "../../../../constant";
import useAuth from "../../../../hooks/useAuth";
import "./style.scss";

const Form = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: initialData } = useSelector(selectGetShopByVendorId);
  const { isLoading: updateIsLoading, error: putError } =
    useSelector(selectUpdateShop);
  const isEdit = !!id;
  const navigate = useNavigate();
  const {
    auth: { user },
  } = useAuth();

  const [data, setData] = useState({
    id: initialData.id,
    user_id: id,
    name: "",
    email: "",
    banner_image: undefined,
    phone: "",
    opens_at: "",
    closed_at: "",
    address: "",
    greeting_message: "",
    description: "",
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

    result = dispatch(
      updateShop({
        ...data,
        banner_image:
          typeof data.banner_image === "string" ? undefined : data.banner_image,
      })
    );

    result.then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    dispatch(getShopByVendorId(id)).then(({ payload }) => {
      const {
        id,
        user_id,
        name,
        email,
        banner_image,
        phone,
        opens_at,
        closed_at,
        address,
        greeting_message,
        description,
        seo_title,
        seo_description,
      } = { ...payload.data };
      setData({
        id,
        user_id,
        name,
        email,
        banner_image,
        phone,
        opens_at,
        closed_at,
        address,
        greeting_message,
        description,
        seo_title,
        seo_description,
      });
    });
  }, []);

  return (
    <section className="create-product-container">
      <form onSubmit={handleSubmit} className="create-product-form">
        <FormHelperText error={!!putError}>{putError}</FormHelperText>

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
          <label>Shop Name</label>
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
          <label>Email</label>
          <TextField
            name="email"
            variant="outlined"
            value={data.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Phone</label>
          <TextField
            name="phone"
            variant="outlined"
            value={data.phone}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Opens at</label>
          <TextField
            name="opens_at"
            variant="outlined"
            type="time"
            value={data.opens_at}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Closed at</label>
          <TextField
            name="closed_at"
            variant="outlined"
            type="time"
            value={data.closed_at}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Address</label>
          <TextField
            name="address"
            variant="outlined"
            value={data.address}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Greeting Message</label>
          <TextField
            name="greeting_message"
            variant="outlined"
            value={data.greeting_message}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <label>Description</label>
          <TextField
            name="description"
            variant="outlined"
            value={data.description}
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
          loading={updateIsLoading}
          type="submit"
          // disabled={!enableSave}
        >
          Update
        </LoadingButton>
      </form>
    </section>
  );
};

export default Form;
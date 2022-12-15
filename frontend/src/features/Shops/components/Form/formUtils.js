const initialValues = {
  id: 0,
  user_id: 0,
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
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  user_id: data.user_id || initialValues.user_id,
  name: data.name || initialValues.name,
  email: data.email || initialValues.email,
  banner_image: data.banner_image || initialValues.banner_image,
  phone: data.phone || initialValues.phone,
  opens_at: data.opens_at || initialValues.opens_at,
  closed_at: data.closed_at || initialValues.closed_at,
  address: data.address || initialValues.address,
  greeting_message: data.greeting_message || initialValues.greeting_message,
  description: data.description || initialValues.description,
  seo_title: data.seo_title || initialValues.seo_title,
  seo_description: data.seo_description || initialValues.seo_description,
});

const isEqual = (a, b) =>
  a.id === b.id &&
  a.user_id === b.user_id &&
  a.name === b.name &&
  a.email === b.email &&
  a.banner_image === b.banner_image &&
  a.phone === b.phone &&
  a.opens_at === b.opens_at &&
  a.closed_at === b.closed_at &&
  a.address === b.address &&
  a.greeting_message === b.greeting_message &&
  a.description === b.description &&
  a.seo_title === b.seo_title &&
  a.seo_description === b.seo_description;

const isValid = (a) =>
  !!a.id &&
  !!a.user_id &&
  !!a.name &&
  !!a.email &&
  !!a.phone &&
  !!a.opens_at &&
  !!a.closed_at &&
  !!a.description &&
  !!a.address;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

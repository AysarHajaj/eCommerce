const initialValues = {
  id: 0,
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
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  name: data.name || initialValues.name,
  price: data.price || initialValues.price,
  thumbnail_image: data.thumbnail_image || initialValues.thumbnail_image,
  banner_image: data.banner_image || initialValues.banner_image,
  short_name: data.short_name || initialValues.short_name,
  slug: data.slug || initialValues.slug,
  category_id: data.category_id || initialValues.category_id,
  sub_category_id: data.sub_category_id || initialValues.sub_category_id,
  child_category_id: data.child_category_id || initialValues.child_category_id,
  user_id: data.user_id || initialValues.user_id,
  offer_price: data.offer_price || initialValues.offer_price,
  stock_quantity: data.stock_quantity || initialValues.stock_quantity,
  short_description: data.short_description || initialValues.short_description,
  long_description: data.long_description || initialValues.long_description,
  deactivated_at: data.deactivated_at || initialValues.deactivated_at,
  seo_title: data.seo_title || initialValues.seo_title,
  seo_description: data.seo_description || initialValues.seo_description,
});


const isEqual = (a, b) => a.id === b.id &&
  a.name === b.name &&
  a.price === b.price &&
  a.thumbnail_image === b.thumbnail_image &&
  a.banner_image === b.banner_image &&
  a.short_name === b.short_name &&
  a.slug === b.slug &&
  a.category_id === b.category_id &&
  a.sub_category_id === b.sub_category_id &&
  a.child_category_id === b.child_category_id &&
  a.user_id === b.user_id &&
  a.offer_price === b.offer_price &&
  a.stock_quantity === b.stock_quantity &&
  a.short_description === b.short_description &&
  a.long_description === b.long_description &&
  a.deactivated_at === b.deactivated_at &&
  a.seo_title === b.seo_title &&
  a.seo_description === b.seo_description

const isValid = (a) =>
  !!a.name  &&
  !!a.short_name  &&
  !!a.slug  &&
  !!a.category_id  &&
  !!a.sub_category_id  &&
  !!a.child_category_id  &&
  !!a.short_description  &&
  !!a.long_description;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;
const initialValues = {
  id: 0,
  deactivated_at: null,
  variation_price_from: 0,
  variation_price_to: 0,
  discount: 0,
  stock_quantity: 0,
  user_id: 0,
  price: 0,
  product_category_id: 0,
  product_sub_category_id: 0,
  english_name: '',
  arabic_name: '',
  english_description: '',
  arabic_description: '',
  image: undefined,
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  english_name: data.english_name || initialValues.english_name,
  arabic_name: data.arabic_name || initialValues.arabic_name,
  english_description: data.english_description || initialValues.english_description,
  arabic_description: data.arabic_description || initialValues.arabic_description,
  price: data.price || initialValues.price,
  variation_price_from: data.variation_price_from || initialValues.variation_price_from,
  variation_price_to: data.variation_price_to || initialValues.variation_price_to,
  image: data.image || initialValues.image,
  product_category_id: data.product_category_id || initialValues.product_category_id,
  product_sub_category_id: data.product_sub_category_id || initialValues.product_sub_category_id,
  user_id: data.user_id || initialValues.user_id,
  discount: data.discount || initialValues.discount,
  stock_quantity: data.stock_quantity || initialValues.stock_quantity,
  deactivated_at: data.deactivated_at || initialValues.deactivated_at,
});

const isEqual = (a, b) =>
  a.id === b.id &&
  a.english_name === b.english_name &&
  a.arabic_name === b.arabic_name &&
  a.english_description === b.english_description &&
  a.arabic_description === b.arabic_description &&
  a.price === b.price &&
  a.variation_price_from === b.variation_price_from &&
  a.variation_price_to === b.variation_price_to &&
  a.image === b.image &&
  a.product_category_id === b.product_category_id &&
  a.product_sub_category_id === b.product_sub_category_id &&
  a.user_id === b.user_id &&
  a.discount === b.discount &&
  a.stock_quantity === b.stock_quantity &&
  a.deactivated_at === b.deactivated_at;

const isValid = (a) => !!a.english_name && !!a.product_category_id && !!a.slug && !!a.user_id;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

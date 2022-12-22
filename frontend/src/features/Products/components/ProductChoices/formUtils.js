const initialValues = {
  id: 0,
  english_name: '',
  arabic_name: '',
  price: 0,
  product_choice_group_id: '',
  deactivated_at: null,
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  english_name: data.english_name || initialValues.english_name,
  arabic_name: data.arabic_name || initialValues.arabic_name,
  price: data.price || initialValues.price,
  product_choice_group_id: data.product_choice_group_id || initialValues.product_choice_group_id,
  deactivated_at: data.deactivated_at || initialValues.deactivated_at,
});

const isEqual = (a, b) =>
  a.id === b.id &&
  a.english_name === b.english_name &&
  a.arabic_name === b.arabic_name &&
  a.price === b.price &&
  a.product_choice_group_id === b.product_choice_group_id &&
  a.deactivated_at === b.deactivated_at;

const isValid = (a) => !!a.english_name;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

const initialValues = {
  id: 0,
  english_name: '',
  arabic_name: '',
  min_number: 0,
  max_number: 0,
  product_choices: [],
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  english_name: data.english_name || initialValues.english_name,
  arabic_name: data.arabic_name || initialValues.arabic_name,
  min_number: data.min_number || initialValues.min_number,
  max_number: data.max_number || initialValues.max_number,
});

const isEqual = (a, b) =>
  a.id === b.id &&
  a.english_name === b.english_name &&
  a.arabic_name === b.arabic_name &&
  a.min_number === b.min_number &&
  a.max_number === b.max_number;

const isValid = (a) => !!a.english_name;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

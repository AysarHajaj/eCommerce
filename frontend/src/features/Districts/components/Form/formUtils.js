const initialValues = {
  id: 0,
  deactivated_at: null,
  name: '',
  city_id: '',
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  name: data.name || initialValues.name,
  deactivated_at: data.deactivated_at || initialValues.deactivated_at,
  city_id: data.city_id || initialValues.city_id,
});

const isEqual = (a, b) =>
  a.id === b.id &&
  a.name === b.name &&
  a.deactivated_at === b.deactivated_at &&
  a.city_id === b.city_id;

const isValid = (data) => !!data.name && !!data.city_id;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

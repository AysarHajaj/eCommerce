const initialValues = {
  id: 0,
  deactivated_at: null,
  name: '',
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  name: data.name || initialValues.name,
  deactivated_at: data.deactivated_at || initialValues.deactivated_at,
});

const isEqual = (a, b) =>
  a.id === b.id && a.name === b.name && a.deactivated_at === b.deactivated_at;

const isValid = (data) => !!data.name;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

const initialValues = {
  id: 0,
  user_id: 0,
  name: '',
  email: '',
  image: undefined,
  phone: '',
  address: '',
  map_location: '',
  number: '',
  description: '',
  shop_category_id: '',
  city_id: '',
  district_id: '',
  currency_id: '',

  monday_opens_at: '',
  monday_closed_at: '',

  sunday_opens_at: '',
  sunday_closed_at: '',

  tuesday_opens_at: '',
  tuesday_closed_at: '',

  wednesday_opens_at: '',
  wednesday_closed_at: '',

  thursday_opens_at: '',
  thursday_closed_at: '',

  friday_opens_at: '',
  friday_closed_at: '',

  saturday_opens_at: '',
  saturday_closed_at: '',

  deactivated_at: null,
};

const getValidData = (data) => ({
  id: data.id || initialValues.id,
  user_id: data.user_id || initialValues.user_id,
  name: data.name || initialValues.name,
  email: data.email || initialValues.email,
  image: data.image || initialValues.image,
  phone: data.phone || initialValues.phone,
  address: data.address || initialValues.address,
  map_location: data.map_location || initialValues.map_location,
  number: data.number || initialValues.number,
  description: data.description || initialValues.description,
  shop_category_id: data.shop_category_id || initialValues.shop_category_id,
  city_id: data.city_id || initialValues.city_id,
  district_id: data.district_id || initialValues.district_id,
  currency_id: data.currency_id || initialValues.currency_id,
  monday_opens_at: data.monday_opens_at || initialValues.monday_opens_at,
  monday_closed_at: data.monday_closed_at || initialValues.monday_closed_at,

  sunday_opens_at: data.sunday_opens_at || initialValues.sunday_opens_at,
  sunday_closed_at: data.sunday_closed_at || initialValues.sunday_closed_at,

  tuesday_opens_at: data.tuesday_opens_at || initialValues.tuesday_opens_at,
  tuesday_closed_at: data.tuesday_closed_at || initialValues.tuesday_closed_at,

  wednesday_opens_at: data.wednesday_opens_at || initialValues.wednesday_opens_at,
  wednesday_closed_at: data.wednesday_closed_at || initialValues.wednesday_closed_at,

  thursday_opens_at: data.thursday_opens_at || initialValues.thursday_opens_at,
  thursday_closed_at: data.thursday_closed_at || initialValues.thursday_closed_at,

  friday_opens_at: data.friday_opens_at || initialValues.friday_opens_at,
  friday_closed_at: data.friday_closed_at || initialValues.friday_closed_at,

  saturday_opens_at: data.saturday_opens_at || initialValues.saturday_opens_at,
  saturday_closed_at: data.saturday_closed_at || initialValues.saturday_closed_at,

  deactivated_at: data.deactivated_at || initialValues.deactivated_at,
});

const isEqual = (a, b) =>
  a.id === b.id &&
  b.id === a.user_id &&
  b.user_id === a.name &&
  b.name === a.email &&
  b.email === a.image &&
  b.image === a.phone &&
  b.phone === a.address &&
  b.address === a.map_location &&
  b.map_location === a.number &&
  b.number === a.description &&
  b.description === a.shop_category_id &&
  b.shop_category_id === a.city_id &&
  b.city_id === a.district_id &&
  b.district_id === a.currency_id &&
  b.currency_id === a.monday_opens_at &&
  b.monday_opens_at === a.monday_closed_at &&
  b.monday_closed_at === a.sunday_opens_at &&
  b.sunday_opens_at === a.sunday_closed_at &&
  b.sunday_closed_at === a.tuesday_opens_at &&
  b.tuesday_opens_at === a.tuesday_closed_at &&
  b.tuesday_closed_at === a.wednesday_opens_at &&
  b.wednesday_opens_at === a.wednesday_closed_at &&
  b.wednesday_closed_at === a.thursday_opens_at &&
  b.thursday_opens_at === a.thursday_closed_at &&
  b.thursday_closed_at === a.friday_opens_at &&
  b.friday_opens_at === a.friday_closed_at &&
  b.friday_closed_at === a.saturday_opens_at &&
  b.saturday_opens_at === a.saturday_closed_at &&
  b.saturday_closed_at === a.deactivated_at &&
  b.deactivated_at;

const isValid = (a) =>
  !!a.id && !!a.user_id && !!a.name && !!a.email && !!a.phone && !!a.description && !!a.address;

const utils = {
  isEqual,
  getValidData,
  initialValues,
  isValid,
};

export default utils;

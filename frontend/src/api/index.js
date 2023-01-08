import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import publicPaths from '../routes/publicPaths';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    if (error?.response?.status === 403 || error?.response?.status === 401) {
      setAuth();
      navigate(publicPaths.LOGIN.path);
    }

    return Promise.reject(error);
  },
);

const getProductCategories = () => api.get('/product-categories');
const deleteProductCategory = (id) => api.delete(`/product-categories/${id}`);
const getProductCategoryById = (id) => api.get(`/product-categories/${id}`);
const updateProductCategory = (id, data) =>
  api.post(`/product-categories/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const postProductCategory = (data) =>
  api.post(`/product-categories`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const changeProductCategoryStatus = (id) => api.post(`/product-categories/${id}/change_status`);

const getProductSubCategories = () => api.get('/product-sub-categories');
const deleteProductSubCategory = (id) => api.delete(`/product-sub-categories/${id}`);
const changeProductSubCategoryStatus = (id) =>
  api.post(`/product-sub-categories/${id}/change_status`);
const getProductSubCategoryById = (id) => api.get(`/product-sub-categories/${id}`);
const updateProductSubCategory = (id, data) => api.put(`/product-sub-categories/${id}`, data);
const postProductSubCategory = (data) => api.post(`/product-sub-categories`, data);

const changeShopCategoryStatus = (id) => api.post(`/shop-categories/${id}/change_status`);
const deleteShopCategory = (id) => api.delete(`/shop-categories/${id}`);
const getShopCategories = () => api.get('/shop-categories');
const getShopCategoryById = (id) => api.get(`/shop-categories/${id}`);
const updateShopCategory = (id, data) =>
  api.post(`/shop-categories/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const postShopCategory = (data) =>
  api.post(`/shop-categories`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const getVendors = () => api.get('/vendors');
const deleteVendor = (id) => api.delete(`/vendors/${id}`);
const changeVendorStatus = (id) => api.post(`/vendors/${id}/change_status`);
const getVendorById = (id) => api.get(`/vendors/${id}`);
const updateVendor = (id, data) =>
  api.post(`/vendors/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const postVendor = (data) =>
  api.post(`/vendors`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const getVendorProducts = (id) => api.get(`/products/vendor/${id}`);
const changeProductStatus = (id) => api.post(`/products/${id}/change_status`);
const getProductById = (id) => api.get(`/products/${id}`);
const deleteProduct = (id) => api.delete(`/products/${id}`);
const updateProduct = (id, data) =>
  api.post(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const postProduct = (data) =>
  api.post(`/products`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const login = (data) => api.post(`/login`, data);

const getShopByVendorId = (id) => api.get(`/shops/vendor/${id}`);
const updateShop = (id, data) =>
  api.post(`/shops/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const getCities = () => api.get(`/cities`);
const changeCityStatus = (id) => api.post(`/cities/${id}/change_status`);
const getCityById = (id) => api.get(`/cities/${id}`);
const deleteCity = (id) => api.delete(`/cities/${id}`);
const updateCity = (id, data) => api.put(`/cities/${id}`, data);
const postCity = (data) => api.post(`/cities`, data);

const getDistricts = () => api.get(`/districts`);
const changeDistrictStatus = (id) => api.post(`/districts/${id}/change_status`);
const getDistrictById = (id) => api.get(`/districts/${id}`);
const deleteDistrict = (id) => api.delete(`/districts/${id}`);
const updateDistrict = (id, data) => api.put(`/districts/${id}`, data);
const postDistrict = (data) => api.post(`/districts`, data);

const getCurrencies = () => api.get(`/currencies`);
const changeCurrencyStatus = (id) => api.post(`/currencies/${id}/change_status`);
const getCurrencyById = (id) => api.get(`/currencies/${id}`);
const deleteCurrency = (id) => api.delete(`/currencies/${id}`);
const updateCurrency = (id, data) => api.put(`/currencies/${id}`, data);
const postCurrency = (data) => api.post(`/currencies`, data);

const getActiveVendors = () => api.get(`/public/vendors/active`);

const getProductsByVendorId = (id) => api.get(`/public/${id}/products`);

const getCategoriesByVendorId = (id) => api.get(`/public/${id}/categories`);

const getActiveShopCategories = () => api.get(`/public/shop-categories/active`);

const getSingleProduct = (id) => api.get(`/public/product/${id}`);

const getMultiProducts = (ids) => api.post('/products/by-ids', { ids });
const getMultiProductChoices = (ids) => api.post('/products/choices/by-ids', { ids });

const apis = {
  getProductCategories,
  deleteProductCategory,
  changeProductCategoryStatus,
  getProductCategoryById,
  postProductCategory,
  updateProductCategory,

  getProductSubCategories,
  deleteProductSubCategory,
  changeProductSubCategoryStatus,
  getProductSubCategoryById,
  updateProductSubCategory,
  postProductSubCategory,

  getShopCategories,
  deleteShopCategory,
  changeShopCategoryStatus,
  getShopCategoryById,
  updateShopCategory,
  postShopCategory,

  login,
  getVendors,
  deleteVendor,
  changeVendorStatus,
  getVendorById,
  updateVendor,
  postVendor,
  getVendorProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  changeProductStatus,
  postProduct,
  getShopByVendorId,
  updateShop,

  getCities,
  changeCityStatus,
  getCityById,
  deleteCity,
  updateCity,
  postCity,

  getDistricts,
  changeDistrictStatus,
  getDistrictById,
  deleteDistrict,
  updateDistrict,
  postDistrict,

  getCurrencies,
  changeCurrencyStatus,
  getCurrencyById,
  deleteCurrency,
  updateCurrency,
  postCurrency,

  getActiveVendors,

  getProductsByVendorId,

  getCategoriesByVendorId,

  getActiveShopCategories,

  getSingleProduct,

  getMultiProductChoices,
  getMultiProducts,
};

export default apis;

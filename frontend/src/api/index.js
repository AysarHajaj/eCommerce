import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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
      navigate('/');
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
};

export default apis;

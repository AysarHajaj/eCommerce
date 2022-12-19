import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

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
  (error) => {
    return Promise.reject(error);
  }
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
  }
);


const getCategories = () => api.get("/categories");
const deleteCategory = (id) => api.delete(`/categories/${id}`);

const getSubCategories = () => api.get("/sub_categories");
const deleteSubCategory = (id) => api.delete(`/sub_categories/${id}`);
const getChildCategories = () => api.get("/child_categories");
const deleteChildCategory = (id) => api.delete(`/child_categories/${id}`);
const changeCategoryStatus = (id) =>
  api.post(`/categories/${id}/change_status`);
const changeSubCategoryStatus = (id) =>
  api.post(`/sub_categories/${id}/change_status`);
const changeChildCategoryStatus = (id) =>
  api.post(`/child_categories/${id}/change_status`);
const getCategoryById = (id) => api.get(`/categories/${id}`);
const updateCategory = (id, data) =>
  api.post(`/categories/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
const postCategory = (data) =>
  api.post(`/categories`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const getSubCategoryById = (id) => api.get(`/sub_categories/${id}`);
const updateSubCategory = (id, data) => api.put(`/sub_categories/${id}`, data);
const postSubCategory = (data) => api.post(`/sub_categories`, data);

const getChildCategoryById = (id) => api.get(`/child_categories/${id}`);
const updateChildCategory = (id, data) =>
  api.put(`/child_categories/${id}`, data);
const postChildCategory = (data) => api.post(`/child_categories`, data);

const getVendors = () => api.get("/vendors");
const deleteVendor = (id) => api.delete(`/vendors/${id}`);
const changeVendorStatus = (id) => api.post(`/vendors/${id}/change_status`);
const getVendorById = (id) => api.get(`/vendors/${id}`);
const updateVendor = (id, data) =>
  api.post(`/vendors/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
const postVendor = (data) =>
  api.post(`/vendors`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const getProducts = () => api.get("/products");
const getVendorProducts = (id) => api.get(`/products/vendor/${id}`);
const changeProductStatus = (id) => api.post(`/products/${id}/change_status`);
const getProductById = (id) => api.get(`/products/${id}`);
const deleteProduct = (id) => api.delete(`/products/${id}`);
const updateProduct = (id, data) =>
  api.post(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
const postProduct = (data) =>
  api.post(`/products`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
const login = (data) => api.post(`/login`, data);

const getShopByVendorId = (id) => api.get(`/shops/vendor/${id}`);
const updateShop = (id, data) =>
  api.post(`/shops/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const apis = {
  getCategories,
  deleteCategory,
  getSubCategories,
  deleteSubCategory,
  getChildCategories,
  deleteChildCategory,
  changeCategoryStatus,
  changeSubCategoryStatus,
  changeChildCategoryStatus,
  getCategoryById,
  updateCategory,
  postCategory,
  login,
  getChildCategoryById,
  updateChildCategory,
  postChildCategory,
  getSubCategoryById,
  updateSubCategory,
  postSubCategory,
  getVendors,
  deleteVendor,
  changeVendorStatus,
  getVendorById,
  updateVendor,
  postVendor,
  getProducts,
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

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

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

const login = (data) => api.post(`/login`, data);

export default {
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
};

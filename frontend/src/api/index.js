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

export default {
  getCategories,
  deleteCategory,
  getSubCategories,
  deleteSubCategory,
  getChildCategories,
  deleteChildCategory,
  changeCategoryStatus,
};

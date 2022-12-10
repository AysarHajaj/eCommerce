import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const getCategories = () => api.get("/categories");
const deleteCategory = (id) => api.delete(`/categories/${id}`);

export default {
  getCategories,
  deleteCategory,
};

import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:3001/student",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchStudents = async ({ page = 1, search = "" }) => {
  const { data } = await API.get(`?page=${page}&search=${search}`);
  return data;
};

export const addStudent = async (student) => {
  const { data } = await API.post("/", student);
  return data;
};

export const updateStudent = async ({ id, payload }) => {
  const { data } = await API.put(`/${id}`, payload);
  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};

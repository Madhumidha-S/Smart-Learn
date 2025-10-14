import axios from "axios";
import Cookies from "js-cookie";

const courseApi = axios.create({
  baseURL: "http://localhost:3001/course",
  withCredentials: true,
});

courseApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default courseApi;

import axios from "axios";
import Cookies from "js-cookie";

const userApi = axios.create({
  baseURL: "http://localhost:3000/user",
  withCredentials: true,
});

userApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userApi;

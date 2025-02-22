import axios from "axios";
import getCookie from "@/lib/getCookie";

const api = axios.create({
  baseURL: "https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the token dynamically
api.interceptors.request.use(async (config) => {
  const token = await getCookie("accessToken"); // Get token from server cookies

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

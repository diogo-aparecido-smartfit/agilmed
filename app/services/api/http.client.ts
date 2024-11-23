import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://192.168.100.37:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Erro na requisição:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use((config) => {
  const token = "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;

import axios from "axios";

const chatClient = axios.create({
  baseURL: "https://chat.botpress.cloud/9a7f2f76-2d7c-4efd-b142-e9036d6e4295",
  headers: {
    "Content-Type": "application/json",
  },
});

chatClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Erro na requisição:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

chatClient.interceptors.request.use((config) => {
  const token = "";
  if (token) {
    config.headers.set("x-user-key", token);
  }
  return config;
});

export default chatClient;

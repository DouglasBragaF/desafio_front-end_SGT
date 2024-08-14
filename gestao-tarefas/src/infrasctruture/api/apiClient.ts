import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5051/api",
  headers: {
    "Content-type": "application/json",
  },
});


export default apiClient;
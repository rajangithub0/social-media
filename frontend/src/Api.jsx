import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://social-media-backend-8h5q.onrender.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default API;

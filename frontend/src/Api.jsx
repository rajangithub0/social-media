import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-backend-8h5q.onrender.com",
});

export default API;

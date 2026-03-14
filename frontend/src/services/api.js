import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-record-system.onrender.com"
});

export default API;
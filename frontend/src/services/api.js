import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-record-system.onrender.com/api/patients"
  
});

export default API;
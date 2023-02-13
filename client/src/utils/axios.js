import axios from "axios";

const instance = axios.create({
  baseURL: "http://64.227.164.205:5000/",
  timeout: 1000,
  headers: { "Content-type": "application/json" },
});

export default instance;

import axios from "axios";

const api = axios.create({
    baseURL: 'https://estudosapi.azurewebsites.net/',
    // baseURL: "http://localhost:5206",
});

export default api;
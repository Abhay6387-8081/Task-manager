import axios from 'axios';

const axiosClient = axios.create({
    baseUrl:import.meta.env.VITE_API_BASE||'http://localhost:5000/api',
    headers:{'Content-Type':'application/json'},
    withCredentials:true,
});

export default axiosClient;
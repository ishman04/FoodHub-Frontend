import  axios  from "axios";

const axiosInstance = axios.create() // create axios instance

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL // set base url

axiosInstance.defaults.withCredentials = true // allows to send cookies with request

export default axiosInstance;
import axios from 'axios'

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use((response)=>{
    console.log(response)
});


export default axiosInstance;
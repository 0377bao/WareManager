import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000' // mau base-url
})

export default axiosInstance
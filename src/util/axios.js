import axios from 'axios'

const axiosIns = axios.create({})
if (process.env.NODE_ENV == 'development') {
    axiosIns.defaults.baseURL = 'http://120.79.28.227:9703'
} else if (process.env.NODE_ENV === 'testing') {
    axiosIns.defaults.baseURL = 'http://120.79.28.227:9703'
} else if (process.env.NODE_ENV == 'production') {
    axiosIns.defaults.baseURL = 'http://120.79.13.151:9703'
}

export default axiosIns

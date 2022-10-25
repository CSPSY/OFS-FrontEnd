import axios from 'axios'

const API = axios.create({
    baseURL: ''
})

// 请求前检测是否有 token，并携带
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token'))
        req.headers.Authorization = localStorage.getItem('token');
    return req;
})

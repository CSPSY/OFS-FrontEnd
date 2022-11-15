import axios from 'axios'

const API = axios.create({
    // 本地 mock URL
    baseURL: 'http://127.0.0.1:4523/m1/1925136-0-default'
})

// 请求前检测是否有 token，并携带
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('token'))
//         req.headers.Authorization = localStorage.getItem('token');
//     return req;
// })

const sendLoginInfo = (postObj) => {
    return API.post('/usr/login', postObj);
}

export { sendLoginInfo };
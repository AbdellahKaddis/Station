import axios from 'axios'
import Cookies from 'js-cookie';
const axiosClient = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL + '/api',
    withCredentials : true,
    withXSRFToken : true,
});



// axiosClient.interceptors.request.use((config) => {
//     const csrfToken = Cookies.get('XSRF-TOKEN'); // Read CSRF token from cookies
//     if (csrfToken) {
//         config.headers['X-XSRF-TOKEN'] = csrfToken; // Attach CSRF token to headers
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });
axiosClient.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    // console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  
}, function(error) {
    return Promise.reject(error);
});

export default axiosClient ;
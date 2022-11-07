import leoAxios from 'axios'

leoAxios.interceptors.request.use(config => {

    config.headers.token = localStorage.getItem("token");
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
  });

export default leoAxios;

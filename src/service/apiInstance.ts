import axios from "axios"
export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if(error.status === 401) {
        localStorage.removeItem("accessToken");
        if(location.pathname !== "/login")
          window.location.href = "/login";
    }
    return Promise.reject(error);
  });
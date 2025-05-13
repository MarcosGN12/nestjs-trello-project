import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const axiosClient = (() => {
    return axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
    });
})();

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use((response) => {
    if (response.status === 401) {
        localStorage.removeItem("token");
    }

    return response;
});

export const request = async (options: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => {
        return response.data;
    };

    const onError = function (error: AxiosError) {
        return Promise.reject({
            message: error.message,
            code: error.code,
            response: error.response,
        });
    };

    return axiosClient(options).then(onSuccess).catch(onError);
};
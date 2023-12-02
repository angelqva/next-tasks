import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
const baseURL = process.env.DJANGO_BASE_URL ?? "http://localhost:8000/api";
const djangoApi = axios.create({
    baseURL,
});
djangoApi.interceptors.request.use(
	(request: InternalAxiosRequestConfig) => {
        request.headers["Content-Type"] = 'application/json'
        request.withCredentials = true
		return request;
	},
	(error: AxiosError) => Promise.reject(error),
);
export const apiFetch = (isPrivate:boolean = false, url:string, method:"get"| "post" | "delete" | "put", data:any={} )=>{
    return new Promise<AxiosResponse<any, any>>((resolve, reject)=>{
        const catchRetry = (errorRetry:any)=>{
            const status = Number(errorRetry.response?.status ?? 0)
            if(!isNaN(status) && status === 401){                
                djangoApi.post('/token/refresh/')
                    .then(()=>{
                        if(method === "get"){
                            djangoApi.get(url,{ params: data})
                                .then(response=>resolve(response))
                                .catch(error=>reject(error))
                        }
                        if(method === "post"){
                            djangoApi.post(url,data)
                                .then(response=>resolve(response))
                                .catch(error=>reject(error))
                        }
                        if(method === "put"){
                            djangoApi.put(url,data)
                                .then(response=>resolve(response))
                                .catch(error=>reject(error))
                        }
                        if(method === "delete"){
                            djangoApi.delete(url,data)
                                .then(response=>resolve(response))
                                .catch(error=>reject(error))
                        }
                    }).catch(()=>{
                        reject(errorRetry)
                    })
            }else{
                reject(errorRetry)
            }
            
        }
        if(isPrivate){
            if(method === "get"){
                djangoApi.get(url,{ params: data})
                    .then(response=>resolve(response))
                    .catch(catchRetry)
            }
            if(method === "post"){
                djangoApi.post(url,data)
                    .then(response=>resolve(response))
                    .catch(catchRetry)
            }
            if(method === "put"){
                djangoApi.put(url,data)
                    .then(response=>resolve(response))
                    .catch(catchRetry)
            }
            if(method === "delete"){
                djangoApi.delete(url,data)
                    .then(response=>resolve(response))
                    .catch(catchRetry)
            }
        }else{
            if(method === "get"){
                djangoApi.get(url,{ params: data})
                    .then(response=>resolve(response))
                    .catch(error=>reject(error))
            }
            if(method === "post"){
                djangoApi.post(url,data)
                    .then(response=>resolve(response))
                    .catch(error=>reject(error))
            }
            if(method === "put"){
                djangoApi.put(url,data)
                    .then(response=>resolve(response))
                    .catch(error=>reject(error))
            }
            if(method === "delete"){
                djangoApi.delete(url,data)
                    .then(response=>resolve(response))
                    .catch(error=>reject(error))
            }
        }
    })
    
}
// import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";
// const baseURL = process.env.DJANGO_BASE_URL ?? "http://localhost:8000/api";
// const djangoApi = axios.create({
//     baseURL,
// });
// const djangoApiPrivate = axios.create({
// 	baseURL,
// });
// djangoApi.interceptors.request.use(
// 	(request: InternalAxiosRequestConfig) => {
//         request.withCredentials = true
// 		return request;
// 	},
// 	(error: AxiosError) => Promise.reject(error),
// );
// async function refreshToken() {
//     try {
//         const response = await djangoApi.post('/token/refresh/')
//         const isAuthenticated = response.status === 200
//         return isAuthenticated
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }

// djangoApiPrivate.interceptors.request.use(
// 	(request: InternalAxiosRequestConfig) => {
//         request.withCredentials = true
// 		return request;
// 	},
// 	(error: AxiosError) => Promise.reject(error),
// );
// let isRefreshing = false;
// let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// djangoApiPrivate.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (originalRequest && error.response?.status === 401) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           // Attempt to refresh the token
//           const refreshResponse = await djangoApiPrivate.post('/token/refresh/');
//           if (refreshResponse.status === 200) {
//             // Token refresh successful, retry the original request
//             originalRequest.headers['Authorization'] = `JWT ${refreshResponse.data.access}`;
//             const retryOriginalRequest = await axios(originalRequest);
//             isRefreshing = false;

//             // Resolve the original request with the new access token
//             return Promise.resolve(retryOriginalRequest);
//           }
//         } catch (refreshError) {
//           console.log('Error refreshing token:', refreshError);
//         } finally {
//           isRefreshing = false;
//         }
//       } else {
//         // If another request is already refreshing the token, enqueue the original request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         });
//       }
//     }

//     // Reject the original request if the token refresh fails
//     return Promise.reject(error);
//   }
// );

// // Intercept successful responses and dequeue any enqueued requests
// djangoApiPrivate.interceptors.response.use(
//   (response) => {
//     if (failedQueue.length > 0) {
//       const originalRequest = failedQueue.shift() as AxiosRequestConfig<any>;
//       // Retry the dequeued request with the updated token
//       return axios(originalRequest);
//     }
//     return response;
//   },
//   (error) => Promise.reject(error)
// );

// export const axiosDjango = djangoApi
// export const axiosDjangoPrivate = djangoApiPrivate



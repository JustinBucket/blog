import axios, { AxiosResponse } from 'axios';
import { Post } from '../models/post';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/';

axios.interceptors.response.use(async response => {
    try {
        await sleep(500);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Posts = {
    list: () => requests.get<Post[]>('/post'),
    types: () => requests.get<string[]>('/post/type'),
    details: (id: string) => requests.get<Post>(`/post/${id}`),
    create: (post: Post) => axios.post('/post', post),
    update: (post: Post) => axios.put(`/post/${post.id}`, post),
    delete: (id: string) => axios.delete(`/post/${id}`)
}

const agent = {
    Posts
}

export default agent;
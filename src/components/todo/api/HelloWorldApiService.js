import axios from 'axios'

const apiClient = axios.create(
  {
    baseURL: 'http://localhost',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  }
);

export const retriveHelloWorldBean = 
        () => apiClient.get('/hello-world-bean');

export const retriveHelloWorldPathVariable = 
        (username) => apiClient.get(`/hello-world/path-variable/${username}`);

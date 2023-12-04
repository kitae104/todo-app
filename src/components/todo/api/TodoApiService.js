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

export const retriveAllTodosForUsername = 
        (username) => apiClient.get(`/users/${username}/todos`);

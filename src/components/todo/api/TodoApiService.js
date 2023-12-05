import axios from 'axios'

const apiClient = axios.create(
  {
    baseURL: 'http://localhost',    
  }
);

// 해당 유저 이름에 해당하는 모든 todo를 가져오기
export const retriveAllTodoForUsernameApi = 
        (username) => apiClient.get(`/users/${username}/todos`);

// 해당 유저 이름에 해당하는 todo id에 해당하는 todo를 삭제하기
export const deleteTodoApi = 
        (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const retriveTodoApi = 
        (username, id) => apiClient.get(`/users/${username}/todos/${id}`);
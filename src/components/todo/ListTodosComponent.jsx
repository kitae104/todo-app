import React, { useState } from 'react';
import { useEffect } from 'react';
import { retriveAllTodoForUsernameApi, deleteTodoApi } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';

function ListTodosComponent() {
  
  const authContext = useAuth(); // useAuth() 훅을 사용하여, AuthContext 객체를 가져온다.
  const username = authContext.username; // AuthContext 객체에서 사용자 이름을 가져온다.

  const navigate = useNavigate(); // useNavigate() 훅을 사용하여, 네비게이션 객체를 가져온다.

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  
  useEffect(
    () => refreshTodos(), []      // [] 한번만 실행
  )

  function refreshTodos() {
    retriveAllTodoForUsernameApi(username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('cleanup'));
  }

  const deleteTodo = (id) => {
    console.log('delete todo ' + id);
    deleteTodoApi(username, id)
      .then(
        // 1. 메시지 보이기 
        // 2. 목록 갱신 
        () => {          
          setMessage(`Delete of todo with id = ${id} Successful`);
          refreshTodos();
        }        
      )
      .catch((error) => console.log(error))
      .finally(() => console.log('cleanup'));
  }

  const updateTodo = (id) => {
    console.log('update todo ' + id);    
    navigate(`/todo/${id}`);            // TodoComponent로 이동
  }

  const addNewTodo = () => {
    navigate(`/todo/-1`);               // TodoComponent로 이동
  }

  const formatDate = (dateString) => {
    const dateArray = dateString.split(',').map(Number);
    const formattedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    // Intl.DateTimeFormat을 사용하여 "yyyy-MM-dd" 형식으로 변환
    const outputDateFormat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return outputDateFormat.format(formattedDate);
  };

  return(
    <div className="container">
      <h1>할 일 목록(Todo List)</h1>
      {message && <div className='alert alert-warning'>{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>              
              <th>Description</th>
              <th>Is Done?</th>
              <th>TargetDate</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
          {
            todos.map(
              todo => (
                <tr key={todo.id}>                  
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td><button className="btn btn-warning" 
                    onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </td>
                  <td><button className="btn btn-success" 
                    onClick={() => updateTodo(todo.id)}>Update</button>
                  </td>
                </tr>
              )
            )
          }  
            
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5"
        onClick={() => addNewTodo()}>Add New Todo</div>
    </div>
  );
}

export default ListTodosComponent;
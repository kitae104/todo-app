import React, { useState } from 'react';
import { useEffect } from 'react';
import { retriveAllTodoForUsernameApi, deleteTodoApi } from './api/TodoApiService';

function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  
  useEffect(
    () => refreshTodos(), []      // [] 한번만 실행
  )

  function refreshTodos() {
    retriveAllTodoForUsernameApi('kitae')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('cleanup'));
  }

  const deleteTodo = (id) => {
    console.log('delete todo' + id);
    deleteTodoApi('kitae', id)
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
                </tr>
              )
            )
          }  
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodosComponent;
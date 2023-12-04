import React, { useState } from 'react';
import { useEffect } from 'react';
import { retriveAllTodosForUsername } from './api/TodoApiService';

function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  
  useEffect(
    () => refreshTodos(), []      // [] 한번만 실행
  )

  function refreshTodos() {
    retriveAllTodosForUsername('kitae')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('cleanup'));
  }

  return(
    <div className="container">
      <h1>할 일 목록(Todo List)</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Is Done?</th>
              <th>TargetDate</th>
            </tr>
          </thead>
          <tbody>
          {
            todos.map(
              todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
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
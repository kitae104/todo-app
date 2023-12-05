import { useParams } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import { retriveTodoApi } from './api/TodoApiService';
import { useEffect, useState } from 'react';

export default function TodoComponent() {
  const {id} = useParams();               // URL 경로에서 파라미터 값을 가져온다.

  const [description, setDescription] = useState('')  // description 상태값을 정의한다.

  const authContext = useAuth();          // useAuth() 훅을 사용하여, AuthContext 객체를 가져온다.
  const username = authContext.username;  // AuthContext 객체에서 사용자 이름을 가져온다.

  useEffect(
    () => retriveTodos(), [id]            // [id] id가 변경될 때마다 실행 
  );

  function retriveTodos(){
    retriveTodoApi(username, id)        // id에 해당하는 할 일 목록을 가져온다.
    .then(response => {
      setDescription(response.data.description);  // description 상태값을 변경한다.
    })
    .catch(error => console.log(error))    
  }

  return (
    <div className="container">
      <h1>할 일 목록 상세</h1>
      <div>
        description : {description}
      </div>
    </div>
  );
}
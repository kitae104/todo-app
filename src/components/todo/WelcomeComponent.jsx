import { Link, useParams} from 'react-router-dom'; 
import { useState } from 'react';
import { retriveHelloWorldPathVariable } from './api/HelloWorldApiService';

function WelcomeComponent() {
  // useParams() 훅을 사용하여, URL 경로에 포함된 파라미터를 추출한다.
  const { username } = useParams(); 

  const [message, setMessage] = useState(null) // [1]

  function callHelloWorldRestApi() {
    console.log("called");    

    retriveHelloWorldPathVariable('kitae')
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('cleanup'));
  }

  function successfulResponse(response) {
    console.log(response)
    setMessage(response.data.message)
  }

  function errorResponse(error) {
    console.log(error)
  }
  
  return (
    <div className="WelcomeComponent">
      <h1>Welcome  {username}'s Todo List Page</h1>
      <div className="Welcome">
        당신의 할 일을 관리하세요. <Link to="/todos">여기</Link>를 클릭하세요.
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World Rest API</button>
      </div>
      <div className='text-info'>{message}</div>
    </div>
  );
}

export default WelcomeComponent;
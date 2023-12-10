import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {

  // 사용자 이름과 패스워드를 상태로 관리한다.
  const [username, setUsername] = useState("") // 사용자 이름 초기값 설정
  const [password, setPassword] = useState("1111")          // 사용자 패스워드 초기값 설정
  const [showErrorMessage, setShowErrorMessage] = useState(false) // 에러 메시지 표시 여부 상태 관리

  const navigate = useNavigate();

  const authContext = useAuth(); // useAuth() 훅을 사용하여, AuthContext 객체를 가져온다.

  // 사용자 이름이 변경되면, setUsername을 호출하여 상태를 변경한다.
  const handleUsernameChange = (event) => {
    //console.log(event.target.value);
    setUsername(event.target.value);
  }

  // 사용자 패스워드가 변경되면, setPassword를 호출하여 상태를 변경.
  const handlePasswordChange = (event) => {
    //console.log(event.target.value);
    setPassword(event.target.value);
  }

  // 로그인 버튼을 눌른 후 로그인 응답이 올 때까지 기다렸다고 이동함  
  async function handleSubmit() { 
    if(await authContext.login(username, password)) {           
      navigate(`/welcome/${username}`);   // URL 경로에 파라미터를 포함하여 이동
    } else {
      setShowErrorMessage(true);
    }
  }
  
  return (
    <div className="Login">
      <h1>Time to Login!</h1>
      {showErrorMessage && <div className="errorMessage">Login Failed</div>}      
      <div className="LoginForm">
        <div>
          <label>User Name</label>
          {/* 사용자 이름 변경 처리 - onChange 에벤트 처리*/}
          <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          <label>Password</label>
          {/* 사용자 패스워드 변경 처리 */}
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
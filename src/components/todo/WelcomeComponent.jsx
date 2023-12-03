import { Link, useParams } from 'react-router-dom';

function WelcomeComponent() {
  // useParams() 훅을 사용하여, URL 경로에 포함된 파라미터를 추출한다.
  const { username } = useParams(); 

  return (
    <div className="WelcomeComponent">
      <h1>Welcome  {username}'s Todo List Page</h1>
      <div className="Welcome">
        당신의 할 일을 관리하세요. <Link to="/todos">여기</Link>를 클릭하세요.
      </div>
    </div>
  );
}

export default WelcomeComponent;
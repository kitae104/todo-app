import "./TodoApp.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import AuthProvider, {useAuth} from "./security/AuthContext";


const AuthenticatedRoute = ({ children }) => { 
  const authContext = useAuth(); // useAuth() 훅을 사용하여, AuthContext 객체를 가져온다.
  if(authContext.isAuthenticated) { // 인증이 되지 않은 경우, 로그인 페이지로 이동한다.
    return children;
  }
  return <Navigate to="/" />  
};    

function TodoApp() {
  return (
    <div className="TodoApp">    
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/welcome/:username" element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            } />
            <Route path="/todos" element={
              <AuthenticatedRoute>
                <ListTodosComponent />
              </AuthenticatedRoute>
            } />
            <Route path="/logout" element={
              <AuthenticatedRoute>
                <LogoutComponent />
                </AuthenticatedRoute>
            } />
            
            {/* 경로가 없는 경우 처리 - 오류 처리 */}
            <Route path="/*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>        
      </AuthProvider>
    </div>
  );
}

export default TodoApp;

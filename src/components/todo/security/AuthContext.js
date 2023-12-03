import { createContext, useState, useContext } from 'react';

// 1. 컨텍스트 생성 
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2. 생성된 컨텍스트를 다른 구성 요소와 공유하기
export default function AuthProvider({children}) {
  // 3. 컨텍스트에 어떤 상태 전달
  // 인증 여부 확인 
  const [isAuthenticated, setAuthenticated] = useState(false);

  function login(username, password) {
    if(username === "kitae" && password === "1111") {
      setAuthenticated(true);
      return true;
    } else {
      setAuthenticated(false);
      return false;    
    }
  }

  function logout(){
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}> 
      {children}
    </AuthContext.Provider>
  )
}
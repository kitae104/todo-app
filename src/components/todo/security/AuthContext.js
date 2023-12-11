import { createContext, useState, useContext } from 'react';
import { executeJwtAuthenticationService } from './../api/AuthnticationApiService';
import { apiClient } from './../api/ApiClient';

// 1. 컨텍스트 생성 
export const AuthContext = createContext();             // 컨텍스트 생성 

export const useAuth = () => useContext(AuthContext);   // 인증 내용물 사용 함수 

// 2. 생성된 컨텍스트를 다른 구성 요소와 공유하기
export default function AuthProvider({children}) {
  // 3. 컨텍스트에 어떤 상태 전달
  // 인증 여부 확인 
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // async function login(username, password) {
  //   const baToken = 'Basic ' + window.btoa(username + ":" + password);
    
  //   try{
  //     const response = await executeBasicAuthenticationService(baToken);
  //     if(response.status === 200) {
  //       setAuthenticated(true);       // 인증 여부 false 설정 
  //       setUsername(username);        // 사용자 이름
  //       setToken(baToken);            // 토큰 설정 

  //       apiClient.interceptors.request.use(
  //         (config) =>{
  //           console.log('intercepting');
  //           config.headers.Authorization=baToken;
  //           return config;
  //         }
  //       );

  //       return true;                  // 인증 성공
  //     } else {
  //       logout();                     // 로그 아웃 수행 
  //       return false;                 // 인증 실패
  //     }
  //   } catch(error) {
  //     logout();                     // 로그 아웃 수행 
  //     return false;                 // 인증 실패
  //   }

  // }

  async function login(username, password) {
    
    try{
      const response = await executeJwtAuthenticationService(username, password);

      if(response.status === 200) {
        const jwtToken = 'Bearer ' + response.data.token;     // 토큰 생성
        setAuthenticated(true);       // 인증 여부 false 설정 
        setUsername(username);        // 사용자 이름
        setToken(jwtToken);            // 토큰 설정 

        apiClient.interceptors.request.use(
          (config) =>{
            console.log('intercepting');
            config.headers.Authorization=jwtToken;
            return config;
          }
        );

        return true;                  // 인증 성공
      } else {
        logout();                     // 로그 아웃 수행 
        return false;                 // 인증 실패
      }
    } catch(error) {
      logout();                     // 로그 아웃 수행 
      return false;                 // 인증 실패
    }

  }

  function logout(){
    setAuthenticated(false);    // 인증 false 설정 
    setToken(null);             // 토큰 지우기
    setUsername(null);          // 사용자 이름 지우기 
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}> 
      {children}
    </AuthContext.Provider>
  )
}
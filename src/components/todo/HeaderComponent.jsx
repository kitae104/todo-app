import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function HeaderComponent() {
  
  const authContext = useAuth(); // useAuth() 훅을 사용하여, AuthContext 객체를 가져온다.
  const isAuthenticated = authContext.isAuthenticated;  // 인증 정보 받아오기 

  const logout = () => {
    authContext.logout();
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="/">
              Kitae's Home
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item fs-5">
                {isAuthenticated && 
                  <Link className="nav-link" to="/welcome/kitae">Home</Link>
                }
                </li>
                <li className="nav-item fs-5">
                {isAuthenticated && 
                  <Link className="nav-link" to="/todos">
                    Todos
                  </Link>
                }
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
              {!isAuthenticated && 
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              }
              </li>
              <li className="nav-item fs-5">
              {isAuthenticated &&
                <Link className="nav-link" to="/logout" onClick={logout}>
                  Logout
                </Link>
              }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;

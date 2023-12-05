import React, { useContext } from 'react';
import { AuthContext } from './security/AuthContext';

function FooterComponent() {

  //const authContext = useContext(AuthContext);
  //console.log(`Footer component - ${authContext.number}`);

  return(
    <footer className="footer">
      <div className="container">
        <span className="text-muted">All Rights Reserved 2023 @kimkitae</span>       
      </div>
    </footer>
  );
}

export default FooterComponent;
import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBarMobile from './navBar/navBarMobile' 
import NavBarDesktop from './navBar/navBarDesktop';
import './index.css';
import Loggin from './loggin/loggin';

function Login() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    useEffect(() => {
        
        function handleResize() {
        setIsMobile(window.innerWidth < 600);
        }
        
        window.addEventListener('resize', handleResize);
        
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
      <div className="MaestrosContainer" >
        <div className='MaestrosContent'>
                <Routes>
                    
                    <Route path="login" element={<Loggin isMobile={isMobile}/>} />
                </Routes>
        </div>
        <div className='MaestrosNav'>
        {!isMobile && <NavBarDesktop/>}
        </div>
        {isMobile && <NavBarMobile />}
      </div>
  );
}

export default Login;
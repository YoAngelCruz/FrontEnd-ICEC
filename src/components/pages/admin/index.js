import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBarMobile from './navBar/navBarMobile';
import NavBarDesktop from './navBar/navBarDesktop';
import ByAprofesores from './bya/bya_prof';
import Home from './home/home';
import './index.css';

function Admin() {
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
        <div className="AdminContainer">
            <div className='AdminContent'>
                <Routes>
                    <Route path="/home" element={<Home isMobile={isMobile} />} />
                    <Route path="/ByA" element={<ByAprofesores isMobile={isMobile} />} />
                </Routes>
            </div>
            <div className='AdminNav'>
                {!isMobile && <NavBarDesktop />}
            </div>
            {isMobile && <NavBarMobile />}
        </div>
    );
}

export default Admin;

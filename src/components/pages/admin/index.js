import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBarMobile from './navBar/navBarMobile' 
import NavBarDesktop from './navBar/navBarDesktop';
import Home from './home/home';
import Grupos from './grupos/grupos';
import './index.css';
function Admin() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    useEffect(() => {
        // Función para actualizar el estado de isMobile
        function handleResize() {
        setIsMobile(window.innerWidth < 600);
        }
        // Agregar un evento de escucha para el cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);
        // Retirar el evento de escucha cuando el componente se desmonte
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
      <div className="AdminContainer" >
        <div className='AdminContent'>
                <Routes>
                    <Route path="home" element={<Home isMobile={isMobile}/>} />
                    <Route path="grupos" element={<Grupos isMobile={isMobile}/>} />
                </Routes>
        </div>
        <div className='AdminNav'>
        {!isMobile && <NavBarDesktop/>}
        </div>
        {isMobile && <NavBarMobile />}
      </div>
  );
}

export default Admin;
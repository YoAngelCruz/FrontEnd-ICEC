import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBarMobile from '../../common/navBarMobile';
import NavBarDesktop from '../../common/navBarDesktop';
import Home from './home/home';
import './index.css';
function Maestros() {
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
      <div className="MaestrosContainer" >
        <div className='MaestrosContent'>
                <Routes>
                    <Route path="home" element={<Home isMobile={isMobile}/>} />
                </Routes>
        </div>
        <div className='MaestrosNav'>
        {!isMobile && <NavBarDesktop/>}
        </div>
        {isMobile && <NavBarMobile />}
      </div>
  );
}

export default Maestros;
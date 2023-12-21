import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBarMobile from './navBar/navBarMobile' 
import NavBarDesktop from './navBar/navBarDesktop';
import Home from './home/home';
import Calendario from '../../common/calendario';
import Usuario from '../../common/usuario';
import Grupos from './grupos/grupos';
import Estudiantes from './estudiantes/estudiantes';
import Maestros from './maestros/maestros';
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
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="home" element={<Home isMobile={isMobile}/>} />
                    <Route path="calendario" element={<Calendario isMobile={isMobile}/>} />
                    <Route path="grupos" element={<Grupos isMobile={isMobile}/>} />
                    <Route path="estudiantes" element={<Estudiantes isMobile={isMobile}/>} />
                    <Route path="maestros" element={<Maestros isMobile={isMobile}/>} />
                    <Route path="usuario" element={<Usuario isMobile={isMobile}/>} />
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
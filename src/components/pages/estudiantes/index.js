import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBarMobile from './navBar/navBarMobile' 
import NavBarDesktop from './navBar/navBarDesktop';
import Home from './home'
import Calificaciones from './calificaciones';
import Calendario from '../../common/calendario';
import Modulos from './modulos';
import Avance from './avance';
import './index.css';

function Estudiantes() {
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
      <div className="EstudiantesContainer" >
        <div className='EstudiantesContent'>
                <Routes>
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="home" element={<Home isMobile={isMobile}/>} />
                    <Route path="calendario" element={<Calendario isMobile={isMobile}/>} />
                    <Route path="calificaciones" element={<Calificaciones isMobile={isMobile}/>} />
                    <Route path="modulos" element={<Modulos isMobile={isMobile}/>} />
                    <Route path="avance" element={<Avance isMobile={isMobile}/>} />
                </Routes>
        </div>
        <div className='EstudiantesNav'>
        {!isMobile && <NavBarDesktop/>}
        </div>
        {isMobile && <NavBarMobile />}
      </div>
  );
}

export default Estudiantes;
//rama  develop estudiantes
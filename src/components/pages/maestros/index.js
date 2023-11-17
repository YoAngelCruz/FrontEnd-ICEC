import React, { useState, useEffect } from 'react';
import { Routes, Route ,Navigate} from 'react-router-dom';
import NavBarMobile from './navBar/navBarMobile';
import NavBarDesktop from './navBar/navBarDesktop';
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
        <div className="MaestrosContainer">
            <div className='MaestrosContent'>
                <Routes>
                    {/* Ruta para la página Home */}
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="home" element={<Home isMobile={isMobile}/>} />
                </Routes>
            </div>
            <div className='MaestrosNav'>
                {!isMobile && <NavBarDesktop />}
            </div>
            {isMobile && <NavBarMobile />}
        </div>
    );
}

export default Maestros;

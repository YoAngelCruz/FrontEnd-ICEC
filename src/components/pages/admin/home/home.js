import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiDocumentCheck, HiBookOpen, HiAcademicCap } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './home.css';

function Home({ isMobile, isAdmin }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cursosPasados, setCursosPasados] = useState([]);
    const curP = [
        { "id": "1", "nombre": "profesor" },
        { "id": "2", "nombre": "profesor" },
        { "id": "3", "nombre": "profesor" },
        { "id": "4", "nombre": "profesor" },
        { "id": "5", "nombre": "profesor" },
        { "id": "6", "nombre": "profesor" }
    ];

    useEffect(() => {
        setCursosPasados(curP);
        // Actualizar la fecha actual cada segundo (puedes ajustar el intervalo según tus necesidades)
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Limpieza del intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);

    return (
        <div>
            {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Mi portal" />}
            <div className='homeCont'>
                {isMobile && <p className='WelcomeMsg'>{isAdmin ? 'Bienvenido Administrador' : 'Bienvenido Profesor'}</p>}
                <span className='AditionalInfo'>{formattedDate}</span>
                <div className='ModularCont'>
                    <NavLink className={isMobile ? "button bigButton usuarioButton" : "button normalButton usuarioButton"}>
                        <HiUser size={isMobile ? 50 : 55} style={isMobile ? { color: "#073cc3" } : {}} />
                        <span className="buttonTitle">Perfil</span>
                    </NavLink>
                    <NavLink className={isMobile ? "button longButton calendarioButton" : "button normalButton calendarioButton"}>
                        <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? { color: "#0cb71a" } : {}} />
                        <span className="buttonTitle">Calendario</span>
                    </NavLink>
                    {isAdmin && (
                        <NavLink className={isMobile ? "button longButton reportesButton" : "button normalButton reportesButton"}>
                            <HiDocumentCheck size={isMobile ? 30 : 55} style={isMobile ? { color: "#f0c103" } : {}} />
                            <span className="buttonTitle">Grupos</span>
                        </NavLink>
                    )}
                    
                     <NavLink className={isMobile ? "button longButton nuevoModuloButton" : "button normalButton nuevoModuloButton"}>
                      <HiAcademicCap size={isMobile ? 30 : 55} style={isMobile ? { color: "#ff7f50" } : {}} />
                       <span className="buttonTitle">Grupos</span>
                     </NavLink>
                </div>

                <span className='contSubtitle'>PROFESORES</span>
                <div className='gridCont'>
                    {cursosPasados.map((cursosObj) => (
                        <NavLink className='button normalButton' key={cursosObj.id}>
                            <HiBookOpen size={isMobile ? 35 : 55} />
                            <span className="buttonTitle">{cursosObj.nombre}</span>
                        </NavLink>
                    ))}
                </div>
                {isMobile && <div style={{ height: "64px" }}></div>}
            </div>
        </div>
    );
}

export default Home;

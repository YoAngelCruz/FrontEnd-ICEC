import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiDocumentCheck, HiBookOpen, HiAcademicCap } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './home.css';

function Home({ isMobile }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cursosPasados, setCursosPasados] = useState([]);
    const curP = [
        { "id": "1", "nombre": "ISW 701" },
        { "id": "2", "nombre": "ISW 501" },
        { "id": "3", "nombre": "ISW 301" },
        { "id": "4", "nombre": "ISW 101" },
        { "id": "5", "nombre": "ISW 702" },
        { "id": "6", "nombre": "ISW 602" }
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
                {isMobile && <p className='WelcomeMsg'>Bienvenido Profesor</p>}
                <span className='AditionalInfo'>{formattedDate}</span>
                <div className='ModularCont'>
                    <NavLink className={isMobile ? "button bigButton usuarioButton" : "button normalButton usuarioButton"}>
                        <HiUser size={isMobile ? 50 : 55} style={isMobile ? { color: "#073cc3" } : {}} />
                        <span className="buttonTitle">Profesor</span>
                    </NavLink>
                    <NavLink className={isMobile ? "button longButton calendarioButton" : "button normalButton calendarioButton"}>
                        <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? { color: "#0cb71a" } : {}} />
                        <span className="buttonTitle">Calendario</span>
                    </NavLink>
                    <NavLink className={isMobile ? "button longButton calificacionesButton" : "button normalButton calificacionesButton"}>
                        <HiDocumentCheck size={isMobile ? 30 : 55} style={isMobile ? { color: "#f0c103" } : {}} />
                        <span className="buttonTitle">Calificacion</span>
                    </NavLink>
                    <NavLink className={isMobile ? "button longButton academicButton" : "button normalButton academicButton"}>
                        <HiAcademicCap size={isMobile ? 30 : 55} style={isMobile ? { color: "#e84a5f" } : {}} />
                        <span className="buttonTitle">Académico</span>
                    </NavLink>
                </div>

                <span className='contSubtitle'>Mis Grupos</span>
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

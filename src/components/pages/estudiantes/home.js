import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiDocumentCheck,HiBookOpen, HiAcademicCap } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './home.css';

function Home({isMobile}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cursosPasados, setCursosPasados] = useState([]);
    const curP=[{"id": "1","nombre": "Nombre del modulo pasado"},{"id": "2","nombre": "Más nombres de módulos"},{"id": "3","nombre": "Otro nombre que no me acuerdo"},{"id": "4","nombre": "Pero seguramente si existen jaaj"}];
    
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
            {isMobile && <p className='WelcomeMsg'>Bienvenido</p>}
            <span className='AditionalInfo'>{formattedDate}</span>
            <div className='ModularCont'>
                <NavLink className={isMobile ? "button bigButton usuarioButton" : "button normalButton usuarioButton"}>
                    <HiUser size={isMobile ? 50 : 55} style={isMobile ? {color: "#073cc3"}: {}}/>
                    <span className="buttonTitle">Usuario</span>
                    
                </NavLink>
                <NavLink className={isMobile ? "button longButton calendarioButton": "button normalButton calendarioButton"}to='/estudiantes/calendario'>
                    <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? {color: "#0cb71a"}: {}}/>
                    <span className="buttonTitle">Calendario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton calificacionesButton": "button normalButton calificacionesButton"} to='/estudiantes/calificaciones'>
                    <HiDocumentCheck size={isMobile ? 30 : 55} style={isMobile ? {color: "#f0c103"}: {}}/>
                    <span className="buttonTitle">Calificaciones</span>
                </NavLink>
            </div>

            <span className='contSubtitle'>Mi módulo actual</span>

            <div className='simpleCont'>
                <NavLink className="button longButton currentModule">
                    <HiBookOpen size={isMobile ? 45 : 55} />
                    <div className='textContLongButton'>
                    <span className="buttonTitle" >Procesador de textos</span>
                    <span >Clic para ver detalles</span>
                    </div>
                </NavLink>
            </div>
            <span className='contSubtitle'>Mi módulos pasados</span>
            <div className='gridCont'>
                
                {cursosPasados.map((cursosObj) => (
                    <NavLink className='button normalButton'key={cursosObj.id}>
                        <HiAcademicCap size={isMobile ? 35 : 55} />
                        <span className="buttonTitle">{cursosObj.nombre}</span>
                    </NavLink>
                ))}
                
            </div>
            {isMobile && <div style={{height:"64px"}}></div>}
        </div>
    </div>
  );
}

export default Home;
//rama  develop estudiantes
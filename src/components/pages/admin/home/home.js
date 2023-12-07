import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiBookOpen, HiSquare3Stack3D } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './home.css';

function Home({isMobile}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cursosPasados, setCursosPasados] = useState([]);
    const curP=[{"id": "1","nombre": "Christian Eduardo Amaro Reyes"},{"id": "2","nombre": "Christian Eduardo Amaro Reyes"},{"id": "3","nombre": "Christian Eduardo Amaro Reyes"},{"id": "4","nombre": "Christian Eduardo Amaro Reyes"},{"id": "5","nombre": "Christian Eduardo Amaro Reyes"},];
    
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

        <div className='aHomeCont'>
            {isMobile && <p className='WelcomeMsg'>Bienvenido</p>}
            <span className='AditionalInfo'>{formattedDate}</span>
            <div className='modularCont'>

                <NavLink className={isMobile ? "button bigButton aUsuarioButton" : "button normalButton aUsuarioButton"}>
                    <HiUser size={isMobile ? 50 : 55} style={isMobile ? {color: "#073cc3"}: {}}/>
                    <span className="buttonTitle">Usuario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton aCalendarioButton": "button normalButton aCalendarioButton"}to='/admin/calendario'>
                    <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? {color: "#0cb71a"}: {}}/>
                    <span className="buttonTitle">Calendario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton aCalificacionesButton": "button normalButton aCalificacionesButton"} to='/admin/grupos'>
                    <HiSquare3Stack3D size={isMobile ? 25 : 50} style={isMobile ? {color: "#f0c103"}: {}}/>
                    <span className="buttonTitle">Grupos</span>
                </NavLink>

            </div>

            <span className='contSubtitle'>Profesores</span>
            <div className='gridCont'>
                
                {cursosPasados.map((cursosObj) => (
                    <NavLink className='button normalButton'key={cursosObj.id} to='/admin/maestros'>
                        <HiBookOpen size={isMobile ? 35 : 55} />
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
//rama  home
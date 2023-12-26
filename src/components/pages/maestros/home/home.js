import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiDocumentCheck,HiBookOpen } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import { useAuth } from '../../../../utils/AuthContext';
import apic from '../../../../services/api';

import './home.css';

function Home({isMobile}) {
    const { userData } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [grupos, setGrupos] = useState([]);
    useEffect(() => {
      const gruposByProfesor = async (id) => {
        try {
          const gruposData = await apic.get(`/profesores/${id}/grupos`);
          setGrupos(gruposData);
          console.log(`Respuesta de la API para el grupo ${id}:`, gruposData);
        } catch (error) {
          console.error('Error al obtener alumnos por grupo:', error);
        }
      };

      gruposByProfesor(userData.id);

      // Actualizar la fecha actual cada segundo 
      const intervalId = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
  
      // Limpieza del intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
      }, [userData]);
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Mi portal" />}

        <div className='mHomeCont'>
            {isMobile && <p className='WelcomeMsg'>Bienvenido</p>}
            <span className='AditionalInfo'>{formattedDate}</span>
            <div className='modularCont'>

                <NavLink className={isMobile ? "button bigButton mUsuarioButton" : "button normalButton mUsuarioButton"} to='/maestros/usuario'>
                    <HiUser size={isMobile ? 50 : 55} style={isMobile ? {color: "#073cc3"}: {}}/>
                    <span className="buttonTitle">Usuario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton mCalendarioButton": "button normalButton mCalendarioButton"}to='/maestros/calendario'>
                    <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? {color: "#0cb71a"}: {}}/>
                    <span className="buttonTitle">Calendario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton mCalificacionesButton": "button normalButton mCalificacionesButton"} to='/maestros/calificaciones'>
                    <HiDocumentCheck size={isMobile ? 30 : 55} style={isMobile ? {color: "#f0c103"}: {}}/>
                    <span className="buttonTitle">Calificaciones</span>
                </NavLink>

            </div>

            <span className='contSubtitle'>Mi grupos</span>
            <div className='gridCont'>
                
                {grupos.map((cursosObj) => (
                    <NavLink className='button normalButton'key={cursosObj.id_grupo} to='/maestros/grupos'>
                        <HiBookOpen size={isMobile ? 35 : 55} />
                        <span className="buttonTitle">{cursosObj.descripcion}</span>
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
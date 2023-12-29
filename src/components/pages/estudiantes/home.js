import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiDocumentCheck,HiBookOpen, HiAcademicCap } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './home.css';
import apic from '../../../services/api';
import { useAuth } from '../../../utils/AuthContext';

function Home({isMobile}) {
    const { userData } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modulosAnteriores, setModulosAnteriores] = useState([]);
    const [moduloActual, setModuloActual] = useState([]);
    
    useEffect(() => {
        const getModulos = async (id) => {
            try {
              const modulosData = await apic.get(`/alumnos/${id}/modulos`);
              const modulosOrdenados = modulosData.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
              const modulosAnt = modulosOrdenados.filter((modulo) => modulo !== modulosOrdenados[0]);

              setModuloActual(modulosOrdenados[0]);
              setModulosAnteriores(modulosAnt);
            } catch (error) {
                console.error(error.response.data.error);
            }
        };

        getModulos(userData.id);
          
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

        <div className='eHomeCont'>
            {isMobile && <p className='WelcomeMsg'>Bienvenido</p>}
            <span className='AditionalInfo'>{formattedDate}</span>
            <div className='modularCont'>

                <NavLink className={isMobile ? "button bigButton eUsuarioButton" : "button normalButton eUsuarioButton"} to='/estudiantes/usuario'>
                    <HiUser size={isMobile ? 50 : 55} style={isMobile ? {color: "#073cc3"}: {}}/>
                    <span className="buttonTitle">Usuario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton eCalendarioButton": "button normalButton eCalendarioButton"}to='/estudiantes/calendario'>
                    <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? {color: "#0cb71a"}: {}}/>
                    <span className="buttonTitle">Calendario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton eCalificacionesButton": "button normalButton eCalificacionesButton"} to='/estudiantes/calificaciones'>
                    <HiDocumentCheck size={isMobile ? 30 : 55} style={isMobile ? {color: "#f0c103"}: {}}/>
                    <span className="buttonTitle">Calificaciones</span>
                </NavLink>

            </div>

            <span className='contSubtitle'>Mi módulo actual</span>

            <div className='simpleCont'>
                <NavLink className="button longButton currentModule" to='/estudiantes/modulo'>
                    <HiBookOpen size={isMobile ? 45 : 55} />
                    <div className='textContLongButton'>
                    <span className="buttonTitle" >{moduloActual.nombre}</span>
                    <span >Clic para ver detalles</span>
                    </div>
                </NavLink>
            </div>
            <span className='contSubtitle'>Mi módulos pasados</span>
            <div className='gridCont'>
                
                {modulosAnteriores.map((moduloObj) => (
                    <NavLink className='button normalButton'key={moduloObj.id} to='/estudiantes/calificaciones'>
                        <HiAcademicCap size={isMobile ? 35 : 55} />
                        <span className="buttonTitle">{moduloObj.nombre}</span>
                        <span className="buttonTitle">{moduloObj.descripcion}</span>
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
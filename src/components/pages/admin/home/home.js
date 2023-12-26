import React, { useEffect, useState } from 'react';
import { HiUser, HiCalendarDays, HiBookOpen, HiMiniSquare3Stack3D} from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import apic from '../../../../services/api';
import './home.css';

function Home({isMobile}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [maestros, setMaestros] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);

    useEffect(() => {

      const fetchProfesores = async () => {
        try {
          const profesoresData = await apic.get('/profesores/');
          setMaestros(profesoresData);
          console.log("Respuesta de la API:", profesoresData);
          console.log("json maestros: ", maestros);
        } catch (error) {
          console.error('Error al obtener los maestros:', error);
        }
      };

      const fetchGrupos = async () => {
        try {
          const gruposData = await apic.get('/grupos/');
          setGrupos(gruposData);
          console.log("Respuesta de la API:", gruposData);
          console.log("json grupos: ", grupos);
        } catch (error) {
          console.error('Error al obtener los grupos:', error);
        }
      };

      fetchProfesores();
      fetchGrupos();
      // Actualizar la fecha actual cada segundo
      const intervalId = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
  
      // Limpieza del intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    }, [maestros, grupos]);

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Mi portal" />}

        <div className='aHomeCont'>
            {isMobile && <p className='WelcomeMsg'>Bienvenido</p>}
            <span className='AditionalInfo'>{formattedDate}</span>
            <div className='modularCont'>

                <NavLink className={isMobile ? "button bigButton aUsuarioButton" : "button normalButton aUsuarioButton"} to='/admin/usuario'>
                    <HiUser size={isMobile ? 50 : 55} style={isMobile ? {color: "#073cc3"}: {}}/>
                    <span className="buttonTitle">Usuario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton aCalendarioButton": "button normalButton aCalendarioButton"}to='/admin/calendario'>
                    <HiCalendarDays size={isMobile ? 30 : 55} style={isMobile ? {color: "#0cb71a"}: {}}/>
                    <span className="buttonTitle">Calendario</span>
                </NavLink>
                <NavLink className={isMobile ? "button longButton aCalificacionesButton": "button normalButton aCalificacionesButton"} to='/admin/grupos'>
                    <HiMiniSquare3Stack3D size={isMobile ? 25 : 50} style={isMobile ? {color: "#f0c103"}: {}}/>
                    <span className="buttonTitle">Grupos</span>
                </NavLink>

            </div>

            <span className='contSubtitle'>Profesores</span>
            <div className='gridCont'>
                
                {maestros.map((maestrosObj) => (
                    <NavLink className='button normalButton'key={maestrosObj.id} to='/admin/maestros'>
                        <HiBookOpen size={isMobile ? 35 : 55} />
                        <span className="buttonTitle">{maestrosObj.nombre}</span>
                    </NavLink>
                ))}
                
            </div>

            <span className='contSubtitle'>Grupos</span>
            <div className='gridCont'>
                
                {grupos.map((gruposObj) => (
                    <NavLink className='button normalButton'key={gruposObj.id} to='/admin/grupos'>
                        <HiMiniSquare3Stack3D size={isMobile ? 35 : 55} />
                        <span className="buttonTitle">{gruposObj.descripcion}</span>
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
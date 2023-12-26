import React, { useEffect, useState } from 'react';
import { HiBookOpen } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './calificaciones.css';
import { useAuth } from '../../../../utils/AuthContext';
import apic from '../../../../services/api';

function Calificaciones({isMobile}) {
    const { userData } = useAuth();
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
      }, [userData]);
    
    
  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Calificación" />}

        <div className='mCalificacionesCont'>
            {isMobile && <p className='WelcomeMsg'>Calificación</p>}

            <span className='contSubtitle'>Todos mis grupos</span>
            <div className='gridCont'>
                
                {grupos.map((cursosObj) => (
                    <NavLink className='button normalButton'key={cursosObj.id_grupo} to={`/maestros/calificaciones/${cursosObj.id_grupo}`}>
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

export default Calificaciones;
//rama  home
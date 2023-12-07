import React, { useEffect, useState } from 'react';
import { HiBookOpen } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './calificaciones.css';

function Calificaciones({isMobile}) {
    const cursosActuales=[{"id": "1","nombre": "Nombre del modulo actual"},{"id": "2","nombre": "Más nombres de módulos"},{"id": "3","nombre": "Otro nombre que no me acuerdo"},{"id": "4","nombre": "Pero seguramente si existen jaaj"},{"id": "5","nombre": "Aro nombre que no me acuerdo"},];
    const cursosPasados=[{"id": "1","nombre": "Nombre del modulo pasado"},{"id": "2","nombre": "Más nombres de módulos"},{"id": "3","nombre": "Otro nombre que no me acuerdo"},{"id": "4","nombre": "Pero seguramente si existen jaaj"},{"id": "5","nombre": "Aro nombre que no me acuerdo"},];

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Calificación" />}

        <div className='mCalificacionesCont'>
            {isMobile && <p className='WelcomeMsg'>Calificación</p>}

            <span className='contSubtitle'>Mi grupos actuales</span>
            <div className='gridCont'>
                
                {cursosActuales.map((cursosObj) => (
                    <NavLink className='button normalButton'key={cursosObj.id} to={`/maestros/calificaciones/a/${cursosObj.id}`}>
                        <HiBookOpen size={isMobile ? 35 : 55} />
                        <span className="buttonTitle">{cursosObj.nombre}</span>
                    </NavLink>
                ))}
                
            </div>
            <span className='contSubtitle'>Mi grupos pasados</span>
            <div className='gridCont'>
                
                {cursosPasados.map((cursosObj) => (
                    <NavLink className='button normalButton'key={cursosObj.id} to={`/maestros/calificaciones/p/${cursosObj.id}`}>
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

export default Calificaciones;
//rama  home
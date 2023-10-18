import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './modulos.css';
import {HiAcademicCap, HiCalendar, HiClock, HiTrophy, HiDocumentCheck} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
function Modulos({isMobile}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const curAc={"id": "1","nombre": "Procesador de textos", "calificacion": "SC", "periodo":"Ordinario", "maestro": "Chistian A. R.", "semanas": "6", "horario": "Sábados 14:00 - 17:00"}
  const fechaInicioStr = "2023/10/05"; //esta se recupera del api
  const fechaInicio = new Date(fechaInicioStr);
  const [semanas, setSemanas] = useState();

  useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDate(new Date());
        const diferenciaEnMilisegundos = currentDate - fechaInicio;
        const milisegundosPorSemana = 7 * 24 * 60 * 60 * 1000;
        const semanasTranscurridas = Math.floor(diferenciaEnMilisegundos / milisegundosPorSemana);
        setSemanas(semanasTranscurridas); // Aquí actualizamos el estado correctamente
      }, 1000);
    
      return () => clearInterval(intervalId);
    }, []);
  
  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Módulos" />}
        <div className='modulosCont'>
          {isMobile && <p className='WelcomeMsg'>Módulos</p>}
          <div className='pageTitle'>
            <span>{curAc.nombre}</span> <span className='AditionalInfo'>{curAc.periodo}</span>
          </div>
          
          <div className='latInfoCont'>
            <div className='latInfo'>
              <HiAcademicCap size="17px" style={{color:"#bd1414", marginRight:"5px", marginLeft:"-3px"}}/>
              <span>Maestro: {curAc.maestro}</span>
            </div>
            <div className='latInfo'>
              <HiCalendar size="17px" style={{color:"#169e21", marginRight:"5px", marginLeft:"-3px"}}/>
              <span>{curAc.semanas} semanas</span>
            </div>
            <div className='latInfo'>
              <HiClock size="17px" style={{color:"#e7a90e", marginRight:"5px", marginLeft:"-3px"}}/>
              <span>{curAc.horario}</span>
            </div>
          </div>
          <div className='moduloInfoCont'>
            <div className='button bigButton califCont'>
                <div className='buttonHeader'>
                  <HiTrophy size="22px" style={{marginRight:"5px"}}/> <span>Calificacion</span>
                </div>
                <span className='califInfo'>{curAc.calificacion}</span>
                <span style={{marginTop:"auto"}}>{curAc.periodo}</span>
            </div>
            <div className="button normalButton semanaCont">
              <div className='buttonHeader'>
                  <HiCalendar size="22px" style={{marginRight:"5px"}}/> <span>Semanas restantes</span>
              </div> 
              <span className='semanasInfo'>{semanas} {semanas === 1 ? ' semana' : ' semanas'}</span>

            </div>
            <NavLink className="button normalButton examenCont" to='/estudiantes/calendario'>
              <div className='buttonHeader'>
                  <HiDocumentCheck size="22px" style={{marginRight:"5px"}}/> <span>Examen</span>
              </div> 
              <span style={{marginTop:"auto", paddingTop:"7px"}}>Ver en calendario</span>
            </NavLink>
            
          </div>
           
        </div>
    </div>
  );
}

export default Modulos;
//rama estudiantes
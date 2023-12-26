import React, { useEffect, useState } from 'react';
import HeaderInicio from './headerDesktop'
import HeaderMobile from './headerMobile';
import './calendario.css';
import calendar from '../../assets/img/calendario.jpg';
function Calendario({isMobile}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    useEffect(() => {
        // Actualizar la fecha actual cada segundo
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
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Calendario" />}
        <div className='calendarioCont'>
            {isMobile && <p className='WelcomeMsg'>Calendario</p>}
            <span className='pageTitle'>{formattedDate}</span>
            <div className='imgCont'>
                <img src={calendar} alt="calendario" className='imgCalendar'/>
            </div>
        </div>
    </div>
  );
}

export default Calendario;
//rama calendario estudiantes
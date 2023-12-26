import React, { useState } from 'react';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './calificaciones.css';

function Calificaciones({isMobile}) { 

    const [cursosPasados] = useState([{"id": "2","nombre": "Nombre del modulo pasado", "calificacion": "10", "periodo":"Ordinario"},
    {"id": "3","nombre": "Más nombres de módulos", "calificacion": "10", "periodo":"Ordinario"},
    {"id": "4","nombre": "Otro nombre que no me acuerdo", "calificacion": "9", "periodo":"Extraordinario"},
    {"id": "5","nombre": "Pero seguramente si existen jaaj", "calificacion": "8", "periodo":"Proyecto"}]);
    
    const periodoStyle = {
        Ordinario: {backgroundColor: '#169e21'},
        Extraordinario : {backgroundColor: '#e7a90e'},
        Proyecto : {backgroundColor: '#bd1414'}
    }

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Calificaciones" />}
        <div className='eCalificacionesCont'>
            {isMobile && <p className='WelcomeMsg'>Calificaciones</p>}
            <span className='contSubtitle'>Todos mis módulos</span>
            
            <div className='gridCont'>
                
                {cursosPasados.map((cursosObj) => (
                    <div className='button normalButton ePastModule'key={cursosObj.id}>
                        <span className='califInfo'>{cursosObj.calificacion}</span>
                        <div className='textContLongButton'>
                            <span className="buttonTitle" >{cursosObj.nombre}</span>
                            <span className='periodoInfo'style={periodoStyle[cursosObj.periodo]}>{cursosObj.periodo}</span>
                        </div>
                    </div>
                ))}
                
            </div>
            <div style={{height:"74px"}}></div>
        </div>
    </div>
  );
}

export default Calificaciones;
//rama  calificaciones
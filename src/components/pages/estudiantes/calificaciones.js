import React, { useEffect, useState } from 'react';
import HeaderDesktop from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './calificaciones.css';

function Calificaciones({isMobile}) {

    const [cursosPasados, setCursosPasados] = useState([]);
    const curP=[{"id": "2","nombre": "Nombre del modulo pasado", "calificacion": "10", "periodo":"Ordinario"},
                {"id": "3","nombre": "Más nombres de módulos", "calificacion": "10", "periodo":"Ordinario"},
                {"id": "4","nombre": "Otro nombre que no me acuerdo", "calificacion": "9", "periodo":"Extraordinario"},
                {"id": "5","nombre": "Pero seguramente si existen jaaj", "calificacion": "8", "periodo":"Proyecto"}];
    const curAc={"id": "1","nombre": "Procesador de textos", "calificacion": "SC", "periodo":"Ordinario"}
    useEffect(() => {
        setCursosPasados(curP);
      }, []);
    
    const periodoStyle = {
        Ordinario: {backgroundColor: '#169e21'},
        Extraordinario : {backgroundColor: '#e7a90e'},
        Proyecto : {backgroundColor: '#bd1414'}
    }

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderDesktop titulo="Calificaciones" />}
        <div className='calificacionesCont'>
            {isMobile && <p className='WelcomeMsg'>Calificaciones</p>}
            <span className='contSubtitle'>Mi módulo actual</span>
            
            <div className='simpleCont'>
                <div className="button longButton currentModule">
                    <span className='califInfo'>{curAc.calificacion}</span>
                    <div className='textContLongButton'>
                        <span className="buttonTitle" >{curAc.nombre}</span>
                        <span className='periodoInfo' style={periodoStyle[curAc.periodo]} >{curAc.periodo}</span>
                    </div>
                </div>
            </div>

            <span className='contSubtitle'>Mi módulos pasados</span>
            
            <div className='gridCont'>
                
                {cursosPasados.map((cursosObj) => (
                    <div className='button normalButton pastModule'key={cursosObj.id}>
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
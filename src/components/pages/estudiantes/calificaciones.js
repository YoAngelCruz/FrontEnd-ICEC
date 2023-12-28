import React, { useState, useEffect } from 'react';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './calificaciones.css';
import apic from '../../../services/api';
import { useAuth } from '../../../utils/AuthContext';

function Calificaciones({isMobile}) { 
    const { userData } = useAuth();
    const [modulosAnteriores, setModulosAnteriores] = useState([]);
    useEffect(() => {
        const getModulos = async (id) => {
            try {
              const modulosData = await apic.get(`/alumnos/${id}/modulos/calificaciones`);
              const modulosOrdenados = modulosData.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
              const modulosAnt = modulosOrdenados.filter((modulo) => modulo !== modulosOrdenados[0]);
              setModulosAnteriores(modulosAnt);

              console.log(`Respuesta de la API para los modulos ${id}:`, modulosData);
            } catch (error) {
              console.error('Error al obtener modulos:', error);
            }
        };

        getModulos(userData.id);
      }, [userData]);

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
                
                {modulosAnteriores.map((moduloObj) => (
                    <div className='button normalButton ePastModule'key={moduloObj.id}>
                        <span className='califInfo'>{moduloObj.calificacion}</span>
                        <div className='textContLongButton'>
                            <span className="buttonTitle" >{moduloObj.nombre}</span>
                            <span className='periodoInfo'style={periodoStyle[moduloObj.periodo]}>{moduloObj.periodo}</span>
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
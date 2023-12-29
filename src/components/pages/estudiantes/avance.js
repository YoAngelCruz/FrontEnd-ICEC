import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './avance.css';
import {HiAcademicCap, HiCalendar, HiClock, HiDocumentCheck} from 'react-icons/hi2';
import apic from '../../../services/api';
import { useAuth } from '../../../utils/AuthContext';
function Avance({isMobile}) {
    const { userData } = useAuth();
    const [modulos, setModulos] = useState([]);
    const [modulosCursados, setModulosCursados] = useState([]);
    const [modulosPorCursar, setModulosPorCursar] = useState([]);
    const [mcCount, setMcCount] = useState('');
    const [mpcCount, setMpcCount] = useState('');
    const [promedio, setPromedio] = useState(0);
    const [porMc, setPorMc] = useState(0);
    const [porMpc, setPorMpc] = useState(0);

    useEffect(() => {
        const getModulosCursados = async (id) => {
          try {
            const modulosData = await apic.get(`/alumnos/${id}/modulos/calificaciones`);
            const modulosOrdenados = modulosData.sort((a, b) => new Date(b.id_modulo) - new Date(a.id_modulo));
            const modulosNoCursados = modulos.filter(modulo => {
                return !modulosOrdenados.some(moduloCursado => moduloCursado.id_modulo === modulo.id_modulo);
            });
            const promedio = (modulosOrdenados.reduce((total, modulo) => total + (modulo.calificacion || 0), 0) / modulosOrdenados.length).toFixed(2);
            setModulosCursados(modulosOrdenados);
            setModulosPorCursar(modulosNoCursados);
            setMcCount(modulosOrdenados.length);
            setMpcCount(modulosNoCursados.length);
            setPromedio(promedio);
            setPorMc((modulosOrdenados.length/modulos.length)*100);
            setPorMpc((modulosNoCursados.length/modulos.length)*100);
          } catch (error) {
            console.error(error.response.data.error);
          }
        };

        const getModulos = async () => {
            try {
              const modulosData = await apic.get(`/modulos`);
              setModulos(modulosData);
            } catch (error) {
              console.error(error.response.data.error);
            }
          };
    
        getModulosCursados(userData.id);
        if (!modulos.length) {
            getModulos();
        }
      }, [userData, modulos]);

    const data = [
        ["Pac Man", "Percentage"],
        ["", porMc],
        ["", porMpc],
      ];
    const options = {
        title: "Título en el centro",
        
        legend: "none",
        pieSliceText: "none",
        pieStartAngle: 0,
        tooltip: { trigger: "none" },
        slices: {
          0: { color: "#073cc3" },
          1: { color: "0b2a79" },
        },
        animation: {
            startup: false,
            duration: 0,   
          },
        enableInteractivity: false, 
        backgroundColor: "transparent",
        pieSliceBorderColor: "transparent",
        pieHole: 0.6,
        chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          },
      };
  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Avance" />}
        <div className='eAvanceCont'>
            {isMobile && <p className='WelcomeMsg'>Avance</p>}
            <div className='pageTitle'>
                <span>{userData.nombre}</span>
            </div>
            
            <div className='latInfoCont'>
                <div className='latInfo'>
                <HiAcademicCap size="17px" style={{color:"#bd1414", marginRight:"5px", marginLeft:"-3px"}}/>
                <span><b>{mcCount}</b> módulo{mcCount !== 1 ? 's' : ''} cursados</span>
                </div>
                <div className='latInfo'>
                <HiCalendar size="17px" style={{color:"#169e21", marginRight:"5px", marginLeft:"-3px"}}/>
                <span><b>{mpcCount}</b> módulo{mpcCount !== 1 ? 's' : ''} por cursar</span>
                </div>
                <div className='latInfo'>
                <HiClock size="17px" style={{color:"#e7a90e", marginRight:"5px", marginLeft:"-3px"}}/>
                <span><b>{promedio}</b> Promedio</span>
                </div>
            </div>
        
           <div className='eAvanceInfCont'>
                <div className='button eAvanceGraficaCont'style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className='buttonHeader'>
                        <HiDocumentCheck/><span>Avance</span>
                    </div>
                    <div>
                        {Math.round(porMc)}%
                    </div>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        className='chart' 
                    />
                </div>
                <div className='button eAvanceModulosCursadosCont'>
                    <div className='buttonHeader'>
                        <HiDocumentCheck/><span>Módulos completados</span>
                    </div>
                    <div className='eModuleInfoCont'>
                        {modulosCursados.map((mcObj) =>(
                            <li key={mcObj.id_modulo}>{mcObj.nombre}</li>
                        ))} 
                    </div>
                </div>
                <div className='button avanceModulosPorCursarCont'>
                    <div className='buttonHeader'>
                        <HiDocumentCheck/><span>Módulos por completar</span>
                    </div>
                    <div className='eModuleInfoCont'>
                        {modulosPorCursar.map((mcpObj) =>(
                            <li key={mcpObj.id_modulo}>{mcpObj.nombre}</li>
                        ))} 
                    </div>
                </div>
           </div>
           {isMobile && <div style={{height:"50px"}}/>}
        </div>
    </div>
  );
}

export default Avance;
//rama  avance
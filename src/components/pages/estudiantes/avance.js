import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './avance.css';
import {HiAcademicCap, HiCalendar, HiClock, HiDocumentCheck} from 'react-icons/hi2';
function Avance({isMobile}) {
    const usuario={"id": "1","nombre": "Anahí Ximena Sanchez Vasquez"}
    const modulosCursados=[{"id": "1","nombre": "Nombre del modulo pasado", "calificacion": "10"},{"id": "2","nombre": "Más nombres de módulos", "calificacion": "10"},{"id": "3","nombre": "Otro nombre que no me acuerdo", "calificacion": "9"},{"id": "4","nombre": "Pero seguramente si existen jaaj", "calificacion": "10"}];
    const modulosPorCursar=[{"id": "1","nombre": "Nombre del modulo pasado"},{"id": "2","nombre": "Más nombres de módulos"}];
    const mcCount = modulosCursados.length;
    const mpcCount = modulosPorCursar.length;
    const promedio = modulosCursados.reduce((total, modulo) => total + parseInt(modulo.calificacion), 0) / modulosCursados.length;
    const porMc = (mcCount / 6) * 100;
    const porMpc = (mpcCount / 6) * 100;
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
            left: 0, // Espacio en blanco a la izquierda
            top: 0,  // Espacio en blanco en la parte superior
            width: "100%",  // Ancho del área del gráfico
            height: "100%", // Alto del área del gráfico
          },
      };
  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Avance" />}
        <div className='avanceCont'>
            {isMobile && <p className='WelcomeMsg'>Avance</p>}
            <div className='pageTitle'>
                <span>{usuario.nombre}</span>
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
        
           <div className='avanceInfCont'>
                <div className='button avanceGraficaCont'style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className='buttonHeader'>
                        <HiDocumentCheck/><span>Avance</span>
                    </div>
                    <div id="porcentajeGrafica">
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
                <div className='button avanceModulosCursadosCont'>
                    <div className='buttonHeader'>
                        <HiDocumentCheck/><span>Módulos completados</span>
                    </div>
                    <div className='moduleInfoCont'>
                        {modulosCursados.map((mcObj) =>(
                            <li key={mcObj.id}>{mcObj.nombre}</li>
                        ))} 
                    </div>
                </div>
                <div className='button avanceModulosPorCursarCont'>
                    <div className='buttonHeader'>
                        <HiDocumentCheck/><span>Módulos por completar</span>
                    </div>
                    <div className='moduleInfoCont'>
                        {modulosPorCursar.map((mcpObj) =>(
                            <li key={mcpObj.id}>{mcpObj.nombre}</li>
                        ))} 
                    </div>
                </div>
           </div>
        </div>
    </div>
  );
}

export default Avance;
//rama  develop estudiantes
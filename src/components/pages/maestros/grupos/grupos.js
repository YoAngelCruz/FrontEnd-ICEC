import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { HiOutlineChevronDown} from "react-icons/hi";
import './grupos.css';


function Grupos({isMobile}) {

    const gruposActuales=[{"id":'1','nombre':'G001', 'maestro':'Christian Amaro Reyes', 'estudiantes':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}, {'id':'4', 'nombre':'Heribert'}]},
                          {"id":'2','nombre':'G002', 'maestro':'Jose Manuel Reyes', 'estudiantes':[{'id':'1', 'nombre':'Anahí Ximena Sanchez Vasquez'},{'id':'2', 'nombre':'Arriola Peztña Heriberto'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]},
                          {"id":'3','nombre':'G003', 'maestro':'Ana Bolena ', 'estudiantes':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]}]
    
    const gruposPasados=[{"id":'1','nombre':'G001', 'maestro':'Christian Amaro Reyes', 'estudiantes':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}, {'id':'4', 'nombre':'Heribert'}]},
                         {"id":'2','nombre':'G002', 'maestro':'Jose Manuel Reyes', 'estudiantes':[{'id':'1', 'nombre':'Anahí Ximena Sanchez Vasquez'},{'id':'2', 'nombre':'Arriola Peztña Heriberto'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]},
                         {"id":'3','nombre':'G003', 'maestro':'Ana Bolena ', 'estudiantes':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]}]
    

    const accordionPriStyles = createTheme({
        components: {
            MuiAccordion:{styleOverrides: {root: {
                backgroundColor: 'transparent',
                boxShadow:'none',
            },},},
            MuiAccordionSummary: {styleOverrides: {root: {
                color:'white',
                fontSize: isMobile ? '23px' : '25px',
                borderBottom: 'solid 2px white',
            },},},
        },
    });
    const accordionSecStyles = createTheme({
        components: {
            MuiAccordion:{styleOverrides: {root: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow:'none',
            },},},
            MuiAccordionSummary: {styleOverrides: {root: {
                fontWeight:'bold',
            },},},
            MuiAccordionDetails: {styleOverrides: {root: {
                backgroundColor: 'white',
                borderRadius:'10px',
                margin:' -10px 10px 10px 10px',
                padding:'10px 25px',
            },},},
        },
    });
    
    return (
        <div>
            {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Grupos" />}

            <div className="mGruposCont">
                {isMobile && <p className="WelcomeMsg">Grupos</p>}
                <div className='gruposAccordion'>
                    <ThemeProvider theme={accordionPriStyles}>
                        <Accordion>
                            <AccordionSummary expandIcon={<HiOutlineChevronDown  style={{color:'white'}}/>} id="actuales">
                                Grupos actuales
                            </AccordionSummary>
                            <AccordionDetails>
                                {gruposActuales.map((gruposObj) => ( 
                                    <div className='groupGrupos'>
                                        <ThemeProvider theme={accordionSecStyles}>
                                            <Accordion>
                                                <AccordionSummary expandIcon={<HiOutlineChevronDown style={{color:'black'}}/>} id={gruposObj.id}>
                                                    Grupo {gruposObj.id}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ul>
                                                        {gruposObj.estudiantes.map((estudiante) => (
                                                        <li key={estudiante.id}>{estudiante.nombre}</li>
                                                        ))}
                                                    </ul>
                                                </AccordionDetails>
                                            </Accordion>
                                        </ThemeProvider>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </ThemeProvider>
                </div>
                
                <div className='gruposAccordion'>
                    <ThemeProvider theme={accordionPriStyles}>
                        <Accordion>
                            <AccordionSummary expandIcon={<HiOutlineChevronDown  style={{color:'white'}}/>} id="pasados">
                                Grupos pasados
                            </AccordionSummary>
                            <AccordionDetails>
                                {gruposPasados.map((gruposObj) => ( 
                                    <div className='groupGrupos'>
                                        <ThemeProvider theme={accordionSecStyles}>
                                            <Accordion>
                                                <AccordionSummary expandIcon={<HiOutlineChevronDown style={{color:'black'}}/>} id={gruposObj.id}>
                                                    {gruposObj.nombre}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ul>
                                                        {gruposObj.estudiantes.map((estudiante) => (
                                                        <li key={estudiante.id}>{estudiante.nombre}</li>
                                                        ))}
                                                    </ul>
                                                </AccordionDetails>
                                            </Accordion>
                                        </ThemeProvider>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}
export default Grupos;
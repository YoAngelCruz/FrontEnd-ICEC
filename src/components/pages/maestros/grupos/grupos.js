import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { HiOutlineChevronDown } from "react-icons/hi";
import { useAuth } from '../../../../utils/AuthContext';
import apic from '../../../../services/api';
import './grupos.css';

function Grupos({ isMobile }) {
    const { userData } = useAuth();
    const [grupos, setGrupos] = useState([]);

    // Llamar a la función para obtener grupos y alumnos al cargar el componente
    useEffect(() => {
        const gruposByProfesor = async (id) => {
            try {
                const gruposData = await apic.get(`/profesores/${id}/grupos`);
                const gruposConAlumnos = await Promise.all(
                    gruposData.map(async (grupo) => {
                        const alumnos = await fetchAlumnosByGrupo(grupo.id_grupo);
                        return { ...grupo, alumnos };
                    })
                );
                setGrupos(gruposConAlumnos);
                console.log(`Respuesta de la API para el profesor ${id}:`, gruposConAlumnos);
            } catch (error) {
                console.error('Error al obtener grupos por profesor:', error);
            }
        };

        const fetchAlumnosByGrupo = async (idGrupo) => {
            try {
                const alumGrupoData = await apic.get(`/grupos/${idGrupo}/alumnos`);
                // Mapear los datos y seleccionar solo las propiedades necesarias
                const limitedData = alumGrupoData.map((alumno) => ({
                    id: alumno.id,
                    clave: alumno.clave,
                    nombre: alumno.nombre,
                }));
                return limitedData;
            } catch (error) {
                console.error('Error al obtener alumnos por grupo:', error);
                return [];
            }
        };

        gruposByProfesor(userData.id);
    }, [userData]);

    const gruposActuales = grupos.filter((grupo) => {
        const fechaFin = new Date(grupo.fecha_fin);
        const hoy = new Date();

        return fechaFin >= hoy; // Filtrar los grupos cuya fecha_fin es mayor o igual a hoy
    });

    const gruposPasados = grupos.filter((grupo) => {
        const fechaFin = new Date(grupo.fecha_fin);
        const hoy = new Date();

        return fechaFin < hoy; // Filtrar los grupos cuya fecha_fin es menor a hoy
    });

    const accordionPriStyles = createTheme({
        components: {
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                },
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        fontSize: isMobile ? '23px' : '25px',
                        borderBottom: 'solid 2px white',
                    },
                },
            },
        },
    });
    const accordionSecStyles = createTheme({
        components: {
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        boxShadow: 'none',
                    },
                },
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        fontWeight: 'bold',
                    },
                },
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        margin: ' -10px 10px 10px 10px',
                        padding: '10px 25px',
                    },
                },
            },
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
                            <AccordionSummary expandIcon={<HiOutlineChevronDown style={{ color: 'white' }} />} id="actuales">
                                Grupos actuales
                            </AccordionSummary>
                            <AccordionDetails>
                                {gruposActuales.map((gruposObj) => (
                                    <div className='groupGrupos'>
                                        <ThemeProvider theme={accordionSecStyles}>
                                            <Accordion>
                                                <AccordionSummary expandIcon={<HiOutlineChevronDown style={{ color: 'black' }} />} id={gruposObj.id_grupo}>
                                                    {gruposObj.descripcion}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ul>
                                                        {gruposObj.alumnos.map((alumno) => (
                                                            <li key={alumno.id}>{alumno.clave}&emsp;&emsp;{alumno.nombre}</li>
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
                            <AccordionSummary expandIcon={<HiOutlineChevronDown style={{ color: 'white' }} />} id="pasados">
                                Grupos pasados
                            </AccordionSummary>
                            <AccordionDetails>
                                {gruposPasados.map((gruposObj) => (
                                    <div className='groupGrupos'>
                                        <ThemeProvider theme={accordionSecStyles}>
                                            <Accordion>
                                                <AccordionSummary expandIcon={<HiOutlineChevronDown style={{ color: 'black' }} />} id={gruposObj.id_grupo}>
                                                    {gruposObj.descripcion}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ul>
                                                        {gruposObj.alumnos.map((alumno) => (
                                                            <li key={alumno.id}>{alumno.clave}&emsp;&emsp;{alumno.nombre}</li>
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
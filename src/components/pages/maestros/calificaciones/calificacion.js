import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './calificaciones.css';
import {HiPencil, HiOutlineChevronLeft} from 'react-icons/hi2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import apic from '../../../../services/api';


function Calificacion({isMobile}) {
  const [openEditCalif, setOpenEditCalif] = useState(false);
  const url = window.location.href;
  const partes = url.split("/");
  const idGrupo = partes[partes.length - 1];
  const [editCalif, setEditCalif] = useState({id: '', nombre: '', clave: '', edad: '', curp: '', domicilio: '', num_tel_a: '', email: '', 
  turno: '', fecha_inicio: '', contraseña: '', tutor: '', id_inscripcion: '', calificacion: ''});
  const [alumGrupos, setAlumGrupos] = useState([]);

  useEffect(() => {
    fetchAlumnosByGrupo(idGrupo);
    console.log()
  }, []);

  const fetchAlumnosByGrupo = async (id) => {
    try {
      const alumGrupoData = await apic.get(`/grupos/${id}/alumnos`);
      setAlumGrupos(alumGrupoData);
      console.log(`Respuesta de la API para el grupo ${id}:`, alumGrupoData);
    } catch (error) {
      console.error('Error al obtener alumnos por grupo:', error);
    }
  };

  const theme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius:'15px',
            maxHeight: '70%',
            minWidth:'40%',
          },
          backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            boxShadow:'20px 0px 20px 6px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  });
  
  //Abrir y cerrar dialog editar nombre estudiantes
  const handleClickOpenEditCalif = (alumno) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, contraseña, tutor, id_inscripcion, calificacion } = alumno;
    setEditCalif({...alumno, calificacion: calificacion});
    setOpenEditCalif(true);
  };

  const handleCloseEditCalif = () => {
    setOpenEditCalif(false);
  };
  const handleChangeEditCalif = (event) => {
    setEditCalif({ ...editCalif, calificacion: event.target.value });
  };

  const saveEditCalif = () => {
    console.log(editCalif);
    handleCloseEditCalif();

  };

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Calificación" />}
        <div className='mCalificacionesCont'>
            {isMobile && <p className='WelcomeMsg'>Calificación</p>}
          
            <NavLink key='back' to='/maestros/calificaciones/' style={{ display:'flex', textDecoration:'none', color:'white', width:'fit-content'}} >
                <HiOutlineChevronLeft/><span className="buttonTitle">Regresar</span>
            </NavLink><br/>
          
            <span>&emsp; * Se recomienda usar vista para ordenador<br/><br/></span>
            <div className=' genericCont '>
                <table style={{width:'100%', padding:'0px 10px', fontWeight:'bold'}}>
                    <tr><td width="50%">Nombre</td><td width="25%" align='center'>Calificación</td><td width="25%" align='center'>Editar</td></tr>
                </table> 
                <table style={{width:'100%', backgroundColor:'white', borderRadius:'15px', padding:'10px'}}>
                    {alumGrupos.map((alumnosObj) => ( 
                        <tr key={alumnosObj.id}>
                        <td width="50%" style={{padding: '3px 0px'}}>{alumnosObj.nombre}</td>
                        <td width="25%" style={{borderLeft: '1px solid #888', padding: '0px 0px'}} align='center'>{alumnosObj.calificacion !== null ? alumnosObj.calificacion : 'SC'}</td>
                        <td width="25%" align='center' style={{borderLeft: '1px solid #888', padding: '0px 0px'}}>
                        <button
                            className={'actionButton editButton'}
                            onClick={() => handleClickOpenEditCalif(alumnosObj)}
                            >
                            <HiPencil/></button></td>
                        </tr>
                    ))}
                </table>
            </div>

            {/* ------------ Dialog Editar calificacion ------------ */}
            <ThemeProvider theme={theme}>
                <Dialog open={openEditCalif} onClose={handleCloseEditCalif}>
                <DialogContent>
                    <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Asignar Calificacion</p>
                    <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                        <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Calificación</p>
                            <input className='inputTextDialog' type='text' value={editCalif.calificacion} onChange={handleChangeEditCalif} name='editCalif'/>
                            <p style={{fontSize:'12px'}}>&nbsp; {editCalif.calificacion}</p>
                            <br/>
                        </div>
                        <Button autoFocus onClick={handleCloseEditCalif}>Cancelar</Button>
                        <Button onClick={saveEditCalif} autoFocus>Guardar</Button>
                    </div>                                    
                </DialogContent>
                </Dialog>
            </ThemeProvider>
        </div>
    </div>
  );
}

export default Calificacion;
//rama  modulos
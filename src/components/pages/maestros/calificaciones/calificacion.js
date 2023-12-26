import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './calificaciones.css';
import {HiPencil, HiOutlineChevronLeft} from 'react-icons/hi2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import apic from '../../../../services/api';
import dayjs from 'dayjs';


function Calificacion({isMobile}) {
  const [openEditCalif, setOpenEditCalif] = useState(false);
  const url = window.location.href;
  const partes = url.split("/");
  const idGrupo = partes[partes.length - 1];
  const [createCalif, setCreateCalif] = useState({id_inscripcion:'', calificacion:'', fecha: '', aprobado: ''});
  const [editCalif, setEditCalif] = useState({calificacion:'', fecha: '', aprobado: ''});
  const [alumGrupos, setAlumGrupos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState('');
  const [calif, setCalif] = useState('');
  const [idCalif, setIdCalif] = useState('');
  const [isNew, setIsNew] = useState('');
  const [isUpdate, setIsUpdate] = useState('');

  useEffect(() => {
    const fetchAlumnosByGrupo = async (id) => {
      try {
        const alumGrupoData = await apic.get(`/grupos/${id}/alumnos`);
        setAlumGrupos(alumGrupoData);
        console.log(`Respuesta de la API para el grupo ${id}:`, alumGrupoData);
      } catch (error) {
        console.error('Error al obtener alumnos por grupo:', error);
      }
    };

    fetchAlumnosByGrupo(idGrupo);
    obtenerFechaHoy();
  }, [idGrupo]);

  const obtenerFechaHoy = () => {
    const fechaHoyFormateada = dayjs().format('MM/DD/YYYY');
    setFechaHoy(fechaHoyFormateada);
  };
  const UpdateCalif = async (id, calif) => {
    try {
      const califUpdate = await apic.put(`/calificaciones/${id}`, calif);
      console.log('Calificacion actualizada correctamente:', califUpdate);
    } catch (error) {
      console.error('Error al actualizar calificacion:', error);
    }
  };

  const postCalif = async (postCalif) => {
    try {
      const califPost = await apic.post('/calificaciones', postCalif);
      console.log('Calificacion creada correctamente:', califPost);
    } catch (error) {
      console.error('Error al crear calificacion:', error);
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
    const {id_inscripcion, id_calificacion, calificacion } = alumno;
    setIdCalif(id_calificacion);
    if( id_calificacion===null){
      console.log('Calificacion nueva -------------------');
      let aprob = calificacion >= 6 ? true : false;
      setCreateCalif({...createCalif,id_inscripcion: id_inscripcion, calificacion: calificacion, fecha: fechaHoy, aprobado: aprob});
      setCalif(0);
      setIsNew(true);
      setIsUpdate(false);
    }else{
      console.log('Calificacion Actualizada -------------------');
      let aprob = calificacion >= 6 ? true : false;
      setEditCalif({...editCalif, calificacion: calificacion, fecha: fechaHoy, aprobado: aprob});
      setCalif(calificacion);
      setIsNew(false);
      setIsUpdate(true);
    }
    
    setOpenEditCalif(true);
  };

  const handleCloseEditCalif = () => {
    setOpenEditCalif(false);
  };
  const handleChangeEditCalif = (event) => {
    setCalif(event.target.value);
    let aprob = event.target.value >= 6 ? true : false;
    console.log('aprobo ', aprob);
    if (isNew){
      setCreateCalif({ ...createCalif, calificacion: event.target.value, aprobado: aprob });
    } else if (isUpdate){
      setEditCalif({ ...editCalif, calificacion: event.target.value, aprobado: aprob });
    }
    
  };

  const saveEditCalif = () => {
    if (isNew){
      console.log('create');
      console.log(createCalif);
      postCalif(createCalif);
    } else if (isUpdate){
      console.log('update');
      console.log('id calif', idCalif);
      console.log(editCalif);
      UpdateCalif(idCalif, editCalif);
    }
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
                            <input className='inputTextDialog' type='text' value={calif} onChange={handleChangeEditCalif} name='editCalif'/>
                            <p style={{fontSize:'12px'}}>&nbsp; {calif}</p>
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
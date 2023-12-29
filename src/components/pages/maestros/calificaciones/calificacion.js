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
  const [createCalif, setCreateCalif] = useState({id_inscripcion:'', calificacion:'', fecha: '', aprobado: '', periodo: ''});
  const [editCalif, setEditCalif] = useState({calificacion:'', fecha: '', aprobado: '', periodo: ''});
  const [alumGrupos, setAlumGrupos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState('');
  const [calif, setCalif] = useState('');
  const [idCalif, setIdCalif] = useState('');
  const [isNew, setIsNew] = useState('');
  const [isUpdate, setIsUpdate] = useState('');
  const periodo = [{nombre:'Ordinario'}, {nombre:'Extraordinario'}, {nombre:'Proyecto'}];

  useEffect(() => {
    const fetchAlumnosByGrupo = async (id) => {
      try {
        const alumGrupoData = await apic.get(`/grupos/${id}/alumnos`);
        setAlumGrupos(alumGrupoData);
      } catch (error) {
        console.error(error.response.data.error);
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
      alert(califUpdate.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const postCalif = async (postCalif) => {
    try {
      const califPost = await apic.post('/calificaciones', postCalif);
      alert(califPost.message);
    } catch (error) {
      alert(error.response.data.error);
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
      let aprob = calificacion >= 6 ? true : false;
      setCreateCalif({...createCalif,id_inscripcion: id_inscripcion, calificacion: calificacion, fecha: fechaHoy, aprobado: aprob});
      setCalif(0);
      setIsNew(true);
      setIsUpdate(false);
    }else{
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
    let aprob = event.target.value>= 6 ? true : false;
    if (isNew){  
      setCreateCalif({ ...createCalif, calificacion: event.target.value, aprobado: aprob });
    } else if (isUpdate){
      setEditCalif({ ...editCalif, calificacion: event.target.value, aprobado: aprob });
    }  
  };
  const handleChangeEditPeriodo = (event) => {
    if (isNew){  
      setCreateCalif({ ...createCalif, periodo: event.target.value });
    } else if (isUpdate){
      setEditCalif({ ...editCalif, periodo: event.target.value});
    }  
  };

  const saveEditCalif = () => {
    if (isNew){
      postCalif(createCalif);
    } else if (isUpdate){
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
            <div className='tableContainer'>
              <table cellSpacing='0px' style={{minWidth:'100%'}}>
                  <tr style={{fontWeight:'bold'}}>
                    <td align='center' style={{padding:'10px'}}>Nombre</td><td align='center' style={{padding:'10px'}}>Calificación</td> 
                    <td align='center' style={{padding:'10px'}}>Periodo</td> <td align='center' style={{padding:'10px'}}>Asingar Calif.</td>
                  </tr>
                  
                  {alumGrupos.map((alumnosObj, index) => ( 
                        <tr key={alumnosObj.id}>
                        <td style={{backgroundColor:'white', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap', borderTopLeftRadius: index === 0 ? '15px':'0px', borderBottomLeftRadius: index === alumGrupos.length-1 ? '15px':'0px'}}>
                          {alumnosObj.nombre}</td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}} align='center'>
                          {alumnosObj.calificacion !== null ? alumnosObj.calificacion : 'SC'}</td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}} align='center'>
                          {alumnosObj.periodo !== null ? alumnosObj.periodo : '--'}</td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit', borderBottomRightRadius: index === alumGrupos.length-1 ? '15px': '0', borderTopRightRadius: index === 0 ? '15px':'0px'}} align='center'>
                          <button className={'actionButton editButton'} onClick={() => handleClickOpenEditCalif(alumnosObj)}>
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
                            <input className='inputTextDialog' type='text' value={calif} onChange={handleChangeEditCalif} name='calificacion'/>
                            <p style={{fontSize:'12px'}}>&nbsp; {calif}</p>
                            <br/>
                            <p style={{marginTop:'15px'}}>&nbsp;Periodo</p>
                            <select onChange={handleChangeEditPeriodo} className='inputTextDialog' name='periodo'>
                              <option value="">Selecciona un periodo</option>
                              {periodo.map((periodoObj) => (
                                <option value={periodoObj.nombre}>{periodoObj.nombre}</option>
                              ))}
                            </select>
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
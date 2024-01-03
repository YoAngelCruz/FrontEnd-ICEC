import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderInicio from './headerDesktop'
import HeaderMobile from './headerMobile';
import {HiUserCircle,HiPencil,HiOutlineChevronLeft } from "react-icons/hi2";
import { useAuth } from '../../utils/AuthContext';
import './usuario.css';
import apic from '../../services/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
function Usuario({isMobile}) {
  const { userData, tipoUsuario } = useAuth();
  const [openEditPass, setOpenEditPass] = useState(false);
  const [idEditPass, setIdEditPass] = useState();
  
  const UpdatePassAlumnos = async (id, contraseña) => {
    try {
      const estudiantesUpdate = await apic.put(`/alumnos/pass/${id}`, contraseña);
      alert(estudiantesUpdate.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const UpdatePassProfesores = async (id, profesores) => {
    try {
      const profesoresUpdate = await apic.put(`/profesores/pass/${id}`, profesores);
      alert(profesoresUpdate.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  const UpdatePassAdmin = async (id, admin) => {
    try {
      const adminUpdate = await apic.put(`/administradores/pass/${id}`, admin);
      alert(adminUpdate.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const [editPass, setEditPass] = useState({contraseña:''});
  //Abrir y cerrar dialog editar pass estudiantes
  const handleClickOpenEditPass = (id) => {
    setIdEditPass(id);
    setOpenEditPass(true);
  };
  const handleCloseEditPass = () => {
    setOpenEditPass(false);
  };
  const handleChangeEditPass = (event) => {
    setEditPass({ ...editPass, contraseña: event.target.value });
  };
  const saveEditPassAlumno = () => {
    console.log(idEditPass);
    console.log(editPass);
    UpdatePassAlumnos(idEditPass,editPass);
    setIdEditPass();
    setEditPass({contraseña:''});
    handleCloseEditPass();
  };
  const saveEditPassProfesor = () => {
    console.log(idEditPass);
    console.log(editPass);
    UpdatePassProfesores(idEditPass,editPass);
    setIdEditPass();
    setEditPass({contraseña:''});
    handleCloseEditPass();
  };
  const saveEditPassAdmin = () => {
    console.log(idEditPass);
    console.log(editPass);
    UpdatePassAdmin(idEditPass,editPass);
    setIdEditPass();
    setEditPass({contraseña:''});
    handleCloseEditPass();
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

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Usuario" />}
        <div className='usuarioCont'>
            {isMobile && <p className='WelcomeMsg'>Usuario</p>}
            {tipoUsuario === 'profesor' && (
              <NavLink key='back' to='/maestros/home' style={{ display:'flex', textDecoration:'none', color:'white', width:'fit-content', left:'0%'}} >
                <HiOutlineChevronLeft/><span className="buttonTitle">Regresar</span>
              </NavLink>
            )}
            {tipoUsuario === 'administrador' && (
              <NavLink key='back' to='/admin/home' style={{ display:'flex', textDecoration:'none', color:'white', width:'fit-content', left:'0%'}} >
                <HiOutlineChevronLeft/><span className="buttonTitle">Regresar</span>
              </NavLink>
            )}
            {tipoUsuario === 'alumno' && (
              <NavLink key='back' to='/estudiantes/home' style={{ display:'flex', textDecoration:'none', color:'white', width:'fit-content', left:'0%'}} >
                <HiOutlineChevronLeft/><span className="buttonTitle">Regresar</span>
              </NavLink>
            )}
            <br/>
            <HiUserCircle size={'10vw'} color='white' />
            <div className='pageTitle'>
              <span>{userData.nombre} </span> <span className='AditionalInfo'>{tipoUsuario}</span>
            </div>
            {tipoUsuario === 'alumno' && (
              <p style={{ marginTop: '-30px', marginBottom: '35px', color:'white' }}>
                {userData.clave}
              </p>
            )}
            {tipoUsuario === 'administrador' && (
              <div>
              <table>
              <tbody>
                <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold'}} align='right'>Email</td>
                <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.email}</td></tr>
                <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Telefono</td>
                <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.num_tel_a}</td></tr>
                <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Contraseña</td>
                <td><button className='actionButton editButton' onClick={() => handleClickOpenEditPass(userData.id)}><HiPencil size={20}/></button></td></tr>
              </tbody>
              </table>

              {/* ------------ Dialog Editar pass ------------ */}
              <ThemeProvider theme={theme}>
                <Dialog open={openEditPass} onClose={handleCloseEditPass}>
                  <DialogContent>
                    <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar contraseña: {userData.nombre} </p>
                    <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                        <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Contraseña</p>
                            <input className='inputTextDialog' type='password' onChange={handleChangeEditPass} name='editPass'/>
                            <p style={{fontSize:'12px'}}>&nbsp; {editPass.contraseña}</p>
                            <br/>
                        </div>
                        <Button autoFocus onClick={handleCloseEditPass}>Cancelar</Button>
                        <Button onClick={saveEditPassAdmin} autoFocus>Guardar</Button>
                    </div>                                    
                  </DialogContent>
                </Dialog>
              </ThemeProvider>

            </div>
            )}
            {tipoUsuario === 'profesor' && (
              <div>
                <table>
                <tbody>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold'}} align='right'>Email</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.email}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Telefono</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.num_tel_p}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Contraseña</td>
                  <td><button className='actionButton editButton' onClick={() => handleClickOpenEditPass(userData.id)}><HiPencil size={20}/></button></td></tr>
                </tbody>
                </table>

                {/* ------------ Dialog Editar pass ------------ */}
                <ThemeProvider theme={theme}>
                  <Dialog open={openEditPass} onClose={handleCloseEditPass}>
                    <DialogContent>
                      <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar contraseña: {userData.nombre} </p>
                      <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                          <div style={{margin:'5px'}}>
                          <p style={{marginTop:'15px'}}>&nbsp;Contraseña</p>
                              <input className='inputTextDialog' type='password' onChange={handleChangeEditPass} name='editPass'/>
                              <p style={{fontSize:'12px'}}>&nbsp; {editPass.contraseña}</p>
                              <br/>
                          </div>
                          <Button autoFocus onClick={handleCloseEditPass}>Cancelar</Button>
                          <Button onClick={saveEditPassProfesor} autoFocus>Guardar</Button>
                      </div>                                    
                    </DialogContent>
                  </Dialog>
                </ThemeProvider>

              </div>
            )}
            {tipoUsuario === 'alumno' && (
              <div>
                <table>
                <tbody>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold'}} align='right'>Email</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.email}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold'}} align='right'>Edad</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.edad}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>CURP</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.curp}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Telefono</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.num_tel_a}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Domicilio</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.domicilio}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Fecha de inicio</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.fecha_inicio}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Turno</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.turno}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Tutor</td>
                  <td className='inputTextDialog' style={{padding: '0 30px'}}>{userData.tutor}</td></tr>
                  <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Contraseña</td>
                  <td><button className='actionButton editButton' onClick={() => handleClickOpenEditPass(userData.id)}><HiPencil size={20}/></button></td></tr>
                </tbody>
                </table>

                {/* ------------ Dialog Editar pass ------------ */}
                <ThemeProvider theme={theme}>
                  <Dialog open={openEditPass} onClose={handleCloseEditPass}>
                    <DialogContent>
                      <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar contraseña: {userData.nombre} </p>
                      <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                          <div style={{margin:'5px'}}>
                          <p style={{marginTop:'15px'}}>&nbsp;Contraseña</p>
                              <input className='inputTextDialog' type='password' onChange={handleChangeEditPass} name='editPass'/>
                              <p style={{fontSize:'12px'}}>&nbsp; {editPass.contraseña}</p>
                              <br/>
                          </div>
                          <Button autoFocus onClick={handleCloseEditPass}>Cancelar</Button>
                          <Button onClick={saveEditPassAlumno} autoFocus>Guardar</Button>
                      </div>                                    
                    </DialogContent>
                  </Dialog>
                </ThemeProvider>

              </div>
            )}
            <div style={{height:"100px"}}></div>
        </div>
    </div>
  );
}

export default Usuario;
//rama calendario estudiantes
import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import {HiMagnifyingGlass, HiTrash, HiPencil, HiPencilSquare} from 'react-icons/hi2';
import {HiPlus} from 'react-icons/hi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import apic from '../../../../services/api';
import './maestros.css';


function Maestros({isMobile}) {
  const [openEditNombre, setOpenEditNombre] = useState(false);
  const [openEditTel, setOpenEditTel] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditPass, setOpenEditPass] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);

  //GET
  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const estudiantesData = await apic.get('/profesores/');
      setEstudiantes(estudiantesData);
      console.log("Respuesta de la API:", estudiantesData);
      console.log("json estuiantes: ", estudiantes);
    } catch (error) {
      console.error('Error al obtener las luces:', error);
    }
  };

  const [editNombre, setEditNombre] = useState({ id: '', nombre: '' });
  const [editTel, setEditTel] = useState({ id: '',nombre:'', tel:''});
  const [editEmail, setEditEmail] = useState({ id: '',nombre:'', email:''});
  const [editPass, setEditPass] = useState({ id: '',nombre:'', pass: '' });
  const [nombreDelete, setNombreDelete] = useState({ id: '', nombre: '' });
  const [nombreAdd, setNombreAdd] = useState({nombre: '' });

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
  
  //Abrir y cerrar dialog editar nombre maestro
  const handleClickOpenEditNombre = (id, nombre) => {
    setEditNombre({ id, nombre });
    setOpenEditNombre(true);
  };

  const handleCloseEditNombre = () => {
    setOpenEditNombre(false);
  };
  const handleChangeEditNombre = (event) => {
    setEditNombre({ ...editNombre, nombre: event.target.value });
  };

  const saveEditNombre = () => {
    console.log(editNombre);
    handleCloseEditNombre();

  };

  //Abrir y cerrar dialog editar tel maestro
  const handleClickOpenEditTel = (id, nombre, tel) => {
    setEditTel({ id, nombre, tel });
    setOpenEditTel(true);
  };
  const handleCloseEditTel = () => {
    setOpenEditTel(false);
  };
  const handleChangeEditTel = (event) => {
    setEditTel({ ...editTel, tel: event.target.value });
  };
  const saveEditTel = () => {
    console.log(editTel);
    handleCloseEditTel();
  };

  //Abrir y cerrar dialog editar email maestro
  const handleClickOpenEditEmail = (id, nombre, email) => {
    setEditEmail({ id, nombre, email });
    setOpenEditEmail(true);
  };
  const handleCloseEditEmail = () => {
    setOpenEditEmail(false);
  };
  const handleChangeEditEmail = (event) => {
    setEditEmail({ ...editEmail, email: event.target.value });
  };
  const saveEditEmail = () => {
    console.log(editEmail);
    handleCloseEditEmail();
  };

  //Abrir y cerrar dialog editar pass maestro
  const handleClickOpenEditPass = (id, nombre) => {
    setEditPass({ id, nombre });
    setOpenEditPass(true);
  };
  const handleCloseEditPass = () => {
    setOpenEditPass(false);
  };
  const handleChangeEditPass = (event) => {
    setEditPass({ ...editPass, pass: event.target.value });
  };
  const saveEditPass = () => {
    console.log(editPass);
    handleCloseEditPass();
  };


  //Abrir y cerrar dialog agregar maestro
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
  setOpenAdd(false);
  };

  const handleChangeOpenAdd = (event) => {
    setNombreAdd({ ...nombreAdd, nombre: event.target.value });
  };

  const saveNombreAdd = () =>{
    console.log(nombreAdd);
    handleCloseAdd();
  };

  //Abrir y cerrar dialog eliminar maestro
  const handleClickOpenDelete = (id, nombre) => {
    setNombreDelete({ id, nombre });
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const saveNombreDelete = () =>{
    console.log(nombreDelete);
    handleCloseDelete();
  };

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Maestros" />}
        <div className='aMaestrosCont'>
          {isMobile && <p className='WelcomeMsg'>Maestros</p>}
          
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between'}}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar alumno" inputProps={{ 'aria-label': 'search google maps' }}/>
                <IconButton type="button" sx={{ p: '10px', color:'white', backgroundColor:'#073cc3','&:hover': {backgroundColor: '#05236f',}, }} aria-label="search">
                    <HiMagnifyingGlass />
                </IconButton>
            </Paper>
            <Button startIcon={<HiPlus style={{backgroundColor:'073cc3', padding:'3px', color:'white', borderRadius:'50px'}} size={'35px'} />} 
                    sx={{backgroundColor:'white', borderRadius:'50px', paddingRight:'15px','&:hover': {backgroundColor: 'white', boxShadow:'0px 5px 10px 0px rgba(0, 0, 0, 0.400)'},}}
                    onClick={() => handleClickOpenAdd()}>
                Agregar
            </Button>
          </div>
          
          <span>&emsp; * Se recomienda usar vista para ordenador<br/><br/></span>
          <div className='tableContainer'>
            <table cellSpacing='0px'>
                 <tr style={{fontWeight:'bold'}}>
                  <td align='center' style={{padding:'10px'}}>Nombre</td>
                  <td align='center' style={{padding:'10px'}}>Telefono</td> <td align='center' style={{padding:'10px'}}>Email</td> 
                  <td align='center' style={{padding:'10px'}}>Contraseña</td> <td align='center' style={{padding:'10px'}}>Eliminar</td>
                </tr>
                {estudiantes && estudiantes.map((EstudiantesObj, index) => ( 
                    <tr key={EstudiantesObj.id_profesor}>
                      <td style={{backgroundColor:'white', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap', borderTopLeftRadius: index === 0 ? '15px':'0px', borderBottomLeftRadius: index === estudiantes.length-1 ? '15px':'0px'}}>
                        {EstudiantesObj.nombre}&emsp;
                        <button className='actionButton' title='Editar nombre' onClick={() => handleClickOpenEditNombre(EstudiantesObj.id_profesor, EstudiantesObj.nombre)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.num_tel_p}&emsp;
                        <button className='actionButton' title='Editar telefono' onClick={() => handleClickOpenEditTel(EstudiantesObj.id_profesor, EstudiantesObj.nombre, EstudiantesObj.num_tel_p)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.email}&emsp;
                        <button className='actionButton' title='Editar email' onClick={() => handleClickOpenEditEmail(EstudiantesObj.id_profesor, EstudiantesObj.nombre, EstudiantesObj.email)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 1px', width:'auto-fit'}} align='center'>
                        <button className='actionButton editButton' onClick={() => handleClickOpenEditPass(EstudiantesObj.id_profesor, EstudiantesObj.nombre)}><HiPencil/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit', borderBottomRightRadius: index === estudiantes.length-1 ? '15px': '0', borderTopRightRadius: index === 0 ? '15px':'0px'}} align='center'>
                        <button className='actionButton deleteButton' onClick={() => handleClickOpenDelete(EstudiantesObj.id_profesor, EstudiantesObj.nombre)}><HiTrash/></button>
                      </td>
                    </tr>
                ))}
            </table>
          </div>

          {/* ------------ Dialog Editar nombre ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditNombre} onClose={handleCloseEditNombre}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar nombre de estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' value={editNombre.nombre} onChange={handleChangeEditNombre} name='editNombre'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editNombre.nombre}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditNombre}>Cancelar</Button>
                    <Button onClick={saveEditNombre} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Agregar maestro ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Agregar maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' value={nombreAdd.nombre} onChange={handleChangeOpenAdd} name='maestroAdd'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {nombreAdd.nombre}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseAdd}>Cancelar</Button>
                    <Button onClick={saveNombreAdd} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Eliminar maestro ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openDelete} onClose={handleCloseDelete}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Eliminar maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'25px 0px 50px 0px', display:'flex', alignContent:'center', justifyContent:'center'}}>
                      <p align="center">¿Seguro que quiere eliminar al maestro <b>{nombreDelete.nombre}</b>?</p>
                    </div>
                    <Button autoFocus onClick={handleCloseDelete}>Cancelar</Button>
                    <Button onClick={saveNombreDelete} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>
        </div>
    </div>
  );
}

export default Maestros;
//rama  modulos
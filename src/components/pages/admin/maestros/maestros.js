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
  const [maestros, setMaestros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaestros, setFilteredMaestros] = useState([]);

  //GET
  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    try {
      const profesoresData = await apic.get('/profesores/');
      setMaestros(profesoresData);
      console.log("Respuesta de la API:", profesoresData);
      console.log("json maestros: ", maestros);
    } catch (error) {
      console.error('Error al obtener maestros:', error);
    }
  };
  const DeleteProfesores = async (id) => {
    try {
      const profesoresDelete = await apic.delete(`/profesores/${id}`);
      console.log('Maestro eliminado correctamente:', profesoresDelete);
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };

  const AddProfesores = async (profesores) => {
    try {
      const profesoresAdd = await apic.post('/profesores/', profesores);
      console.log("Maestro agregado correctamente:", profesoresAdd);
    } catch (error) {
      console.error('Error al agregar el estudiante', error);
    }
  };

  const [idEditPass, setIdEditPass] = useState();
  const [editPass, setEditPass] = useState({contraseña:''});
  const [maestroDelete, setMaestroDelete] = useState({ id: '', nombre: '' });
  const [maestrosAdd, setMaestrosAdd] = useState({nombre: '', num_tel_p:'', email:'', contraseña:'' });
  const [idEditMaestro, setIdEditMaestro] = useState();
  const [editMaestro, setEditMaestro] = useState({nombre: '', num_tel_p:'', email:''});

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

  // Función para filtrar maestros por nombre
  const filterMaestros = () => {
    const filtered = maestros.filter(maestros =>
      maestros.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaestros(filtered);
  };
  
  //Abrir y cerrar dialog editar nombre maestro
  const handleClickOpenEditNombre = (maestro) => {
    const {id, nombre, num_tel_p, email} = maestro;
    setIdEditMaestro(id);
    setEditMaestro({nombre, num_tel_p, email});
    setOpenEditNombre(true);
  };

  const handleCloseEditNombre = () => {
    setOpenEditNombre(false);
  };
  const handleChangeEditNombre = (event) => {
    setEditMaestro({ ...editMaestro, nombre: event.target.value });
  };

  const saveEditNombre = () => {
    console.log(idEditMaestro);
    console.log(editMaestro);
    handleCloseEditNombre();

  };

  //Abrir y cerrar dialog editar tel maestro
  const handleClickOpenEditTel = (maestro) => {
    const {id, nombre, num_tel_p, email} = maestro;
    setIdEditMaestro(id);
    setEditMaestro({nombre, num_tel_p, email});
    setOpenEditTel(true);
  };
  const handleCloseEditTel = () => {
    setOpenEditTel(false);
  };
  const handleChangeEditTel = (event) => {
    setEditMaestro({ ...editMaestro, num_tel_p: event.target.value });
  };
  const saveEditTel = () => {
    console.log(idEditMaestro);
    console.log(editMaestro);
    handleCloseEditTel();
  };

  //Abrir y cerrar dialog editar email maestro
  const handleClickOpenEditEmail = (maestro) => {
    const {id, nombre, num_tel_p, email} = maestro;
    setIdEditMaestro(id);
    setEditMaestro({nombre, num_tel_p, email});
    setOpenEditEmail(true);
  };
  const handleCloseEditEmail = () => {
    setOpenEditEmail(false);
  };
  const handleChangeEditEmail = (event) => {
    setEditMaestro({ ...editMaestro, email: event.target.value });
  };
  const saveEditEmail = () => {
    console.log(idEditMaestro);
    console.log(editMaestro);
    handleCloseEditEmail();
  };

  //Abrir y cerrar dialog editar pass maestro
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
  const saveEditPass = () => {
    console.log(idEditPass);
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
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setMaestrosAdd((prevMaestrosAdd) => ({
        ...prevMaestrosAdd,
        [name]: value,
      }));
    };
    const saveMaestrosAdd = () =>{
      console.log(maestrosAdd);
      AddProfesores(maestrosAdd); 
      handleCloseAdd();
    };
  
    //Abrir y cerrar dialog eliminar maestro
    const handleClickOpenDelete = (id, nombre) => {
      setMaestroDelete({ id, nombre });
      setOpenDelete(true);
    };
  
    const handleCloseDelete = () => {
      setOpenDelete(false);
    };
  
    const saveMaestrosDelete = () =>{
      console.log(maestroDelete);
      DeleteProfesores(maestroDelete.id);
      handleCloseDelete();
    };

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Maestros" />}
        <div className='aMaestrosCont'>
          {isMobile && <p className='WelcomeMsg'>Maestros</p>}
          
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between'}}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar alumno" inputProps={{ 'aria-label': 'search google maps' }} value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); filterMaestros(e.target.value);}}/>
                <IconButton type="button" sx={{ p: '10px', color:'white', backgroundColor:'#073cc3','&:hover': {backgroundColor: '#05236f',}, }} aria-label="search" onClick={filterMaestros}>
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
            <table cellSpacing='0px' style={{minWidth:'100%'}}>
                 <tr style={{fontWeight:'bold'}}>
                  <td align='center' style={{padding:'10px'}}>Nombre</td>
                  <td align='center' style={{padding:'10px'}}>Telefono</td> <td align='center' style={{padding:'10px'}}>Email</td> 
                  <td align='center' style={{padding:'10px'}}>Contraseña</td> <td align='center' style={{padding:'10px'}}>Eliminar</td>
                </tr>
                
                {(filteredMaestros.length > 0 ? filteredMaestros : maestros).map((MaestrosObj, index) => ( 
                    <tr key={MaestrosObj.id}>
                      <td style={{backgroundColor:'white', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap', borderTopLeftRadius: index === 0 ? '15px':'0px', borderBottomLeftRadius: index === maestros.length-1 ? '15px':'0px'}}>
                        {MaestrosObj.nombre}&emsp;
                        <button className='actionButton' title='Editar nombre' onClick={() => handleClickOpenEditNombre(MaestrosObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {MaestrosObj.num_tel_p}&emsp;
                        <button className='actionButton' title='Editar telefono' onClick={() => handleClickOpenEditTel(MaestrosObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {MaestrosObj.email}&emsp;
                        <button className='actionButton' title='Editar email' onClick={() => handleClickOpenEditEmail(MaestrosObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 1px', width:'auto-fit'}} align='center'>
                        <button className='actionButton editButton' onClick={() => handleClickOpenEditPass(MaestrosObj.id)}><HiPencil/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit', borderBottomRightRadius: index === maestros.length-1 ? '15px': '0', borderTopRightRadius: index === 0 ? '15px':'0px'}} align='center'>
                        <button className='actionButton deleteButton' onClick={() => handleClickOpenDelete(MaestrosObj.id, MaestrosObj.nombre)}><HiTrash/></button>
                      </td>
                    </tr>
                ))}
            </table>
          </div>

          {/* ------------ Dialog Editar nombre ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditNombre} onClose={handleCloseEditNombre}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar nombre de maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' value={editMaestro.nombre} onChange={handleChangeEditNombre} name='editNombre'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editMaestro.nombre}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditNombre}>Cancelar</Button>
                    <Button onClick={saveEditNombre} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar telefono ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditTel} onClose={handleCloseEditTel}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar telefono de maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Telefono</p>
                        <input className='inputTextDialog' type='text' value={editMaestro.num_tel_p} onChange={handleChangeEditTel} name='editTel'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editMaestro.num_tel_p}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditTel}>Cancelar</Button>
                    <Button onClick={saveEditTel} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar email ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditEmail} onClose={handleCloseEditEmail}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar email de maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Email</p>
                        <input className='inputTextDialog' type='text' value={editMaestro.email} onChange={handleChangeEditEmail} name='editEmail'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editMaestro.email}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditEmail}>Cancelar</Button>
                    <Button onClick={saveEditEmail} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar pass ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditPass} onClose={handleCloseEditPass}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar contraseña: {editPass.nombre} </p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Contraseña</p>
                        <input className='inputTextDialog' type='password' onChange={handleChangeEditPass} name='editPass'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editPass.contraseña}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditPass}>Cancelar</Button>
                    <Button onClick={saveEditPass} autoFocus>Guardar</Button>
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
                        <input className='inputTextDialog' type='text' name='nombre' value={maestrosAdd.nombre} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Telefono</p>
                        <input className='inputTextDialog' type='text' name='num_tel_p' value={maestrosAdd.num_tel_p} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Email</p>
                        <input className='inputTextDialog' type='text' name='email' value={maestrosAdd.email} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Contraseña</p>
                        <input className='inputTextDialog' type='password' name='contraseña' value={maestrosAdd.contraseña} onChange={handleInputChange}/><br/>

                    </div>
                    <Button autoFocus onClick={handleCloseAdd}>Cancelar</Button>
                    <Button onClick={saveMaestrosAdd} autoFocus>Guardar</Button>
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
                      <p align="center">¿Seguro que quiere eliminar al maestro <b>{maestroDelete.nombre}</b>?</p>
                    </div>
                    <Button autoFocus onClick={handleCloseDelete}>Cancelar</Button>
                    <Button onClick={saveMaestrosDelete} autoFocus>Guardar</Button>
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
import React, { useEffect, useState, useRef } from 'react';
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
import './estudiantes.css';

function Estudiantes({isMobile}) {
  const [openEditNombre, setOpenEditNombre] = useState(false);
  const [openEditEdad, setOpenEditEdad] = useState(false);
  const [openEditTel, setOpenEditTel] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditTurno, setOpenEditTurno] = useState(false);
  const [openEditPass, setOpenEditPass] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);

  //GET
  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const estudiantesData = await apic.get('/alumnos/');
      setEstudiantes(estudiantesData);
      console.log("Respuesta de la API:", estudiantesData);
      console.log("json estuiantes: ", estudiantes);
    } catch (error) {
      console.error('Error al obtener las luces:', error);
    }
  };

  //aqui del api se van a hacer una query con todos los alumnos menos los del ai que estén en el json de los estudiantes
  //const estudiantes=[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}, {'id':'4', 'nombre':'Heribert'}, {"id":"5",'nombre':'Angel Mioses Cruz'}, {'id': '6','nombre': "Yolotzin Groth"}, {'id':'7', 'nombre':'Bryan Valerio'},{"id":"8",'nombre':'Anl Mioses Cruz'},{"id":"9",'nombre':'Angel Mies Cruz'}]

  const [editNombre, setEditNombre] = useState({ id: '',nombre:''});
  const [editEdad, setEditEdad] = useState({ id: '',nombre:'', edad:''});
  const [editTel, setEditTel] = useState({ id: '',nombre:'', tel:''});
  const [editEmail, setEditEmail] = useState({ id: '',nombre:'', email:''});
  const [editTurno, setEditTurno] = useState({ id: '',nombre:'', turno:''});
  const [editPass, setEditPass] = useState({ id: '',nombre:'', pass: '' });
  const [estudianteDelete, setEstudianteDelete] = useState({ id: '', nombre: '' });
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

   // Función para filtrar estudiantes por nombre
   const filterEstudiantes = () => {
    const filtered = estudiantes.filter(estudiante =>
      estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEstudiantes(filtered);
  };

  
  //Abrir y cerrar dialog editar nombre estudiantes
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

  //Abrir y cerrar dialog editar edad estudiantes
  const handleClickOpenEditEdad = (id, nombre, edad) => {
    setEditEdad({ id, nombre, edad });
    setOpenEditEdad(true);
  };
  const handleCloseEditEdad = () => {
    setOpenEditEdad(false);
  };
  const handleChangeEditEdad = (event) => {
    setEditEdad({ ...editEdad, edad: event.target.value });
  };
  const saveEditEdad = () => {
    console.log(editEdad);
    handleCloseEditEdad();
  };

  //Abrir y cerrar dialog editar tel estudiantes
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

  //Abrir y cerrar dialog editar email estudiantes
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

  //Abrir y cerrar dialog editar turno estudiantes
  const handleClickOpenEditTurno = (id, nombre, turno) => {
    setEditTurno({ id, nombre, turno });
    setOpenEditTurno(true);
  };
  const handleCloseEditTurno = () => {
    setOpenEditTurno(false);
  };
  const handleChangeEditTurno = (event) => {
    setEditTurno({ ...editTurno, turno: event.target.value });
  };
  const saveEditTurno = () => {
    console.log(editTurno);
    handleCloseEditTurno();
  };

  //Abrir y cerrar dialog editar pass estudiantes
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

  //Abrir y cerrar dialog agregar estudiantes
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

  //Abrir y cerrar dialog eliminar estudiantes
  const handleClickOpenDelete = (id, nombre) => {
    setEstudianteDelete({ id, nombre });
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const saveEstudianteDelete = () =>{
    console.log(estudianteDelete);
    handleCloseDelete();
  };

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Estudiantes"/>}
        <div className='aEstudiantesCont'>
          {isMobile && <p className='WelcomeMsg'>Estudiantes</p>}
          
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between'}}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar alumno" inputProps={{ 'aria-label': 'search google maps' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
                 <IconButton type="button" sx={{p: '10px',color: 'white',backgroundColor: '#073cc3','&:hover': { backgroundColor: '#05236f', },
            }}
            aria-label="search"
            onClick={filterEstudiantes}
          >
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
                  <td align='center' style={{padding: ' 10px'}}>clave</td> <td align='center' style={{padding:'10px'}}>Nombre</td> <td align='center' style={{padding:'10px'}}>Edad</td> <td align='center' style={{padding:'10px'}}>CURP</td> 
                  <td align='center' style={{padding:'10px'}}>domicilio</td> <td align='center' style={{padding:'10px'}}>Telefono</td> <td align='center' style={{padding:'10px'}}>Email</td> <td align='center' style={{padding:'10px'}}>Turno</td> 
                  <td align='center' style={{padding:'10px'}}>Tutor</td> <td align='center' style={{padding:'10px'}}>Contraseña</td> <td align='center' style={{padding:'10px'}}>Eliminar</td>
                </tr>
                {(filteredEstudiantes.length > 0 ? filteredEstudiantes : estudiantes).map((EstudiantesObj, index) => (
                    <tr key={EstudiantesObj.id_alumno}>
                      <td style={{backgroundColor:'white', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap', borderTopLeftRadius: index === 0 ? '15px':'0px', borderBottomLeftRadius: index === estudiantes.length-1 ? '15px':'0px'}}>
                        {EstudiantesObj.clave}
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.nombre}&emsp;
                        <button className='actionButton' title='Editar nombre' onClick={() => handleClickOpenEditNombre(EstudiantesObj.id_alumno, EstudiantesObj.nombre)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}} align='center'>
                        {EstudiantesObj.edad}&emsp;
                        <button className='actionButton' title='Editar edad' onClick={() => handleClickOpenEditEdad(EstudiantesObj.id_alumno, EstudiantesObj.nombre, EstudiantesObj.edad)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.curp}
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.domicilio}
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.num_tel_a}&emsp;
                        <button className='actionButton' title='Editar telefono' onClick={() => handleClickOpenEditTel(EstudiantesObj.id_alumno, EstudiantesObj.nombre, EstudiantesObj.num_tel_a)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.email}&emsp;
                        <button className='actionButton' title='Editar email' onClick={() => handleClickOpenEditEmail(EstudiantesObj.id_alumno, EstudiantesObj.nombre, EstudiantesObj.email)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.turno}&emsp;
                        <button className='actionButton' title='Editar turno' onClick={() => handleClickOpenEditTurno(EstudiantesObj.id_alumno, EstudiantesObj.nombre, EstudiantesObj.turno)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.tutor}
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 1px', width:'auto-fit'}} align='center'>
                        <button className='actionButton editButton' onClick={() => handleClickOpenEditPass(EstudiantesObj.id_alumno, EstudiantesObj.nombre)}><HiPencil/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit', borderBottomRightRadius: index === estudiantes.length-1 ? '15px': '0', borderTopRightRadius: index === 0 ? '15px':'0px'}} align='center'>
                        <button className='actionButton deleteButton' onClick={() => handleClickOpenDelete(EstudiantesObj.id_alumno, EstudiantesObj.nombre)}><HiTrash/></button>
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

          {/* ------------ Dialog Editar edad ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditEdad} onClose={handleCloseEditEdad}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar edad de estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;edad</p>
                        <input className='inputTextDialog' type='text' value={editEdad.edad} onChange={handleChangeEditEdad} name='editEdad'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEdad.edad}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditEdad}>Cancelar</Button>
                    <Button onClick={saveEditEdad} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar Tel ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditTel} onClose={handleCloseEditTel}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar telefono de estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;telefono</p>
                        <input className='inputTextDialog' type='text' value={editTel.tel} onChange={handleChangeEditTel} name='editTel'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editTel.tel}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditTel}>Cancelar</Button>
                    <Button onClick={saveEditTel} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar Email ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditEmail} onClose={handleCloseEditEmail}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar email de estudiante</p>
                <div style={{backgroundColor:'white', bordtelefonoerRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;email</p>
                        <input className='inputTextDialog' type='text' value={editEmail.email} onChange={handleChangeEditEmail} name='editEmail'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEmail.email}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditEmail}>Cancelar</Button>
                    <Button onClick={saveEditEmail} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar Turno ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditTurno} onClose={handleCloseEditTurno}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar turno de estudiante</p>
                <div style={{backgroundColor:'white', bordtelefonoerRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Turno</p>
                        <input className='inputTextDialog' type='text' value={editTurno.turno} onChange={handleChangeEditTurno} name='editTurno'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEmail.email}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditTurno}>Cancelar</Button>
                    <Button onClick={saveEditTurno} autoFocus>Guardar</Button>
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
                        <p style={{fontSize:'12px'}}>&nbsp; {editPass.pass}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditPass}>Cancelar</Button>
                    <Button onClick={saveEditPass} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Agregar estudiantes ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Agregar estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' value={nombreAdd.nombre} onChange={handleChangeOpenAdd} name='estudiantesAdd'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {nombreAdd.nombre}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseAdd}>Cancelar</Button>
                    <Button onClick={saveNombreAdd} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Eliminar estudiantes ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openDelete} onClose={handleCloseDelete}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Eliminar estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'25px 0px 50px 0px', display:'flex', alignContent:'center', justifyContent:'center'}}>
                      <p align="center">¿Seguro que quiere eliminar al estudiante <b>{estudianteDelete.nombre}</b>?</p>
                    </div>
                    <Button autoFocus onClick={handleCloseDelete}>Cancelar</Button>
                    <Button onClick={saveEstudianteDelete} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>
        </div>
    </div>
  );
}

export default Estudiantes;
//rama  modulos
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
import './estudiantes.css';

function Estudiantes({isMobile}) {
  const [openEditNombre, setOpenEditNombre] = useState(false);
  const [openEditEdad, setOpenEditEdad] = useState(false);
  const [openEditCurp, setOpenEditCurp] = useState(false);
  const [openEditDomicilio, setOpenEditDomicilio] = useState(false);
  const [openEditTel, setOpenEditTel] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditTurno, setOpenEditTurno] = useState(false);
  const [openEditTutor, setOpenEditTutor] = useState(false);
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
      console.error('Error al obtener los estudiantes:', error);
    }
  };

  const DeleteAlumnos = async (id) => {
    try {
      const estudiantesDelete = await apic.delete(`/alumnos/${id}`);
      console.log('Estudiante eliminado correctamente:', estudiantesDelete);
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };

  const AddAlumnos = async (estudiantes) => {
    try {
      const estudiantesAdd = await apic.post('/alumnos/', estudiantes);
      console.log("Estudiante agregado correctamente:", estudiantesAdd);
    } catch (error) {
      console.error('Error al agregar el estudiante', error);
    }
  };

  const UpdateAlumnos = async (id, estudiantes) => {
    try {
      const estudiantesUpdate = await apic.put(`/alumnos/${id}`, estudiantes);
      console.log('Estudiante actualizado correctamente:', estudiantesUpdate);
    } catch (error) {
      console.error('Error al actualizar  el estudiante:', error);
    }
  };
  const UpdatePassAlumnos = async (id, contraseña) => {
    try {
      const estudiantesUpdate = await apic.put(`/alumnos/pass/${id}`, contraseña);
      console.log('Estudiante actualizado correctamente:', estudiantesUpdate);
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };

  const [editPass, setEditPass] = useState({contraseña:''});
  const [idEditPass, setIdEditPass] = useState();
  const [estudianteDelete, setEstudianteDelete] = useState({ id: '', nombre: '' });
  const [estudianteAdd, setEstudianteAdd] = useState({nombre: '', clave: '', edad: '', curp:'', domicilio:'', num_tel_a:'', email:'', turno:'', fecha_inicio:'', contraseña:'', tutor:'' });
  const [idEditEstudiante, setIdEditEstudiante] = useState();
  const [editEstudiante, setEditEstudiante] = useState({nombre: '', clave: '', edad: '', curp:'', domicilio:'', num_tel_a:'', email:'', turno:'', fecha_inicio:'', tutor:'' });

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
  const handleClickOpenEditNombre = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditNombre(true);
  };
  const handleCloseEditNombre = () => {
    setOpenEditNombre(false);
  };
  const handleChangeEditNombre = (event) => {
    setEditEstudiante({ ...editEstudiante, nombre: event.target.value });
  };
  const saveEditNombre = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    UpdateAlumnos(idEditEstudiante,editEstudiante);
    handleCloseEditNombre();
  };

  //Abrir y cerrar dialog editar edad estudiantes
  const handleClickOpenEditEdad = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditEdad(true);
};
  const handleCloseEditEdad = () => {
    setOpenEditEdad(false);
  };
  const handleChangeEditEdad = (event) => {
    setEditEstudiante({ ...editEstudiante, edad: event.target.value });
  };
  const saveEditEdad = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditEdad();
  };

  //Abrir y cerrar dialog editar curp estudiantes
  const handleClickOpenEditCurp = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditCurp(true);
  };
  const handleCloseEditCurp = () => {
    setOpenEditCurp(false);
  };
  const handleChangeEditCurp = (event) => {
    setEditEstudiante({ ...editEstudiante, curp: event.target.value });
  };
  const saveEditCurp = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditCurp();
  };

  //Abrir y cerrar dialog editar domicilio estudiantes
  const handleClickOpenEditDomicilio = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditDomicilio(true);
  };
  const handleCloseEditDomicilio = () => {
    setOpenEditDomicilio(false);
  };
  const handleChangeEditDomicilio = (event) => {
    setEditEstudiante({ ...editEstudiante, domicilio: event.target.value });
  };
  const saveEditDomicilio = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditDomicilio();
  };

  //Abrir y cerrar dialog editar tel estudiantes
  const handleClickOpenEditTel = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditTel(true);
  };
  const handleCloseEditTel = () => {
    setOpenEditTel(false);
  };
  const handleChangeEditTel = (event) => {
    setEditEstudiante({ ...editEstudiante, num_tel_a: event.target.value });
  };
  const saveEditTel = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditTel();
  };

  //Abrir y cerrar dialog editar email estudiantes
  const handleClickOpenEditEmail = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditEmail(true);
  };
  const handleCloseEditEmail = () => {
    setOpenEditEmail(false);
  };
  const handleChangeEditEmail = (event) => {
    setEditEstudiante({ ...editEstudiante, email: event.target.value });
  };
  const saveEditEmail = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditEmail();
  };

  //Abrir y cerrar dialog editar turno estudiantes
  const handleClickOpenEditTurno = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditTurno(true);
  };
  const handleCloseEditTurno = () => {
    setOpenEditTurno(false);
  };
  const handleChangeEditTurno = (event) => {
    setEditEstudiante({ ...editEstudiante, turno: event.target.value });
  };
  const saveEditTurno = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditTurno();
  };

  //Abrir y cerrar dialog editar tutor estudiantes
  const handleClickOpenEditTutor = (estudiante) => {
    const {id, nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor } = estudiante;
    setIdEditEstudiante(id);
    setEditEstudiante({nombre, clave, edad, curp, domicilio, num_tel_a, email, turno, fecha_inicio, tutor });
    setOpenEditTutor(true);
  };
  const handleCloseEditTutor = () => {
    setOpenEditTutor(false);
  };
  const handleChangeEditTutor = (event) => {
    setEditEstudiante({ ...editEstudiante, tutor: event.target.value });
  };
  const saveEditTutor = () => {
    console.log(idEditEstudiante);
    console.log(editEstudiante);
    handleCloseEditTutor();
  };

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
  const saveEditPass = () => {
    console.log(idEditPass);
    console.log(editPass);
    UpdatePassAlumnos(idEditEstudiante,editPass);
    handleCloseEditPass();
  };

  //Abrir y cerrar dialog agregar estudiantes
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
  setOpenAdd(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudianteAdd((prevEstudianteAdd) => ({
      ...prevEstudianteAdd,
      [name]: value,
    }));
  };
  const saveEstudianteAdd = () =>{
    console.log(estudianteAdd);
    AddAlumnos(estudianteAdd); 
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
    DeleteAlumnos(estudianteDelete.id);
    handleCloseDelete();
  };

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Estudiantes"/>}
        <div className='aEstudiantesCont'>
          {isMobile && <p className='WelcomeMsg'>Estudiantes</p>}
          
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between'}}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar alumno" inputProps={{ 'aria-label': 'search google maps' }} value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); filterEstudiantes(e.target.value);}}/>
                <IconButton type="button" sx={{ p: '10px', color:'white', backgroundColor:'#073cc3','&:hover': {backgroundColor: '#05236f',}, }} aria-label="search" onClick={filterEstudiantes}>
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
                    <tr key={EstudiantesObj.id}>
                      <td style={{backgroundColor:'white', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap', borderTopLeftRadius: index === 0 ? '15px':'0px', borderBottomLeftRadius: index === estudiantes.length-1 ? '15px':'0px'}}>
                        {EstudiantesObj.clave}
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.nombre}&emsp;
                        <button className='actionButton' title='Editar nombre' onClick={() => handleClickOpenEditNombre(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}} align='center'>
                        {EstudiantesObj.edad}&emsp;
                        <button className='actionButton' title='Editar edad' onClick={() => handleClickOpenEditEdad(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.curp}&emsp;
                        <button className='actionButton' title='Editar curp' onClick={() => handleClickOpenEditCurp(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.domicilio}&emsp;
                        <button className='actionButton' title='Editar domicilio' onClick={() => handleClickOpenEditDomicilio(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.num_tel_a}&emsp;
                        <button className='actionButton' title='Editar telefono' onClick={() => handleClickOpenEditTel(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.email}&emsp;
                        <button className='actionButton' title='Editar email' onClick={() => handleClickOpenEditEmail(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.turno}&emsp;
                        <button className='actionButton' title='Editar turno' onClick={() => handleClickOpenEditTurno(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                        {EstudiantesObj.tutor}&emsp;
                        <button className='actionButton' title='Editar tutor' onClick={() => handleClickOpenEditTutor(EstudiantesObj)}><HiPencilSquare/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 1px', width:'auto-fit'}} align='center'>
                        <button className='actionButton editButton' onClick={() => handleClickOpenEditPass(EstudiantesObj.id)}><HiPencil/></button>
                      </td>
                      <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit', borderBottomRightRadius: index === estudiantes.length-1 ? '15px': '0', borderTopRightRadius: index === 0 ? '15px':'0px'}} align='center'>
                        <button className='actionButton deleteButton' onClick={() => handleClickOpenDelete(EstudiantesObj.id, EstudiantesObj.nombre)}><HiTrash/></button>
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
                        <input className='inputTextDialog' type='text' value={editEstudiante.nombre} onChange={handleChangeEditNombre} name='editNombre'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.nombre}</p>
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
                        <input className='inputTextDialog' type='text' value={editEstudiante.edad} onChange={handleChangeEditEdad} name='editEdad'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.edad}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditEdad}>Cancelar</Button>
                    <Button onClick={saveEditEdad} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar curp ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditCurp} onClose={handleCloseEditCurp}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar CURP de estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;CURP</p>
                        <input className='inputTextDialog' type='text' value={editEstudiante.curp} onChange={handleChangeEditCurp} name='editCurp'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.curp}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditCurp}>Cancelar</Button>
                    <Button onClick={saveEditCurp} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar Domicilio ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditDomicilio} onClose={handleCloseEditDomicilio}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar domicilio de estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;domicilio</p>
                        <input className='inputTextDialog' type='text' value={editEstudiante.domicilio} onChange={handleChangeEditDomicilio} name='editDomicilio'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.domicilio}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditDomicilio}>Cancelar</Button>
                    <Button onClick={saveEditDomicilio} autoFocus>Guardar</Button>
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
                        <input className='inputTextDialog' type='text' value={editEstudiante.num_tel_a} onChange={handleChangeEditTel} name='editTel'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.num_tel_a}</p>
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
                        <input className='inputTextDialog' type='text' value={editEstudiante.email} onChange={handleChangeEditEmail} name='editEmail'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.email}</p>
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
                        <input className='inputTextDialog' type='text' value={editEstudiante.turno} onChange={handleChangeEditTurno} name='editTurno'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.email}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditTurno}>Cancelar</Button>
                    <Button onClick={saveEditTurno} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar Tutor ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditTutor} onClose={handleCloseEditTutor}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar tutor de estudiante</p>
                <div style={{backgroundColor:'white', bordtelefonoerRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Tutor</p>
                        <input className='inputTextDialog' type='text' value={editEstudiante.tutor} onChange={handleChangeEditTutor} name='editTutor'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editEstudiante.tutor}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditTutor}>Cancelar</Button>
                    <Button onClick={saveEditTutor} autoFocus>Guardar</Button>
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

          {/* ------------ Dialog Agregar estudiantes ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Agregar estudiante</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' name='nombre' value={estudianteAdd.nombre} onChange={handleInputChange}/>
                        <br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Clave</p>
                        <input className='inputTextDialog' type='text' name='clave' value={estudianteAdd.clave} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Edad</p>
                        <input className='inputTextDialog' type='text' name='edad' value={estudianteAdd.edad} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;CURP</p>
                        <input className='inputTextDialog' type='text' name='curp' value={estudianteAdd.curp} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Domicilio</p>
                        <input className='inputTextDialog' type='text' name='domicilio' value={estudianteAdd.domicilio} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Telefono</p>
                        <input className='inputTextDialog' type='text' name='num_tel_a' value={estudianteAdd.num_tel_a} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Email</p>
                        <input className='inputTextDialog' type='text' name='email' value={estudianteAdd.email} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Turno</p>
                        <input className='inputTextDialog' type='text' name='turno' value={estudianteAdd.turno} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Fecha inicio</p>
                        <input className='inputTextDialog' type='text' name='fecha_inicio' value={estudianteAdd.fecha_inicio} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Contraseña</p>
                        <input className='inputTextDialog' type='password' name='contraseña' value={estudianteAdd.contraseña} onChange={handleInputChange}/><br/>
                        <p style={{marginTop:'15px'}}>&nbsp;Tutor</p>
                        <input className='inputTextDialog' type='text' name='tutor' value={estudianteAdd.tutor} onChange={handleInputChange}/><br/>
                    </div>
                    <Button autoFocus onClick={handleCloseAdd}>Cancelar</Button>
                    <Button onClick={saveEstudianteAdd} autoFocus>Guardar</Button>
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
                    <Button onClick={saveEstudianteDelete} autoFocus>Eliminar</Button>
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
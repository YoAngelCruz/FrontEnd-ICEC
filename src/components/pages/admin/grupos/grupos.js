import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import apic from '../../../../services/api';
import './grupos.css';
import {HiMagnifyingGlass, HiPencilSquare, HiTrash, HiPencil} from 'react-icons/hi2';
import {HiPlus, HiArrowRight, HiArrowLeft} from 'react-icons/hi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function Grupos({isMobile}) {
  const [grupos, setGrupos] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [alumGrupos, setAlumGrupos] = useState([]);

  const [openEditDescrip, setOpenEditDescrip] = useState(false);
  const [openEditMaestro, setOpenEditMaestro] = useState(false);
  const [openEditModulo, setOpenEditModulo] = useState(false);
  const [openEditList, setOpenEditList] = useState(false);
  const [openEditFechaInicio, setOpenEditFechaInicio] = useState(false);
  const [openEditFechaFin, setOpenEditFechaFin] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGrupos, setFilteredGrupos] = useState([]);

   //GET
  useEffect(() => {

    const fetchGrupos = async () => {
      try {
        const gruposData = await apic.get('/grupos/');
        setGrupos(gruposData);
        gruposData.forEach((grupo) => {
          if (grupo && grupo.id_grupo) {
            fetchAlumnosByGrupo(grupo.id_grupo);
          }
        });
      } catch (error) {
        console.error(error.response.data.error);
      }
    };
  
    const fetchProfesores = async () => {
      try {
        const profesoresData = await apic.get('/profesores/');
        setMaestros(profesoresData);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };

    const fetchAlumnos = async () => {
      try {
        const estudiantesData = await apic.get('/alumnos/');
        setEstudiantes(estudiantesData);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };

    fetchGrupos();
    fetchProfesores();
    fetchAlumnos();
  }, []);

  const fetchAlumnosByGrupo = async (id) => {
    try {
      const alumGrupoData = await apic.get(`/grupos/${id}/alumnos`);
      setAlumGrupos((prevAlumGrupos) => ({
        ...prevAlumGrupos,
        [id]: alumGrupoData,
      }));
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const UpdateGrupo = async (id, grupo) => {
    try {
      const grupoUpdate = await apic.put(`/grupos/${id}`, grupo);
      alert(grupoUpdate.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const inscripciones = async (json) => {
    try {
      const inscripciones = await apic.post('/inscripciones/many', json);
      alert(inscripciones.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const deleteInscrip = async (id) => {
    try {
      const deleteInscrip = await apic.delete(`/inscripciones/${id}`);
      alert(deleteInscrip.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const createGrupo = async (grupo) => {
    try {
      const createGrupo = await apic.post('/grupos',grupo);
      alert(createGrupo.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const deleteGrupo = async (id) => {
    try {
      const deletegrupo = await apic.delete(`/grupos/${id}`);
      alert(deletegrupo.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [pastLeft, setPastLeft] = useState([]);
  const [pastRight, setPastRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const modulos = [{"id_modulo": 1, "nombre": "Introducción"},{"id_modulo": 2, "nombre": "Microsoft Word"},{"id_modulo": 3, "nombre": "Microsoft Excel"},
    {"id_modulo": 4, "nombre": "Microsoft PowerPoint"},{"id_modulo": 5, "nombre": "Microsoft Access"},{"id_modulo": 6, "nombre": "Corel Draw"},
    {"id_modulo": 7, "nombre": "HTML"},{"id_modulo": 8, "nombre": "Photoshop CS6"},{"id_modulo": 9, "nombre": "Java"},
    {"id_modulo": 10, "nombre": "Visual Basic .Net"},{"id_modulo": 11, "nombre": "Análisis y Diseño de Sistemas"}];
  

  const [grupoDelete, setGrupoDelete] = useState({ id: '', nombre: '' });
  const [grupoAdd, setGrupoAdd] = useState({descripcion: '', id_profesor:'', id_modulo:'', fecha_inicio:'', fecha_fin:'', });
  const [idEditGrupo, setIdEditGrupo] = useState();
  const [editGrupo, setEditGrupo] = useState({descripcion: '', id_profesor:'', id_modulo:'', fecha_inicio:'', fecha_fin:''});
  

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

  const themeFecha = createTheme({
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            margin: '10px 0px',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: '#efefef',
            padding:'0px',
            fontFamily:'Product Sans',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: '#828282',
            borderRadius: '10px',
          },
          input: {
            padding: '11px 17px', // Ajustar el padding según sea necesario
          },
        },
      },
    },
  });
  
  // Función para filtrar estudiantes por nombre
  const filterGrupos = () => {
    const filtered = grupos.filter(grupos =>
      grupos.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGrupos(filtered);
  };

  //Abrir y cerrar dialog editar descripcion grupo
  const handleClickOpenEditDescrip = (grupo) => {
    const {id_grupo, descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin} = grupo;
    setIdEditGrupo(id_grupo);
    setEditGrupo({descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin});
    setOpenEditDescrip(true);
  };

  const handleCloseEditDescrip = () => {
    setOpenEditDescrip(false);
  };
  const handleChangeEditDescrip = (event) => {
    setEditGrupo({ ...editGrupo, descripcion: event.target.value });
  };

  const saveEditDescrip = () => {
    UpdateGrupo(idEditGrupo,editGrupo);
    handleCloseEditDescrip();

  };

    //Abrir y cerrar dialog editar fecha inicio grupo
    const handleClickOpenEditFechaInicio = (grupo) => {
      const {id_grupo, descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin} = grupo;
      setIdEditGrupo(id_grupo);
      setEditGrupo({descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin});
      setOpenEditFechaInicio(true);
    };
  
    const handleCloseEditFechaInicio = () => {
      setOpenEditFechaInicio(false);
    };
    const handleChangeEditFechaInicio = (date) => {
      setEditGrupo((prevEditGrupo) => ({
        ...prevEditGrupo,
        fecha_inicio: date.$d,
      }));
    };
  
    const saveEditFechaInicio = () => {
      UpdateGrupo(idEditGrupo,editGrupo);
      handleCloseEditFechaInicio();
    };

    //Abrir y cerrar dialog editar fecha fin grupo
    const handleClickOpenEditFechaFin = (grupo) => {
      const {id_grupo, descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin} = grupo;
      setIdEditGrupo(id_grupo);
      setEditGrupo({descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin});
      setOpenEditFechaFin(true);
    };
  
    const handleCloseEditFechaFin = () => {
      setOpenEditFechaFin(false);
    };
    const handleChangeEditFechaFin = (date) => {
      setEditGrupo((prevEditGrupo) => ({
        ...prevEditGrupo,
        fecha_fin: date.$d,
      }));
    };
  
    const saveEditFechaFin = () => {
      UpdateGrupo(idEditGrupo,editGrupo);
      handleCloseEditFechaFin();
    };

  //Abrir y cerrar dialog editar nombre modulo
  const handleClickOpenEditModulo = (grupo) => {
    const {id_grupo, descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin} = grupo;
    setIdEditGrupo(id_grupo);
    setEditGrupo({descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin});
    setOpenEditModulo(true);
  };

  const handleCloseEditModulo = () => {
    setOpenEditModulo(false);
  };
  const handleChangeEditModulo = (event) => {
    setEditGrupo({ ...editGrupo, id_modulo: Number(event.target.value)  }); 
  };

  const saveEditModulo = () =>{
    UpdateGrupo(idEditGrupo,editGrupo);
    handleCloseEditModulo();
  };

  //Abrir y cerrar dialog editar  maestro
  const handleClickOpenEditMaestro = (grupo) => {
    const {id_grupo, descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin} = grupo;
    setIdEditGrupo(id_grupo);
    setEditGrupo({descripcion, id_profesor, id_modulo, fecha_inicio, fecha_fin});
    setOpenEditMaestro(true);
  };

  const handleCloseEditMaestro = () => {
    setOpenEditMaestro(false);
  };
  const handleChangeEditMaestro = (event) => {
    setEditGrupo({ ...editGrupo, id_profesor: Number(event.target.value)  }); 
  };

  const saveEditMaestro = () =>{
    UpdateGrupo(idEditGrupo,editGrupo);
    handleCloseEditMaestro();
  };

  //Abrir y cerrar dialog agregar grupo
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
  setOpenAdd(false);
  setGrupoAdd({ ...grupoAdd, id_profesor:'', id_modulo:'', fecha_inicio:'', fecha_fin:'' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrupoAdd((prevMaestrosAdd) => ({
      ...prevMaestrosAdd,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setGrupoAdd((prevMaestrosAdd) => ({
      ...prevMaestrosAdd,
      [name]: date.$d,
    }));
  };

  const saveGrupoAdd = () =>{
    createGrupo(grupoAdd);
    handleCloseAdd();
  };

  //Abrir y cerrar dialog eliminar grupo
  const handleClickOpenDelete = (id, nombre) => {
    setGrupoDelete({ id, nombre });
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const saveGrupoDelete = () =>{
    deleteGrupo(grupoDelete.id);
    handleCloseDelete();
  };

  //Abrir y cerrar dialog editar lista
  const handleClickOpenEditList = async (id) => {
    setIdEditGrupo(id);
    // Verificar si ya se han cargado los alumnos para este grupo
    if (alumGrupos[id]) {
      setLeft([]);
      setLeft([]);
      setPastLeft([]);
      const alumnosDelGrupo = alumGrupos[id].map((alumno) => alumno);
      
      // Obtener todos los alumnos y filtrar los que ya están en el grupo
      const todosLosAlumnos = estudiantes.map((alumno) => alumno); //({ id_alumno: alumno.id, nombre: alumno.nombre })

      // Filtrar los alumnos que ya están en el grupo
      const alumnosEnLeft = todosLosAlumnos.filter(
        (alumno) => !alumnosDelGrupo.some((alumnoDelGrupo) => alumnoDelGrupo.id === alumno.id) && !alumnosDelGrupo.some((alumnoRight) => alumnoRight.id === alumno.id)
      );
      
      setLeft(alumnosEnLeft);
      setPastLeft(alumnosEnLeft)
      setRight(alumnosDelGrupo);
      setPastRight(alumnosDelGrupo);
      setOpenEditList(true);
    } else {
      // Si no se han cargado los alumnos para este grupo, cargarlos
      await fetchAlumnosByGrupo(id);
    }
  };
  
  
  const handleCloseEditList = () => {
    setOpenEditList(false);
  };

  const saveEditList = () =>{
    const nuevosElementos = right.filter(item => !pastRight.some(pastItem => JSON.stringify(pastItem) === JSON.stringify(item)));
    const alumnosadd = nuevosElementos.map(item => ({ id_alumno: item.id }));
    const addAlumnos=
      {
        id_grupo: idEditGrupo,
        listaAlumnos: alumnosadd,
      };
    inscripciones(addAlumnos);
    handleCloseEditList();
  };
  const borrarAlumno = () => {
    const quitarElementos = left.filter(item => !pastLeft.some(pastItem => JSON.stringify(pastItem) === JSON.stringify(item)));
    const alumnosdelete = quitarElementos[0] ? quitarElementos[0].id_inscripcion : null;
    deleteInscrip(alumnosdelete);
    handleCloseEditList();
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };


  const customList = (title, items) => (
  <Card>
    <CardHeader sx={{ px: 2, py: 1 }} title={title}
      avatar={
        <Checkbox onClick={handleToggleAll(items)}
          checked={numberOfChecked(items) === items.length && items.length !== 0}
          indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
          disabled={items.length === 0}
          inputProps={{"aria-label": "all items selected"}}
        />
      }
      subheader={`${numberOfChecked(items)}/${items.length} selected`}
    /><Divider />
    <List component="div" role="list" dense
      sx={{width: 200, height: 200, bgcolor: "background.paper", overflow: "auto"}}>
      {items.map((value) => {
        const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem key={value.id_alumno} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{"aria-labelledby": labelId}}/>
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.nombre} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );


  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Grupos" />}
        <div className='aGruposCont'>
          {isMobile && <p className='WelcomeMsg'>Grupos</p>}
          
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between'}}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar grupo" inputProps={{ 'aria-label': 'search google maps' }} value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); filterGrupos(e.target.value);}}/>
                <IconButton type="button" sx={{ p: '10px', color:'white', backgroundColor:'#073cc3','&:hover': {backgroundColor: '#05236f',}, }} aria-label="search" onClick={filterGrupos}>
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
                  <thead>
                  <tr style={{fontWeight:'bold'}}>
                    <td align='center' style={{padding:'10px'}}>Descripcion</td>
                    <td align='center' style={{padding:'10px'}}>Profesor</td><td align='center' style={{padding:'10px'}}>Modulo</td> 
                    <td align='center' style={{padding:'10px'}}>Fecha inicio</td><td align='center' style={{padding:'10px'}}>Fecha Final</td> 
                    <td align='center' style={{padding:'10px'}}>Alumnos</td><td align='center' style={{padding:'10px'}}>Eliminar</td>
                  </tr>
                  </thead>
                  <tbody>
                  {(filteredGrupos.length > 0 ? filteredGrupos : grupos).map((GruposObj, index) => ( 
                      <tr key={GruposObj.id_grupo}>
                        <td style={{backgroundColor:'white', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap', borderTopLeftRadius: index === 0 ? '15px':'0px', borderBottomLeftRadius: index === grupos.length-1 ? '15px':'0px'}}>
                          {GruposObj.descripcion}&emsp;
                          <button className='actionButton' title='Editar nombre' onClick={() => handleClickOpenEditDescrip(GruposObj)}><HiPencilSquare/></button>
                        </td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                          {maestros.find(maestro => maestro.id === GruposObj.id_profesor)?.nombre}&emsp;
                          <button className='actionButton' title='Editar telefono' onClick={() => handleClickOpenEditMaestro(GruposObj)}><HiPencilSquare/></button>
                        </td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                          {modulos.find(maestro => maestro.id_modulo === GruposObj.id_modulo)?.nombre}&emsp;
                          <button className='actionButton' title='Editar email' onClick={() => handleClickOpenEditModulo(GruposObj)}><HiPencilSquare/></button>
                        </td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                          {GruposObj.fecha_inicio}&emsp;
                          <button className='actionButton' title='Editar telefono' onClick={() => handleClickOpenEditFechaInicio(GruposObj)}><HiPencilSquare/></button>
                        </td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '5px 10px', width:'auto-fit', whiteSpace: 'nowrap'}}>
                          {GruposObj.fecha_fin}&emsp;
                          <button className='actionButton' title='Editar email' onClick={() => handleClickOpenEditFechaFin(GruposObj)}><HiPencilSquare/></button>
                        </td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit'}} align='center'>
                          <button className='actionButton editButton' onClick={() => handleClickOpenEditList(GruposObj.id_grupo)}><HiPencil/></button>
                        </td>
                        <td style={{backgroundColor:'white', borderLeft: '1px solid #888', padding: '2px 10px', width:'auto-fit', borderBottomRightRadius: index === grupos.length-1 ? '15px': '0', borderTopRightRadius: index === 0 ? '15px':'0px'}} align='center'>
                          <button className='actionButton deleteButton' onClick={() => handleClickOpenDelete(GruposObj.id_grupo, GruposObj.descripcion)}><HiTrash/></button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          {/* ------------ Dialog Editar lista ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditList} onClose={handleCloseEditList}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Agregar alumnos</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                  
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item>{customList("Agregar", left)}</Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Button onClick={handleCheckedRight} disabled={leftChecked.length === 0}>
                        <HiArrowRight/>
                      </Button>
                      <Button onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>
                        <HiArrowLeft/>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>{customList("Lista", right)}</Grid>
                </Grid>

                  <Button autoFocus onClick={handleCloseEditList}>Cancelar</Button>
                  <Button onClick={saveEditList} autoFocus>Agregar Alumnos</Button>
                  <Button autoFocus onClick={borrarAlumno}>Eliminar Alumno</Button>
                </div>
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar nombre grupo ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditDescrip} onClose={handleCloseEditDescrip}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar descripcion de grupo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Descripcion</p>
                        <input className='inputTextDialog' type='text' value={editGrupo.descripcion} onChange={handleChangeEditDescrip} name='editGrupo'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editGrupo.descripcion}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditDescrip}>Cancelar</Button>
                    <Button onClick={saveEditDescrip} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar nombre maestro ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditMaestro} onClose={handleCloseEditMaestro}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Cambiar maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <select onChange={handleChangeEditMaestro} className='inputTextDialog'>
                          {maestros.map((maestrosObj) => (
                            <option key={maestrosObj.id} value={maestrosObj.id}>{maestrosObj.nombre}</option>
                          ))}
                        </select>
                        <p style={{fontSize:'12px'}}>&nbsp; {editGrupo.id_profesor}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditMaestro}>Cancelar</Button>
                    <Button onClick={saveEditMaestro} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar nombre modulo ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditModulo} onClose={handleCloseEditModulo}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Cambiar Modulo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Modulo</p>
                        <select onChange={handleChangeEditModulo} className='inputTextDialog'>
                          {modulos.map((modulosObj) => (
                            <option key={modulosObj.id_modulo} value={modulosObj.id_modulo}>{modulosObj.nombre}</option>
                          ))}
                        </select>
                        <p style={{fontSize:'12px'}}>&nbsp; {editGrupo.id_modulo}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditModulo}>Cancelar</Button>
                    <Button onClick={saveEditModulo} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar fecha inicio ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditFechaInicio} onClose={handleCloseEditFechaInicio}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar fecha de inicio de grupo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Fecha</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <ThemeProvider theme={themeFecha}>
                          <DatePicker label="Fecha inicio" name="fecha_inicio" value={grupoAdd.fecha_inicio} 
                            onChange={(date) => handleChangeEditFechaInicio(date)} 
                            renderInput={(props) => <TextField {...props} />}
                            format="DD/MM/YYYY"/>
                          </ThemeProvider>
                        </LocalizationProvider>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditFechaInicio}>Cancelar</Button>
                    <Button onClick={saveEditFechaInicio} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar fecha fin ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditFechaFin} onClose={handleCloseEditFechaFin}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar fecha de fin de grupo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Fecha</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <ThemeProvider theme={themeFecha}>
                          <DatePicker label="Fecha fin" name="fecha_fin" value={grupoAdd.fecha_fin} 
                            onChange={(date) => handleChangeEditFechaFin(date)} 
                            renderInput={(props) => <TextField {...props} />}
                            format="DD/MM/YYYY"/>
                          </ThemeProvider>
                        </LocalizationProvider>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditFechaFin}>Cancelar</Button>
                    <Button onClick={saveEditFechaFin} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Agregar grupo ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Agregar grupo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Descripción</p>
                        <input className='inputTextDialog' type='text' value={grupoAdd.descripcion} onChange={handleInputChange} name='descripcion'/>
                        <p style={{marginTop:'15px'}}>&nbsp;Modulo</p>
                        <select onChange={handleInputChange} className='inputTextDialog' name='id_modulo'>
                          {modulos.map((modulosObj) => (
                            <option key={modulosObj.id_modulo} value={modulosObj.id_modulo}>{modulosObj.nombre}</option>
                          ))}
                        </select>
                        <p style={{marginTop:'15px'}}>&nbsp;Maestro</p>
                        <select onChange={handleInputChange} className='inputTextDialog' name='id_profesor'>
                          {maestros.map((maestrosObj) => (
                            <option key={maestrosObj.id} value={maestrosObj.id}>{maestrosObj.nombre}</option>
                          ))}
                        </select>
                        <p style={{marginTop:'15px'}}>&nbsp;Fecha de inicio, fecha de fin</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ThemeProvider theme={themeFecha}>
                          <DatePicker label="Fecha inicio" name='fecha_inicio' value={grupoAdd.fecha_inicio} onChange={(date) => handleDateChange(date, 'fecha_inicio')} />
                        </ThemeProvider>
                        <ThemeProvider theme={themeFecha}>
                          <DatePicker label="Fecha fin" name='fecha_fin' value={grupoAdd.fecha_fin} onChange={(date) => handleDateChange(date, 'fecha_fin')} />
                        </ThemeProvider>
                        </LocalizationProvider>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseAdd}>Cancelar</Button>
                    <Button onClick={saveGrupoAdd} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Eliminar grupo ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openDelete} onClose={handleCloseDelete}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Eliminar grupo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'25px 0px 50px 0px', display:'flex', alignContent:'center', justifyContent:'center'}}>
                      <p align="center">¿Seguro que quiere eliminar el grupo <b>{grupoDelete.nombre}</b>?</p>
                    </div>
                    <Button autoFocus onClick={handleCloseDelete}>Cancelar</Button>
                    <Button onClick={saveGrupoDelete} autoFocus>Eliminar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>
        </div>
    </div>
  );
}

export default Grupos;
//rama  modulos
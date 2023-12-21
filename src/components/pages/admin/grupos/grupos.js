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
  const [gruposGet, setGruposGet] = useState(false);
  const [openEditList, setOpenEditList] = useState(false);
  const [openEditGrupo, setOpenEditGrupo] = useState(false);
  const [openEditMaestro, setOpenEditMaestro] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

   //GET
   useEffect(() => {
    fetchGrupos();
  }, []);

  const fetchGrupos = async () => {
    try {
      const gruposData = await apic.get('/grupos/');
      setGruposGet(gruposData);
      console.log("Respuesta de la API:", gruposData);
      console.log("json grupos: ", gruposGet);
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
    }
  };



  const grupos=[{"id":'1','nombre':'G001', 'maestro':'Christian Amaro Reyes', 'alumnos':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}, {'id':'4', 'nombre':'Heribert'}]},
                {"id":'2','nombre':'G002', 'maestro':'Jose Manuel Reyes', 'alumnos':[{'id':'1', 'nombre':'Anahí Ximena Sanchez Vasquez'},{'id':'2', 'nombre':'Arriola Peztña Heriberto'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]},
                {"id":'3','nombre':'G003', 'maestro':'Ana Bolena ', 'alumnos':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]}]
  
  const maestros = [{'id': '1', 'nombre': 'Christian Amaro Reyes'}, {'id': '2', 'nombre': 'Jose Manuel Reyes'}, {'id': '3', 'nombre': 'Ana Bolena'}]
  //aqui del api se van a hacer una query con todos los alumnos menos los del ai que estén en el json de los grupo
  const alumnosNew=[{"id":"5",'nombre':'Angel Mioses Cruz'}, {'id': '6','nombre': "Yolotzin Groth"}, {'id':'7', 'nombre':'Bryan Valerio'},{"id":"8",'nombre':'Anl Mioses Cruz'},{"id":"9",'nombre':'Angel Mies Cruz'}]

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(alumnosNew.map(alumno => alumno.nombre));
  const [right, setRight] = useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [editGrupo, setEditGrupo] = useState({ id: '', nombre: '' });
  const [editMaestro, setEditMaestro] = useState({ id: '', maestro: '' });
  const [grupoDelete, setGrupoDelete] = useState({ id: '', nombre: '' });
  const [grupoAdd, setGrupoAdd] = useState({nombre: '' });

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
  
  //Abrir y cerrar dialog editar nombre grupo
  const handleClickOpenEditGrupo = (id, nombre) => {
    setEditGrupo({ id, nombre });
    setOpenEditGrupo(true);
  };

  const handleCloseEditGrupo = () => {
    setOpenEditGrupo(false);
  };
  const handleChangeEditGrupo = (event) => {
    setEditGrupo({ ...editGrupo, nombre: event.target.value });
  };

  const saveEditGrupo = () => {
    console.log(editGrupo);
    handleCloseEditGrupo();

  };

  //Abrir y cerrar dialog editar nombre maestro
  const handleClickOpenEditMaestro = (id, maestro) => {
    setEditMaestro({ id, maestro });
    setOpenEditMaestro(true);
  };

  const handleCloseEditMaestro = () => {
    setOpenEditMaestro(false);
  };
  const handleChangeEditMaestro = (event) => {
    setEditMaestro({ ...editMaestro, maestro: event.target.value }); 
  };

  const saveEditMaestro = () =>{
    console.log(editMaestro);
    handleCloseEditMaestro();
  };

  //Abrir y cerrar dialog agregar grupo
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
  setOpenAdd(false);
  };

  const handleChangeOpenAdd = (event) => {
    setGrupoAdd({ ...grupoAdd, nombre: event.target.value });
  };

  const saveGrupoAdd = () =>{
    console.log(grupoAdd);
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
    console.log(grupoDelete);
    handleCloseDelete();
  };

  //Abrir y cerrar dialog editar lista
  const handleClickOpenEditList = (alumnos) => {
    setRight(alumnos.map(alumno => alumno.nombre));
    setOpenEditList(true);
  };

  const handleCloseEditList = () => {
    setOpenEditList(false);
  };

  const saveEditList = () =>{
    console.log(right);
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
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{"aria-labelledby": labelId}}/>
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
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
          <div className=' genericCont '>
            <table style={{width:'100%', padding:'0px 10px', fontWeight:'bold'}}>
                <tr><td width="30%">Nombre</td><td width="40%" style={{padding: '0px 0px 5px 10px'}}>Maestro</td><td width="17%" align='center'>Agregar alumnos</td><td width="13%" align='center'>Eliminar</td></tr>
            </table> 
            <table style={{width:'100%', backgroundColor:'white', borderRadius:'15px', padding:'10px'}}>
                {grupos.map((gruposObj) => ( 
                    <tr key={gruposObj.id}>
                    <td width="30%" style={{padding: '3px 0px'}}>{gruposObj.nombre}&emsp;
                    <button className='actionButton' title='Editar nombre del grupo' onClick={() => handleClickOpenEditGrupo(gruposObj.id, gruposObj.nombre)}><HiPencilSquare/></button></td>
                    <td width="40%" style={{padding: '3px 10px',borderLeft: '1px solid #888'}}>{gruposObj.maestro}&emsp;&emsp;
                    <button className='actionButton' title='Editar nombre del maestro' onClick={() => handleClickOpenEditMaestro(gruposObj.id, gruposObj.maestro)}><HiPencilSquare/></button></td>
                    <td width="17%" align='center' style={{borderLeft: '1px solid #888', padding: '0px 0px'}}>
                      <button className='actionButton editButton' onClick={() => handleClickOpenEditList(gruposObj.alumnos)}><HiPencil/></button></td>
                    <td width="13%" align='center' style={{borderLeft: '1px solid #888', padding: '0px 0px'}}>
                      <button className='actionButton deleteButton' onClick={() => handleClickOpenDelete(gruposObj.id, gruposObj.nombre)}><HiTrash/></button></td>
                    </tr>
                ))}
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
                  <Button onClick={saveEditList} autoFocus>Guardar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar nombre grupo ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditGrupo} onClose={handleCloseEditGrupo}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar nombre de grupo</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                    <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' value={editGrupo.nombre} onChange={handleChangeEditGrupo} name='editGrupo'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {editGrupo.nombre}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditGrupo}>Cancelar</Button>
                    <Button onClick={saveEditGrupo} autoFocus>Guardar</Button>
                </div>                                    
              </DialogContent>
            </Dialog>
          </ThemeProvider>

          {/* ------------ Dialog Editar nombre maestro ------------ */}
          <ThemeProvider theme={theme}>
            <Dialog open={openEditMaestro} onClose={handleCloseEditMaestro}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Editar nombre de maestro</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                    <div style={{margin:'5px'}}>
                        <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <select onChange={handleChangeEditMaestro} className='inputTextDialog'>
                          {maestros.map((maestrosObj) => (
                            <option value={maestrosObj.id}>{maestrosObj.nombre}</option>
                          ))}
                        </select>
                        <p style={{fontSize:'12px'}}>&nbsp; {editMaestro.maestro}</p>
                        <br/>
                    </div>
                    <Button autoFocus onClick={handleCloseEditMaestro}>Cancelar</Button>
                    <Button onClick={saveEditMaestro} autoFocus>Guardar</Button>
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
                        <p style={{marginTop:'15px'}}>&nbsp;Nombre</p>
                        <input className='inputTextDialog' type='text' value={grupoAdd.nombre} onChange={handleChangeOpenAdd} name='grupoAdd'/>
                        <p style={{fontSize:'12px'}}>&nbsp; {grupoAdd.nombre}</p>
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
                    <Button onClick={saveGrupoDelete} autoFocus>Guardar</Button>
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
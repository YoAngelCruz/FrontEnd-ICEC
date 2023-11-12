import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './grupos.css';
import {HiMagnifyingGlass, HiPencilSquare, HiTrash, HiPencil} from 'react-icons/hi2';
import {HiPlus} from 'react-icons/hi';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  const [open, setOpen] = React.useState(false);

  const grupos=[{"id":'1','nombre':'G001', 'maestro':'Christian Amaro Reyes', 'alumnos':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]},
                {"id":'2','nombre':'G002', 'maestro':'Jose Manuel Reyes', 'alumnos':[{'id':'1', 'nombre':'Anahí Ximena Sanchez Vasquez'},{'id':'2', 'nombre':'Arriola Peztña Heriberto'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]},
                {"id":'3','nombre':'G003', 'maestro':'Ana Bolena ', 'alumnos':[{'id':'1', 'nombre':'Arriola Peztña Heriberto'},{'id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez'}, {'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}]}]
  
  //aqui del api se van a hacer una query con todos los alumnos menos los del ai que estén en el json de los grupo
  const alumnosNew=[{"id":"3",'nombre':'Angel Mioses Cruz'}, {'id': '4','nombre': "Yolotzin Groth"}, {'id':'5', 'nombre':'Bryan Valerio'}]

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(alumnosNew.map(alumno => alumno.nombre));
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const theme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius:'15px',
          },
          backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Rojo translúcido
            boxShadow:'20px 0px 20px 6px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  });

  const handleClickOpen = (alumnos) => {
    setRight(alumnos.map(alumno => alumno.nombre));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      sx={{
        width: 200,
        height: 230,
        bgcolor: "background.paper",
        overflow: "auto"
      }}>
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
        <div className='gruposCont'>
          {isMobile && <p className='WelcomeMsg'>Grupos</p>}
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between',
        }}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar alumno" inputProps={{ 'aria-label': 'search google maps' }}/>
                <IconButton type="button" sx={{ p: '10px', color:'white', backgroundColor:'#073cc3','&:hover': {backgroundColor: '#05236f',}, }} aria-label="search">
                    <HiMagnifyingGlass />
                </IconButton>
            </Paper>
            <Button startIcon={<HiPlus style={{backgroundColor:'073cc3', padding:'3px', color:'white', borderRadius:'50px'}} size={'35px'} />} 
                    sx={{backgroundColor:'white', borderRadius:'50px', paddingRight:'15px','&:hover': {backgroundColor: 'white', boxShadow:'0px 5px 10px 0px rgba(0, 0, 0, 0.400)'},}}>
                Agregar
            </Button>
          </div>
          
          <div className=' genericCont '>
            <table style={{width:'100%', padding:'0px 10px', fontWeight:'bold'}}>
                <tr><td width="35%">Nombre</td><td width="35%" style={{padding: '0px 0px 5px 10px'}}>Maestro</td><td width="17%" align='center'>Agregar alumnos</td><td width="13%" align='center'>Eliminar</td></tr>
            </table> 
            <table style={{width:'100%', backgroundColor:'white', borderRadius:'15px', padding:'10px'}}>
                {grupos.map((gruposObj) => (
                    
                    
                    <tr key={gruposObj.id}>
                    <td width="35%" style={{padding: '3px 0px'}}>{gruposObj.nombre}&emsp;
                    <button className='actionButton' title='Editar nombre del grupo'><HiPencilSquare/></button></td>
                    <td width="35%" style={{padding: '3px 10px',borderLeft: '1px solid #888'}}>{gruposObj.maestro}&emsp;&emsp;
                    <button className='actionButton' title='Editar nombre del maestro'><HiPencilSquare/></button></td>
                    <td width="17%" align='center' style={{borderLeft: '1px solid #888', padding: '0px 0px'}}>
                      <button className='actionButton editButton' onClick={() => handleClickOpen(gruposObj.alumnos)}><HiPencil/></button></td>
                    <td width="13%" align='center' style={{borderLeft: '1px solid #888', padding: '0px 0px'}}>
                      <button className='actionButton deleteButton'><HiTrash/></button></td>
                    </tr>
                ))}
            </table>
          </div>
          <ThemeProvider theme={theme}>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <p style={{color:'white', fontWeight:'bold', letterSpacing:'0.03em', marginBottom:'7px'}}>Agregar alumnos</p>
                <div style={{backgroundColor:'white', borderRadius:'8px', padding:'5px 9px'}}>
                  
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item>{customList("Agregar", left)}</Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Button onClick={handleCheckedRight} disabled={leftChecked.length === 0}>
                        -&gt;
                      </Button>
                      <Button onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>
                        &lt;-
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>{customList("Lista", right)}</Grid>
                </Grid>

                  <Button autoFocus onClick={handleClose}>Cancelar</Button>
                  <Button onClick={handleClose} autoFocus>Guardar</Button>
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
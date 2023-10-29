import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
import './grupos.css';
import {HiMagnifyingGlass} from 'react-icons/hi2';
import {HiPlus} from 'react-icons/hi';

import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
function Grupos({isMobile}) {
  const grupos=[{"id":'1','nombre':'G001', 'maestro':'christian', 'alumnos':{'id':'1', 'nombre':'Arriola Peztña Heriberto','id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez', 'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}},
                {"id":'2','nombre':'G002', 'maestro':'Jose', 'alumnos':{'id':'1', 'nombre':'Arriola Peztña Heriberto','id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez', 'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}},
                {"id":'3','nombre':'G003', 'maestro':'Ana', 'alumnos':{'id':'1', 'nombre':'Arriola Peztña Heriberto','id':'2', 'nombre':'Anahí Ximena Sanchez Vasquez', 'id':'3', 'nombre':'Avila Muñoz Jaime Ivan'}}]
  
  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Grupos" />}
        <div className='modulosCont'>
          {isMobile && <p className='WelcomeMsg'>Grupos</p>}
          <div className='searchCont' style={{display:"flex", width: '100%', padding: '7px', marginBottom: '40px', justifyContent: 'space-between',
        }}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '40vw', borderRadius:'50px' }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar alumno" inputProps={{ 'aria-label': 'search google maps' }}/>
                <IconButton type="button" sx={{ p: '10px', color:'white', backgroundColor:'#073cc3','&:hover': {backgroundColor: 'red',}, }} aria-label="search">
                    <HiMagnifyingGlass />
                </IconButton>
            </Paper>
            <Button startIcon={<HiPlus style={{backgroundColor:'073cc3', padding:'3px', color:'white', borderRadius:'50px'}} size={'35px'} />} 
                    sx={{backgroundColor:'white', borderRadius:'50px', paddingRight:'15px','&:hover': {backgroundColor: 'white', boxShadow:'0px 5px 10px 0px rgba(0, 0, 0, 0.400)'},}}>
                Agregar
            </Button>
          </div>
          
          <div className=' genericCont '>
            <table style={{width:'100%', padding:'0px 10px', fontWeight:'bold'}} border='1'>
                <tr><td width="30%">Nombre</td><td>Cambiar nombre</td><td>Maestro</td><td>Agregar alumnos</td><td>Eliminar</td></tr>
            </table> 
            <table style={{width:'100%', backgroundColor:'white', borderRadius:'15px', padding:'10px'}} border='1'>
                {grupos.map((gruposObj) => (
                    
                    
                    <tr key={gruposObj.id}>
                    <td width="30%">{gruposObj.nombre} </td>
                    <td>boton</td>
                    <td>{gruposObj.maestro} </td>
                    <td>boton</td>
                    <td>boton</td>
                    </tr>
                ))}
            </table>
          </div>
           
        </div>
    </div>
  );
}

export default Grupos;
//rama  modulos
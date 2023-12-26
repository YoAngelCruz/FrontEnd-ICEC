import React from 'react';
import HeaderInicio from './headerDesktop'
import HeaderMobile from './headerMobile';
import {HiUserCircle,HiPencil } from "react-icons/hi2";
import { useAuth } from '../../utils/AuthContext';
import './usuario.css';
function Usuario({isMobile}) {
  const { userData, tipoUsuario } = useAuth();

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Usuario" />}
        <div className='usuarioCont'>
            {isMobile && <p className='WelcomeMsg'>Usuario</p>}
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
                  <tr>
                    <td>email</td><td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td>Telefono</td><td>{userData.num_tel_a}</td>
                  </tr>
                </table>
              </div>
            )}
            {tipoUsuario === 'profesor' && (
              <div>
              <table>
                <tr>
                  <td>email</td><td>{userData.email}</td>
                </tr>
                <tr>
                  <td>Telefono</td><td>{userData.num_tel_p}</td>
                </tr>
              </table>
            </div>
            )}
            {tipoUsuario === 'alumno' && (
              <div>
              <table>
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
                <tr><td style={{color:'white', padding:' 10px 15px', fontSize:'17px',fontWeight:'bold' }} align='right'>Contraseña</td>
                <td><button className='actionButton editButton' ><HiPencil size={20}/></button></td></tr>

              </table>
            </div>
            )}
        </div>
    </div>
  );
}

export default Usuario;
//rama calendario estudiantes
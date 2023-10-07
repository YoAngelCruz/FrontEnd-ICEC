import React, { useState } from 'react';
import { MdMenu, MdLogout } from 'react-icons/md';
import './headerMobile.css';
import logo from '../../assets/img/logo1.png';
//import Cookies from 'universal-cookie';

//const cookie = new Cookies();

function HeaderMobile() {
  const [panelVisible, setPanelVisible] = useState(false);
  
  const panel= {
    position: 'fixed',
    top: '54px',
    right: '0px',
    border: '0px solid',
    padding: '10px',
    height:'100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(2px)',
    boxShadow: '-23px 0px 20px -16px rgba(0,0,0,0.75)',
  }

  const handleIconClick = () => {
    setPanelVisible(!panelVisible);
  };
  
  const handleCerrarSesion = () => {
    /*cookie.remove('id',{path:"/"});
    cookie.remove('nombre',{path:"/"});
    cookie.remove('correo',{path:"/"});
    cookie.remove('telefono',{path:"/"});
    alert("sesion cerrada");
    window.location.href='./';*/
  };

  return (
    <nav class="header">
        <img src={logo} alt="logo" className='logo'/>
        <MdMenu size={40} className="icon" onClick={handleIconClick} />

      {panelVisible && (
        <div className="panel" style={panel}>
          <button onClick={handleCerrarSesion} style={{backgroundColor:'white', border:'none', fontSize:15, marginTop:'12px', padding:'8px 7px', }}> 
            <MdLogout size={18}/> Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default HeaderMobile;
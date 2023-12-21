import React, { useState } from 'react';
import { HiMiniArrowLeftOnRectangle, HiMiniBars3 } from "react-icons/hi2";
import './headerMobile.css';
import logo from '../../assets/img/logo1.png';
import { useAuth } from '../../utils/AuthContext';
//import Cookies from 'universal-cookie';

//const cookie = new Cookies();

function HeaderMobile() {
  const [panelVisible, setPanelVisible] = useState(false);
  const { isAuthenticated, userData, tipoUsuario, token } = useAuth();
  const { authLogout } = useAuth();

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
  
  const handleLogout = async() => {
    authLogout();
    window.location.reload();
    console.log(isAuthenticated);
  };

  return (
    <nav class="header">
        <img src={logo} alt="logo" className='logo'/>
        <HiMiniBars3 size={40} className="icon" onClick={handleIconClick} />

      {panelVisible && (
        <div className="panel" style={panel}>
          <button onClick={handleLogout} style={{ display:'flex', justifyContent:'center', alignItems:'center',backgroundColor:'white', border:'none', fontSize:15, marginTop:'12px', padding:'8px 7px', }}> 
            <HiMiniArrowLeftOnRectangle size={25}/> Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default HeaderMobile;
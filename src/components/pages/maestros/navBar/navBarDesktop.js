import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarDesktop.css';
import { HiBookOpen, HiHome, HiCalendarDays, HiDocumentCheck, HiUserCircle, HiMiniArrowLeftOnRectangle } from "react-icons/hi2";
import { useAuth } from '../../../../utils/AuthContext';
function NavBarDesktop() {
  const { isAuthenticated, userData, tipoUsuario, token } = useAuth();
  const { authLogout } = useAuth();


  const handleLogout = async() => {
    authLogout();
    console.log(isAuthenticated);
    
  };

  return (
    <div className="StickyNavContent">
      <div className='userInfo'>
      <HiUserCircle size={100}  />
      <span id="userName">Anahí Ximena Sanchez Vasquez</span>
      <span>matricula o numero de control</span>
      </div>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/maestros/home">
            <HiHome size={25}  />
            <span>Inicio</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/maestros/calificaciones">
            <HiDocumentCheck size={25}  />
            <span>Calificaciones</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/maestros/grupos">
            <HiBookOpen size={25}  />
            <span>Grupos</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/maestros/calendario">
            <HiCalendarDays size={25}  />
            <span>Calendario</span>
          </NavLink>
        </li>
      </ul>
      <div className='logoutCont'>
        <button className='logoutButton' onClick={handleLogout}>
          <HiMiniArrowLeftOnRectangle size={25}  />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}

export default NavBarDesktop;
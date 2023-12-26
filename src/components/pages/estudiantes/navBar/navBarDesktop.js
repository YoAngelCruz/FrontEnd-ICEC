import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarDesktop.css';
import { HiBookOpen, HiHome, HiChartBar, HiCalendarDays, HiDocumentCheck, HiUserCircle, HiMiniArrowLeftOnRectangle } from "react-icons/hi2";
import { useAuth } from '../../../../utils/AuthContext';
function NavBarDesktop() {
  const { isAuthenticated, userData } = useAuth();
  const { authLogout } = useAuth();


  const handleLogout = async() => {
    authLogout();
    console.log(isAuthenticated);
    
  };

  return (
    <div className="StickyNavContent">
      <div className='userInfo'>
      <HiUserCircle size={100}  />
      <span id="userName">{userData.nombre}</span>
      <span>{userData.clave}</span>
      </div>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/home">
            <HiHome size={25}  />
            <span>Inicio</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/calificaciones">
            <HiDocumentCheck size={25}  />
            <span>Calificaciones</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/estudiantes/modulo">
            <HiBookOpen size={25}  />
            <span>Módulo</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/calendario">
            <HiCalendarDays size={25}  />
            <span>Calendario</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/avance">
            <HiChartBar size={25}  />
            <span>Avance</span>
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
import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarDesktop.css';
import { HiBookOpen, HiHome, HiChartBar, HiCalendarDays, HiDocumentCheck, HiUserCircle } from "react-icons/hi2";
function NavBarDesktop() {

  return (
    <div className="StickyNavContent">
      <div className='userInfo'>
      <HiUserCircle size={100}  />
      <span id="userName">Anahí Ximena Sanchez Vasquez</span>
      <span>matricula o numero de control</span>
      </div>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/home">
            <HiHome size={25}  />
            <span>Inicio</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/ByA">
            <HiDocumentCheck size={25}  />
            <span>Alumnos</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/estudiantes/modulos">
            <HiBookOpen size={25}  />
            <span>Módulos</span>
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
    </div>
  );
}

export default NavBarDesktop;
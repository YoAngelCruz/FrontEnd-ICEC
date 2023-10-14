import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarMobile.css';
import { HiBookOpen, HiHome, HiChartBar, HiCalendarDays, HiDocumentCheck } from "react-icons/hi2";

function NavBarMobile() {
  
  return (
    <nav class="nav">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/avance">
            <HiChartBar size={28}  />
            <span>Avance</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/modulos">
            <HiBookOpen size={28} />
            <span>Módulos</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/estudiantes/home">
            <HiHome size={28}  />
            <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/calificaciones">
            <HiDocumentCheck size={28}  />
            <span>Calificaciones</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/estudiantes/calendario">
            <HiCalendarDays size={28}  />
            <span>Calendario</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarMobile;
import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarMobile.css';
import { HiBookOpen, HiHome, HiCalendarDays, HiDocumentCheck } from "react-icons/hi2";

function NavBarMobile() {
  
  return (
    <nav class="nav">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/maestros/grupos">
            <HiBookOpen size={28} />
            <span>Grupos</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/maestros/home">
            <HiHome size={28}  />
            <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/maestros/calificaciones">
            <HiDocumentCheck size={28}  />
            <span>Calificaciones</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/maestros/calendario">
            <HiCalendarDays size={28}  />
            <span>Calendario</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarMobile;
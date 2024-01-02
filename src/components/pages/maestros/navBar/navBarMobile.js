import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarMobile.css';
import { HiBookOpen, HiHome, HiCalendarDays, HiDocumentCheck } from "react-icons/hi2";

function NavBarMobile() {
  
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/maestros/grupos">
            <HiBookOpen size={28} />
            <span>Grupos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/maestros/home">
            <HiHome size={28}  />
            <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/maestros/calificaciones">
            <HiDocumentCheck size={28}  />
            <span>Calificaciones</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/maestros/calendario">
            <HiCalendarDays size={28}  />
            <span>Calendario</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarMobile;
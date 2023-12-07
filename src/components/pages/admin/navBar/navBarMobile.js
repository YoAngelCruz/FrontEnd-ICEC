import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarMobile.css';
import { HiBookOpen, HiHome, HiCalendarDays, HiMiniSquare3Stack3D, HiAcademicCap } from "react-icons/hi2";

function NavBarMobile() {
  
  return (
    <nav class="nav">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/admin/estudiantes">
            <HiAcademicCap size={28}  />
            <span>Estudiantes</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/admin/maestros">
            <HiBookOpen size={28}  />
            <span>Maestros</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/home">
            <HiHome size={28}  />
            <span>Inicio</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/calendario">
            <HiCalendarDays size={28}  />
            <span>Calendario</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/grupos">
            <HiMiniSquare3Stack3D size={28}  />
            <span>Grupos</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarMobile;
import React from 'react';
import { NavLink} from 'react-router-dom';
import './navBarDesktop.css';
import { HiBookOpen, HiHome, HiCalendarDays, HiMiniSquare3Stack3D, HiUserCircle, HiAcademicCap } from "react-icons/hi2";
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
          <NavLink activeClassName="active" to="/admin/home">
            <HiHome size={25}  />
            <span>Inicio</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/estudiantes">
            <HiAcademicCap size={25}  />
            <span>Estudiantes</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/admin/maestros">
            <HiBookOpen size={25}  />
            <span>Maestros</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/calendario">
            <HiCalendarDays size={25}  />
            <span>Calendario</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/grupos">
            <HiMiniSquare3Stack3D size={25}  />
            <span>Grupos</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBarDesktop;
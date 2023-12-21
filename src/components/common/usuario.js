import React, { useEffect, useState } from 'react';
import HeaderInicio from './headerDesktop'
import HeaderMobile from './headerMobile';
import {HiUserCircle } from "react-icons/hi2";
import './usuario.css';
function Usuario({isMobile}) {
    const usuario= "Anahí Ximena Sanchez Vasquez";

  return (
    <div>
        {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Usuario" />}
        <div className='calendarioCont'>
            {isMobile && <p className='WelcomeMsg'>Usuario</p>}
            <HiUserCircle size={'10vw'}  />
            <span className='pageTitle'>{usuario}</span>
            <div>
                
                HOla
            </div>
        </div>
    </div>
  );
}

export default Usuario;
//rama calendario estudiantes
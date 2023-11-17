import React, { useEffect, useState } from 'react';
import './HeaderInicioDesktop.css';
import logo from '../../../../assets/img/logo1.png'
//import Cookies from 'universal-cookie';
import { HiOutlineLogin } from "react-icons/hi";
//const cookie = new Cookies();
function HeaderInicioDesktop() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [headerTransparent, setHeaderTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= 10) {
        setHeaderTransparent(false);
      } else {
        setHeaderTransparent(true);
      }
    };
    function handleResize() {
        setIsMobile(window.innerWidth < 600);
        }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const headerStyleDesktop = {
    
    background: headerTransparent ? 'transparent' : 'linear-gradient(to right, #a4c4ee 5%, #EEE 30%)',
    boxShadow: headerTransparent ? 'none' : '10px 0px 15px 6px rgba(0, 0, 0, 0.35)',
    height: headerTransparent ? '103px' : '65px' ,
    transition: 'background 0.3s ease-in-out, height 0.3s ease-in-out',
    width:'100%'
    
  };
  const headerStyleMobile = {
    
    background: headerTransparent ? 'transparent' : 'linear-gradient(to right, #a4c4ee 5%, #EEE 30%)',
    boxShadow: headerTransparent ? 'none' : '10px 0px 15px 6px rgba(0, 0, 0, 0.35)',
    height: '55px' ,
    transition: 'background 0.3s ease-in-out, height 0.3s ease-in-out',
    width:'100%'
    
  };

  const botonStyle = {
    display:'flex',
    backgroundColor:'white', 
    boxShadow:'0px 0px 13px -5px black', 
    marginRight:'15px', 
    height:'35px', 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:'10px',
    padding: '10px',
    
  };

  return (
    <nav className="header" style={isMobile ? headerStyleMobile : headerStyleDesktop}>
      <img src={logo} alt="logo" className="logo" />

      <div style={botonStyle}>
        <HiOutlineLogin/> Iniciar sesión</div>
    </nav>
  );
}

export default HeaderInicioDesktop;
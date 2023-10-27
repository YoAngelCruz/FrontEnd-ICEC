import React, { useEffect, useState } from 'react';
import './headerDesktop.css';
import logo from '../../assets/img/logo1.png';
//import Cookies from 'universal-cookie';

//const cookie = new Cookies();
function HeaderDesktop({titulo}) {
  const [headerTransparent, setHeaderTransparent] = useState(true);
  //const [panelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= 10) {
        setHeaderTransparent(false);
      } else {
        setHeaderTransparent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const headerStyle = {
    
    background: headerTransparent ? 'transparent' : 'linear-gradient(to right, #a4c4ee 35%, #FFFFFF 100%)',
    boxShadow: headerTransparent ? 'none' : '10px 0px 15px 6px rgba(0, 0, 0, 0.35)',
    height: headerTransparent ? '103px' : '70px' ,
    transition: 'background 0.3s ease-in-out, height 0.3s ease-in-out',
    width:'100%'
    
  };

  const titleStyle = {
    fontSize: headerTransparent ? '65px' : '40px',
    transition: 'font-size 0.3s ease-in-out',
  };

  return (
    <nav className="header" style={headerStyle}>
      <img src={logo} alt="logo" className="logo" />

      <span style={titleStyle} className='title'>{titulo}</span>
    </nav>
  );
}

export default HeaderDesktop;
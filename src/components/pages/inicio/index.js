import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import HeaderInicioDesktop from './header/headerInicioDesktop';
import './inicio.css';
import foto1 from '../../../assets/img/carrusel1.jpg'
import foto2 from '../../../assets/img/carrusel2.jpg'
import foto3 from '../../../assets/img/carrusel3.jpg'
import foto4 from '../../../assets/img/carrusel4.jpg'
function Inicio() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    useEffect(() => {
        // Función para actualizar el estado de isMobile
        function handleResize() {
        setIsMobile(window.innerWidth < 600);
        }
        // Agregar un evento de escucha para el cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);
        // Retirar el evento de escucha cuando el componente se desmonte
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    const imgStyle = {
        display: 'flex',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    };

  return (
      <div className='inicioCont'>
        <HeaderInicioDesktop />
        <Carousel autoplay>
            <div style={imgStyle}><img src={foto1} width={'100%'}  alt="Foto 1" /></div>
            <div style={imgStyle}><img src={foto2} width={'100%'}  alt="Foto 2" /></div>
            <div style={imgStyle}><img src={foto3} width={'100%'}  alt="Foto 3" /></div>
            <div style={imgStyle}><img src={foto4} width={'100%'}  alt="Foto 4" /></div>
        </Carousel>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', flexDirection:'row', alignItems:'space-between', backgroundColor:'white', margin:'20px 10px', borderRadius:'10px', padding:'10px'}}>
            <div>Contenedor 1</div>
            <div>Contenedor 2</div>
        </div>
        <div>
            {[...Array(100)].map((_, index) => (
                <div key={index}>Hola</div>
            ))}
        </div>
      </div>
  );
}

export default Inicio;
//rama  develop estudiantes
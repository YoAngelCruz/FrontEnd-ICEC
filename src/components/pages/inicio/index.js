import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import HeaderInicioDesktop from './header/headerInicioDesktop';
import './inicio.css';
import foto1 from '../../../assets/img/carrusel1.jpg'
import foto2 from '../../../assets/img/carrusel2.jpg'
import foto3 from '../../../assets/img/carrusel3.jpg'
import foto4 from '../../../assets/img/carrusel4.jpg'
import img1 from '../../../assets/img/img1.jpg'
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
        <div className='preInicioCont'>
            <p className='homeBigTitle'>Bienvenido a ICEC</p>
            <div className='preModulInicioCont'>
                <div className='pMICTexto'>
                    <p>
                        <p>Especialidad: <b>INFORMÁTICA.</b></p><br/>
                        <p>Estudios con Reconocimiento de Validez Oficial ante la SEP.</p><br/>
                        <p>Explora el mundo de la informática con nosotros y lleva tu educación al siguiente nivel. En ICEC, nos enorgullece ofrecer programas académicos de calidad respaldados por la Secretaría de Educación Pública. Descubre oportunidades emocionantes y prepárate para un futuro en constante evolución.</p>
                        <br/><p>¡Comienza tu viaje hacia el éxito con ICEC!</p>
                    </p></div>
                <div className='pMICImg'><img src={img1} width={'100%'}  alt="Imagen 1"/></div>
            </div>
        </div>
        <div>
        {isMobile && <p>Borar</p>}
            {[...Array(100)].map((_, index) => (
                <div key={index}>Hola</div>
            ))}
        </div>
      </div>
  );
}

export default Inicio;
//rama  develop estudiantes
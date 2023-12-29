import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import HeaderInicioDesktop from './header/headerInicioDesktop';
import './inicio.css';
import foto1 from '../../../assets/img/carrusel1.jpg'
import foto2 from '../../../assets/img/carrusel2.jpg'
import foto3 from '../../../assets/img/carrusel3.jpg'
import foto4 from '../../../assets/img/carrusel4.jpg'
import img1 from '../../../assets/img/img1.jpg'
import img2 from '../../../assets/img/img2.jpg'
import img3 from '../../../assets/img/img3.jpg'
import img4 from '../../../assets/img/img4.jpg'
import img5 from '../../../assets/img/img5.jpg'
import img6 from '../../../assets/img/img6.jpg'
import img7 from '../../../assets/img/img7.jpg'
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
                    <p>Especialidad: <b>INFORMÁTICA.</b></p><br/>
                    <p>Estudios con Reconocimiento de Validez Oficial ante la SEP.</p><br/>
                    <p>Explora el mundo de la informática con nosotros y lleva tu educación al siguiente nivel. En ICEC, 
                        nos enorgullece ofrecer programas académicos de calidad respaldados por la Secretaría de Educación 
                        Pública. Descubre oportunidades emocionantes y prepárate para un futuro en constante evolución.</p>
                    <br/><p>¡Comienza tu viaje hacia el éxito con ICEC!</p>
                </div>
                <div className='pMICImg'><img src={img1} width={'100%'}  alt="Imagen 1"/></div>
            </div>
        </div>
        <div className='sloganCont'>
            <img src={img2} width={'100%'}  alt="Imagen 2"/>
            <p className='homeSlogan'>Unete a <br />nosotros</p>
        </div>
        <div style={{backgroundColor:'#f5f5f5'}}>
            <div className='cardCont'>
                <div className="flip">
                    <div className="front">
                        <img src={img3} width={'100%'}  alt="Imagen 3"/>
                        <h1 className='cardText'>Compromiso</h1>
                    </div>
                    <div className="back" style={{ height: '100%',backgroundColor:'#dd1111' }}>
                        {!isMobile && <h2>Compromiso<br/><br/></h2>}
                        <p>Dedicados a la excelencia en cada aspecto de la educación. Nuestro compromiso impulsa la pasión por 
                            la informática se une a la constante búsqueda de conocimiento y crecimiento.</p>
                    </div>
                </div>

                <div className="flip">
                    <div className="front">
                        <img src={img4} width={'100%'}  alt="Imagen 4"/>
                        <h1 className='cardText'>Disciplina</h1>
                    </div>
                    <div className="back" style={{ height: '100%', backgroundColor:'#1d6395'}}>
                        {!isMobile && <h2>Disciplina<br/><br/></h2>}
                        <p>Guiamos a nuestros estudiantes hacia el éxito a través de la autodisciplina, fomentando la 
                            responsabilidad personal y el cumplimiento riguroso de metas académicas.</p>
                    </div>
                </div>

                <div className="flip">
                    <div className="front">
                        <img src={img5} width={'100%'}  alt="Imagen 5"/>
                        <h1 className='cardText'>Entrega</h1>
                    </div>
                    <div className="back" style={{ height: '100%',backgroundColor:'#dd1111' }}>
                    {!isMobile && <h2>Entrega<br/><br/></h2>}
                    <p>Nos comprometemos a brindar una educación de calidad superior, entregándonos por completo al 
                        desarrollo académico y profesional de nuestros estudiantes.</p>
                    </div>
                </div>
            </div>
            <div style={{margin:'15px', display:'block',position:'relative'}}>
                <div style={{ position: 'relative' }}>
                    <img src={img6} width={'100%'} alt="Imagen 6" />
                    {isMobile && <h1 className='cardText' style={{top: '20%'}}>Misión</h1>}
                    <div className='mvCont' style={{left: '5%'}}>
                        {!isMobile && <h2 align='center'>Misión</h2>}
                        <p className='mvText'><br/>Formar profesionales en la especialidad de informática, con valores fundamentales, 
                            espíritu emprendedor y servicio. Buscamos contribuir al éxito de las empresas a través 
                            de individuos que se desarrollan con excelencia y empatía, impulsando así el progreso y 
                            desarrollo tecnológico de nuestro país.</p>
                    </div>
                </div>
                <div style={{height:"20px"}}></div>
                <div style={{ position: 'relative' }}>
                    <img src={img7} width={'100%'}  alt="Imagen 7"/>
                    {isMobile && <h1 className='cardText' style={{top: '20%'}}>Visión</h1>}
                    <div className='mvCont' style={{ right: '5%' }}>
                        {!isMobile && <h2 align='center'>Visión</h2>}
                        <p className='mvText'><br/>Nos proyectamos como un instituto de renombre, distinguido por su excelencia y 
                                calidez, formando individuos altamente capacitados y competitivos en el campo de 
                                la informática. A su vez, destacar gracias a nuestro eficiente modelo educativo, 
                                marcando la pauta en la formación de profesionales destacados.</p>
                    </div>
                </div>
                <div style={{height:"100px"}}></div>
            </div>
        </div>
      </div>
  );
}

export default Inicio;
//rama  develop estudiantes
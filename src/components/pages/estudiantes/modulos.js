import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './modulos.css';
import { HiAcademicCap, HiCalendar, HiTrophy, HiDocumentCheck,HiClock } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import apic from '../../../services/api';
import { useAuth } from '../../../utils/AuthContext';
function Modulos({ isMobile }) {
  const { userData } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moduloActual, setModuloActual] = useState([]);
  const [nombreProfesor, setNombreProfesor] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [fechaF, setFechaF] = useState();
  const [fechaInicio, setFechaInicio] = useState();
  const [semanas, setSemanas] = useState();

  useEffect(() => {
    const getModulos = async (id) => {
      try {
        const modulosData = await apic.get(`/alumnos/${id}/modulos/calificaciones`);
        const modulosOrdenados = modulosData.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
        setModuloActual(modulosOrdenados[0]);
        setFechaF(new Date(modulosOrdenados[0].fecha_fin));
        setFechaFin(new Date(modulosOrdenados[0].fecha_fin).toLocaleDateString('es-ES'));
        setFechaInicio(new Date(modulosOrdenados[0].fecha_inicio).toLocaleDateString('es-ES'));

        console.log(`Respuesta de la API para los modulos ${id}:`, modulosOrdenados[0]);
        getNombreProfesor(modulosOrdenados[0].id_grupo);
      } catch (error) {
        console.error('Error al obtener modulos:', error);
      }
    };

    const getNombreProfesor = async (id_grupo) => {
      try {
        const grupoData = await apic.get(`/grupos/${id_grupo}`);
        const idProfesor = grupoData.id_profesor;
    
        const profesorData = await apic.get(`/profesores/${idProfesor}`);
        const nombreProfesor = profesorData.nombre;
        setNombreProfesor(nombreProfesor);
        
        console.log('Nombre del profesor:', nombreProfesor);
      } catch (error) {
        console.error('Error al obtener el nombre del profesor:', error);
      }
    };

    getModulos(userData.id);
  }, [userData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
      const diferenciaEnMilisegundos = fechaF - currentDate;
      const milisegundosPorSemana = 7 * 24 * 60 * 60 * 1000;
      const semanasTranscurridas = Math.floor(diferenciaEnMilisegundos / milisegundosPorSemana);
      setSemanas(semanasTranscurridas); // Aquí actualizamos el estado correctamente
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentDate, fechaF]);

  return (
    <div>
      {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Módulo" />}
      <div className='eModulosCont'>
        {isMobile && <p className='WelcomeMsg'>Módulo</p>}
        <div className='pageTitle' style={{position:'relative'}}>
          <span>{moduloActual.nombre}<br/>{moduloActual.descripcion}</span> <span className='AditionalInfo' style={{position:'absolute', bottom:'10%', right:'1%'}}>{moduloActual.periodo}</span>
        </div>

        <div className='latInfoCont'>
          <div className='latInfo'>
            <HiClock size="17px" style={{ color: "#e7a90e", marginRight: "5px", marginLeft: "-3px" }} />
            <span>{fechaInicio} - {fechaFin}</span>
          </div>
          <div className='latInfo'>
            <HiAcademicCap size="17px" style={{ color: "#bd1414", marginRight: "5px", marginLeft: "-3px" }} />
            <span>Maestro: {nombreProfesor}</span>
          </div>
          <div className='latInfo'>
            <HiCalendar size="17px" style={{ color: "#169e21", marginRight: "5px", marginLeft: "-3px" }} />
            <span>{moduloActual.duracion}</span>
          </div>
        </div>
        <div className='eModuloInfoCont'>
          <div className='button bigButton eCalifCont'>
            <div className='buttonHeader'>
              <HiTrophy size="22px" style={{ marginRight: "5px" }} /> <span>Calificacion</span>
            </div>
            <span className='eCalifInfo'>{moduloActual.calificacion !== null ? moduloActual.calificacion : 'SC'}</span>
            <span style={{ marginTop: "auto" }}>{moduloActual.periodo}</span>
          </div>
          <div className="button normalButton eSemanaCont">
            <div className='buttonHeader'>
              <HiCalendar size="22px" style={{ marginRight: "5px" }} /> <span>Semanas restantes</span>
            </div>
            <span className='eSemanasInfo'>{semanas} {semanas === 1 ? ' semana' : ' semanas'}</span>

          </div>
          <NavLink className="button normalButton eExamenCont" to='/estudiantes/calendario'>
            <div className='buttonHeader'>
              <HiDocumentCheck size="22px" style={{ marginRight: "5px" }} /> <span>Examen</span>
            </div>
            <span style={{ marginTop: "auto", paddingTop: "7px" }}>Ver en calendario</span>
          </NavLink>

        </div>

      </div>
    </div>
  );
}

export default Modulos;
//rama  modulos
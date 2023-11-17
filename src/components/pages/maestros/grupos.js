import React, { useState } from 'react';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './grupos.css';

function Grupos({ isMobile }) {
  const [grupoActual, setGrupoActual] = useState(null);
  const [alumnosGrupoActual, setAlumnosGrupoActual] = useState([]);

  // Función para cargar los datos del grupo actual desde un arreglo local
  const cargarDatosGrupoActual = () => {
    if (grupoActual === "G001") {
      ocultarGrupoActual();
    } else {
      // Datos de ejemplo: arreglo con nombres de alumnos
      const datosGrupoG001 = [
        { id: 1, nombre: "Juan Pérez" },
        { id: 2, nombre: "María García" },
        { id: 3, nombre: "Luis Rodríguez" },
      ];

      setAlumnosGrupoActual(datosGrupoG001);
      setGrupoActual("G001");
      document.querySelector(".simpleCont").classList.add("grupo-abierto");
    }
  };

  // Función para ocultar el grupo actual
  const ocultarGrupoActual = () => {
    setGrupoActual(null);
    setAlumnosGrupoActual([]);
    document.querySelector(".simpleCont").classList.remove("grupo-abierto");
  };

  return (
    <div>
      {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Grupos" />}
      <div className="gruposCont">
        {isMobile && <p className="WelcomeMsg">Grupos</p>}
        <span className="contSubtitle">Grupos actuales</span>
        <div className="simpleCont">
          <div
            className="button longButton currentModule"
            onClick={cargarDatosGrupoActual}
          >
            <span className="buttonTitle">
              {grupoActual ? alumnosGrupoActual.map(alumno => alumno.nombre).join(', ') : "G001"}
            </span>
          </div>
        </div>

        <div style={{ height: "74px" }}></div>
        <span className='contSubtitle'>Grupos pasados</span>

      </div>
    </div>
  );
}

export default Grupos;

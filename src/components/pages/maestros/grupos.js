import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import './grupos.css';


function Grupos({ isMobile }) {
  const [grupoActualExpanded, setGrupoActualExpanded] = useState(false);
  const [grupoExpandido, setGrupoExpandido] = useState(null);

  const handleGrupoActualClick = () => {
    setGrupoActualExpanded(!grupoActualExpanded);
  };

  const handleGrupoClick = (grupoId) => {
    if (grupoExpandido === grupoId) {
      setGrupoExpandido(null);
    } else {
      setGrupoExpandido(grupoId);
    }
  };
  const customStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: '10px',
    width: '800px',
  };
  const customStylesChild = {
    display: 'block',
    fontSize: '23px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '3% 0 2% 0',
  };

  const customStylesMar = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '30px',
    width: '500px',
  };

  const customStylesSub = {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    margin: '1px 0',
    padding: '5px',
  };

  const listAlum = [
    { "id": "2", "name": "Jaime Ivan Avila Muñoz" },
    { "id": "3", "name": "Heriberto" },
    { "id": "4", "name": "Angel Moises" },
    { "id": "5", "name": "Christisan" }
  ];

  const gruposA = [
    { id: "G001" },
    { id: "G002" },
    { id: "G003" },
    { id: "G004" },

  ];

  const gruposP = [
    { id: "G011" },
    { id: "G012" },
    { id: "G013" },
    { id: "G014" },

  ];


  const GruposPasados = gruposP.map((grupo) => ({
    id: grupo.id,
    alumnos: listAlum.map((alumno) => alumno.name)
  }));

  return (
    <div>
      {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Grupos" />}
      <Accordion sx={customStyles} expanded={grupoActualExpanded} onChange={handleGrupoActualClick}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={customStylesChild}>Grupos Actuales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {gruposA.map((grupo) => (
            <Accordion
              sx={customStylesMar}
              key={grupo.id}
              expanded={grupoExpandido === grupo.id}
              onChange={() => handleGrupoClick(grupo.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={customStylesSub}>{grupo.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {listAlum.map((alumno) => (
                    <li key={alumno.id}>{alumno.name}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={customStyles} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={customStylesChild}>Grupos Pasados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {GruposPasados.map((grupo) => (
            <Accordion sx={customStylesMar} key={grupo.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={customStylesSub}>{grupo.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {grupo.alumnos.map((alumno, index) => (
                    <li key={index}>{alumno}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Grupos;

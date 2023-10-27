import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../common/headerDesktop';
import HeaderMobile from '../../common/headerMobile';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import './ByA_alumnos.css'

function Alumnos({ isMobile }) {
    const [alumnos, setAlumnos] = useState([
        { id: 1, nombre: 'Alumno 1' },
        { id: 2, nombre: 'Alumno 2' },
        // Agrega más alumnos aquí
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAlumnos, setFilteredAlumnos] = useState(alumnos);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editedAlumno, setEditedAlumno] = useState({ nombre: '' });

    useEffect(() => {
        // Filtrar los alumnos basados en el término de búsqueda
        const filtered = alumnos.filter(alumno =>
            alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlumnos(filtered);
    }, [searchTerm, alumnos]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        const updatedAlumnos = alumnos.filter(alumno => alumno.id !== id);
        setAlumnos(updatedAlumnos);
    };

    const handleEdit = (alumno) => {
        setSelectedAlumno(alumno);
        setIsEditModalOpen(true);
        setIsAdding(false);
    };

    const handleAdd = () => {
        setSelectedAlumno(null);
        setIsEditModalOpen(true);
        setIsAdding(true);
    };

    const handleSave = (alumno) => {
        if (selectedAlumno) {
            const updatedAlumnos = alumnos.map(a => (a.id === selectedAlumno.id ? alumno : a));
            setAlumnos(updatedAlumnos);
        } else {
            // Agregar un nuevo alumno
            const newAlumno = { ...alumno, id: alumnos.length + 1 };
            setAlumnos([...alumnos, newAlumno]);
        }
        setSelectedAlumno(null);
        setIsEditModalOpen(false);
        setIsAdding(false);
    };

    return (
        <div>
            {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Alumnos" />}
            <span className='contSubtitle'>Alumnos</span>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar alumno"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

            {isAdding || selectedAlumno ? (
                <Button  style={{ backgroundColor: 'white', color: 'black' ,borderRadius: '10px', opacity: 0.9 }} onClick={handleAdd}>Agregar Alumno</Button>
            ) : (
                <Button onClick={handleAdd}>Agregar Alumno</Button>
            )}

            <TableContainer  component={Paper}  style={{ maxWidth: '600px', borderRadius: '10px', opacity: 0.8 }}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Edicion</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAlumnos.map((alumno) => (
                            <TableRow key={alumno.id}>
                                <TableCell>{alumno.nombre}</TableCell>
                                <TableCell>
                                    <Button
                                        className="edit-button"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(alumno)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(alumno.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isEditModalOpen}>
                <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <DialogTitle>{isAdding ? 'Agregar Alumno' : 'Editar Alumno'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nombre del Alumno"
                            value={editedAlumno.nombre}
                            onChange={(e) => setEditedAlumno({ nombre: e.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleSave(editedAlumno);
                                setEditedAlumno({ nombre: '' });
                            }}
                            color="primary"
                        >
                            Guardar
                        </Button>
                        <Button onClick={() => setIsEditModalOpen(false)} color="primary">
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Modal>
        </div>
    );
}

export default Alumnos;

import React, { useEffect, useState } from 'react';
import HeaderInicio from '../../../common/headerDesktop';
import HeaderMobile from '../../../common/headerMobile';
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
import '../bya/bya_prof.css';

function Profesores({ isMobile }) {
    const [profesores, setProfesores] = useState([
        { id: 1, nombre: 'Profesor 1' },
        { id: 2, nombre: 'Profesor 2' },
        // Agrega más profesores aquí
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProfesores, setFilteredProfesores] = useState(profesores);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editedProfesor, setEditedProfesor] = useState({ nombre: '' });

    useEffect(() => {
        // Filtrar los profesores basados en el término de búsqueda
        const filtered = profesores.filter(profesor =>
            profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProfesores(filtered);
    }, [searchTerm, profesores]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        const updatedProfesores = profesores.filter(profesor => profesor.id !== id);
        setProfesores(updatedProfesores);
    };

    const handleEdit = (profesor) => {
        setSelectedProfesor(profesor);
        setIsEditModalOpen(true);
        setIsAdding(false);
        setEditedProfesor(profesor);
    };

    const handleAdd = () => {
        setSelectedProfesor(null);
        setIsEditModalOpen(true);
        setIsAdding(true);
        setEditedProfesor({ nombre: '' });
    };

    const handleSave = (profesor) => {
        if (selectedProfesor) {
            const updatedProfesores = profesores.map(p => (p.id === selectedProfesor.id ? profesor : p));
            setProfesores(updatedProfesores);
        } else {
            // Agregar un nuevo profesor
            const newProfesor = { ...profesor, id: profesores.length + 1 };
            setProfesores([...profesores, newProfesor]);
        }
        setSelectedProfesor(null);
        setIsEditModalOpen(false);
        setIsAdding(false);
    };

    return (
        <div>
            {isMobile ? <HeaderMobile /> : <HeaderInicio titulo="Profesores" />}
            <span className='contSubtitle'>Profesores</span>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar profesor"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

            {isAdding || selectedProfesor ? (
                <Button
                    style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', opacity: 0.9 }}
                    onClick={handleAdd}
                >
                    Agregar Profesor
                </Button>
            ) : (
                <Button onClick={handleAdd}>Agregar Profesor</Button>
            )}

            <TableContainer component={Paper} style={{ maxWidth: '600px', borderRadius: '10px', opacity: 0.8 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Edición</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProfesores.map((profesor) => (
                            <TableRow key={profesor.id}>
                                <TableCell>{profesor.nombre}</TableCell>
                                <TableCell>
                                    <Button
                                        className="edit-button"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(profesor)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(profesor.id)}
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
                    <DialogTitle>{isAdding ? 'Agregar Profesor' : 'Editar Profesor'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nombre del Profesor"
                            value={editedProfesor.nombre}
                            onChange={(e) => setEditedProfesor({ nombre: e.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleSave(editedProfesor);
                                setEditedProfesor({ nombre: '' });
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

export default Profesores;

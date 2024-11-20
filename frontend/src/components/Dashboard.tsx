import React, {useEffect, useState} from "react";
import {
    Box, Button, Container,
    TextField,
    Typography, Divider
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function App() {
    //tabla
    const [tableData, setTableData] = useState([])
    const [showTable, setShowTable] = useState(true);
    useEffect(() => {
        if (showTable) {
            getItems()
            setShowTable(false)
        }
    }, [showTable]);


    //Creamos el tipo itemtype.Este tipo será un objeto con un id opcional de tipo number
    //nombre,marca y tipo de tipo string y el precio de tipo number
    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    //Inicializo los valores del item.Aqui no pongo el id porque no lo necesito
    const itemInitialState: itemtype = {
        nombre: '',
        marca: '',
        tipo: '',
        precio: 0,
    }

    //Cuando declaremos el useState del item en nuestro
    const [item, setItem] = useState(itemInitialState)

    //Guardar el nombre
    const handleChangeNombre = (e) => {
        setItem({
            ...item,
            nombre: e.target.value
        });
    };

    //Guardar la marca
    const handleChangeMarca = (e) => {
        setItem({
            ...item,
            marca: e.target.value
        });
    };

    //Guardar el tipo
    const handleChangeTipo = (e) => {
        setItem({
            ...item,
            tipo: e.target.value
        })
    }

    //Guarda el precio
    const handleChangePrecio = (e) => {
        setItem({
            ...item,
            precio: e.target.value
        })
    }

    //Limpiar los datos
    const handleClear = () => {
        setItem({
            nombre: '',
            marca: '',
            tipo: '',
            precio: 0,
        });
    };


    //Eliminar registro
    const handleDeleteItem = (row: itemtype) => {
        fetch(`http://localhost:3030/deleteItem?id=${row.id}`)
            .then(response => response.json())
            .then(response => {
                if (response > 0) {
                    getItems()
                    alert('Datos eliminados con éxito')
                } else {
                    alert('No se han eliminado los datos')
                }
            })
    }

    //Mostrar datos en la tabla
    async function getItems() {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }


    //Enviar datos
    async function handleSubmit(e: any) {
        e.preventDefault();
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            .then(response => {
                if (response > 0) {
                    // getItems para que se actualize la tabla
                    getItems()
                    alert('Datos guardados con éxito')
                    handleClear()
                } else {
                    alert('No se han insertado los datos')
                }
            })
    }

    return (
        <>
            <Container className="container">
                <Box component='form' onSubmit={handleSubmit} sx={{width: '100%', maxWidth: '100%', mt: '50px'}}>
                    <Typography variant='h6' color={"secondary"} sx={{mb: 2, textAlign: 'center'}}>Registro</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {/*Nombre*/}
                            <TextField
                                required
                                label='Nombre'
                                variant='outlined'
                                fullWidth
                                value={item.nombre}
                                onChange={handleChangeNombre}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*Marca*/}
                            <TextField
                                required
                                label='Marca'
                                variant='outlined'
                                fullWidth
                                value={item.marca}
                                onChange={handleChangeMarca}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*Tipo*/}
                            <TextField
                                required
                                label='Tipo'
                                variant='outlined'
                                fullWidth
                                value={item.tipo}
                                onChange={handleChangeTipo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*Precio*/}
                            <TextField
                                required
                                type='number'
                                label='Precio'
                                variant='outlined'
                                fullWidth
                                value={item.precio}
                                onChange={handleChangePrecio}
                            />
                        </Grid>
                    </Grid>


                    <Grid container spacing={2} justifyContent="flex-end" sx={{mt: 2}}>
                        <Grid item xs={12} sm={6}>
                            {/*Limpiar*/}
                            <Button fullWidth
                                    variant="contained"
                                    color='secondary'
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleClear} //Limpiar los datos
                            >
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*Enviar*/}
                            <Button fullWidth
                                    variant="contained"
                                    endIcon={<SendIcon/>}
                                    type="submit"
                            >
                                Insertar Datos
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{my: 4}}/>

                {/*Tabla*/}
                <TableContainer>
                    <Table aria-label='Tabla Coleccion'>
                        <TableHead>
                            <TableRow sx={{backgroundColor: 'primary.main', textAlign: 'center'}}>
                                <TableCell></TableCell>
                                <TableCell sx={{color: 'white'}}>Nombre</TableCell>
                                <TableCell sx={{color: 'white'}}>Marca</TableCell>
                                <TableCell sx={{color: 'white'}}>Tipo</TableCell>
                                <TableCell sx={{color: 'white'}}>Precio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row: itemtype) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteItem(row)}>
                                            <DeleteForeverIcon sx={{color: 'secondary.main'}}/>
                                        </Button>
                                    </TableCell>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.marca}</TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.precio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default App;

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
import {useSelector} from "react-redux";
import {RootState} from "../store/index";

function UserDashboard() {
    //tabla
    const [tableData, setTableData] = useState([])
    const [showTable, setShowTable] = useState(true);

    useEffect(() => {
        if (showTable) {
            getUsuarios()
            setShowTable(false)
        }
    }, [showTable]);

    //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
    const userData = useSelector((state: RootState) => state.authenticator)


    //Creamos el tipo itemtype.Este tipo será un objeto con un id opcional de tipo number
    //nombre,marca y tipo de tipo string y el precio de tipo number
    interface itemtype {
        id?: number
        nombre: string
        login: string
        password: string
        rol:string
    }

    //Inicializo los valores del item.Aqui no pongo el id porque no lo necesito
    const itemInitialState: itemtype = {
        nombre: '',
        login: '',
        password: '',
        rol:'',
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

    //Guardar el login
    const handleChangeLogin = (e) => {
        setItem({
            ...item,
           login: e.target.value
        });
    };

    //Guardar la contraseña
    const handleChangePassword = (e) => {
        setItem({
            ...item,
            password: e.target.value
        })
    }

    //Guarda el rol
    const handleChangeRol = (e) => {
        setItem({
            ...item,
           rol: e.target.value
        })
    }

    //Limpiar los datos
    const handleClear = () => {
        setItem({
            nombre: '',
            login: '',
            password: '',
            rol:'',
        });
    };




    //Mostrar datos en la tabla
    async function getUsuarios() {
        fetch(`http://localhost:3030/getUsers`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }


    //Enviar datos
    async function handleSubmit(e: any) {
        e.preventDefault();
        fetch(`http://localhost:3030/addUser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response => response.json())
            .then(response => {
                if (response > 0) {
                    // getUsuarios para que se actualize la tabla
                    getUsuarios()
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
                    <Typography variant='h6' color={"secondary"} sx={{mb: 2, textAlign: 'center'}}>Registro de Usuarios</Typography>
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
                            {/*Login*/}
                            <TextField
                                required
                                label='Login'
                                variant='outlined'
                                fullWidth
                                value={item.login}
                                onChange={handleChangeLogin}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*Password*/}
                            <TextField
                                required
                                label='Password'
                                variant='outlined'
                                fullWidth
                                value={item.password}
                                onChange={handleChangePassword}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*Rol*/}
                            <TextField
                                required
                                label='Rol'
                                variant='outlined'
                                fullWidth
                                value={item.rol}
                                onChange={handleChangeRol}
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
                    <Table aria-label='Tabla Usuarios'>
                        <TableHead>
                            <TableRow sx={{backgroundColor: 'primary.main', textAlign: 'center'}}>
                                <TableCell sx={{color: 'white'}}>Nombre</TableCell>
                                <TableCell sx={{color: 'white'}}>Login</TableCell>
                                <TableCell sx={{color: 'white'}}>Password</TableCell>
                                <TableCell sx={{color: 'white'}}>Rol</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row: itemtype) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.login}</TableCell>
                                    <TableCell>{row.password}</TableCell>
                                    <TableCell>{row.rol}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}
export default UserDashboard
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {useNavigate} from 'react-router-dom'
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';


function Login() {
    // Variables
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const bduser = 'alondra';
    const bdpasswd = '1999';
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const [alertOpen ,setAlertOpen]=useState(false);
    const[alertMessage,setAlertMessage]=useState('');
    const[alertSeverity,setAlertSeverity]=useState('');

    //Guardar el nombre de usuario
    const handleChangeUsername = (e: any) => {
        setData({ ...data,
            username:e.target.value
        });
    };

    //Guardar la contraseña
    const handleChangePassword = (e: any) => {
        setData({ ...data,
            password:e.target.value
        });
    };

    //Iniciar sesion y mostrar el alert
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setAlertOpen(true);

        if (data.username === bduser && data.password === bdpasswd) {
            navigate('/home');
            console.log('Usuario:', data.username, 'Contraseña:', data.password);
            //aquí pongo el dispatch para cambiar el estado a login en el store del redux
            dispatch(authActions.login({
                name: data.username, //data.user es el nombre de usuario que ha ingresado el usuario
                rol: 'administrador'
            }))

        } else {
            setAlertMessage('Usuario o contraseña incorrectos');
            setAlertSeverity('error');
            console.log('Usuario:', data.username, 'Contraseña:', data.password);
        }
    };

    return (
        <Container role={'main'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={4} sx={{ p:4, width: '100%', maxWidth: 800 }}>
                <Box component={'form'} onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '100%' }}>
                    <Typography variant='h4' color='primary' sx={{ mb: 1, textAlign: 'center' }}>
                         Sistema de Acceso
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                        <VpnKeyIcon color="info" sx={{ fontSize: 40 }} />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Usuario"
                                variant="outlined"
                                fullWidth
                                name="username"
                                value={data.username}
                                onChange={handleChangeUsername}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                type='password'
                                label='Contraseña'
                                variant="outlined"
                                fullWidth
                                name="password"
                                value={data.password}
                                onChange={handleChangePassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                        type='submit'
                        sx={{ mt: 2 }}>Iniciar Sesión
                    </Button>
                    {alertOpen &&
                    <Alert severity={alertSeverity} sx={{ mt: 2 }}>{alertMessage}</Alert>
                    }

                </Box>
            </Paper>
        </Container>
    );
}

export default Login;

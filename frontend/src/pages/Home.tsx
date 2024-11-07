import React from "react";
import Typography from "@mui/material/Typography";
//Importamos el useSelector del react-redux
import {useDispatch, useSelector} from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import {RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import {authActions} from '../store/authSlice';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Home() {
    //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
    const userData = useSelector((state: RootState) => state.authenticator)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Comprobamos por la consola qué obtenemos del store
    console.log(userData)

    const handleClick = () => {
        dispatch(authActions.logout());
        navigate('/');

    };

    return <>
        <Container role={'main'}
                   sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <Box sx={{width: '100%', maxWidth: '100%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4' color='primary' sx={{mb: 1, textAlign: 'center'}}>
                            Página Home de Alondra: Soy el usuario {userData.userName} y tengo el rol {userData.userRol}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            color='secondary'
                            fullWidth
                            type='submit'
                            onClick={handleClick}
                            sx={{mt: 2}}>Salir
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
}

export default Home;
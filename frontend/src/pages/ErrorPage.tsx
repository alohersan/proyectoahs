import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import {useNavigate} from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <>
            <Container role={'main'}
                       sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <Box sx={{width: '100%', maxWidth: '100%'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <img src={'./oops.png'} alt="Gato preocupado" width={200} height={200}/>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant='h4' color='primary' sx={{mt: 10, textAlign: 'center'}}>
                                Oops, ha ocurrido un error inesperado
                            </Typography>
                        </Grid>
                    </Grid>

                    <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                        type='submit'
                        onClick={handleClick}
                        sx={{mt: 2}}>Volver al inicio de sesión
                    </Button>
                </Box>


            </Container>
        </>
    )
}

export default ErrorPage;
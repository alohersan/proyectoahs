import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button"

function Login(){
    return(
        <>
           <header>
               <Typography variant='h1' color={'primary'} >Página Login Alondra Hernández Sánchez</Typography>
           </header>

            <main>
                <Container>
                    {/*Distintos Typography*/}
                    <Typography variant='h1' color={'primary'} >Página Login Alondra Hernández Sánchez</Typography>
                    <Typography variant='h3' color={'secondary'}>Página Login Alondra Hernández Sánchez</Typography>
                    <Typography variant='h6' color={'success'}>Página Login Alondra Hernández Sánchez</Typography>

                    {/*Distintos Button*/}
                    <Button variant='contained' color='error'>Botón 1</Button>
                    <Button variant='text' color='warning'>Botón 2</Button>
                    <Button variant='contained' color='success'>Botón 4</Button>
                </Container>
            </main>

            <footer>
                <Typography variant='body2' color={'warning'} >Página Login Alondra Hernández Sánchez</Typography>
                <Button variant='outlined' color='info'>Botón 3</Button>
            </footer>


        </>
    );
}
export default Login;
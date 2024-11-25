import React, { useState } from "react";
import Menu from '../components/Menu.tsx';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import InformeColeccion from '../components/InformeColeccion.tsx';

function Reports() {
    interface itemtype {
        id?: number;
        nombre: string;
        marca: string;
        tipo: string;
        precio: number;
    }

    // Estado inicial
    const itemInitialState: itemtype = {
        nombre: '',
        marca: '',
        tipo: '',
        precio: 0
    };
    const [coleccion, setColeccion] = useState<itemtype[]>([]);
    const [clicked, setClicked] = useState(false);

    // Función del botón
    function handleClick() {
        getItems();
        setClicked(!clicked);

    }

    // Obtener los datos de la base de datos
    async function getItems() {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                setColeccion(response.data);
            });
    }

    return (
        <>
            <Menu />
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                onClick={handleClick}
            sx={{mt:'80px'}}>
                Informes Colección
            </Button>
            <Container  sx={{width:'100vh',mt:'80px'}}>
                {/* Mostrar el componente si se pulsa el botón */}
                {clicked && <InformeColeccion data={coleccion} />}
            </Container>
        </>
    );
}

export default Reports;

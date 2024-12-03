import React, { useState } from "react";
import Menu from '../components/Menu.tsx';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import InformeColeccion from '../components/InformeColeccion.tsx';
import InformeUsuarios from '../components/InformeUsuarios.tsx'

function Reports() {
    //datos de la tabla coleccion
    interface itemtype {
        id?: number;
        nombre: string;
        marca: string;
        tipo: string;
        precio: number;
    }

    //datos de la tabla usuarios
    interface itemtp{
        id?:number;
        nombre:string;
        login:string;
        password:string;
        rol:string;
    }

    // Estado inicial para  coleccion
    const itemInitialState: itemtype = {
        nombre: '',
        marca: '',
        tipo: '',
        precio: 0
    };

    //Estado inicial para usuarios
    const itemEstadoInicial: itemtp = {
        nombre:'',
        login:'',
        password:'',
        rol:''
    }

    //Coleccion
    const [coleccion, setColeccion] = useState<itemtype[]>([]);
    const [clickedColeccion, setClickedColeccion] = useState(false);

    //Usuarios
    const[usuarios,setUsuarios] = useState<itemtp[]>([]);
    const[clickedUsuarios,setClickedUsuarios]=useState(false);

    // Función del botón para mostrar la tabla coleccion
    function handleClickColeccion() {
        getItems();
        setClickedColeccion(!clickedColeccion);
    }

    //Funcion del boton para mostrar la tabla usuarios
    function handleClickUsuarios(){
        getUsuarios();
        setClickedUsuarios(!clickedUsuarios);
    }

    // Obtener los datos de la base de datos para la tabla coleccion
    async function getItems() {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                setColeccion(response.data);
            });
    }

    //Obtener los usuarios de la base de datos
    async function getUsuarios(){
        fetch(`http://localhost:3030/getUsers`)
            .then(response=>response.json())
            .then(response =>{
                setUsuarios(response.data)
            })
    }

    return (
        <>
            <Menu />
            {/*Boton para la tabla Coleccion*/}
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                onClick={handleClickColeccion}
            sx={{mt:'80px'}}>
                Informes Colección
            </Button>

            {/*Boton para la tabla usuarios*/}
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                onClick={handleClickUsuarios}
                sx={{mt:'80px'}}>
                Informe Usuarios
            </Button>

            <Container  sx={{width:'100vh',mt:'80px'}}>
                {/* Mostrar el componente si se pulsa el botón */}
                {clickedColeccion && <InformeColeccion data={coleccion} />}
                {clickedUsuarios && <InformeUsuarios data={usuarios}/>}
            </Container>
        </>
    );
}

export default Reports;

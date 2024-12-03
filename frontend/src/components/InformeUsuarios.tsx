import React from "react";
//importo la librería de informes
import MaterialTable, { Column } from "@material-table/core";
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {useTheme} from "@mui/material/styles"

//Crear la interfaz para los tipos de los campos de la tabla usuarios
interface itemtype{
    nombre:string
    login:string
    password:string
    rol:string
}

interface UsuariosArray{
    data:itemtype[];
}

function InformeUsuarios({data}:UsuariosArray){
    const theme=useTheme();
    const usuarios=data
    const col: Array<Column<itemtype>> = [
        { title: "Nombre", field: "nombre",filtering:true},
        { title: "Login", field: "login",filtering:false},
        { title: "Password", field: "password",filtering:false},
        { title: "Rol", field: "rol",filtering:false},
    ];

    const tableData = usuarios.map((row)=>(
        {
            nombre:row.nombre,
            login:row.login,
            password:row.password,
            rol:row.rol,
        }
    ));

    return(
        <MaterialTable
            title={"Usuarios"}
            columns={col}
            data={tableData}
            options={{
                exportMenu: [
                    {
                    label: "Export PDF",
                        exportFunc:(cols,datas) => ExportPdf(cols, datas, "UsuariosPDF"),
                    },
                    {
                        label: "Export CSV",
                        exportFunc:(cols, datas)=>ExportCsv(cols, datas, "UsuariosCSV"),
                    },
                ],
                headerStyle:{
                    backgroundColor:theme.palette.secondary.main,
                    color:theme.palette.primary.main,
                },
                draggable:true,
                columnsButton:true,
                filtering:true,
            }}
            />
    )
}
export default InformeUsuarios
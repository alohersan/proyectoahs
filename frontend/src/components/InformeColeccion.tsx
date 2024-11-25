import React from "react";
//importo la librería de informes
import MaterialTable, { Column } from "@material-table/core";
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {useTheme} from "@mui/material/styles"

//Creo la interfaz para los tipos de los campos (field) de la tabla.
interface itemtype {
    nombre:string
    marca:string
    tipo:string
    precio:number
}
interface  ProductosArray{
    data:itemtype[];
}

function InformeColeccion({data}:ProductosArray){
    const theme = useTheme();
//Creación de los datos de prueba:
// --> definición de las columnas de la tabla
    //Para cada elemento que queremos mostrar tendremos el title y el field
    //Será un array del tipo Column (tipo de material-table-core que importamos arriba) cuyos
    //elementos son del tipo itemtype que definimos nosotros.
    //El title contendrá el título de la columna de la tabla que es lo que veremos en la interfaz
    //El field contendrá el nombre que le damos a ese campo en la tabla
    //Por ejemplo: tendremos una columna con el title Nombre cuyo campo se llamará nombre
    //Podemos indicar también el type y decir que es numérico, como en el caso del precio
    //Se añade la opcion de filtrar los campos marca y tipo
    const coleccion=data
    const col: Array<Column<itemtype>> = [
        { title: "Nombre", field: "nombre",filtering:false},
        { title: "Marca", field: "marca",filtering:true },
        { title: "Tipo",field:"tipo",filtering:true},
        { title: "Precio", field: "precio", type: "numeric",filtering:false }
    ];

// --> definición de los datos de la tabla
    //Datos que se van a mostrar en la tabla para el informe, que se recogen de la base de datos
    const tableData = coleccion.map((row)=>(
    {
        nombre:row.nombre,
        marca:row.marca,
        tipo:row.tipo,
        precio:row.precio
    }
    ));

    /*Para mostrar los datos en la tabla uso el componente <MaterialTable/> de la librería @material-table/core,
    pasándole como props: columns y data. A columns le doy el valor de la variable col que definí antes
    y a data le doy el valor de la variable tableData*/
    return (
        <MaterialTable

            title={"Colección"}
            columns={col} data={tableData}
            renderSummaryRow={({column, data}) =>
            column.field=="precio"?
                {
                    value: data.reduce((agg, row) => agg + row.precio, 0),
                }:undefined
            }
            options={{
                exportMenu: [
                    {
                        label: "Export PDF",
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, "ProductosPDF"),
                    },
                    {
                        label: "Export CSV",
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, "ProductosCSV"),
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
        />)
}
export default InformeColeccion
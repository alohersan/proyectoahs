import React from "react";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Reports from "./pages/Reports.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorPage/>,
        children: [
            {
                index:true, //indicamos que estamos en la ruta padre->'/'
                element:<Login/>
            },
            {
                path:'home',
                element: <Home/>
            },
            {
                path:'reports',
                element:<Reports/>
            }
        ]
    },
]);

function App() {

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App

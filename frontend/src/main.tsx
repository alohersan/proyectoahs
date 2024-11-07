import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'

import { Provider } from 'react-redux'
import { store } from './store/index'

const customTheme=createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#f53701',
            light: '#ff3d00',
        },
        error: {
            main: '#ce2f50',
        },
        warning: {
            main: '#BF3F00',
            light: '#BF3F00',
        },
        info: {
            main: '#006064',
        },
        success: {
            main: '#032f03',
        },
        divider: '#6a1b9a',
        text: {
            primary: '#000000',
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={customTheme}>
        <CssBaseline/>
            <Provider store={store}>
                <App/>
            </Provider>

        </ThemeProvider>
    </StrictMode>
)

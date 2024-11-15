import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.jsx";
import {AuthWrapper} from "./components/context/AuthContext.jsx";
import 'nprogress/nprogress.css';

createRoot(document.getElementById('root')).render(
    <AuthWrapper>
        <RouterProvider router={router} >
            <App />
        </RouterProvider>
    </AuthWrapper>
)

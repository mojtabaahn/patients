import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Index from './routes/Patient/Index.jsx'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {HeroUIProvider} from "@heroui/react";
import PatientDetails from "./routes/Patient/Details.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeroUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<DashboardLayout/>}>
                        <Route path={'/'} element={<Navigate to="/patient" replace />}/>
                        <Route path={'/patient'} element={<Index/>}/>
                        <Route path={'/patient/:pk'} element={<PatientDetails/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </HeroUIProvider>
    </StrictMode>,
)

import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Formulario from './Components/Formulario.tsx'
import Menu from './Components/Menu.tsx'
import DetalleInstrumento from './Components/DetalleInstrumento.tsx'
import GrillaInstrumentos from './Components/GrillaInstrumentos.tsx'
import Location from "./Components/Location.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<Menu/>} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/location" element={<Location/>}/>
      <Route path="/detalle">
        <Route path=":idplato" element={<DetalleInstrumento />} />
      </Route>
      <Route path="/grilla" element={<GrillaInstrumentos />} />
      <Route path="/formulario/:idplato" element={<Formulario />}/>
      <Route path="*" element={<Menu />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)

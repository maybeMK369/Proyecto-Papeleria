import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import BarraNavegacion from './components/layout/Navbar'
import PiePagina from './components/layout/PiePagina'
import Inicio from './views/Inicio'
import Productos from './views/Productos'
import Sucursales from './views/Sucursales'
import Ofertas from './views/Ofertas'
import Servicio from './views/Servicio'
import Admin from './views/admin/Admin'

function Contenido() {
  const ubicacion = useLocation()
  const esRutaAdmin = ubicacion.pathname.startsWith('/admin')

  return (
    <div className="contenedor-app">
      <BarraNavegacion />
      <main className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/servicio" element={<Servicio />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      {!esRutaAdmin && <PiePagina />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Contenido />
    </BrowserRouter>
  )
}

export default App

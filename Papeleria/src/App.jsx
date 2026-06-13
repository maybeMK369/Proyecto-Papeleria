import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Inicio from './views/Inicio'
import Productos from './views/Productos'
import Sucursales from './views/Sucursales'
import Ofertas from './views/Ofertas'
import Servicio from './views/Servicio'
import Admin from './views/admin/Admin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/servicio" element={<Servicio />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

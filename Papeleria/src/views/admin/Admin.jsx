import { Routes, Route } from 'react-router-dom'
import LoginForm from '../../components/forms/LoginForm'
import AgregarOfertaForm from '../../components/forms/AgregarOfertaForm'
import PanelAdmin from './PanelAdmin'
import ListaOfertas from './ofertas/ListaOfertas'
import EditarOferta from './ofertas/EditarOferta'

// Routing interno del área de administración
export default function Admin() {
  return (
    <Routes>
      <Route index element={<LoginForm />} />
      <Route path="panel" element={<PanelAdmin />} />
      <Route path="ofertas/agregar" element={<AgregarOfertaForm modo="agregar" />} />
      <Route path="ofertas/eliminar" element={<ListaOfertas modo="eliminar" />} />
      <Route path="ofertas/modificar" element={<ListaOfertas modo="modificar" />} />
      <Route path="ofertas/editar/:id" element={<EditarOferta modo="editar" />} />
    </Routes>
  )
}

import { Link } from 'react-router-dom'
import BotonPrincipal from '../../components/ui/BotonPrincipal'

// Panel principal del admin con accesos a las funciones de gestión
export default function PanelAdmin() {
  return (
    <div className="contenedor-panel">
      <Link to="/admin/ofertas/agregar">
        <BotonPrincipal texto="Agregar Ofertas" variante="oscuro" />
      </Link>
      <Link to="/admin/ofertas/eliminar">
        <BotonPrincipal texto="Eliminar Ofertas" variante="oscuro" />
      </Link>
      <Link to="/admin/ofertas/modificar">
        <BotonPrincipal texto="Modificar Ofertas" variante="oscuro" />
      </Link>
    </div>
  )
}

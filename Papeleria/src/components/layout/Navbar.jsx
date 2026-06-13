import { Link } from 'react-router-dom'

const enlacesNav = [
  { nombre: 'PRODUCTOS', ruta: '/productos' },
  { nombre: 'SUCURSALES', ruta: '/sucursales' },
  { nombre: 'OFERTAS', ruta: '/ofertas' },
  { nombre: 'SERVICIO AL CLIENTE', ruta: '/servicio' },
]

export default function BarraNavegacion() {
  return (
    <header className="barra-nav">
      <div className="barra-nav-superior">
        <Link to="/admin" className="btn-admin">ADMIN</Link>

        <div className="area-logo">
          <img src="/imagenes/logo.png" alt="Logo Pavia" className="icono-logo" />

        </div>

        <div className="area-busqueda-espacio" />
      </div>

      <nav className="enlaces-barra-nav">
        {enlacesNav.map((enlace) => (
          <Link key={enlace.nombre} to={enlace.ruta} className="enlace-nav">
            {enlace.nombre}
          </Link>
        ))}
      </nav>
    </header>
  )
}

import { Link, useLocation } from 'react-router-dom'

const enlacesNav = [
  { nombre: 'PRODUCTOS', ruta: '/productos' },
  { nombre: 'SUCURSALES', ruta: '/sucursales' },
  { nombre: 'OFERTAS', ruta: '/ofertas' },
  { nombre: 'SERVICIO AL CLIENTE', ruta: '/servicio' },
]

// Navbar adaptativo: muestra ADMIN/enlaces en rutas públicas, iconos en rutas admin
export default function BarraNavegacion() {
  const ubicacion = useLocation()
  const esRutaAdmin = ubicacion.pathname.startsWith('/admin')
  const esLogin = ubicacion.pathname === '/admin'
  const esPanel = ubicacion.pathname === '/admin/panel'

  // Mostrar botón ADMIN en todas las rutas excepto login y panel
  const mostrarAdmin = !esLogin && !esPanel
  // Mostrar enlaces de navegación solo en rutas públicas
  const mostrarEnlaces = !esRutaAdmin

  return (
    <header className="barra-nav">
      <div className="barra-nav-superior">
        {mostrarAdmin && <Link to="/admin" className="btn-admin">ADMIN</Link>}
        {!mostrarAdmin && <div className="espacio-vacio" />}

        <Link to="/" className="icono-accion" title="Inicio" style={{ marginLeft: '15px' }}>
          <img src="/imagenes/botonhome.png" alt="Inicio" className="icono-imagen" />
        </Link>

        <div className="area-logo" style={{ marginLeft: '200px' }}>
          <img src="/imagenes/logo.png" alt="Logo Pavia" className="icono-logo" />
        </div>

        {/* -------Barra de búsqueda -------  (Falta funcionalidad)*/}
        <div name="barra-busqueda-principal" className="barra-busqueda" style={{ position: 'relative', left: '130px', top: '15px' }}>
          <span className="icono-busqueda">&#128269;</span>
          <input
            type="text"
            className="entrada-busqueda-admin"
            placeholder="Buscar productos"
            //value={busqueda}
            //onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

                {/* ESTO NO ME LO TOQUEN SON LOS BOTONES DE HOME Y REGRESO DE ADMIN */}
        <div className="area-acciones-admin"> 
          {esRutaAdmin && (
            <>
              <Link to="/" className="icono-accion" title="Inicio">
                <img src="/imagenes/botonhome.png" alt="Inicio" className="icono-imagen" />
              </Link>
              {!esLogin && (
                <Link to="/admin/panel" className="icono-accion" title="Panel">
                  <img src="/imagenes/botonregresar.png" alt="Panel" className="icono-imagen" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {mostrarEnlaces && (
        <nav className="enlaces-barra-nav">
          {enlacesNav.map((enlace) => (
            <Link key={enlace.nombre} to={enlace.ruta} className="enlace-nav">
              {enlace.nombre}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

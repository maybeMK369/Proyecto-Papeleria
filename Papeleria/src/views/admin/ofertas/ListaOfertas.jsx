import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BotonPrincipal from '../../../components/ui/BotonPrincipal'
import Modal from '../../../components/layout/Modal'

const API = 'http://localhost:3000/api'

// Lista de ofertas con buscador por ID y botones de acción
export default function ListaOfertas({ modo }) {
  const navegar = useNavigate()
  const [ofertas, setOfertas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [idEliminar, setIdEliminar] = useState(null)

  // Cargar ofertas desde el backend al montar el componente
  useEffect(() => {
    fetch(`${API}/ofertas`)
      .then((res) => res.json())
      .then((data) => setOfertas(data))
      .catch(() => setOfertas([]))
  }, [])

  // Filtrar ofertas por ID según la búsqueda
  const ofertasFiltradas = busqueda
    ? ofertas.filter((o) => o.id.toString().includes(busqueda))
    : ofertas

  // Confirmar eliminación
  const confirmarEliminar = async () => {
    if (!idEliminar) return
    await fetch(`${API}/ofertas/${idEliminar}`, { method: 'DELETE' })
    setOfertas(ofertas.filter((o) => o.id !== idEliminar))
    setIdEliminar(null)
  }

  return (
    <div className="contenedor-lista">
      <div className="barra-busqueda">
        <span className="icono-busqueda">&#128269;</span>
        <input
          type="text"
          className="entrada-busqueda-admin"
          placeholder="Buscar con ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="lista-ofertas">
        {ofertasFiltradas.map((oferta) => (
          <div key={oferta.id} className="fila-oferta">
            <span className="nombre-oferta">{oferta.tituloOferta}</span>
            <div className="botones-fila">
              {modo === 'eliminar' && (
                <>
                  <BotonPrincipal texto="ELIMINAR" variante="gris" onClick={() => setIdEliminar(oferta.id)} />
                  <BotonPrincipal texto="CAMBIOS" variante="gris" onClick={() => navegar(`/admin/ofertas/editar/${oferta.id}`)} />
                </>
              )}
              {modo === 'modificar' && (
                <>
                  <BotonPrincipal texto="ELIMINAR" variante="gris" onClick={() => setIdEliminar(oferta.id)} />
                  <BotonPrincipal texto="CAMBIOS" variante="gris" onClick={() => navegar(`/admin/ofertas/editar/${oferta.id}`)} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        mostrar={idEliminar !== null}
        titulo="Confirmar el eliminar producto"
        mensaje="Seguro que quiere eliminar este producto de la base de datos y no se podrá recuperar"
        onConfirmar={confirmarEliminar}
        onCancelar={() => setIdEliminar(null)}
      />
    </div>
  )
}

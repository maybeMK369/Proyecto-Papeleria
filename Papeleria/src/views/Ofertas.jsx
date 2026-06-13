import { useState, useEffect } from 'react'
import CardCatalogo from '../components/ui/CardCatalogo'

const API = 'http://localhost:3000/api'

// Página de ofertas que muestra todas las ofertas activas como cartas
export default function Ofertas() {
  const [ofertas, setOfertas] = useState([])

  // Cargar ofertas desde el backend al montar el componente
  useEffect(() => {
    fetch(`${API}/ofertas`)
      .then((res) => res.json())
      .then((data) => setOfertas(data.filter((o) => o.activa)))
      .catch(() => setOfertas([]))
  }, [])

  return (
    <div className="pagina-ofertas">
      <div className="grid-catalogo">
        {ofertas.map((oferta) => (
          <CardCatalogo
            key={oferta.id}
            imagen={oferta.imagen}
            titulo={oferta.tituloOferta}
            precioOriginal={oferta.precioOriginal}
            precioOferta={oferta.precioOferta}
            descuento={oferta.descuentoPorcentaje}
            esOferta={true}
          />
        ))}
      </div>
    </div>
  )
}

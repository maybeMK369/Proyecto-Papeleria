import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AgregarOfertaForm from '../../../components/forms/AgregarOfertaForm'

const API = 'http://localhost:3000/api'

// Wrapper que carga una oferta por ID para editarla
export default function EditarOferta({ modo }) {
  const { id } = useParams()
  const [oferta, setOferta] = useState(null)

  // Buscar la oferta en el backend por su ID
  useEffect(() => {
    fetch(`${API}/ofertas`)
      .then((res) => res.json())
      .then((data) => {
        const encontrada = data.find((o) => o.id === Number(id))
        setOferta(encontrada || null)
      })
      .catch(() => setOferta(null))
  }, [id])

  if (!oferta) return <p className="mensaje-carga">Cargando oferta...</p>

  return <AgregarOfertaForm modo={modo} ofertaExistente={oferta} />
}

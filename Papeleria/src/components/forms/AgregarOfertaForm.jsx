import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from './InputForm'
import BotonPrincipal from '../ui/BotonPrincipal'
import Modal from '../layout/Modal'

const API = 'http://localhost:3000/api'

// Formulario reutilizable para agregar, editar o eliminar ofertas
export default function AgregarOfertaForm({ modo = 'agregar', ofertaExistente = null }) {
  const navegar = useNavigate()
  const [productos, setProductos] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)

  // Cargar lista de productos desde el backend
  useEffect(() => {
    fetch(`${API}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch(() => setProductos([]))
  }, [])

  // Inicializar formulario con datos de la oferta si existe (modo editar/eliminar)
  const [formulario, setFormulario] = useState(() => {
    if (ofertaExistente) {
      return {
        productoId: ofertaExistente.productoId || '',
        tituloOferta: ofertaExistente.tituloOferta || '',
        imagen: ofertaExistente.imagen || '',
        precioOriginal: ofertaExistente.precioOriginal || ofertaExistente.precioOferta || '',
        descuento: ofertaExistente.descuentoPorcentaje || '',
        descripcion: ofertaExistente.descripcion || '',
      }
    }
    return { productoId: '', tituloOferta: '', imagen: '', precioOriginal: '', descuento: '', descripcion: '' }
  })

  // Al seleccionar un producto, autorellenar precio, imagen y descripción
  const manejarSeleccionProducto = (e) => {
    const productoId = Number(e.target.value)
    const productoSeleccionado = productos.find((p) => p.id === productoId)

    if (productoSeleccionado) {
      setFormulario({
        ...formulario,
        productoId: productoId,
        precioOriginal: productoSeleccionado.precio,
        imagen: productoSeleccionado.imagen,
        descripcion: `Producto: ${productoSeleccionado.nombre} - Categoría: ${productoSeleccionado.categoria}`,
      })
    } else {
      setFormulario({ ...formulario, productoId: '', precioOriginal: '', imagen: '', descripcion: '' })
    }
  }

  // Validar que solo se ingresen dígitos en el descuento (0-100)
  const manejarCambio = (e) => {
    const { name, value } = e.target
    if (name === 'descuento') {
      if (value === '' || /^\d+$/.test(value)) {
        const numero = Number(value)
        if (numero >= 0 && numero <= 100) {
          setFormulario({ ...formulario, [name]: value })
        }
      }
    } else {
      setFormulario({ ...formulario, [name]: value })
    }
  }

  // Validar que la imagen sea una URL o ruta válida
  const validarImagen = (url) => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')
  }

  // Calcular precio con descuento aplicado
  const calcularPrecioConDescuento = (precioOriginal, descuento) => {
    return precioOriginal * (1 - descuento / 100)
  }

  // Calcular precio final en tiempo real
  const precioFinal = formulario.precioOriginal && formulario.descuento
    ? calcularPrecioConDescuento(Number(formulario.precioOriginal), Number(formulario.descuento)).toFixed(2)
    : null

  // Función para enviar datos al backend 
  const enviarAlBackend = async (metodo, url, datos) => {
    const respuesta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
    return respuesta.json()
  }

  // Crear nueva oferta en el backend
  const manejarAgregar = async (e) => {
    e.preventDefault()
    if (!formulario.productoId) {
      alert('Debe seleccionar un producto')
      return
    }
    if (!validarImagen(formulario.imagen)) {
      alert('La imagen debe ser una URL válida (http://, https://) o una ruta (/)')
      return
    }
    const precioConDescuento = calcularPrecioConDescuento(Number(formulario.precioOriginal), Number(formulario.descuento))
    await enviarAlBackend('POST', `${API}/ofertas`, {
      productoId: formulario.productoId,
      tituloOferta: formulario.tituloOferta,
      descuentoPorcentaje: Number(formulario.descuento),
      precioOferta: precioConDescuento,
      precioOriginal: Number(formulario.precioOriginal),
      activa: true,
      imagen: formulario.imagen,
      descripcion: formulario.descripcion,
    })
    navegar('/admin/panel')
  }

  // Actualizar oferta existente en el backend
  const manejarEditar = async (e) => {
    e.preventDefault()
    if (!ofertaExistente) return
    if (!validarImagen(formulario.imagen)) {
      alert('La imagen debe ser una URL válida (http://, https://) o una ruta (/)')
      return
    }
    const precioConDescuento = calcularPrecioConDescuento(Number(formulario.precioOriginal), Number(formulario.descuento))
    await enviarAlBackend('PUT', `${API}/ofertas/${ofertaExistente.id}`, {
      productoId: formulario.productoId,
      tituloOferta: formulario.tituloOferta,
      descuentoPorcentaje: Number(formulario.descuento),
      precioOferta: precioConDescuento,
      precioOriginal: Number(formulario.precioOriginal),
      imagen: formulario.imagen,
      descripcion: formulario.descripcion,
    })
    navegar('/admin/ofertas/modificar')
  }

  // Eliminar oferta del backend
  const manejarEliminar = async () => {
    if (!ofertaExistente) return
    await enviarAlBackend('DELETE', `${API}/ofertas/${ofertaExistente.id}`)
    setMostrarModal(false)
    navegar('/admin/ofertas/eliminar')
  }

  // Texto del botón según el modo
  const obtenerEtiquetaBoton = () => {
    if (modo === 'agregar') return 'Agregar'
    if (modo === 'editar') return 'APLICAR CAMBIOS'
    if (modo === 'eliminar') return 'ELIMINAR'
    return 'Enviar'
  }

  // Manejar envío del formulario según el modo
  const manejarEnvioPrincipal = (e) => {
    e.preventDefault()
    if (modo === 'agregar') manejarAgregar(e)
    else if (modo === 'editar') manejarEditar(e)
    else if (modo === 'eliminar') setMostrarModal(true)
  }

  // Solo requerido en modos agregar y editar
  const esRequerido = modo !== 'eliminar'

  return (
    <>
      <form className="formulario-oferta" onSubmit={manejarEnvioPrincipal}>
        {/* Selector de productos existentes */}
        <div className="campo-formulario">
          <label className="etiqueta-campo">
            Producto
            {esRequerido && <span className="asterisco">*</span>}
          </label>
          <select
            name="productoId"
            value={formulario.productoId}
            onChange={manejarSeleccionProducto}
            className="entrada-formulario"
            required={esRequerido}
          >
            <option value="">Seleccionar producto...</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre} - ${producto.precio}
              </option>
            ))}
          </select>
        </div>

        {/* Título del descuento */}
        <InputForm etiqueta="Título del Descuento" nombre="tituloOferta" valor={formulario.tituloOferta} onChange={manejarCambio} requerido={esRequerido} />

        {/* Precio Original (solo lectura, se autorellena del producto) */}
        <div className="campo-formulario">
          <label className="etiqueta-campo">Precio Original</label>
          <input
            type="text"
            className="entrada-formulario entrada-solo-lectura"
            value={formulario.precioOriginal ? `$${formulario.precioOriginal}` : ''}
            readOnly
          />
        </div>

        {/* Descuento */}
        <InputForm etiqueta="Descuento (%)" nombre="descuento" valor={formulario.descuento} onChange={manejarCambio} requerido={esRequerido} />

        {/* Precio final calculado */}
        {precioFinal && (
          <div className="precio-final">
            Precio con descuento: <strong>${precioFinal}</strong>
          </div>
        )}

        {/* Imagen (editable, solo afecta la oferta) */}
        <InputForm etiqueta="Imagen" nombre="imagen" valor={formulario.imagen} onChange={manejarCambio} requerido={esRequerido} />

        {/* Descripción (editable, solo afecta la oferta) */}
        <InputForm etiqueta="Descripción" nombre="descripcion" valor={formulario.descripcion} onChange={manejarCambio} requerido={esRequerido} />

        <div className="contenedor-boton-form">
          <BotonPrincipal texto={obtenerEtiquetaBoton()} tipo="submit" variante="gris" />
        </div>
      </form>

      <Modal
        mostrar={mostrarModal}
        titulo="Confirmar el eliminar producto"
        mensaje="Seguro que quiere eliminar este producto de la base de datos y no se podrá recuperar"
        onConfirmar={manejarEliminar}
        onCancelar={() => setMostrarModal(false)}
      />
    </>
  )
}

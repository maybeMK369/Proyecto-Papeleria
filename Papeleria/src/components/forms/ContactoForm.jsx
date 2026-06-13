import { useState } from 'react'
import InputForm from './InputForm'
import Modal from '../layout/Modal'

// Formulario de contacto que muestra modal de confirmación al enviar
export default function ContactoForm() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    problematica: '',
    solucion: '',
  })
  const [mostrarModal, setMostrarModal] = useState(false)

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    setMostrarModal(true)
  }

  return (
    <>
      <form className="formulario-contacto" onSubmit={manejarEnvio}>
        <h2 className="titulo-contacto">CONTACTO</h2>
        
        <InputForm etiqueta="Nombre" nombre="nombre" valor={formulario.nombre} onChange={manejarCambio} requerido />
        <InputForm etiqueta="Email" nombre="email" tipo="email" valor={formulario.email} onChange={manejarCambio} requerido />
        <InputForm etiqueta="Teléfono" nombre="telefono" tipo="tel" valor={formulario.telefono} onChange={manejarCambio} requerido />
        <InputForm etiqueta="Problemática" nombre="problematica" valor={formulario.problematica} onChange={manejarCambio} requerido />
        <InputForm etiqueta="Solución" nombre="solucion" valor={formulario.solucion} onChange={manejarCambio} />
        
        <div className="contenedor-boton-enviar">
          <button type="submit" className="boton-enviar">
            Enviar
          </button>
        </div>
      </form>

      <Modal
        mostrar={mostrarModal}
        titulo="Formulario enviado"
        mensaje="Nuestro equipo te enviará un mensaje"
        onConfirmar={() => setMostrarModal(false)}
        onCancelar={() => setMostrarModal(false)}
      />
    </>
  )
}

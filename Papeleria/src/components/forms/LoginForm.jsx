import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from './InputForm'
import BotonPrincipal from '../ui/BotonPrincipal'

// Formulario de login no funcional, solo navega al panel al enviar
export default function LoginForm() {
  const navegar = useNavigate()
  const [formulario, setFormulario] = useState({ nombre: '', contrasena: '' })

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  // Al enviar, redirige al panel de admin 
  const manejarEnvio = (e) => {
    e.preventDefault()
    navegar('/admin/panel')
  }

  return (
    <div className="contenedor-login">
      <h1 className="titulo-login">LOG IN</h1>
      <form className="formulario-login" onSubmit={manejarEnvio}>
        <InputForm etiqueta="Nombre" nombre="nombre" valor={formulario.nombre} onChange={manejarCambio} requerido />
        <InputForm etiqueta="Contraseña" tipo="password" nombre="contrasena" valor={formulario.contrasena} onChange={manejarCambio} requerido />
        <div className="contenedor-boton-login">
          <BotonPrincipal texto="INGRESAR" tipo="submit" variante="oscuro" />
        </div>
      </form>
    </div>
  )
}

// Botón reutilizable con variantes de estilo (oscuro, gris, secundario)
export default function BotonPrincipal({ texto, onClick, tipo = 'button', variante = 'primario' }) {
  return (
    <button type={tipo} onClick={onClick} className={`boton-principal boton-${variante}`}>
      {texto}
    </button>
  )
}

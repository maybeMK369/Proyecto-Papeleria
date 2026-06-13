// Modal de confirmación, se cierra al hacer clic fuera
export default function Modal({ mostrar, titulo, mensaje, onConfirmar, onCancelar }) {
  if (!mostrar) return null

  return (
    <div className="modal-fondo" onClick={onCancelar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-titulo">{titulo}</h3>
        <p className="modal-mensaje">{mensaje}</p>
        <button className="boton-principal boton-secundario" onClick={onConfirmar}>
          Confirmar
        </button>
      </div>
    </div>
  )
}

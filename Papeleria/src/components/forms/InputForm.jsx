// Input reutilizable con etiqueta, soporte para campos requeridos
export default function InputForm({ etiqueta, tipo = 'text', valor, onChange, requerido = false, nombre }) {
  return (
    <div className="campo-formulario">
      <label className="etiqueta-campo">
        {etiqueta}
        {requerido && <span className="asterisco">*</span>}
      </label>
      <input
        type={tipo}
        name={nombre}
        value={valor}
        onChange={onChange}
        className="entrada-formulario"
        required={requerido}
      />
    </div>
  )
}

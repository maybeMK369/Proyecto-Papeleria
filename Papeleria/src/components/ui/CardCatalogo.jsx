import BotonPrincipal from './BotonPrincipal'

// Carta reutilizable para productos y ofertas
// Si no hay descuento, solo muestra el precio normal
export default function CardCatalogo({ imagen, titulo, precioOriginal, precioOferta, descuento, esOferta = false, mostrarBoton = true }) {
  return (
    <div className="card-catalogo">
      <div className="card-imagen-contenedor">
        <img src={imagen} alt={titulo} className="card-imagen" />
      </div>
      <div className="card-contenido">
        <h3 className="card-titulo">{titulo}</h3>
        
        {esOferta && precioOriginal && precioOferta ? (
          <div className="card-precios-oferta">
            <span className="precio-tachado">${precioOriginal}</span>
            <span className="precio-descuento">${precioOferta}</span>
            {descuento && <span className="badge-descuento">-{descuento}%</span>}
          </div>
        ) : (
          <div className="card-precio-normal">
            <span className="precio-normal">${precioOriginal || precioOferta}</span>
          </div>
        )}
        
        {mostrarBoton && <BotonPrincipal texto="Comprar" variante="oscuro" onClick={() => {}} />}
      </div>
    </div>
  )
}

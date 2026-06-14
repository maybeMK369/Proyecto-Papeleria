import { useState, useEffect } from 'react';
import CardCatalogo from '../components/ui/CardCatalogo';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/productos');

        if (!respuesta.ok) {
          throw new Error('Error al cargar los productos');
        }

        const datos = await respuesta.json();
        setProductos(datos);
        setCargando(false);
      } catch (error) {
        setError(error.message);
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="pagina-ofertas">
      <h2>Lista de Productos</h2>
      <div className="grid-catalogo">
        {productos.map((producto) => (
          <CardCatalogo
            key={producto.id}
            imagen={producto.imagen}
            titulo={producto.nombre}
            precioOriginal={producto.precio}
            mostrarBoton={false}
          />
        ))}
      </div>
    </div>
  );
}

export default Productos;
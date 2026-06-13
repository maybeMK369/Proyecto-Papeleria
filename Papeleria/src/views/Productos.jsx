import { useState, useEffect } from 'react';

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
    <div>
      <h2>Lista de Productos</h2>
      {productos.map(productos => (
        <div key={productos.id} className="productos-card">
          <img src={productos.imagen} alt={productos.nombre} />
          <h3>{productos.nombre}</h3>
          <p>Categoría: {productos.categoria}</p>
          <p>Precio: ${productos.precio}</p>
        </div>
      ))}
    </div>
  );
}

export default Productos;
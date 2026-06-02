import './App.css'

function App() {
  const categorias = ['Cuadernos', 'Lapices', 'Pegamento', 'Tijeras', 'Mochilas']
  const productos = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <div className="wf-box header">
        <div className="wf-box logo">LOGO</div>
        <div className="nav">
          <div className="wf-box nav-item">Inicio</div>
          <div className="wf-box nav-item">Productos</div>
          <div className="wf-box nav-item">Ofertas</div>
          <div className="wf-box nav-item">Contacto</div>
        </div>
        <div className="wf-box nav-item">Carrito</div>
      </div>

      <div className="wf-box search-bar">Buscar productos...</div>

      <div className="wf-box banner">Banner promocional</div>

      <div className="main-content">
        <div className="wf-box sidebar">
          <span className="wf-label">Categorias</span>
          {categorias.map((cat) => (
            <div className="wf-box sidebar-item" key={cat}>{cat}</div>
          ))}
        </div>

        <div className="products">
          <div className="product-grid">
            {productos.map((n) => (
              <div className="wf-box product-card" key={n}>
                <div className="product-img"></div>
                <div className="product-name"></div>
                <div className="product-price"></div>
                <button className="btn">Agregar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="wf-box cart">
          <span className="wf-label">Carrito</span>
          <div className="wf-box cart-item"></div>
          <div className="wf-box cart-item"></div>
          <div className="wf-box cart-item"></div>
          <button className="btn">Pagar</button>
        </div>
      </div>

      <div className="wf-box footer">
        <span className="wf-label">Footer</span>
        <div className="footer-links">
          <div className="wf-box footer-link">Info</div>
          <div className="wf-box footer-link">FAQ</div>
          <div className="wf-box footer-link">Redes</div>
        </div>
      </div>
    </>
  )
}

export default App

import React from 'react';
import MapaUbicacion from '../components/layout/MapaUbicacion';
import '../App.css'; 

import mapa1 from '../assets/sucursal1.png.png';
import mapa2 from '../assets/sucursal2.png.png';
import mapa3 from '../assets/sucursal3.png.png';

export default function Sucursales() {
  return (
    <div className="contenedor-sucursales">

      {/* SUCURSAL 1 */}
      <div className="sucursal-card">
        <h3>Av. Juárez</h3>
        <MapaUbicacion imgMapa={mapa1} />
      </div>

      {/* SUCURSAL 2 */}
      <div className="sucursal-card">
        <h3>Av. Chapultepec</h3>
        <MapaUbicacion imgMapa={mapa2} />
      </div>

      {/* SUCURSAL 3 */}
      <div className="sucursal-card">
        <h3>Puerta de Hierro</h3>
        <MapaUbicacion imgMapa={mapa3} />
      </div>

    </div>
  );
}


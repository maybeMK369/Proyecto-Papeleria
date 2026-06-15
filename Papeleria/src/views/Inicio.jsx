import React from 'react';
import heroImg from '../assets/hero.png';
import Carrusel from '../components/layout/Carrusel';

export default function Inicio() {
  return (
    <div className="inicio">
      <div className="banner-heroe">
        <Carrusel />
      </div>
    </div>
  );
}

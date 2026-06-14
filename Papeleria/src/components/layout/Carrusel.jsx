import React from 'react';
import "../../App.css"; 

{/* PRODUCTOS */}
const productos = [//Agregen las imagenes de cada producto aca, las imagenes van en la carpeta imagenes y se llaman aqui
  { id: 1, nombre: "Bolígrafo Gel Azul", categoria: "Escritura", precio: 15.5, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKaIm2GuzQba4oBR1vmPwzQVBtjPqI29heTzuD1BmfjBhBB1rLJImx8Y6&s=10" },
  { id: 2, nombre: "Lápiz Grafito HB", categoria: "Escritura", precio: 8.0, imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/prisaradiomx/ACTEDS4BGJPN5AR7RFLQUJYOPU.jpg" },
  { id: 3, nombre: "Cuaderno Profesional 100 Hojas", categoria: "Escolar", precio: 65.0, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ikXhTJp2aX4FBTuG9XK1bc6v3AzxiBwWn_3OpKmBY2L1E59mPFosXs0&s=10" },
  { id: 4, nombre: "Mochila Escolar Reforzada", categoria: "Escolar", precio: 450.0, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3HWkxPBTY68lYUQDlInUoIefnyhAAcFjg-J6Bzb2fUGXwN7yoEZVEwnum&s=10" },
  { id: 5, nombre: "Grapas de Acero 6700 pzas", categoria: "Oficina", precio: 67.0, imagen: "https://cdnx.jumpseller.com/finsa/image/15336501/Cinta_Transparente_de_2_x_100_mts_231215.jpg?1664300738" },
  { id: 7, nombre: "Set de Colores Prismacolor 24 pzs", categoria: "Arte", precio: 320.0, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBtTa3OxQPzrBcy8__ehbEy7manhTAOZYJncnS6OOkdw&s" },
  { id: 8, nombre: "Acuarelas  12 colores", categoria: "Arte", precio: 185.0, imagen: "https://superpapelera.com.mx/wp-content/uploads/2023/05/2020041.webp" },
  { id: 9, nombre: "Teclado Inalámbrico USB", categoria: "Computo", precio: 399.0, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllxk-sO6q_DDRPdORkwj3H2I2XMN9JAHQfJ28YSQHQkFyjniuRUaG1xBg&s=10" },
  { id: 10, nombre: "Mouse Ergonómico ", categoria: "Computo", precio: 250.0, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5IMJVx1lj8_xCgq2rXByaWjmJrwdpSN3s-m5UTzxqA0FrfL8mDHzVu_67&s=10" },
];

export default function Carrusel() {
  return (
    <div className="seccion-carrusel">
      <h2 className="titulo-seccion">Todos los Productos</h2>
      
      {/* Contenedor */}
      <div className="contenedor-carrusel-nativo">
        {productos.map((producto) => (
            <div className="tarjeta-producto" key={producto.id}>
                <div className="contenedor-img-producto">
                    <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <h3 className="nombre-producto">{producto.nombre}</h3>
                <p className="precio-producto">${producto.precio.toFixed(2)}</p>
                <button className="boton-agregar-carrito">Ver Detalles</button>
            </div>
        ))}
      </div>
    </div>
  );
}
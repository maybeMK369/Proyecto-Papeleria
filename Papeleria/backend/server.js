
import http from "http";

const PUERTO = 3000;

//cors pero mas rapido
const CABECERAS_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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

const sucursales = [
  { id: 1, nombre: "Sucursal Centro", direccion: "Av. Juárez #123, Col. Centro, Guadalajara, Jalisco", mapaUrl: "https://maps.google.com/?q=Av+Juarez+123+Guadalajara" },
  { id: 2, nombre: "Sucursal Chapultepec", direccion: "Av. Chapultepec Sur #456, Col. Americana, Guadalajara, Jalisco", mapaUrl: "https://maps.google.com/?q=Av+Chapultepec+456+Guadalajara" },
  { id: 3, nombre: "Sucursal Andares", direccion: "Blvd. Puerta de Hierro #789, Col. Puerta de Hierro, Guadalajara, Jalisco", mapaUrl: "https://maps.google.com/?q=Puerta+de+Hierro+789+Guadalajara" },
];

const ofertas = [
  { id: 1, productoId: 1, tituloOferta: "2x1 en Bolígrafos Gel", descuentoPorcentaje: 50, precioOferta: 7.75, precioOriginal: 15.5, activa: true, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKaIm2GuzQba4oBR1vmPwzQVBtjPqI29heTzuD1BmfjBhBB1rLJImx8Y6&s=10", descripcion: "Promoción especial en bolígrafos gel azul" },
  { id: 2, productoId: 7, tituloOferta: "Colores Prismacolor con 30% de descuento", descuentoPorcentaje: 30, precioOferta: 224.0, precioOriginal: 320.0, activa: true, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBtTa3OxQPzrBcy8__ehbEy7manhTAOZYJncnS6OOkdw&s", descripcion: "Set de colores Prismacolor 24 piezas" },
  { id: 3, productoId: 9, tituloOferta: "Teclado Inalámbrico", descuentoPorcentaje: 40, precioOferta: 239.4, precioOriginal: 399.0, activa: false, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllxk-sO6q_DDRPdORkwj3H2I2XMN9JAHQfJ28YSQHQkFyjniuRUaG1xBg&s=10", descripcion: "Teclado inalámbrico USB ergonómico" },
];

// Genera ID único autoincremental para ofertas
function generarIdOferta() {
  if (ofertas.length === 0) return 1;
  return Math.max(...ofertas.map((o) => o.id)) + 1;
}

// Lee el cuerpo de la petición POST/PUT de forma asíncrona
function leerCuerpoSolicitud(solicitud) {
  return new Promise((resolver, rechazar) => {
    let cuerpo = "";
    solicitud.on("data", (fragmento) => { cuerpo += fragmento.toString(); });
    solicitud.on("end", () => resolver(cuerpo));
    solicitud.on("error", (error) => rechazar(error));
  });
}

// Envía respuesta JSON con ek cors
function enviarRespuestaJSON(respuesta, codigoEstado, datos) {
  respuesta.writeHead(codigoEstado, { ...CABECERAS_CORS, "Content-Type": "application/json" });
  respuesta.end(JSON.stringify(datos));
}

// Creación del servidor HTTP
const servidor = http.createServer(async (solicitud, respuesta) => {
  const metodo = solicitud.method;
  const url = solicitud.url;

  // Manejo de pre-vuelo CORS (OPTIONS)
  if (metodo === "OPTIONS") {
    respuesta.writeHead(204, CABECERAS_CORS);
    respuesta.end();
    return;
  }

  // GET /api/productos
  if (metodo === "GET" && url === "/api/productos") {
    enviarRespuestaJSON(respuesta, 200, productos);
    return;
  }

  // GET /api/sucursales
  if (metodo === "GET" && url === "/api/sucursales") {
    enviarRespuestaJSON(respuesta, 200, sucursales);
    return;
  }

  // GET /api/ofertas
  if (metodo === "GET" && url === "/api/ofertas") {
    enviarRespuestaJSON(respuesta, 200, ofertas);
    return;
  }

  // POST /api/ofertas - Crear nueva oferta
  if (metodo === "POST" && url === "/api/ofertas") {
    try {
      const datosOferta = JSON.parse(await leerCuerpoSolicitud(solicitud));
      const nuevaOferta = {
        id: generarIdOferta(),
        productoId: datosOferta.productoId,
        tituloOferta: datosOferta.tituloOferta,
        descuentoPorcentaje: datosOferta.descuentoPorcentaje,
        precioOferta: datosOferta.precioOferta,
        precioOriginal: datosOferta.precioOriginal || datosOferta.precioOferta,
        activa: datosOferta.activa,
        imagen: datosOferta.imagen || '',
        descripcion: datosOferta.descripcion || '',
      };
      ofertas.push(nuevaOferta);
      enviarRespuestaJSON(respuesta, 201, { mensaje: "Oferta creada exitosamente", oferta: nuevaOferta });
    } catch {
      enviarRespuestaJSON(respuesta, 400, { error: "JSON inválido o error al procesar la solicitud" });
    }
    return;
  }

  // PUT /api/ofertas/:id - Actualizar oferta existente
  // El ID de la oferta se extrae de la URL (ejemplo: /api/ofertas/2)
  if (metodo === "PUT" && url.startsWith("/api/ofertas/")) {
    try {
      // 1: Extraer el id de la url
      // url.split("/api/ofertas/")[1] divide la URL y toma la parte después del coso
      // parseInt convierte ese string a número entero
      const idOferta = parseInt(url.split("/api/ofertas/")[1], 10);

      //  2: Buscar la oferta por su id
      // findIndex devuelve el índice (posición) de la oferta que coincida con el ID
      // Si no la encuentra, devuelve -1
      const indiceOferta = ofertas.findIndex((o) => o.id === idOferta);

      // 3: Verificar que la oferta existe
      // Si indiceOferta es -1, significa que no se encontró ninguna oferta con ese ID
      if (indiceOferta === -1) {
        enviarRespuestaJSON(respuesta, 404, { error: `No se encontró una oferta con el ID ${idOferta}` });
        return;
      }

      //4: Leer y parsear el cuerpo de la petición
      // El cliente envía los campos que quiere actualizar
      const datosActualizados = JSON.parse(await leerCuerpoSolicitud(solicitud));

      //5: Actualizar la oferta manteniendo los valores que no se envían
      // El operador spread (...) copia primero todos los datos existentes de la oferta
      // Luego el operador ??  solo sobrescribe un campo si el nuevo
      // valor NO es null ni undefined. Si el cliente no envió un campo se conserva el original
      ofertas[indiceOferta] = {
        ...ofertas[indiceOferta],
        productoId: datosActualizados.productoId ?? ofertas[indiceOferta].productoId,
        tituloOferta: datosActualizados.tituloOferta ?? ofertas[indiceOferta].tituloOferta,
        descuentoPorcentaje: datosActualizados.descuentoPorcentaje ?? ofertas[indiceOferta].descuentoPorcentaje,
        precioOferta: datosActualizados.precioOferta ?? ofertas[indiceOferta].precioOferta,
        precioOriginal: datosActualizados.precioOriginal ?? ofertas[indiceOferta].precioOriginal,
        activa: datosActualizados.activa ?? ofertas[indiceOferta].activa,
        imagen: datosActualizados.imagen ?? ofertas[indiceOferta].imagen,
        descripcion: datosActualizados.descripcion ?? ofertas[indiceOferta].descripcion,
      };

      //6: Enviar respuesta de éxito con la oferta actualizada
      enviarRespuestaJSON(respuesta, 200, { mensaje: "Oferta actualizada exitosamente", oferta: ofertas[indiceOferta] });
    } catch {
    
      enviarRespuestaJSON(respuesta, 400, { error: "JSON inválido o error al procesar la solicitud" });
    }
    return;
  }

  // DELETE /api/ofertas/:id - Eliminar oferta
  if (metodo === "DELETE" && url.startsWith("/api/ofertas/")) {
    const idOferta = parseInt(url.split("/api/ofertas/")[1], 10);
    const indiceOferta = ofertas.findIndex((o) => o.id === idOferta);
    if (indiceOferta === -1) {
      enviarRespuestaJSON(respuesta, 404, { error: `No se encontró una oferta con el ID ${idOferta}` });
      return;
    }
    const ofertaEliminada = ofertas.splice(indiceOferta, 1)[0];
    enviarRespuestaJSON(respuesta, 200, { mensaje: "Oferta eliminada exitosamente", oferta: ofertaEliminada });
    return;
  }

  // Ruta no encontrada (404)
  enviarRespuestaJSON(respuesta, 404, {
    error: "Ruta no encontrada",
    mensaje: `La ruta '${metodo} ${url}' no existe en este servidor`,
  });
});

servidor.listen(PUERTO, () => {

  console.log("  SERVIDOR DE LA PAPALERÍA INICIADO");

  console.log(`  Puerto: ${PUERTO}`);
  console.log(`  URL base: http://localhost:${PUERTO}`);
  console.log("67");
  console.log("  Endpoints disponibles:");
  console.log("  GET    /api/productos");
  console.log("  GET    /api/sucursales");
  console.log("  GET    /api/ofertas");
  console.log("  POST   /api/ofertas");
  console.log("  PUT    /api/ofertas/:id");
  console.log("  DELETE /api/ofertas/:id");
  console.log(":)");
});

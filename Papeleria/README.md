# Papeleria Pavia - Sistema de Gestión

Proyecto web para la gestión de una papelería con panel de administración, catálogo de productos, sucursales, ofertas y servicio al cliente.

## Tecnologías

- **Frontend:** React 19 + Vite + react-router-dom
- **Backend:** Node.js (servidor HTTP nativo, sin frameworks)
- **Base de datos:** En memoria (arrays en `server.js`)

---

## Estructura de Carpetas

```
Papeleria/
├── backend/
│   └── server.js              # Servidor HTTP con datos en memoria
├── public/
│   └── imagenes/              # Imágenes estáticas (logo, botones, etc.)
├── src/
│   ├── assets/                # Recursos importados por Vite (hero.png, etc.)
│   ├── components/
│   │   ├── forms/             # Formularios reutilizables
│   │   │   ├── AgregarOfertaForm.jsx   # Form para agregar/editar/eliminar ofertas
│   │   │   ├── InputForm.jsx           # Input con etiqueta y soporte requerido
│   │   │   ├── LoginForm.jsx           # Login no funcional (solo navega al panel)
│   │   │   └── ContactoForm.jsx        # (vacío, para futuro uso)
│   │   ├── layout/            # Componentes de estructura de página
│   │   │   ├── Navbar.jsx             # Barra de navegación adaptativa
│   │   │   ├── Modal.jsx              # Modal de confirmación reutilizable
│   │   │   ├── Carrusel.jsx           # (vacío, para futuro uso)
│   │   │   ├── EnlacesNav.jsx         # (vacío, para futuro uso)
│   │   │   ├── MapaUbicacion.jsx      # (vacío, para futuro uso)
│   │   │   └── SearchBar.jsx          # (vacío, para futuro uso)
│   │   └── ui/                # Componentes UI genéricos
│   │       ├── BotonPrincipal.jsx     # Botón con variantes (oscuro, gris, secundario)
│   │       ├── BotonIcono.jsx         # (vacío, para futuro uso)
│   │       ├── CardCatalogo.jsx       # (vacío, para futuro uso)
│   │       └── RedesSociales.jsx      # (vacío, para futuro uso)
│   ├── views/                 # Páginas principales del sitio
│   │   ├── admin/             # Área de administración
│   │   │   ├── Admin.jsx              # Routing interno del admin
│   │   │   ├── PanelAdmin.jsx         # Panel con botones de gestión
│   │   │   └── ofertas/               # Gestión de ofertas
│   │   │       ├── ListaOfertas.jsx   # Lista con buscador y botones de acción
│   │   │       └── EditarOferta.jsx   # Wrapper para editar oferta por ID
│   │   ├── Inicio.jsx                 # Página principal (banner hero)
│   │   ├── Productos.jsx              # (vacío)
│   │   ├── Sucursales.jsx             # (vacío)
│   │   ├── Ofertas.jsx                # (vacío)
│   │   ├── Servicio.jsx               # (vacío)
│   │   └── GridCatalogo.jsx           # (vacío, componente reutilizable)
│   ├── App.jsx                # Configuración principal de rutas
│   ├── App.css                # Estilos globales
│   ├── index.css              # Reset CSS
│   └── main.jsx               # Punto de entrada de React
├── index.html
├── package.json
└── vite.config.js
```

---

## Cómo Ejecutar el Proyecto

Se necesitan **dos terminales** abiertas simultáneamente:

### Terminal 1 - Backend
```bash
cd Papeleria
node backend/server.js
```
El servidor se inicia en `http://localhost:3000`

### Terminal 2 - Frontend
```bash
cd Papeleria
npm run dev
```
La aplicación se abre en `http://localhost:5173`

---

## Endpoints del Backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Lista todos los productos |
| GET | `/api/sucursales` | Lista todas las sucursales |
| GET | `/api/ofertas` | Lista todas las ofertas |
| POST | `/api/ofertas` | Crear nueva oferta |
| PUT | `/api/ofertas/:id` | Actualizar oferta existente |
| DELETE | `/api/ofertas/:id` | Eliminar oferta |

---

## Rutas de la Aplicación

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | Inicio | Página principal con banner |
| `/productos` | Productos | Catálogo de productos |
| `/sucursales` | Sucursales | Ubicación de sucursales |
| `/ofertas` | Ofertas | Ofertas disponibles |
| `/servicio` | Servicio | Servicio al cliente |
| `/admin` | Login | Inicio de sesión de administrador |
| `/admin/panel` | Panel Admin | Panel de gestión |
| `/admin/ofertas/agregar` | Formulario | Agregar nueva oferta |
| `/admin/ofertas/eliminar` | Lista | Eliminar ofertas existentes |
| `/admin/ofertas/modificar` | Lista | Modificar ofertas existentes |
| `/admin/ofertas/editar/:id` | Formulario | Editar una oferta específica |

---

## Solución de Problemas

### Error: `ERR_CONNECTION_REFUSED` en el navegador
El backend no está corriendo. Abre una terminal y ejecuta:
```bash
node backend/server.js
```

### Error: `AgregarOfertaForm is not defined`
Falta importar el componente. Verifica que `Admin.jsx` tenga:
```jsx
import AgregarOfertaForm from '../../components/forms/AgregarOfertaForm'
```

### Error: `Module not found` al mover archivos
Cuando muevas un archivo de carpeta, actualiza **todas** las importaciones que lo referencian. La ruta es relativa al archivo que importa:
- Desde `src/views/admin/Admin.jsx` a `src/components/...` → `../../components/...`
- Desde `src/views/admin/ofertas/ListaOfertas.jsx` a `src/components/...` → `../../../components/...`
- Desde `src/components/forms/AgregarOfertaForm.jsx` a `src/components/forms/InputForm.jsx` → `./InputForm`

### El botón ADMIN no aparece en el Navbar
El Navbar es adaptativo. El botón ADMIN se oculta en las rutas `/admin` (login) y `/admin/panel`. Aparece en todas las demás rutas.

### Los cambios en el backend no se reflejan
Reinicia el servidor del backend (`Ctrl+C` y vuelve a ejecutar `node backend/server.js`). Los datos están en memoria, se reinician al detener el servidor.

### La imagen del logo no se muestra
Verifica que el archivo exista en `public/imagenes/logo.png`. Las imágenes en `public/` se referencian desde la raíz: `/imagenes/logo.png`.

### El formulario de ofertas no carga los productos
Asegúrate de que el backend esté corriendo. El formulario hace un `GET` a `/api/productos` al montarse para llenar el selector.

---

## Notas para el Equipo

- **No modificar** el `const productos` en `server.js` desde el frontend. Las ofertas pueden tener imágenes y descripciones propias que no afectan al producto original.
- **El login no es funcional.** Al hacer clic en "INGRESAR" navega directamente al panel sin validar credenciales.
- **Los archivos vacíos** (marcados como "vacío, para futuro uso") están creados para que el equipo los llene según avance el proyecto.
- **Variables en español.** Toda la nomenclatura del proyecto usa español (componentes, variables, clases CSS).

## Comandos de GitHub

**Antes de programar (Para tener todo actualizado)** 
git checkout main
git pull origin main 
git checkout nombreDeSuRama

**Para subir sus cambios a su rama**
git add .
git commit -m "explicacion de sus cambios"
git push origin nombreDeSuRama





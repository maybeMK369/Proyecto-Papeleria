# ✏️ Sistema de Papelería Escolar - UNIVA

Aplicación web para la gestión y venta de productos de papelería escolar, desarrollada con **React** y **Vite**.

## 👥 Equipo de Desarrollo y Roles

* **Andrés:** FullStack Developer
* **Hanna:** Project Manager & FrontEnd Developer
* **Munny:** BackEnd Developer
* **Keren:** BackEnd / FrontEnd Developer
* **Sofía:** Documentación
* **Victoria:** FrontEnd Developer

## 🚀 Tecnologías

* **Frontend:** React 19 + Vite
* **Backend / Base de Datos:** Por definir (posible Supabase)
* **Hosting:** Por definir (posible GitHub Pages o Vercel)

## ⚙️ Requisitos Previos

1. [Node.js](https://nodejs.org/) (Version LTS recomendada)
2. [Git](https://git-scm.com/) para control de versiones

## 📐 Estructura del Proyecto

```
Papeleria/
├── Papeleria/
│   ├── src/
│   │   ├── App.jsx          # Componente principal
│   │   ├── App.css          # Estilos de App
│   │   ├── index.css        # Estilos globales
│   │   └── main.jsx         # Punto de entrada
│   ├── public/              # Archivos estaticos
│   ├── index.html           # HTML base
│   ├── package.json         # Dependencias y scripts
│   └── vite.config.js       # Configuracion de Vite
└── README.md
```

## 🛠️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/maybeMK369/Proyecto-Papeleria.git
   ```

2. **Entrar al directorio del proyecto:**
   ```bash
   cd Papeleria/Papeleria
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   La app estara disponible en `http://localhost:5173`

## 📦 Comandos Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para produccion |
| `npm run preview` | Vista previa del build de produccion |
| `npm run lint` | Ejecuta ESLint para revisar el codigo |

## 📋 Flujo de Trabajo (Git Workflow)

* Nadie trabaja directamente en la rama `main`
* Para cada tarea, crea una rama: `git checkout -b feature/nombre`
* Sube tu rama y crea un Pull Request para revision
* Documentacion mantenida por Sofia. Coordinacion a cargo de Hanna.

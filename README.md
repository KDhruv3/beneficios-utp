# 🎓 Beneficios Tech UTP

Plataforma web que recopila todos los beneficios tecnológicos y descuentos disponibles para estudiantes de la Universidad Tecnológica de Panamá (UTP).


## ✨ Características

- 🔍 **Búsqueda en tiempo real** - Encuentra beneficios rápidamente
- 🏷️ **Filtros por categoría** - Desarrollo, Diseño, Productividad, Cloud, etc.
- 🤖 **Chatbot asistente** - Ayuda a encontrar beneficios específicos
- 📱 **Diseño responsive** - Funciona en móvil, tablet y desktop
- 🎨 **Interfaz moderna** - Tema oscuro con acentos morados
- ⚡ **100% vanilla** - HTML, CSS y JavaScript puro (sin frameworks)

## 🚀 Tecnologías

Este proyecto está construido con tecnologías web fundamentales para que sea fácil de entender y contribuir:

- **HTML5** - Estructura semántica
- **CSS3** - Diseño con variables CSS, Grid, Flexbox y animaciones
- **JavaScript vanilla** - Lógica sin dependencias externas
- **Google Fonts** - Tipografía Inter

## 📦 Estructura del Proyecto

```
prueba2/
├── index.html      # Página principal
├── styles.css      # Estilos globales
├── data.js         # Base de datos de beneficios
├── script.js       # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🎯 Beneficios Incluidos

Actualmente la plataforma incluye **15 beneficios** en las siguientes categorías:

- **Desarrollo**: GitHub, JetBrains, Microsoft 365
- **Diseño**: Figma, Adobe, Canva, Autodesk
- **Productividad**: Notion, Grammarly
- **Cloud**: AWS Educate
- **Entretenimiento**: Spotify, YouTube Premium
- **Educación**: Coursera
- **Seguridad**: LastPass
- **Hardware**: Apple Education

## 🛠️ Cómo Contribuir

¡Este proyecto es **open source** y animamos a todos los estudiantes de la UTP a contribuir!

### Agregar un nuevo beneficio

1. Abre el archivo `data.js`
2. Agrega un nuevo objeto al array `studentBenefits` siguiendo esta estructura:

```javascript
{
    id: 'nombre-unico',
    name: 'Nombre del Beneficio',
    category: 'Categoría', // Desarrollo, Diseño, Productividad, etc.
    description: 'Descripción breve del beneficio',
    benefits: [
        'Beneficio 1',
        'Beneficio 2',
        // ...
    ],
    image: 'https://url-de-la-imagen.svg',
    url: 'https://sitio-oficial.com',
    tags: ['tag1', 'tag2'],
    discount: 'XX% OFF',
    verificationRequired: true // o false
}
```

### Mejorar el diseño

1. Los estilos están en `styles.css`
2. Las variables CSS están al inicio del archivo para fácil personalización
3. Cada sección tiene comentarios explicativos

### Mejorar la funcionalidad

1. La lógica está en `script.js`
2. Funciones bien documentadas y organizadas
3. Código limpio y comentado

## 🏃‍♂️ Cómo usar

### Opción 1: Abrir directamente
Simplemente abre el archivo `index.html` en tu navegador.

### Opción 2: Servidor local
Si quieres un servidor local para desarrollo:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 🎨 Personalización

### Cambiar colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --purple-primary: #a855f7;  /* Color principal */
    --bg-primary: #0a0a0a;      /* Fondo principal */
    --text-primary: #ffffff;     /* Texto principal */
    /* ... más variables */
}
```

### Agregar nuevas categorías

1. Agrega el botón en `index.html` dentro de `.categories`
2. Asegúrate de usar el mismo nombre en `data.js` para los beneficios

## 📱 Compartir con compañeros

Para compartir tu versión local con compañeros remotamente, puedes usar:

```bash
# Opción 1: SSH Tunnel con Pinggy
ssh -p 443 -R0:localhost:8000 -o StrictHostKeyChecking=no a.pinggy.io

# Opción 2: ngrok (requiere instalación)
ngrok http 8000
```

## 🤝 Contribuidores

- **Tu nombre aquí** - Iniciador del proyecto
- ¡Tu compañero aquí! - Agrega tu nombre al contribuir

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 💡 Ideas para Futuras Mejoras

- [ ] Modo claro/oscuro toggle
- [ ] Guardar favoritos en localStorage
- [ ] Compartir beneficios específicos
- [ ] Notificaciones de nuevos beneficios
- [ ] Sistema de votación/reviews
- [ ] Integración con calendario académico UTP
- [ ] PWA (Progressive Web App)
- [ ] Multiidioma (español/inglés)

## 📞 Contacto

¿Tienes sugerencias o encontraste un bug? 
- Abre un issue
- Envía un pull request
- Contacta al equipo de desarrollo

---

Hecho con 💜 por y para estudiantes de la UTP

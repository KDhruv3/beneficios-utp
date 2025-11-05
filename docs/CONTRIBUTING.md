# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Beneficios Tech UTP! Esta guía te ayudará a empezar.

## 🎯 Formas de Contribuir

1. **Agregar nuevos beneficios** - ¿Conoces un descuento estudiantil que no está en la lista?
2. **Mejorar el diseño** - ¿Tienes ideas para hacer la interfaz más atractiva?
3. **Corregir bugs** - ¿Encontraste algo que no funciona correctamente?
4. **Mejorar documentación** - ¿Puedes explicar algo mejor?
5. **Traducir** - ¿Quieres agregar soporte multiidioma?

## 🚀 Para Empezar

### Prerrequisitos
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Un editor de código (VS Code, Sublime Text, Atom, etc.)
- Conocimientos básicos de HTML, CSS y JavaScript
- (Opcional) Git para control de versiones

### Configuración Local

1. **Clona el repositorio** (o descarga los archivos)
   ```bash
   git clone https://github.com/tu-usuario/beneficios-tech-utp.git
   cd beneficios-tech-utp
   ```

2. **Abre el proyecto**
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local (ver README)

3. **Empieza a editar**
   - Los cambios se reflejan al recargar el navegador
   - No necesitas compilar ni instalar nada

## 📝 Cómo Agregar un Beneficio

### Paso 1: Edita `data.js`

Agrega un nuevo objeto al array `studentBenefits`:

```javascript
{
    id: 'id-unico-en-minusculas',
    name: 'Nombre Oficial del Servicio',
    category: 'Desarrollo', // Ver categorías disponibles abajo
    description: 'Descripción clara y concisa (máx 150 caracteres)',
    benefits: [
        'Beneficio principal 1',
        'Beneficio principal 2',
        'Beneficio principal 3',
        'Beneficio principal 4',
        // Mínimo 4, máximo recomendado 6
    ],
    image: 'https://url-imagen-oficial.svg', // Preferiblemente SVG
    url: 'https://sitio-oficial.com/estudiantes',
    tags: ['tag1', 'tag2', 'tag3'], // Máx 5 tags
    discount: '50% OFF', // o '100% OFF' o '$100 créditos'
    verificationRequired: true // true si requiere email .edu o carnet
}
```

### Paso 2: Categorías Disponibles

Usa exactamente uno de estos valores para `category`:
- `Desarrollo`
- `Diseño`
- `Productividad`
- `Cloud`
- `Entretenimiento`
- `Educación`
- `Seguridad`
- `Hardware`
- `Diseño 3D`

### Paso 3: Encuentra una Imagen

- **Preferible**: Logo oficial en formato SVG
- **Fuentes confiables**:
  - Wikimedia Commons: `https://commons.wikimedia.org`
  - Sitio oficial de la compañía
  - SVG Repo: `https://www.svgrepo.com`
- **Requisitos**:
  - URL directa a la imagen (no página web)
  - Formato SVG o PNG con fondo transparente
  - Debe ser accesible públicamente

### Paso 4: Valida tu Información

Antes de enviar tu contribución, verifica:
- ✅ El ID es único (no existe otro beneficio con el mismo ID)
- ✅ La URL funciona y lleva a la página de beneficios estudiantiles
- ✅ La imagen carga correctamente
- ✅ El descuento es preciso
- ✅ Los beneficios están bien descritos
- ✅ No hay errores de ortografía

### Paso 5: Prueba Localmente

1. Abre `index.html` en tu navegador
2. Busca tu beneficio recién agregado
3. Verifica que:
   - La imagen se muestra correctamente
   - El texto se lee bien
   - El botón "Ver más detalles" abre la URL correcta
   - La categoría y tags aparecen

## 🎨 Cómo Mejorar el Diseño

### Estructura de Estilos

El archivo `styles.css` está organizado en secciones:

```css
/* ===== VARIABLES CSS ===== */
/* Define colores, espaciados, etc. */

/* ===== RESET Y BASE ===== */
/* Estilos base del documento */

/* ===== COMPONENTES ===== */
/* Hero, Cards, Chatbot, etc. */

/* ===== RESPONSIVE ===== */
/* Media queries */
```

### Buenas Prácticas

1. **Usa las variables CSS existentes**
   ```css
   /* ✅ Bien */
   color: var(--purple-primary);
   
   /* ❌ Evitar */
   color: #a855f7;
   ```

2. **Mantén la consistencia**
   - Usa las mismas unidades (rem, px)
   - Respeta los espaciados definidos
   - Sigue el naming convention existente

3. **Comenta tus cambios**
   ```css
   /* Mejora de contraste para mejor accesibilidad */
   .card-title {
       color: var(--text-primary);
   }
   ```

## 💻 Cómo Mejorar la Funcionalidad

### Estructura de `script.js`

```javascript
// ===== ESTADO DE LA APLICACIÓN =====
// Variables globales

// ===== INICIALIZACIÓN =====
// Función que se ejecuta al cargar la página

// ===== FUNCIONES DE RENDERIZADO =====
// Funciones que crean HTML dinámico

// ===== EVENTOS =====
// Listeners de eventos

// ===== CHATBOT =====
// Lógica del asistente virtual

// ===== UTILIDADES =====
// Funciones auxiliares
```

### Buenas Prácticas JavaScript

1. **Usa nombres descriptivos**
   ```javascript
   // ✅ Bien
   function filterBenefitsByCategory(category) { }
   
   // ❌ Evitar
   function filter(cat) { }
   ```

2. **Comenta el código complejo**
   ```javascript
   // Filtra beneficios que coincidan con la categoría Y el término de búsqueda
   const filteredBenefits = studentBenefits.filter(benefit => {
       // ...
   });
   ```

3. **Evita duplicar código**
   - Crea funciones reutilizables
   - Usa variables para valores repetidos

## 🐛 Cómo Reportar Bugs

Si encuentras un error:

1. **Verifica que sea un bug real**
   - ¿Sucede en diferentes navegadores?
   - ¿Puedes reproducirlo consistentemente?

2. **Crea un issue con**:
   - Título descriptivo
   - Pasos para reproducir el error
   - Comportamiento esperado vs actual
   - Capturas de pantalla si aplica
   - Navegador y versión

3. **Ejemplo de buen reporte**:
   ```
   Título: El buscador no encuentra beneficios con tildes
   
   Pasos:
   1. Ir a la página principal
   2. Escribir "diseño" en el buscador
   3. No aparecen resultados
   
   Esperado: Debería mostrar Figma, Adobe, etc.
   Actual: No muestra nada
   
   Navegador: Chrome 120.0
   ```

## 📋 Checklist Antes de Contribuir

- [ ] El código funciona en mi navegador
- [ ] No hay errores en la consola del navegador (F12)
- [ ] El diseño se ve bien en móvil y desktop
- [ ] El código está comentado donde sea necesario
- [ ] Seguí las convenciones de estilo del proyecto
- [ ] Actualicé la documentación si es necesario
- [ ] Probé la funcionalidad de búsqueda
- [ ] Probé el filtrado por categorías

## 🎓 Recursos de Aprendizaje

Si eres nuevo en desarrollo web:

- **HTML**: [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/HTML)
- **CSS**: [CSS-Tricks](https://css-tricks.com/)
- **JavaScript**: [JavaScript.info](https://javascript.info/)
- **Git**: [Git - La guía sencilla](https://rogerdudler.github.io/git-guide/index.es.html)

## 💬 Comunicación

- **Issues**: Para reportar bugs o sugerir features
- **Pull Requests**: Para enviar código
- **Discusiones**: Para preguntas generales

## 🏆 Código de Conducta

- Sé respetuoso con todos los contribuidores
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros estudiantes a aprender

## ❓ Preguntas Frecuentes

**P: ¿Necesito saber Git?**
R: No es obligatorio. Puedes editar directamente desde GitHub o enviar tus cambios por otros medios.

**P: ¿Cuánto tiempo toma aprobar una contribución?**
R: Revisamos las contribuciones regularmente. Si hay algo que corregir, te lo haremos saber.

**P: ¿Puedo trabajar en un feature grande?**
R: ¡Claro! Pero abre un issue primero para discutir tu idea y evitar trabajo duplicado.

**P: ¿Qué pasa si rompo algo?**
R: ¡No te preocupes! Todos cometemos errores. Git nos permite revertir cambios fácilmente.

---

¡Gracias por ayudar a mejorar esta plataforma para todos los estudiantes de la UTP! 🎓💜

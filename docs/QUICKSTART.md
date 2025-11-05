# 🚀 Inicio Rápido

## Abrir el Proyecto

### Opción 1: Doble clic (Más fácil)
1. Abre la carpeta del proyecto
2. Doble clic en `index.html`
3. ¡Listo! Se abrirá en tu navegador

### Opción 2: Servidor Local (Recomendado para desarrollo)

**Con Python (ya instalado en la mayoría de sistemas):**
```bash
cd prueba2
python -m http.server 8000
```
Abre: http://localhost:8000

**Con PHP:**
```bash
cd prueba2
php -S localhost:8000
```

**Con Node.js:**
```bash
cd prueba2
npx http-server
```

## Compartir con Compañeros

Si quieres que un compañero vea tu versión local:

```bash
# Inicia el servidor local primero (puerto 8000)
python -m http.server 8000

# En otra terminal, inicia Pinggy
ssh -p 443 -R0:localhost:8000 a.pinggy.io
```

Te dará una URL pública que puedes compartir.

## Archivos Principales

- `index.html` - Estructura de la página
- `styles.css` - Todo el diseño visual
- `data.js` - Base de datos de beneficios
- `script.js` - Funcionalidad e interactividad

## Modificar Beneficios

1. Abre `data.js`
2. Edita el array `studentBenefits`
3. Guarda
4. Recarga el navegador

## Modificar Diseño

1. Abre `styles.css`
2. Cambia las variables CSS al inicio del archivo
3. Guarda
4. Recarga el navegador

## Solución de Problemas

**Las imágenes no cargan:**
- Verifica la conexión a internet
- Comprueba que las URLs de las imágenes sean correctas

**Los estilos no se aplican:**
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que `styles.css` esté en la misma carpeta

**El JavaScript no funciona:**
- Abre la consola (F12)
- Busca errores
- Verifica que `script.js` y `data.js` estén cargando

## Recursos

- 📖 Lee el `README.md` completo
- 🤝 Ve `CONTRIBUTING.md` para contribuir
- 💬 Abre un issue si tienes problemas

---

¡Éxito! 🎓💜

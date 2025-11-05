# 🌐 Compartir Proyecto con Pinggy

Guía completa para compartir tu proyecto local con compañeros usando **Pinggy** (túnel SSH).

---

## ¿Qué es Pinggy?

Pinggy es un servicio que crea un túnel público a tu servidor local usando SSH, permitiendo que cualquier persona con internet acceda a tu proyecto sin necesidad de desplegarlo.

**Ventajas:**
- ✅ Gratis (60 minutos por sesión)
- ✅ No requiere instalación
- ✅ Funciona con SSH (ya instalado en Linux/Mac)
- ✅ URLs HTTPS incluidas
- ✅ Funciona con cualquier puerto local

---

## 📋 Requisitos Previos

1. **SSH instalado** (ya viene en Linux/Mac)
2. **Servidor local corriendo** (Python, Node, PHP, etc.)
3. **Conexión a internet**

---

## 🚀 Pasos para Compartir

### Paso 1: Iniciar tu servidor local

Primero debes tener tu proyecto corriendo localmente:

#### Opción A: Con Python (Recomendado)
```bash
cd /ruta/a/tu/proyecto
python3 -m http.server 8000
```
Tu proyecto estará en: `http://localhost:8000`

#### Opción B: Con Node.js
```bash
cd /ruta/a/tu/proyecto
npx http-server -p 8000
```

#### Opción C: Con PHP
```bash
cd /ruta/a/tu/proyecto
php -S localhost:8000
```

### Paso 2: Abrir nueva terminal

**¡IMPORTANTE!** Deja la terminal del servidor abierta y abre una **nueva terminal**.

### Paso 3: Iniciar túnel Pinggy

En la nueva terminal, ejecuta:

```bash
ssh -p 443 -R0:localhost:8000 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 a.pinggy.io
```

**Desglose del comando:**
- `ssh` - Cliente SSH
- `-p 443` - Puerto 443 (funciona mejor con firewalls)
- `-R0:localhost:8000` - Crea túnel al puerto 8000 local
- `-o StrictHostKeyChecking=no` - No pedir confirmación de host
- `-o ServerAliveInterval=30` - Mantener conexión activa
- `a.pinggy.io` - Servidor de Pinggy

### Paso 4: Obtener URL pública

Después de unos segundos verás algo como:

```
┌──────────────────────────────────┐
│                                  │
│   Wait while we prepare the UI   │
│                                  │
└──────────────────────────────────┘

You are not authenticated.
Your tunnel will expire in 60 minutes.

http://abc123-186-74-14-219.a.free.pinggy.link
https://abc123-186-74-14-219.a.free.pinggy.link
```

**¡Esas son tus URLs públicas!** 🎉

### Paso 5: Compartir con compañeros

Envía la URL HTTPS (más segura):
```
https://abc123-186-74-14-219.a.free.pinggy.link
```

---

## 🔧 Comandos Completos por Puerto

### Puerto 8000 (Python)
```bash
# Terminal 1: Servidor
python3 -m http.server 8000

# Terminal 2: Pinggy
ssh -p 443 -R0:localhost:8000 a.pinggy.io
```

### Puerto 3000 (Next.js/React)
```bash
# Terminal 1: Servidor
npm run dev

# Terminal 2: Pinggy
ssh -p 443 -R0:localhost:3000 a.pinggy.io
```

### Puerto 5500 (Live Server)
```bash
# Terminal 1: Live Server corriendo

# Terminal 2: Pinggy
ssh -p 443 -R0:localhost:5500 a.pinggy.io
```

---

## 📝 Ejemplo Real para Este Proyecto

```bash
# Paso 1: Navegar al proyecto
cd /home/amarus/projects/pruebas/prueba2/PruebasWeb/prueba2

# Paso 2: Iniciar servidor Python (Terminal 1)
python3 -m http.server 8000

# Paso 3: En NUEVA terminal, iniciar Pinggy (Terminal 2)
ssh -p 443 -R0:localhost:8000 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 a.pinggy.io

# Paso 4: Copiar la URL HTTPS que aparece
# Ejemplo: https://dwddz-186-74-14-219.a.free.pinggy.link

# Paso 5: Compartir con compañeros
```

---

## ⚠️ Limitaciones Versión Gratuita

- ⏰ **Tiempo**: 60 minutos por sesión
- 🔓 **Sin autenticación**: Cualquiera con la URL puede acceder
- 🔄 **URL cambia**: Cada vez que reinicias, obtienes nueva URL
- 📊 **Sin estadísticas**: No hay analytics

**Solución**: Simplemente reinicia el túnel cuando expire (60 min).

---

## 💡 Tips y Trucos

### 1. Mantener túnel activo más tiempo

```bash
# El parámetro ServerAliveInterval=30 ya ayuda
ssh -p 443 -R0:localhost:8000 -o ServerAliveInterval=30 a.pinggy.io
```

### 2. Ver estadísticas en tiempo real

Pinggy muestra en la terminal:
- Peticiones recibidas
- Datos transferidos
- Errores 404

### 3. Reiniciar rápidamente

Si el túnel se cae:
1. `Ctrl+C` para cerrar Pinggy
2. Volver a ejecutar el comando SSH
3. Compartir la nueva URL

### 4. Usar alias para comando rápido

Agrega a tu `~/.bashrc` o `~/.zshrc`:

```bash
# Alias para Pinggy en diferentes puertos
alias pinggy8000='ssh -p 443 -R0:localhost:8000 -o StrictHostKeyChecking=no a.pinggy.io'
alias pinggy3000='ssh -p 443 -R0:localhost:3000 -o StrictHostKeyChecking=no a.pinggy.io'
alias pinggy5500='ssh -p 443 -R0:localhost:5500 -o StrictHostKeyChecking=no a.pinggy.io'
```

Luego solo ejecuta:
```bash
pinggy8000
```

### 5. Verificar que funciona

Antes de compartir, abre la URL en tu propio navegador para verificar.

---

## 🐛 Solución de Problemas

### Error: "Connection refused"

**Problema**: El servidor local no está corriendo.

**Solución**:
```bash
# Verifica que tu servidor esté activo
lsof -i :8000

# Si no hay resultado, inicia el servidor
python3 -m http.server 8000
```

### Error: "Permission denied"

**Problema**: SSH no está instalado o configurado.

**Solución**:
```bash
# Verificar SSH
which ssh

# Si no está, instalar
sudo apt install openssh-client  # Ubuntu/Debian
```

### Error: "Connection timeout"

**Problema**: Firewall bloqueando puerto 443.

**Solución**:
```bash
# Intenta con puerto 22 alternativo
ssh -R0:localhost:8000 a.pinggy.io
```

### La URL no carga

**Checklist**:
1. ¿Servidor local corriendo? → `http://localhost:8000`
2. ¿Pinggy activo? → Ver terminal
3. ¿URL correcta? → Copiar de la terminal
4. ¿Internet funcional? → Probar google.com

---

## 🔐 Consideraciones de Seguridad

### ⚠️ Ten en cuenta:

1. **Cualquiera con la URL puede acceder**
   - No compartas URLs en público
   - Solo envía a personas de confianza

2. **Datos sensibles**
   - No expongas archivos con contraseñas
   - No expongas APIs keys
   - Usa `.gitignore` para archivos sensibles

3. **Versión de desarrollo**
   - Ideal para demos y colaboración
   - NO para producción

### ✅ Buenas prácticas:

```bash
# Siempre usa HTTPS cuando compartas
# ✅ Bien
https://abc123.a.free.pinggy.link

# ❌ Evitar (menos seguro)
http://abc123.a.free.pinggy.link
```

---

## 🆚 Alternativas a Pinggy

Si Pinggy no funciona, otras opciones:

### 1. Serveo
```bash
ssh -R 80:localhost:8000 serveo.net
```

### 2. localhost.run
```bash
ssh -R 80:localhost:8000 localhost.run
```

### 3. ngrok (requiere instalación)
```bash
ngrok http 8000
```

### 4. Cloudflare Tunnel (más complejo)
```bash
cloudflared tunnel --url http://localhost:8000
```

**Recomendación**: Pinggy es el más confiable y simple.

---

## 📚 Recursos Adicionales

- **Sitio oficial**: https://pinggy.io
- **Documentación**: https://pinggy.io/docs
- **Dashboard**: https://dashboard.pinggy.io (para versión Pro)

---

## 🎯 Casos de Uso

### ✅ Ideal para:
- Mostrar proyectos a compañeros
- Colaboración remota en tiempo real
- Demos rápidas
- Testing en diferentes dispositivos
- Presentaciones de proyectos

### ❌ NO usar para:
- Sitios en producción
- Almacenar datos permanentes
- APIs públicas
- Proyectos a largo plazo

---

## 💰 Versión Pro (Opcional)

Si necesitas más:

**Ventajas:**
- 🕐 Túneles sin límite de tiempo
- 🔒 Dominios personalizados
- 🔐 Autenticación básica
- 📊 Estadísticas avanzadas
- 🚀 Mayor ancho de banda

**Precio**: ~$2.50/mes

**Vale la pena si**:
- Compartes proyectos frecuentemente
- Necesitas túneles por horas
- Quieres dominio personalizado

---

## 📞 Soporte

**Problemas con Pinggy:**
- GitHub Issues: https://github.com/Pinggy-io
- Email: support@pinggy.io

**Problemas con este proyecto:**
- Abre un issue en el repositorio
- Revisa CONTRIBUTING.md

---

## ✅ Checklist Rápido

Antes de compartir, verifica:

- [ ] Servidor local corriendo (`localhost:8000`)
- [ ] Terminal de servidor abierta
- [ ] Pinggy ejecutándose en segunda terminal
- [ ] URL HTTPS copiada
- [ ] Probada la URL en tu navegador
- [ ] Compartida solo con personas confiables

---

## 🎓 Ejemplo Completo Paso a Paso

```bash
# 1. Abrir terminal y navegar al proyecto
cd /home/amarus/projects/pruebas/prueba2/PruebasWeb/prueba2

# 2. Iniciar servidor
python3 -m http.server 8000
# Verás: Serving HTTP on 0.0.0.0 port 8000...

# 3. Abrir NUEVA terminal (Ctrl+Shift+T en muchos terminales)

# 4. Iniciar Pinggy
ssh -p 443 -R0:localhost:8000 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 a.pinggy.io

# 5. Esperar a ver las URLs (5-10 segundos)

# 6. Copiar URL HTTPS
# Ejemplo: https://abc123-186-74-14-219.a.free.pinggy.link

# 7. Abrir en tu navegador para verificar
google-chrome https://abc123-186-74-14-219.a.free.pinggy.link

# 8. Compartir por WhatsApp/Email/Slack
# "Hola, mira mi proyecto: https://abc123-186-74-14-219.a.free.pinggy.link"

# 9. Cuando termines (Ctrl+C en ambas terminales)
```

---

## 📊 Monitoreo en Tiempo Real

Pinggy muestra en la terminal:

```
GET 200 /            Recved:  2.4 KB   Sent:  125 KB
GET 200 /styles.css  Recved:  1.2 KB   Sent:   16 KB
GET 200 /script.js   Recved:  1.1 KB   Sent:   14 KB
GET 404 /favicon.ico Recved:  800 B    Sent:  400 B
```

**Interpretar:**
- `200` = Éxito ✅
- `404` = Archivo no encontrado (normal para favicon) ⚠️
- `500` = Error del servidor ❌

---

## 🎉 ¡Listo!

Ahora sabes cómo compartir tus proyectos locales con **Pinggy** de forma rápida y fácil.

**Comandos esenciales para recordar:**

```bash
# Servidor
python3 -m http.server 8000

# Pinggy
ssh -p 443 -R0:localhost:8000 a.pinggy.io
```

---

**Creado para**: Proyecto Beneficios Tech UTP  
**Última actualización**: Noviembre 2025  
**Mantenido por**: Comunidad UTP  

💜 ¡Comparte y colabora! 🚀

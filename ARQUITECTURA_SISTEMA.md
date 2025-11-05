# 🏗️ Arquitectura del Sistema Auto-Sostenible

## 📋 Documento de Diseño Técnico

**Proyecto**: Beneficios Tech UTP - Sistema Autónomo  
**Versión**: 1.0  
**Fecha**: Noviembre 2025  
**Autor**: Comunidad UTP  

---

## 🎯 Visión General

### Objetivo Principal
Crear un sistema que se auto-gestione sin necesidad de administradores activos, utilizando:
- 🤖 Tavily API para descubrimiento inteligente
- 👥 Votación comunitaria con anti-trolling
- ⚙️ GitHub como backend (gratis)
- 🔄 Actualización automática semanal

### Principios de Diseño
1. **Simplicidad**: Código fácil de entender y mantener
2. **Autonomía**: Mínima intervención humana
3. **Transparencia**: Todo es público y auditable
4. **Resiliencia**: Sistema resistente a spam/trolling
5. **Costo**: Gratis o casi gratis (<$5/mes)

---

## 🔄 Flujo del Sistema Completo

```
┌─────────────────────────────────────────────────────────────┐
│                    CICLO SEMANAL                            │
└─────────────────────────────────────────────────────────────┘
                             │
                ┌────────────▼────────────┐
                │  LUNES 8:00 AM          │
                │  Bot de Descubrimiento  │
                └────────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌────────────────┐   ┌──────────────┐
│ Buscar en     │   │ Tavily Search  │   │ Reddit/HN    │
│ GitHub Edu    │   │ "student tech  │   │ r/students   │
│ Pack          │   │  benefits 2025"│   │              │
└───────┬───────┘   └────────┬───────┘   └──────┬───────┘
        │                    │                   │
        └────────────────────┼───────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ Filtrar          │
                    │ Duplicados       │
                    │ Validar URLs     │
                    │ Clasificar       │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ Tavily Research  │
                    │ Extraer detalles │
                    │ Verificar        │
                    │ legitimidad      │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ Crear Issues     │
                    │ en GitHub        │
                    │ con label        │
                    │ "pendiente"      │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            │                                 │
┌───────────▼──────────┐         ┌───────────▼──────────┐
│ VALIDACIÓN           │         │ MONITOREO            │
│ COMUNITARIA          │         │ CONTINUO             │
│                      │         │                      │
│ Martes - Domingo     │         │ Diario 2:00 AM       │
│                      │         │                      │
│ • Usuarios votan     │         │ • Check links        │
│ • 3 votos = aprueba  │         │ • Verificar cambios  │
│ • Anti-trolling      │         │ • Reportar rotos     │
└───────────┬──────────┘         └──────────────────────┘
            │
    ┌───────▼───────┐
    │ 3+ votos      │
    │ positivos?    │
    └───┬───────┬───┘
        │ NO    │ SÍ
        │       │
        │   ┌───▼────────────────┐
        │   │ Auto-merge         │
        │   │ Actualizar data.js │
        │   │ Deploy GitHub Pages│
        │   └────────────────────┘
        │
        ▼
    [Esperar más votos]
```

---

## 🧩 Componentes del Sistema

### 1. Bot de Descubrimiento (Discovery Bot) 🔍

#### Responsabilidades
- Buscar nuevos beneficios estudiantiles automáticamente
- Validar que sean legítimos
- Extraer información estructurada
- Crear propuestas en GitHub

#### Tecnologías
- **Tavily API**: Búsqueda y research inteligente
- **GitHub Actions**: Ejecución automática
- **Node.js**: Scripting

#### Fuentes de Datos
1. **Primarias (verificar semanalmente)**:
   - GitHub Education Pack
   - Microsoft Students
   - Apple Education Store
   - Google Students

2. **Secundarias (via Tavily)**:
   - Student Beans
   - UNiDAYS
   - ID.me Student
   - SheerID verified programs

3. **Comunidad**:
   - Reddit r/students
   - Hacker News "student"
   - Product Hunt "student discount"

#### Criterios de Inclusión
```javascript
const criteria = {
    // Debe cumplir AL MENOS 3 de estos:
    minimum_match: 3,
    
    rules: [
        'Descuento/beneficio para estudiantes',
        'Relacionado con tecnología',
        'Empresa legítima y conocida',
        'URL funcional y activa',
        'Información clara del beneficio',
        'Proceso de verificación definido'
    ],
    
    // Auto-rechazar si cumple alguno:
    auto_reject: [
        'Scam indicators',
        'URL sospechosa',
        'Sin HTTPS',
        'Información incompleta',
        'Ya existe en la base de datos'
    ]
};
```

#### Frecuencia
- **Producción**: Lunes 8:00 AM (cron: `0 8 * * 1`)
- **Testing**: On-demand via workflow_dispatch

---

### 2. Motor de Validación (Validation Engine) ✅

#### Responsabilidades
- Verificar que URLs funcionen
- Extraer metadata del sitio
- Clasificar automáticamente
- Generar descripción con Tavily

#### Proceso de Validación

```javascript
async function validateBenefit(url) {
    const validation = {
        steps: [],
        score: 0,
        maxScore: 100
    };
    
    // PASO 1: Verificar URL (20 puntos)
    const urlCheck = await checkURL(url);
    if (urlCheck.status === 200) {
        validation.score += 20;
        validation.steps.push('✅ URL activa');
    } else {
        validation.steps.push('❌ URL no responde');
        return validation; // Terminar aquí
    }
    
    // PASO 2: Tavily Research (40 puntos)
    const research = await tavilyResearch(url);
    if (research.isStudentBenefit) {
        validation.score += 20;
        validation.steps.push('✅ Es beneficio estudiantil');
    }
    if (research.isLegit) {
        validation.score += 20;
        validation.steps.push('✅ Fuente confiable');
    }
    
    // PASO 3: Extraer información (20 puntos)
    const info = await extractInfo(url);
    if (info.description) validation.score += 10;
    if (info.discount) validation.score += 10;
    
    // PASO 4: Verificar SSL/Seguridad (10 puntos)
    if (url.startsWith('https://')) {
        validation.score += 10;
        validation.steps.push('✅ Conexión segura');
    }
    
    // PASO 5: Check duplicados (10 puntos)
    const isDupe = await checkDuplicates(url);
    if (!isDupe) {
        validation.score += 10;
        validation.steps.push('✅ No es duplicado');
    }
    
    // RESULTADO
    validation.approved = validation.score >= 70;
    validation.needsReview = validation.score >= 50 && validation.score < 70;
    validation.rejected = validation.score < 50;
    
    return validation;
}
```

#### Uso de Tavily API

```javascript
const Tavily = require('@tavily/core');
const tavily = new Tavily({ apiKey: process.env.TAVILY_API_KEY });

async function tavilyResearch(url) {
    // 1. Research general
    const research = await tavily.search({
        query: `${url} student discount benefits review`,
        search_depth: 'advanced',
        max_results: 5
    });
    
    // 2. Analizar resultados
    const analysis = {
        isStudentBenefit: false,
        isLegit: false,
        sentiment: 'neutral',
        summary: ''
    };
    
    // Buscar keywords en resultados
    const keywords = ['student', 'education', 'discount', 'university'];
    const negativeKeywords = ['scam', 'fake', 'fraud'];
    
    research.results.forEach(result => {
        const text = (result.content || '').toLowerCase();
        
        // Verificar si es para estudiantes
        if (keywords.some(kw => text.includes(kw))) {
            analysis.isStudentBenefit = true;
        }
        
        // Verificar legitimidad
        if (!negativeKeywords.some(kw => text.includes(kw))) {
            analysis.isLegit = true;
        }
    });
    
    // 3. Generar summary
    analysis.summary = research.results[0]?.content.substring(0, 200) || '';
    
    return analysis;
}
```

---

### 3. Sistema de Votación Anti-Trolling 🗳️

#### Problema a Resolver
**Escenarios de Abuso**:
1. ❌ Usuario vota múltiples veces
2. ❌ Bot farms votan masivamente
3. ❌ Votos coordinados para spam
4. ❌ Rechazar beneficios legítimos

#### Solución Propuesta

##### Estrategia Multi-Capa

```
┌─────────────────────────────────────────┐
│  CAPA 1: Identificación de Usuario      │
│  • Browser Fingerprint                  │
│  • IP Hash (anonimizado)                │
│  • LocalStorage ID                      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  CAPA 2: Rate Limiting                  │
│  • Max 10 votos por hora                │
│  • Max 50 votos por día                 │
│  • Cooldown 5 min entre votos           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  CAPA 3: Patrón de Comportamiento       │
│  • Detectar votos en ráfaga             │
│  • Analizar diversidad de IPs           │
│  • Verificar timing sospechoso          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  CAPA 4: Verificación GitHub (Opcional) │
│  • Votos con cuenta GitHub = +2 peso    │
│  • Sin cuenta = +1 peso                 │
│  • Cuenta nueva (<1 mes) = +0.5 peso    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  CAPA 5: Consenso Temporal              │
│  • Ventana de votación: 48 horas mín    │
│  • Requiere diversidad de IPs           │
│  • Al menos 3 votantes únicos           │
└─────────────────────────────────────────┘
```

##### Implementación Técnica

```javascript
// Sistema de Fingerprinting (sin PII)
class VoterIdentifier {
    constructor() {
        this.fingerprintComponents = [
            'userAgent',
            'language',
            'colorDepth',
            'deviceMemory',
            'hardwareConcurrency',
            'screenResolution',
            'timezone'
        ];
    }
    
    async generateFingerprint() {
        const components = {};
        
        components.userAgent = navigator.userAgent;
        components.language = navigator.language;
        components.colorDepth = screen.colorDepth;
        components.deviceMemory = navigator.deviceMemory || 'unknown';
        components.hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
        components.screenResolution = `${screen.width}x${screen.height}`;
        components.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Canvas fingerprint (más difícil de falsificar)
        components.canvas = await this.getCanvasFingerprint();
        
        // Generar hash
        const fingerprint = await this.hash(JSON.stringify(components));
        return fingerprint;
    }
    
    async getCanvasFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Beneficios UTP', 2, 2);
        return canvas.toDataURL().slice(-50); // Últimos 50 chars
    }
    
    async hash(str) {
        const buffer = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
}

// Sistema de Rate Limiting
class VoteRateLimiter {
    constructor() {
        this.votesKey = 'utp_votes_history';
    }
    
    canVote(fingerprint) {
        const history = this.getVoteHistory();
        const now = Date.now();
        
        // Limpiar votos antiguos (> 24 horas)
        const recent = history.filter(v => now - v.timestamp < 24 * 60 * 60 * 1000);
        
        // Verificar límites
        const userVotes = recent.filter(v => v.fingerprint === fingerprint);
        
        // Max 10 votos por hora
        const lastHour = userVotes.filter(v => now - v.timestamp < 60 * 60 * 1000);
        if (lastHour.length >= 10) {
            return { allowed: false, reason: 'too_many_votes_hour', retry: 3600 };
        }
        
        // Max 50 votos por día
        if (userVotes.length >= 50) {
            return { allowed: false, reason: 'too_many_votes_day', retry: 86400 };
        }
        
        // Cooldown 5 minutos entre votos
        const lastVote = userVotes[userVotes.length - 1];
        if (lastVote && now - lastVote.timestamp < 5 * 60 * 1000) {
            const retry = Math.ceil((5 * 60 * 1000 - (now - lastVote.timestamp)) / 1000);
            return { allowed: false, reason: 'cooldown', return {
                    allowed: false,
                    reason: 'cooldown',
                    retry: retry
                };
            };
        }
        
        return { allowed: true };
    }
    
    recordVote(fingerprint, benefitId, direction) {
        const history = this.getVoteHistory();
        history.push({
            fingerprint,
            benefitId,
            direction,
            timestamp: Date.now()
        });
        
        // Guardar solo últimas 24 horas
        const recent = history.filter(v => 
            Date.now() - v.timestamp < 24 * 60 * 60 * 1000
        );
        
        localStorage.setItem(this.votesKey, JSON.stringify(recent));
    }
    
    getVoteHistory() {
        const stored = localStorage.getItem(this.votesKey);
        return stored ? JSON.parse(stored) : [];
    }
}

// Sistema de Detección de Patrones Sospechosos
class SuspiciousPatternDetector {
    detectBurstVoting(votes) {
        // Detectar si muchos votos llegaron en < 10 segundos
        const timestamps = votes.map(v => v.timestamp).sort();
        
        for (let i = 0; i < timestamps.length - 4; i++) {
            const window = timestamps[i + 4] - timestamps[i];
            if (window < 10000) { // 5 votos en menos de 10 seg
                return true;
            }
        }
        return false;
    }
    
    detectSameSourceVotes(votes) {
        // Detectar si todos los votos vienen del mismo fingerprint
        const fingerprints = new Set(votes.map(v => v.fingerprint));
        return fingerprints.size === 1 && votes.length > 3;
    }
    
    calculateVoteDiversity(votes) {
        const uniqueVoters = new Set(votes.map(v => v.fingerprint)).size;
        return uniqueVoters / votes.length; // 1.0 = máxima diversidad
    }
}
```

##### Configuración de Umbrales

```javascript
const VOTING_CONFIG = {
    // Votos necesarios para aprobar
    approvalThreshold: 3,
    
    // Votos negativos para rechazar automáticamente
    rejectionThreshold: 3,
    
    // Ventana mínima de votación (48 horas)
    minimumVotingWindow: 48 * 60 * 60 * 1000,
    
    // Diversidad mínima de votantes (60%)
    minimumDiversity: 0.6,
    
    // Peso de votos según tipo de usuario
    voteWeights: {
        anonymous: 1.0,        // Usuario sin GitHub
        githubUser: 2.0,       // Con GitHub login
        githubNewUser: 0.5,    // Cuenta GitHub < 1 mes
        githubContributor: 3.0 // Ha contribuido al repo
    },
    
    // Rate limits
    rateLimits: {
        votesPerHour: 10,
        votesPerDay: 50,
        cooldownSeconds: 300
    }
};
```

##### Flujo de Votación

```javascript
async function processVote(benefitId, direction) {
    // 1. Identificar usuario
    const identifier = new VoterIdentifier();
    const fingerprint = await identifier.generateFingerprint();
    
    // 2. Rate limiting
    const rateLimiter = new VoteRateLimiter();
    const canVote = rateLimiter.canVote(fingerprint);
    
    if (!canVote.allowed) {
        return {
            success: false,
            reason: canVote.reason,
            retryAfter: canVote.retry
        };
    }
    
    // 3. Registrar voto
    rateLimiter.recordVote(fingerprint, benefitId, direction);
    
    // 4. Enviar a GitHub (via API)
    const result = await submitVoteToGitHub(benefitId, direction, fingerprint);
    
    // 5. Verificar si se alcanzó umbral
    const votes = await getVotesForBenefit(benefitId);
    const detector = new SuspiciousPatternDetector();
    
    // Validar legitimidad
    const isSuspicious = 
        detector.detectBurstVoting(votes) ||
        detector.detectSameSourceVotes(votes);
    
    const diversity = detector.calculateVoteDiversity(votes);
    
    if (isSuspicious || diversity < VOTING_CONFIG.minimumDiversity) {
        return {
            success: true,
            message: 'Voto registrado, pero se requiere más diversidad',
            requiresReview: true
        };
    }
    
    // 6. Auto-aprobar si cumple criterios
    const upvotes = votes.filter(v => v.direction === 'up').length;
    const downvotes = votes.filter(v => v.direction === 'down').length;
    
    if (upvotes >= VOTING_CONFIG.approvalThreshold) {
        await autoApproveBenefit(benefitId);
        return {
            success: true,
            message: '¡Beneficio aprobado por la comunidad!',
            autoApproved: true
        };
    }
    
    if (downvotes >= VOTING_CONFIG.rejectionThreshold) {
        await autoRejectBenefit(benefitId);
        return {
            success: true,
            message: 'Beneficio rechazado por la comunidad',
            autoRejected: true
        };
    }
    
    return {
        success: true,
        message: `Voto registrado (${upvotes}/3 para aprobar)`,
        currentVotes: { up: upvotes, down: downvotes }
    };
}
```

---

### 4. Link Checker 🔗

#### Responsabilidades
- Verificar que URLs sigan activas
- Detectar cambios de dominio
- Medir tiempo de respuesta
- Alertar si algo está roto

#### Frecuencia
- **Diario**: 2:00 AM
- **Pre-aprobación**: Antes de auto-merge

#### Implementación

```javascript
class LinkChecker {
    async checkBenefit(benefit) {
        const result = {
            id: benefit.id,
            url: benefit.url,
            status: 'unknown',
            responseTime: null,
            redirect: null,
            error: null
        };
        
        try {
            const start = Date.now();
            const response = await fetch(benefit.url, {
                method: 'HEAD',
                redirect: 'follow',
                signal: AbortSignal.timeout(10000)
            });
            const end = Date.now();
            
            result.responseTime = end - start;
            result.status = response.status;
            
            // Detectar redirects
            if (response.redirected) {
                result.redirect = response.url;
            }
            
            // Evaluar salud
            if (response.status === 200) {
                result.health = result.responseTime < 3000 ? 'healthy' : 'slow';
            } else if (response.status >= 300 && response.status < 400) {
                result.health = 'redirect';
            } else if (response.status >= 400) {
                result.health = 'broken';
            }
            
        } catch (error) {
            result.status = 'error';
            result.error = error.message;
            result.health = 'broken';
        }
        
        return result;
    }
    
    async checkAll() {
        const benefits = require('./data.js').studentBenefits;
        const results = [];
        
        console.log(`🔗 Verificando ${benefits.length} beneficios...\n`);
        
        for (const benefit of benefits) {
            const result = await this.checkBenefit(benefit);
            results.push(result);
            
            // Log
            const emoji = result.health === 'healthy' ? '✅' : 
                         result.health === 'slow' ? '⚠️' : '❌';
            console.log(`${emoji} ${benefit.name}: ${result.status} (${result.responseTime}ms)`);
            
            // Rate limit (no hacer spam a los sitios)
            await this.sleep(1000);
        }
        
        return this.generateReport(results);
    }
    
    generateReport(results) {
        const report = {
            timestamp: new Date().toISOString(),
            total: results.length,
            healthy: results.filter(r => r.health === 'healthy').length,
            slow: results.filter(r => r.health === 'slow').length,
            broken: results.filter(r => r.health === 'broken').length,
            details: results.filter(r => r.health !== 'healthy')
        };
        
        return report;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

---

### 5. Auto-Merge System ⚙️

#### Responsabilidades
- Aprobar automáticamente cuando se cumplen criterios
- Actualizar `data.js`
- Crear commit y push
- Deploy automático a GitHub Pages

#### Criterios para Auto-Merge

```javascript
const AUTO_MERGE_CRITERIA = {
    required: [
        '3+ votos positivos',
        'Diversidad de votantes > 60%',
        'Ventana de votación > 48 horas',
        'Sin patrones sospechosos',
        'Link verificado activo',
        'Validación Tavily aprobada'
    ],
    
    optional: [
        'Al menos 1 voto de usuario GitHub',
        'Comentarios positivos en el Issue',
        'Empresa reconocida'
    ]
};
```

#### Flujo

```javascript
async function autoMergeBenefit(issueNumber) {
    // 1. Obtener datos del Issue
    const issue = await github.getIssue(issueNumber);
    const benefitData = parseBenefitFromIssue(issue);
    
    // 2. Validar criterios
    const validation = await validateForMerge(benefitData);
    if (!validation.passed) {
        console.log('❌ No cumple criterios para auto-merge');
        return false;
    }
    
    // 3. Leer data.js actual
    const dataContent = await fs.readFile('./data.js', 'utf8');
    const benefits = extractBenefitsArray(dataContent);
    
    // 4. Agregar nuevo beneficio
    benefits.push(benefitData);
    
    // 5. Generar nuevo data.js
    const newContent = generateDataFile(benefits);
    await fs.writeFile('./data.js', newContent);
    
    // 6. Commit y push
    await git.add('./data.js');
    await git.commit(`✨ Agregar: ${benefitData.name} (#${issueNumber})`);
    await git.push('origin', 'main');
    
    // 7. Cerrar Issue
    await github.closeIssue(issueNumber, {
        comment: '✅ Beneficio aprobado y agregado automáticamente por la comunidad!'
    });
    
    // 8. Notificar (opcional)
    await notifyDiscord(`🎉 Nuevo beneficio agregado: ${benefitData.name}`);
    
    return true;
}
```

---

## 📂 Estructura de Archivos

```
prueba2/
├── index.html                      # Página principal
├── validar.html                    # Interfaz de votación
├── styles.css                      # Estilos
├── data.js                         # Base de datos
├── script.js                       # Lógica principal
│
├── scripts/                        # Scripts de automatización
│   ├── discover-benefits.js       # Bot descubrimiento
│   ├── validate-with-tavily.js    # Validación con Tavily
│   ├── check-links.js             # Link checker
│   ├── anti-trolling.js           # Sistema anti-spam
│   ├── auto-merge.js              # Auto-aprobación
│   └── utils/
│       ├── github-api.js          # Helpers GitHub
│       ├── tavily-client.js       # Cliente Tavily
│       └── fingerprint.js         # Identificación
│
├── .github/
│   ├── workflows/
│   │   ├── discover.yml           # Cron semanal
│   │   ├── link-check.yml         # Cron diario
│   │   ├── vote-processor.yml     # On comment
│   │   └── auto-merge.yml         # On label
│   │
│   └── ISSUE_TEMPLATE/
│       └── nuevo-beneficio.yml    # Template sugerencia
│
├── docs/                           # Documentación
│   ├── ARQUITECTURA_SISTEMA.md    # Este archivo
│   ├── SISTEMA_AUTOSOSTENIBLE.md  # Visión general
│   ├── API_TAVILY.md              # Guía Tavily
│   └── ANTI_TROLLING.md           # Detalles anti-spam
│
└── tests/                          # Tests (futuro)
    ├── validate.test.js
    ├── voting.test.js
    └── link-check.test.js
```

---

## 💰 Costos y Límites

### Tavily API
- **Plan Gratuito**: 1,000 búsquedas/mes
- **Costo por búsqueda adicional**: $0.005
- **Uso estimado**: ~10 búsquedas/semana = 40/mes
- **Costo mensual**: $0 (dentro del free tier)

### GitHub Actions
- **Free tier**: 2,000 minutos/mes
- **Uso estimado**:
  - Discovery: 5 min/semana × 4 = 20 min/mes
  - Link check: 2 min/día × 30 = 60 min/mes
  - Vote processing: 1 min/voto × 50 = 50 min/mes
  - **Total**: ~130 min/mes
- **Costo**: $0 (dentro del free tier)

### GitHub Pages
- **Hosting**: Gratis ilimitado
- **Ancho de banda**: 100 GB/mes
- **Costo**: $0

### **TOTAL MENSUAL: $0** 🎉

---

## 🔐 Seguridad y Privacidad

### Datos que SE almacenan
- ✅ Fingerprint hash (anónimo)
- ✅ Timestamp de votos
- ✅ Dirección de voto (up/down)
- ✅ Beneficio ID

### Datos que NO se almacenan
- ❌ IP addresses
- ❌ Emails
- ❌ Información personal
- ❌ Datos de navegación

### Cumplimiento
- ✅ GDPR compatible (datos anónimos)
- ✅ No requiere cookies de tracking
- ✅ No requiere consentimiento
- ✅ Totalmente transparente

---

## 📊 Métricas y Monitoreo

### Dashboard Automático (GitHub Actions)
```javascript
const metrics = {
    weekly: {
        benefitsDiscovered: 0,
        benefitsApproved: 0,
        benefitsRejected: 0,
        linksChecked: 0,
        linksBroken: 0,
        votesTotal: 0,
        suspiciousActivity: 0
    }
};
```

### Reportes Automáticos
- Semanal: Resumen de actividad
- Mensual: Estadísticas completas
- Alertas: Cuando algo requiere atención

---

## 🚀 Plan de Implementación

### Fase 1: Foundation (Semana 1)
- [ ] Setup repositorio GitHub
- [ ] Configurar GitHub Pages
- [ ] Implementar link checker básico
- [ ] Crear interfaz de votación simple
- [ ] Documentar proceso

### Fase 2: Anti-Trolling (Semana 2)
- [ ] Implementar fingerprinting
- [ ] Sistema de rate limiting
- [ ] Detección de patrones
- [ ] Testing exhaustivo

### Fase 3: Tavily Integration (Semana 3)
- [ ] Obtener API key Tavily
- [ ] Implementar bot de descubrimiento
- [ ] Validación automática
- [ ] Testing con beneficios reales

### Fase 4: Auto-Merge (Semana 4)
- [ ] Sistema de auto-aprobación
- [ ] GitHub Actions completas
- [ ] Notificaciones
- [ ] Launch! 🚀

---

## ❓ Preguntas Abiertas

### 1. Votación con 3 votos
**Pregunta**: ¿3 votos es suficiente?  
**Opciones**:
- A) 3 votos simples (actual)
- B) 3 votos con diversidad mínima 60%
- C) 5 votos pero solo 2 con cuenta GitHub
- D) Sistema adaptativo (más votos si hay controversia)

**Recomendación**: Opción B - Balance entre velocidad y calidad

### 2. Handling de controversia
**Pregunta**: ¿Qué pasa si un beneficio tiene 3 upvotes Y 3 downvotes?  
**Opciones**:
- A) Requiere revisión manual
- B) Ventana de votación extendida
- C) Lo que llegue primero a 5 gana
- D) Desempate por votantes con GitHub

**Recomendación**: Opción C con timeout de 7 días

### 3. Moderación de emergencia
**Pregunta**: ¿Qué hacer si se detecta ataque masivo?  
**Opciones**:
- A) Pausar votaciones automáticamente
- B) Requerir GitHub login temporal
- C) Aumentar umbral a 10 votos
- D) Todo lo anterior

**Recomendación**: Opción D - Modo "lockdown" automático

---

## 📝 Próximos Pasos

1. **Revisar y aprobar arquitectura**
2. **Decidir sobre preguntas abiertas**
3. **Obtener API key de Tavily**
4. **Comenzar implementación Fase 1**

---

## 🤝 Contribuciones

Este documento es vivo y evoluciona. Si tienes sugerencias:
1. Abre un Issue en GitHub
2. Propón cambios vía PR
3. Discute en Discord/Slack

---

**Estado**: 📝 Draft - Pendiente de aprobación  
**Próxima revisión**: Después de feedback inicial  
**Mantenedor**: @tu-usuario


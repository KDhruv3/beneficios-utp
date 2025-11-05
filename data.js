// Base de datos de beneficios estudiantiles
const studentBenefits = [
    {
        id: 'github-education',
        name: 'GitHub Student Developer Pack',
        category: 'Desarrollo',
        description: 'Pack completo con acceso a más de 100 herramientas y servicios para desarrolladores, totalmente gratis.',
        benefits: [
            'GitHub Pro gratis',
            'GitHub Copilot gratis',
            'Repositorios privados ilimitados',
            'GitHub Actions con 3000 minutos',
            'Acceso a herramientas premium',
            'Dominios gratis de Namecheap'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
        url: 'https://education.github.com/pack',
        tags: ['desarrollo', 'git', 'hosting', 'gratis'],
        discount: '100% OFF',
        verificationRequired: true
    },
    {
        id: 'jetbrains-education',
        name: 'JetBrains Educational License',
        category: 'Desarrollo',
        description: 'Suite completa de IDEs profesionales de JetBrains totalmente gratis para estudiantes.',
        benefits: [
            'IntelliJ IDEA Ultimate',
            'PyCharm Professional',
            'WebStorm',
            'PhpStorm',
            'Rider',
            'CLion'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/IntelliJ_IDEA_Icon.svg',
        url: 'https://www.jetbrains.com/community/education/',
        tags: ['IDE', 'programación', 'desarrollo', 'gratis'],
        discount: '100% OFF',
        verificationRequired: true
    },
    {
        id: 'figma-education',
        name: 'Figma for Education',
        category: 'Diseño',
        description: 'Plan profesional de Figma gratis para estudiantes verificados, ideal para diseño UI/UX.',
        benefits: [
            'Figma Professional gratis',
            'FigJam ilimitado',
            'Proyectos ilimitados',
            'Historial de versiones ilimitado',
            'Plugins y widgets premium',
            'Colaboración en tiempo real'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
        url: 'https://www.figma.com/education/',
        tags: ['diseño', 'UI/UX', 'colaboración', 'gratis'],
        discount: '100% OFF',
        verificationRequired: true
    },
    {
        id: 'notion-education',
        name: 'Notion for Education',
        category: 'Productividad',
        description: 'Plan Plus de Notion gratuito para estudiantes, perfecto para organizar notas y proyectos.',
        benefits: [
            'Notion Plus gratis',
            'Bloques ilimitados',
            'Invitados ilimitados',
            'Historial de versiones de 30 días',
            'Sincronización sin límites',
            'API access'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
        url: 'https://www.notion.so/students',
        tags: ['notas', 'organización', 'productividad', 'colaboración', 'gratis'],
        discount: '100% OFF',
        verificationRequired: true
    },
    {
        id: 'spotify-student',
        name: 'Spotify Premium Student',
        category: 'Entretenimiento',
        description: 'Spotify Premium con 50% de descuento para estudiantes universitarios verificados.',
        benefits: [
            'Música sin anuncios',
            'Descarga offline',
            'Calidad de audio superior',
            'Skip ilimitado',
            'Acceso a podcasts exclusivos',
            'Spotify Connect'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        url: 'https://www.spotify.com/student/',
        tags: ['música', 'entretenimiento', 'streaming', 'descuento'],
        discount: '50% OFF',
        verificationRequired: true
    },
    {
        id: 'adobe-student',
        name: 'Adobe Creative Cloud Student',
        category: 'Diseño',
        description: 'Suite completa de Adobe Creative Cloud con 60% de descuento para estudiantes.',
        benefits: [
            'Photoshop',
            'Illustrator',
            'Premiere Pro',
            'After Effects',
            'InDesign',
            'XD'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg',
        url: 'https://www.adobe.com/creativecloud/buy/student.html',
        tags: ['diseño', 'edición', 'creatividad', 'profesional', 'descuento'],
        discount: '60% OFF',
        verificationRequired: true
    },
    {
        id: 'canva-education',
        name: 'Canva for Education',
        category: 'Diseño',
        description: 'Canva Pro gratuito para estudiantes y educadores con templates premium ilimitados.',
        benefits: [
            'Canva Pro gratis',
            'Templates premium ilimitados',
            'Fotos y elementos premium',
            'Almacenamiento 100GB',
            'Brand Kit',
            'Animaciones y videos'
        ],
        image: 'https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg',
        url: 'https://www.canva.com/education/',
        tags: ['diseño', 'gráficos', 'presentaciones', 'social media', 'gratis'],
        discount: '100% OFF',
        verificationRequired: true
    },
    {
        id: 'apple-education',
        name: 'Apple Education Pricing',
        category: 'Hardware',
        description: 'Descuentos educativos en Mac, iPad y accesorios Apple para estudiantes universitarios.',
        benefits: [
            'Descuentos en Mac hasta $200',
            'Descuentos en iPad',
            'AppleCare+ con descuento',
            'Accesorios con descuento',
            'Financiamiento especial',
            'Soporte técnico educativo'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        url: 'https://www.apple.com/shop/browse/home/education_pricing',
        tags: ['hardware', 'laptop', 'tablet', 'descuento', 'tecnología'],
        discount: 'Hasta $200 OFF',
        verificationRequired: true
    },
    {
        id: 'aws-educate',
        name: 'AWS Educate',
        category: 'Cloud',
        description: 'Créditos gratuitos de AWS y recursos de aprendizaje para estudiantes interesados en cloud computing.',
        benefits: [
            '$100 en créditos AWS',
            'Laboratorios prácticos gratuitos',
            'Contenido de aprendizaje',
            'Certificaciones con descuento',
            'Acceso a servicios AWS',
            'Comunidad de estudiantes'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        url: 'https://aws.amazon.com/education/awseducate/',
        tags: ['cloud', 'desarrollo', 'infraestructura', 'aprendizaje', 'gratis'],
        discount: '$100 créditos',
        verificationRequired: true
    },
    {
        id: 'autodesk-education',
        name: 'Autodesk Education',
        category: 'Diseño 3D',
        description: 'Software profesional de Autodesk gratis para estudiantes por 1 año, renovable.',
        benefits: [
            'AutoCAD gratis',
            'Maya',
            '3ds Max',
            'Revit',
            'Fusion 360',
            'Inventor'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Autodesk_Logo.svg',
        url: 'https://www.autodesk.com/education/home',
        tags: ['CAD', '3D', 'modelado', 'arquitectura', 'ingeniería'],
        discount: '100% OFF',
        verificationRequired: true
    },
    {
        id: 'grammarly-student',
        name: 'Grammarly Premium Student',
        category: 'Productividad',
        description: 'Grammarly Premium con descuento para mejorar tu escritura académica y profesional.',
        benefits: [
            'Corrección avanzada de gramática',
            'Detector de plagio',
            'Sugerencias de vocabulario',
            'Corrección de tono',
            'Integración con apps',
            'Soporte multiidioma'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Grammarly_logo.svg',
        url: 'https://www.grammarly.com/premium',
        tags: ['escritura', 'académico', 'productividad', 'inglés', 'descuento'],
        discount: '20% OFF',
        verificationRequired: true
    },
    {
        id: 'youtube-premium-student',
        name: 'YouTube Premium Student',
        category: 'Entretenimiento',
        description: 'YouTube Premium con YouTube Music Premium incluido a precio especial de estudiante.',
        benefits: [
            'Sin anuncios en YouTube',
            'Reproducción en segundo plano',
            'Descargas offline',
            'YouTube Music Premium',
            'YouTube Originals',
            'Picture-in-Picture'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
        url: 'https://www.youtube.com/premium/student',
        tags: ['video', 'música', 'entretenimiento', 'streaming', 'descuento'],
        discount: 'Descuento especial',
        verificationRequired: true
    },
    {
        id: 'coursera-student',
        name: 'Coursera Plus Student',
        category: 'Educación',
        description: 'Acceso a más de 7,000 cursos con certificado a precio reducido para estudiantes.',
        benefits: [
            '7,000+ cursos',
            'Certificados profesionales',
            'Proyectos guiados',
            'Especializaciones',
            'Cursos de universidades top',
            'Acceso móvil'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg',
        url: 'https://www.coursera.org/',
        tags: ['educación', 'cursos', 'certificaciones', 'aprendizaje', 'descuento'],
        discount: 'Descuento especial',
        verificationRequired: false
    },
    {
        id: 'lastpass-student',
        name: 'LastPass for Students',
        category: 'Seguridad',
        description: 'Gestor de contraseñas premium para estudiantes con descuento del 50%.',
        benefits: [
            'Contraseñas ilimitadas',
            'Sincronización multi-dispositivo',
            'Compartir contraseñas seguro',
            'Generador de contraseñas',
            'Autenticación de dos factores',
            'Soporte prioritario'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/LastPass_logo.svg',
        url: 'https://www.lastpass.com/pricing',
        tags: ['seguridad', 'contraseñas', 'privacidad', 'descuento'],
        discount: '50% OFF',
        verificationRequired: true
    },
    {
        id: 'microsoft-365',
        name: 'Microsoft 365 Education',
        category: 'Productividad',
        description: 'Microsoft 365 gratuito para estudiantes incluyendo Word, Excel, PowerPoint y más.',
        benefits: [
            'Office 365 gratis',
            'Word, Excel, PowerPoint',
            'OneDrive 1TB',
            'Teams',
            'Outlook',
            'OneNote'
        ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        url: 'https://www.microsoft.com/education/students',
        tags: ['productividad', 'office', 'colaboración', 'gratis'],
        discount: '100% OFF',
        verificationRequired: true
    }
];

// Base de datos de contribuidores
const contributors = {
    founders: [
        {
            id: 'guillermo-aparicio',
            name: 'Guillermo Aparicio',
            role: 'Co-fundador & Desarrollador',
            bio: 'Estudiante de Ingeniería en Sistemas. Apasionado por el desarrollo web y la creación de herramientas que faciliten la vida universitaria.',
            avatar: 'GA',
            social: {
                linkedin: 'https://www.linkedin.com/in/omrelliuga',
                github: 'https://github.com/Amoenus11',
                portfolio: null
            },
            badge: 'Creador'
        },
        {
            id: 'alen-ramirez',
            name: 'Alen Ramirez',
            role: 'Co-fundador & Diseñador',
            bio: 'Estudiante de Ingeniería en Sistemas con enfoque en UX/UI. Creador de experiencias digitales intuitivas para estudiantes.',
            avatar: 'AR',
            social: {
                linkedin: 'https://www.linkedin.com/in/alen-ramirez',
                github: null,
                portfolio: null
            },
            badge: 'Creador'
        }
    ],
    contributors: [
        // Aquí se agregarán los contribuidores de la comunidad
        // Ejemplo de formato:
        // {
        //     id: 'nombre-apellido',
        //     name: 'Nombre Apellido',
        //     role: 'Colaborador',
        //     bio: 'Descripción breve',
        //     avatar: 'NA',
        //     social: {
        //         linkedin: 'https://linkedin.com/...',
        //         github: 'https://github.com/...',
        //         portfolio: 'https://...'
        //     },
        //     badge: 'Colaborador'
        // }
    ]
};

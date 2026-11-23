export const profile = {
  name: 'Manimaran',
  title: 'Software Developer',
  tagline: 'Flutter · Node.js · TypeScript',
  location: 'India',
  experience: '1 Year Experience',
  phone: '+91 8056725360',
  email: 'manimarandevsf@gmail.com',
  naukri: 'https://www.naukri.com/',
  github: 'https://github.com/MDLMani',
  photo: '/profile.jpg',
  summary:
    'Software Developer with 1 year of hands-on industry experience building mobile and backend applications. Skilled in Flutter, Dart, Node.js, Express.js, TypeScript, PostgreSQL, Prisma, REST APIs, and Git. Experienced in feature development, API and third-party integrations, databases, debugging, testing, and team collaboration. Worked on mobile apps, enterprise tools, location-based features, payments, chat, and AI-powered applications.',
}

export const skills = {
  languages: ['Dart', 'TypeScript', 'JavaScript'],
  frontend: ['Flutter', 'React', 'Vite', 'HTML', 'CSS'],
  backend: ['Node.js', 'Express.js', 'REST APIs', 'Auth'],
  database: ['PostgreSQL', 'Prisma', 'SQLite'],
  devops: ['Docker', 'npm', 'Git', 'GitLab', 'Linux', 'SQL'],
  strengths: [
    'Mobile App Development',
    'Backend API Development',
    'Database Integration',
    'REST API Integration',
    'Debugging & Troubleshooting',
    'Feature Development',
    'AI Application Integration',
    'Team Collaboration',
  ],
  spoken: [
    { name: 'Tamil', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ],
}

export const experience = {
  role: 'Software Developer',
  company: 'Zcodia Technologies',
  period: '2025 September – Present · 1 Year',
  bullets: [
    'Developed and maintained mobile features using Flutter and Dart.',
    'Built backend APIs with Node.js, Express.js, and TypeScript.',
    'Managed data with PostgreSQL and Prisma ORM; integrated REST APIs across mobile/web and backend.',
    'Implemented authentication, user management, role-based access, and application workflows.',
    'Integrated Razorpay payments; contributed to chat/communication features and bug fixes.',
    'Built location and map features with OpenStreetMap, MapLibre / flutter_map, and OSRM.',
    'Used Docker and Docker Compose for local backend and database development.',
    'Debugged frontend, backend, database, and integration issues; tested features before release.',
    'Collaborated via Git and GitLab; contributed to AI features with Ollama and Whisper.',
    'Worked across frontend, mobile, backend, and database based on project needs.',
  ],
}

export const education = {
  degree: 'Bachelor of Computer Applications — BCA',
  school: 'Dharmapuram Arts College',
  year: '2025',
}

export const ABOUT = {
  eyebrow: 'About',
  title: 'Who I am and how I work',
  lead:
    'I am a software developer who enjoys turning product ideas into reliable mobile and backend systems. This section explains my background, the way I approach work, and the skills I use every day.',
  image: '/images/bg-delivery.jpg',
  paragraphs: [
    'I completed my BCA at Dharmapuram Arts College and currently work as a Software Developer at Zcodia Technologies. Day to day, I build Flutter features, Node.js APIs, and database workflows with PostgreSQL and Prisma.',
    'My focus is practical delivery: clear requirements, clean feature implementation, careful integrations, and honest debugging when something breaks. I move between frontend, mobile, backend, and database work depending on what the product needs.',
    'Outside core product work, I also explore local AI tooling with Ollama and Whisper. That curiosity helps me understand how chat, voice, and automation features fit into real applications.',
  ],
  highlights: [
    { label: 'Experience', value: '1 year industry' },
    { label: 'Core stack', value: 'Flutter · Node · TypeScript' },
    { label: 'Education', value: 'BCA · 2025' },
    { label: 'Strength', value: 'Full-stack product delivery' },
  ],
}

export const QA = {
  eyebrow: 'Q / A Testing',
  title: 'How I verify quality before release',
  lead:
    'This section covers the testing mindset I use on real product work — what I have practiced, and what I understand about finding issues early.',
  image: '/images/bg-qa.jpg',
  doneTitle: 'What we have done',
  done: [
    'Manually tested features on mobile and web flows before release, including auth, forms, list/detail screens, and role-based access paths.',
    'Verified REST API behavior against expected responses: status codes, payload shape, empty states, and error messages.',
    'Checked third-party integrations such as payments, maps/routing, and chat/communication features after implementation or bug fixes.',
    'Debugged issues across layers — Flutter UI, Node/Express handlers, PostgreSQL/Prisma queries, and Dockerized local environments.',
    'Re-tested after fixes to reduce regressions, especially around login, permissions, data updates, and navigation.',
    'Used logs, device testing, and step-by-step reproduction notes so bugs could be explained clearly to the team.',
  ],
  knowTitle: 'What we know',
  know: [
    'A good test starts with a clear scenario: who the user is, what action they take, and what result should appear.',
    'Happy-path checks are not enough — edge cases matter: invalid input, slow network, missing data, permission denial, and duplicate actions.',
    'Frontend bugs, backend bugs, and database bugs present differently, so isolating the layer saves time.',
    'API contracts must stay consistent between mobile clients and server responses; small mismatches create large UX failures.',
    'Regression thinking matters: when one feature changes, nearby flows (auth, payments, maps, messaging) should be re-checked.',
    'Clear bug reports — steps, expected vs actual, environment — help teams fix issues faster than vague “it is broken” notes.',
  ],
  tools: [
    'Manual exploratory testing',
    'API response verification',
    'Flutter device checks',
    'Log-based debugging',
    'Docker local stacks',
    'Git / GitLab collaboration',
  ],
}

export const PROJECTS = [
  {
    id: 'delivery',
    name: 'Delivery & Driver Application',
    role: 'Full-stack Mobile',
    company: 'Zcodia Technologies',
    year: '2025',
    location: 'India',
    service: 'Flutter, Node.js, Maps, Payments',
    stack: ['Flutter', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'OSRM'],
    short:
      'Customer and driver Flutter apps with Node APIs, PostgreSQL, OSRM routing, and Razorpay payments.',
    details:
      'Built customer and driver app features in Flutter; developed and integrated backend APIs. Implemented database operations with PostgreSQL and Prisma. Delivered map, location, route, and distance features using OpenStreetMap and OSRM. Integrated Razorpay payments; assisted with notifications and communication features. Debugged app and API issues during development and testing.',
    meta: [
      'Year — 2025',
      'Service — Mobile + Backend',
      'Client — Zcodia Technologies',
      'Stack — Flutter · Node · Prisma · OSRM',
    ],
    image: '/images/bg-delivery.jpg',
  },
  {
    id: 'ai',
    name: 'AI Assistant',
    role: 'AI Product',
    company: 'Personal / R&D',
    year: '2025',
    location: 'India',
    service: 'Flutter, Node.js, Ollama, Whisper',
    stack: ['Flutter', 'Node.js', 'Express.js', 'Ollama', 'Whisper'],
    short:
      'Flutter frontend and Node backend for chat and voice workflows with local Ollama LLM and Whisper STT.',
    details:
      'Built AI assistant with Flutter frontend and Node.js backend. Integrated a locally running Ollama LLM and voice-to-text with Whisper. Developed chat and voice API workflows; connected AI responses to the UI. Explored future features: memory, commands, vision, and automation.',
    meta: [
      'Year — 2025',
      'Service — AI Application',
      'Client — Personal / R&D',
      'Stack — Flutter · Ollama · Whisper',
    ],
    image: '/images/bg-ai.jpg',
  },
  {
    id: 'tracker',
    name: 'Enterprise Work Tracking Application',
    role: 'Enterprise Modules',
    company: 'Zcodia Technologies',
    year: '2025',
    location: 'India',
    service: 'Flutter, React, Node, PostgreSQL',
    stack: ['Flutter', 'React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    short:
      'Enterprise work management modules spanning auth, communication, and productivity features.',
    details:
      'Contributed to modules for enterprise work management and productivity. Worked on authentication, communication, and work-tracking features. Assisted with frontend implementation, API integration, testing, and debugging.',
    meta: [
      'Year — 2025',
      'Service — Enterprise Web + Mobile',
      'Client — Zcodia Technologies',
      'Stack — Flutter · React · Node · Postgres',
    ],
    image: '/images/bg-tracker.jpg',
  },
]

export const PANELS = [
  {
    id: 'about',
    rail: 'About',
    number: '01',
    subtitle: 'Background explained',
    title: 'About Me',
    text: 'A clear look at who I am: a software developer focused on Flutter, Node.js, and TypeScript — building features end to end and explaining the work in practical terms.',
    meta: [
      'Role — Software Developer',
      'Focus — Mobile + Backend',
      'Education — BCA, 2025',
    ],
    cta: 'Read about me',
    tone: 'about',
    sheet: 'about',
  },
  {
    id: 'experience',
    rail: 'Experience',
    number: '02',
    subtitle: 'Zcodia Technologies',
    title: 'Professional Experience',
    text: `${experience.role} at ${experience.company} (${experience.period}). Building mobile features, REST APIs, databases, payments, maps, chat, and AI integrations across frontend, mobile, backend, and database needs.`,
    meta: [
      'Role — Software Developer',
      'Company — Zcodia Technologies',
      'Period — Sep 2025 – Present',
    ],
    cta: 'View experience',
    tone: 'experience',
    bullets: experience.bullets.slice(0, 5),
    sheet: 'experience',
  },
  {
    id: 'projects',
    rail: 'Projects',
    number: '03',
    subtitle: 'Selected product work',
    title: 'Project Experience',
    text: 'Delivery & Driver Application, AI Assistant, and Enterprise Work Tracking Application — covering Flutter, React, Node.js, PostgreSQL, maps, payments, and local AI workflows.',
    meta: [
      '3 — Featured Projects',
      'Stack — Flutter · React · Node · Prisma',
      'Domains — Mobile · AI · Enterprise',
    ],
    cta: 'See all projects',
    tone: 'projects',
    sheet: 0,
  },
  {
    id: 'qa',
    rail: 'Q / A',
    number: '04',
    subtitle: 'Quality before release',
    title: 'Q / A Testing',
    text: 'Detailed view of how I test features, verify APIs, catch regressions, and understand issues across mobile, backend, and database layers.',
    meta: [
      'Manual + API verification',
      'Cross-layer debugging',
      'Regression-aware retesting',
    ],
    cta: 'Open Q / A details',
    tone: 'qa',
    sheet: 'qa',
  },
]

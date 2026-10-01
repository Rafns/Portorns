export interface TechItem {
  id: string;
  number: string;
  name: string;
  shortName?: string;
  tier: 1 | 2 | 3 | 4;
  category: 'Core Languages' | 'Frontend & Frameworks' | 'AI & Machine Learning' | 'Backend, DevOps & Tools';
  xPercent: number; // 0 to 100% responsive position
  yPercent: number; // 0 to 100%
  description: string;
  tags: string[];
  iconType:
    | 'python'
    | 'typescript'
    | 'javascript'
    | 'react'
    | 'nextjs'
    | 'tailwind'
    | 'flutter'
    | 'pytorch'
    | 'opencv'
    | 'nlp'
    | 'llm'
    | 'fastapi'
    | 'docker'
    | 'postgresql'
    | 'supabase'
    | 'linux';
}

export const techStackList: TechItem[] = [
  // Tier 1 - Core Languages
  {
    id: 'python',
    number: '01',
    name: 'Python',
    tier: 1,
    category: 'Core Languages',
    xPercent: 28,
    yPercent: 18,
    description: 'Primary language for AI research, backend systems and automation.',
    tags: ['AI', 'BACKEND', 'AUTOMATION'],
    iconType: 'python',
  },
  {
    id: 'typescript',
    number: '02',
    name: 'TypeScript',
    shortName: 'TS',
    tier: 1,
    category: 'Core Languages',
    xPercent: 52,
    yPercent: 23,
    description: 'Type-safe architectural foundation for scalable web and system infrastructure.',
    tags: ['FULL-STACK', 'TYPE SAFETY', 'SCALABILITY'],
    iconType: 'typescript',
  },
  {
    id: 'javascript',
    number: '03',
    name: 'JavaScript',
    shortName: 'JS',
    tier: 1,
    category: 'Core Languages',
    xPercent: 79,
    yPercent: 24,
    description: 'Core web engine for asynchronous dynamic interfaces and client-side runtimes.',
    tags: ['FRONTEND', 'ASYNC', 'WEB RUNTIMES'],
    iconType: 'javascript',
  },

  // Tier 2 - Frontend & Frameworks
  {
    id: 'react',
    number: '04',
    name: 'React',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 19,
    yPercent: 41,
    description: 'Declarative component paradigm powering high-performance reactive interfaces.',
    tags: ['FRONTEND', 'REACTIVE UI', 'ARCHITECTURE'],
    iconType: 'react',
  },
  {
    id: 'nextjs',
    number: '05',
    name: 'Next.js',
    shortName: 'N',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 41,
    yPercent: 44,
    description: 'Production React framework with SSR, streaming server components and edge rendering.',
    tags: ['SSR / EDGE', 'FULL-STACK', 'PERFORMANCE'],
    iconType: 'nextjs',
  },
  {
    id: 'tailwind',
    number: '06',
    name: 'Tailwind CSS',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 63,
    yPercent: 45,
    description: 'Design-system utility engine for crafted mathematical layouts and typography.',
    tags: ['DESIGN SYSTEM', 'RESPONSIVE', 'UI/UX'],
    iconType: 'tailwind',
  },
  {
    id: 'flutter',
    number: '07',
    name: 'Flutter',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 85,
    yPercent: 46,
    description: 'Cross-platform native canvas framework for fluid multi-device mobile experiences.',
    tags: ['MOBILE', 'CROSS-PLATFORM', 'DART'],
    iconType: 'flutter',
  },

  // Tier 3 - AI & Machine Learning
  {
    id: 'pytorch',
    number: '08',
    name: 'PyTorch',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 19,
    yPercent: 63,
    description: 'Deep learning research framework for neural training, latent representations and tensors.',
    tags: ['DEEP LEARNING', 'TENSORS', 'NEURAL NETS'],
    iconType: 'pytorch',
  },
  {
    id: 'opencv',
    number: '09',
    name: 'OpenCV',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 39,
    yPercent: 67,
    description: 'Computer vision library for spatial feature extraction, image pipelines and tracking.',
    tags: ['COMPUTER VISION', 'DSP', 'IMAGE PROC'],
    iconType: 'opencv',
  },
  {
    id: 'nlp',
    number: '10',
    name: 'NLP',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 58,
    yPercent: 66,
    description: 'Natural language pipelines, transformers, tokenization and semantic vector search.',
    tags: ['TRANSFORMERS', 'SEMANTICS', 'EMBEDDINGS'],
    iconType: 'nlp',
  },
  {
    id: 'llms',
    number: '11',
    name: 'LLMs',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 78,
    yPercent: 69,
    description: 'Large language model orchestration, multi-agent frameworks, prompt engineering and RAG.',
    tags: ['AGENTIC AI', 'RAG PIPELINES', 'PROMPT ENG'],
    iconType: 'llm',
  },

  // Tier 4 - Backend, DevOps & Tools
  {
    id: 'fastapi',
    number: '12',
    name: 'FastAPI',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 19,
    yPercent: 84,
    description: 'High-throughput async Python framework serving live AI model inference endpoints.',
    tags: ['ASYNC APIS', 'MICROSERVICES', 'HIGH PERF'],
    iconType: 'fastapi',
  },
  {
    id: 'docker',
    number: '13',
    name: 'Docker',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 37,
    yPercent: 88,
    description: 'Containerization standard ensuring idempotent deployments and reproducible builds.',
    tags: ['CONTAINERS', 'DEVOPS', 'ISOLATION'],
    iconType: 'docker',
  },
  {
    id: 'postgresql',
    number: '14',
    name: 'PostgreSQL',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 55,
    yPercent: 86,
    description: 'ACID-compliant relational database for structured datasets and complex querying.',
    tags: ['RELATIONAL', 'SQL', 'TRANSACTIONS'],
    iconType: 'postgresql',
  },
  {
    id: 'supabase',
    number: '15',
    name: 'Supabase',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 73,
    yPercent: 89,
    description: 'Real-time database layer combining Postgres primitives, instant auth and edge APIs.',
    tags: ['REALTIME', 'POSTGRES', 'AUTH'],
    iconType: 'supabase',
  },
  {
    id: 'linux',
    number: '16',
    name: 'Linux',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 88,
    yPercent: 86,
    description: 'POSIX environment for server orchestration, headless research clusters and Cloud Run.',
    tags: ['POSIX SHELL', 'KERNEL', 'SERVERS'],
    iconType: 'linux',
  },
];

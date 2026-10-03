export interface TechItem {
  id: string;
  name: string;
  shortName?: string;
  tier: 1 | 2 | 3 | 4;
  category: 'Core Languages' | 'Frontend & Frameworks' | 'AI & Machine Learning' | 'Backend, DevOps & Tools';
  xPercent: number;
  yPercent: number;
  description: string;
  tags: string[];
  iconType:
    | 'python'
    | 'typescript'
    | 'javascript'
    | 'react'
    | 'nextjs'
    | 'tailwind'
    | 'fastapi'
    | 'pytorch'
    | 'tensorflow'
    | 'scikitlearn'
    | 'xgboost'
    | 'numpy'
    | 'pandas'
    | 'huggingface'
    | 'opencv'
    | 'docker'
    | 'postgresql'
    | 'mysql'
    | 'supabase'
    | 'git'
    | 'github'
    | 'figma'
    | 'antigravity'
    | 'claude'
    | 'chatgpt'
    | 'gemini';
}

export const techStackList: TechItem[] = [
  // ================= TIER 1: CORE LANGUAGES =================
  {
    id: 'python',
    name: 'Python',
    tier: 1,
    category: 'Core Languages',
    xPercent: 28,
    yPercent: 18,
    description: 'Primary language for AI/ML research, numerical computing, asynchronous backend architectures, and automated pipelines.',
    tags: ['AI / ML', 'BACKEND', 'DATA SCIENCE'],
    iconType: 'python',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    shortName: 'TS',
    tier: 1,
    category: 'Core Languages',
    xPercent: 52,
    yPercent: 23,
    description: 'Statically typed JavaScript superset powering scalable, type-safe full-stack software architectures and reliable APIs.',
    tags: ['FULL-STACK', 'TYPE SAFETY', 'SCALABILITY'],
    iconType: 'typescript',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    shortName: 'JS',
    tier: 1,
    category: 'Core Languages',
    xPercent: 79,
    yPercent: 24,
    description: 'Core interactive web language for dynamic client-side runtime, asynchronous event handling, and modern browser interfaces.',
    tags: ['FRONTEND', 'ASYNC', 'WEB ENGINE'],
    iconType: 'javascript',
  },

  // ================= TIER 2: FRONTEND & FRAMEWORKS =================
  {
    id: 'react',
    name: 'React',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 18,
    yPercent: 41,
    description: 'Declarative component-driven frontend library powering high-performance, modular, and reactive user interfaces.',
    tags: ['FRONTEND', 'REACTIVE UI', 'COMPONENTS'],
    iconType: 'react',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    shortName: 'N',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 42,
    yPercent: 44,
    description: 'Production React framework featuring Server-Side Rendering (SSR), Server Components, and edge-optimized routing.',
    tags: ['FULL-STACK', 'SSR / EDGE', 'REACT FRAMEWORK'],
    iconType: 'nextjs',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 66,
    yPercent: 45,
    description: 'Utility-first CSS framework for crafting bespoke design systems, fluid responsive layouts, and modern UI/UX.',
    tags: ['DESIGN SYSTEM', 'RESPONSIVE', 'UI/UX'],
    iconType: 'tailwind',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    tier: 2,
    category: 'Frontend & Frameworks',
    xPercent: 88,
    yPercent: 43,
    description: 'High-performance modern Python web framework for building asynchronous RESTful APIs, streaming microservices, and AI inference endpoints.',
    tags: ['WEB FRAMEWORK', 'ASYNC APIS', 'HIGH PERF'],
    iconType: 'fastapi',
  },

  // ================= TIER 3: AI & MACHINE LEARNING =================
  {
    id: 'pytorch',
    name: 'PyTorch',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 12,
    yPercent: 63,
    description: 'Leading deep learning research framework for autograd tensor computation, neural network training, and AI experimentation.',
    tags: ['DEEP LEARNING', 'TENSORS', 'NEURAL NETWORKS'],
    iconType: 'pytorch',
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 24,
    yPercent: 66,
    description: 'Comprehensive open-source machine learning platform for building and deploying production-scale deep learning models.',
    tags: ['DEEP LEARNING', 'PRODUCTION ML', 'MODEL TRAINING'],
    iconType: 'tensorflow',
  },
  {
    id: 'scikitlearn',
    name: 'Scikit-Learn',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 37,
    yPercent: 64,
    description: 'Standard machine learning library for classification, regression, clustering, dimensionality reduction, and model evaluation.',
    tags: ['CLASSICAL ML', 'STATISTICS', 'PREDICTIVE AI'],
    iconType: 'scikitlearn',
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 50,
    yPercent: 67,
    description: 'Optimized gradient boosting library designed for high-speed execution and state-of-the-art accuracy on tabular datasets.',
    tags: ['GRADIENT BOOSTING', 'TABULAR DATA', 'PREDICTIVE MODELS'],
    iconType: 'xgboost',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 63,
    yPercent: 64,
    description: 'Fundamental package for scientific computing with powerful multidimensional array manipulation, linear algebra, and matrices.',
    tags: ['NUMERICAL COMPUTING', 'MATRICES', 'LINEAR ALGEBRA'],
    iconType: 'numpy',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 75,
    yPercent: 67,
    description: 'High-performance tabular data structures and DataFrame analysis toolkit for data cleaning, exploration, and ETL pipelines.',
    tags: ['DATA ANALYSIS', 'DATAFRAMES', 'ETL PIPELINES'],
    iconType: 'pandas',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 87,
    yPercent: 64,
    description: 'Leading hub and ecosystem for state-of-the-art transformer architectures, open-source model repositories, and NLP pipelines.',
    tags: ['TRANSFORMERS', 'NLP', 'OPEN-SOURCE AI'],
    iconType: 'huggingface',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    tier: 3,
    category: 'AI & Machine Learning',
    xPercent: 96,
    yPercent: 66,
    description: 'Real-time computer vision and image processing library for spatial feature extraction, filtering, and video tracking.',
    tags: ['COMPUTER VISION', 'IMAGE PROCESSING', 'SPATIAL AI'],
    iconType: 'opencv',
  },

  // ================= TIER 4: BACKEND, DEVOPS & TOOLS =================
  {
    id: 'docker',
    name: 'Docker',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 8,
    yPercent: 84,
    description: 'Industry-standard containerization platform ensuring isolated, reproducible builds and idempotent system deployments.',
    tags: ['CONTAINERS', 'DEVOPS', 'ISOLATION'],
    iconType: 'docker',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 17,
    yPercent: 88,
    description: 'Enterprise-grade ACID-compliant open-source relational database built for complex queries and high transactional integrity.',
    tags: ['RELATIONAL DB', 'SQL', 'ACID'],
    iconType: 'postgresql',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 26,
    yPercent: 85,
    description: 'Proven and scalable relational database management system (RDBMS) for structured data storage and rapid querying.',
    tags: ['DATABASE', 'SQL', 'RDBMS'],
    iconType: 'mysql',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 35,
    yPercent: 88,
    description: 'Open-source Backend-as-a-Service on top of Postgres with instant real-time subscriptions, auth gates, and edge functions.',
    tags: ['BAAS', 'REALTIME', 'POSTGRES BACKEND'],
    iconType: 'supabase',
  },
  {
    id: 'git',
    name: 'Git',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 44,
    yPercent: 85,
    description: 'Distributed cryptographic version control system tracking branching workflows, code provenance, and release lifecycles.',
    tags: ['VERSION CONTROL', 'BRANCHING', 'SOURCE CODE'],
    iconType: 'git',
  },
  {
    id: 'github',
    name: 'GitHub',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 53,
    yPercent: 88,
    description: 'Cloud repository platform powering developer collaboration, automated CI/CD via GitHub Actions, and code review.',
    tags: ['CODE HOSTING', 'CI/CD ACTIONS', 'COLLABORATION'],
    iconType: 'github',
  },
  {
    id: 'figma',
    name: 'Figma',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 62,
    yPercent: 85,
    description: 'Collaborative vector interface design and wireframing tool for interactive prototypes and scalable design systems.',
    tags: ['UI/UX DESIGN', 'PROTOTYPING', 'WIREFRAMES'],
    iconType: 'figma',
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 71,
    yPercent: 88,
    description: 'Agentic development platform and intelligent AI orchestration environment for advanced coding and tool automation.',
    tags: ['AGENTIC AI', 'DEV PLATFORM', 'AI HARNESS'],
    iconType: 'antigravity',
  },
  {
    id: 'claude',
    name: 'Claude',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 80,
    yPercent: 85,
    description: 'Frontier AI reasoning model by Anthropic specialized in deep logical analysis, agentic workflows, and complex coding.',
    tags: ['ANTHROPIC AI', 'REASONING', 'AI COPILOT'],
    iconType: 'claude',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 89,
    yPercent: 88,
    description: 'Advanced generative AI model by OpenAI for architecture ideation, code debugging, algorithmic acceleration, and synthesis.',
    tags: ['OPENAI', 'GENERATIVE AI', 'PRODUCTIVITY'],
    iconType: 'chatgpt',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    tier: 4,
    category: 'Backend, DevOps & Tools',
    xPercent: 98,
    yPercent: 85,
    description: 'Next-generation multimodal foundation model by Google offering massive context windows across code, text, and visual inputs.',
    tags: ['MULTIMODAL AI', 'GOOGLE AI', 'LARGE CONTEXT'],
    iconType: 'gemini',
  },
];

import { PortfolioProfile, Project } from '../types';

export const profileData: PortfolioProfile = {
  name: 'Rafael Nandana S.',
  role: 'AI Engineer & Data',
  headline: 'AI Engineer & Data',
  tagline1: 'Drone, roots, and nature-captured sound on wax LPs.',
  tagline2: 'Every disc cut just once, snag it or miss.',
  bioPrefix: 'I am Undergraduate Computer Science student at BINUS University aspiring to pursue a career in ',
  bioHighlighted1: 'Artificial Intelligence and Data',
  bioMid: ', with interests in Machine Learning, Deep Learning, Natural Language Processing, and applied research. ',
  bioHighlighted2: 'Experienced in developing technology-driven projects',
  bioDescription:
    'Experienced in developing technology-driven projects and exploring data-driven and intelligent solutions to real-world problems. Passionate about building impactful technology and continuously learning, developing new skills, and keeping up with emerging technologies in AI and data.',
  focus: 'Artificial Intelligence & Data',
  currently: 'AI Engineer & Data',
  ageBase: '20 / Jakarta, Indonesia',
  specialization: 'Intelligent Systems',
  interests: 'AI, Sports & Gaming',
  email: 'nandana.sambodo@gmail.com',
  location: 'Jakarta, Indonesia',
  timezone: 'Asia/Jakarta',
  whoAmI:
    'Saya seorang web developer yang berfokus pada menciptakan tampilan dan pengalaman pengguna yang sederhana, cepat, dan fungsional.',
  myApproach:
    'Saya mengutamakan clean code, desain responsif, dan pengalaman pengguna yang intuitif dalam setiap proyek yang saya kerjakan.',
  phone: '+62 895-0818-8642',
  placeOfBirth: 'Palembang, Indonesia',
  gpa: '3.89',
};

export const projectsData: Project[] = [
  {
    id: 'computational-biology-cca',
    title: 'AI CKD DETECTOR',
    subtitle: 'Explainable AI (SHAP) & XGBoost Early Detection System for Chronic Kidney Disease',
    category: 'Healthcare AI & Machine Learning',
    description:
      'An AI-powered early detection system using XGBoost and Explainable AI (SHAP) to analyze clinical health ratios and predict Chronic Kidney Disease (CKD) risk with interpretable insights.',
    longDescription:
      'An AI-based early detection system that uses XGBoost and Explainable AI (SHAP) to analyze clinical health ratios and predict Chronic Kidney Disease (CKD) risk with real-time predictions, transparent explanations, and accessible health resources.',
    role: 'ML Coder, UI/UX Design, Front-end Dev',
    client: 'Machine Learning Course Project',
    date: 'February 2026',
    year: '2026',
    highlight: true,
    imageUrl: '/assets/projects/ckd/ckd_1.png',
    images: [
      '/assets/projects/ckd/ckd_1.png',
      '/assets/projects/ckd/ckd_2.png',
      '/assets/projects/ckd/ckd_3.png',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Rafns/CKD-Detection',
        icon: 'github',
      },
      {
        label: 'Presentation',
        url: 'https://ckd-detection-app.streamlit.app/',
        icon: 'presentation',
      },
    ],
    tags: [
      'Python',
      'XGBoost',
      'Explainable AI',
      'SHAP',
      'Machine Learning',
      'Healthcare AI',
      'Clinical Ratios',
    ],
    aboutParagraphs: [
      'Chronic Kidney Disease (CKD) has become a critical global health burden, affecting over 850 million people worldwide with prevalence rates of 10-15% in the general population. Early CKD detection is challenging due to limited symptoms and screening access, especially in remote areas. Late diagnosis can lead to irreversible kidney damage, costly dialysis, and higher mortality.',
      'To address this, I developed KidneyGuard AI, an AI-based early detection system that uses XGBoost and Explainable AI (SHAP) to analyze clinical health ratios and predict CKD risk. With SHAP, the results can be interpreted. The system provides real-time predictions and easily accessible health resources to support early detection and prevention.',
    ],
    roleContributions: [
      'Machine Learning Model Development: Trained and fine-tuned XGBoost and comparative classification algorithms on clinical health parameters to maximize predictive precision and recall.',
      'Explainable AI Implementation: Integrated SHAP (SHapley Additive exPlanations) values to provide transparent feature contribution breakdowns for each individual patient risk assessment.',
      'Clinical Ratio Feature Engineering: Engineered clinical indicator ratios and preprocessed biomedical metrics for reliable risk classification.',
      'Interactive User Interface: Designed an accessible, user-friendly interface that transforms complex clinical predictions into intuitive visualizations for early detection and prevention.',
    ],
    whatILearned: [
      'I learned how to combine XGBoost and Explainable AI (SHAP) to make CKD predictions more transparent and actionable, while designing an accessible interface that transforms complex clinical data into clear insights for early detection. I also learned about the most effective models.',
    ],
    metrics: [
      { label: 'Primary Model', value: 'XGBoost + SHAP' },
      { label: 'Interpretability', value: '100% Explainable' },
      { label: 'Application', value: 'Early Detection' },
    ],
    soundSample: {
      frequency: 220,
      type: 'drone',
      note: 'A3 Computational Biology Drone',
    },
  },
  {
    id: 'dermascan-ai',
    title: 'DermaScan',
    subtitle: 'AI-Powered Skin Lesion Screening & Early Cancer Detection',
    category: 'Computer Vision & Healthcare AI',
    description:
      'An AI-driven platform that scans skin lesions to identify patterns quickly, providing confidence scores, triage urgency levels, and plain-language clinical insights.',
    longDescription:
      'DermaScan utilizes deep learning computer vision to analyze skin lesion imagery for early signs of skin cancer, including melanoma and basal cell carcinoma. Designed for accessible healthcare triage, it provides instant classification, calibrated confidence levels, triage urgency categorization, and plain-language medical guidance.',
    role: 'AI Developer',
    client: 'Software Engineer Project',
    date: 'June 2026',
    year: '2026',
    highlight: true,
    imageUrl: '/assets/projects/dermascan/dermascan_1.png',
    images: [
      '/assets/projects/dermascan/dermascan_1.png',
      '/assets/projects/dermascan/dermascan_2.png',
      '/assets/projects/dermascan/dermascan_3.png',
      '/assets/projects/dermascan/dermascan_4.png',
      '/assets/projects/dermascan/dermascan_5.png',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/hib4/DermaScan', icon: 'github' },
      { label: 'Presentation', url: 'https://drive.google.com/file/d/1dZx6dn2tioVO87S2zndq0TGFn8MhSTEi/view', icon: 'presentation' },
    ],
    tags: ['Computer Vision', 'Deep Learning', 'Healthcare AI', 'Medical Imaging', 'FastAPI'],
    aboutParagraphs: [
      'Skin cancer, including melanoma and basal cell carcinoma, is one of the most common cancers worldwide, and early detection is crucial for improving survival. However, access to dermatologists is limited, especially in remote and underserved areas, leading to delayed diagnosis and poor outcomes.',
      'In order to solve the problem, I developed an app called DermaScan which uses artificial intelligence to scan pictures of the skin in order to identify any visible patterns quickly. The app gives predictions with their level of confidence, classification, urgency and conditions in simple terms.',
    ],
    roleContributions: [
      'Computer Vision Pipeline Architecture: Designed and implemented the deep learning classification pipeline for dermatological image preprocessing, augmentation, and real-time inference.',
      'Empathetic Clinical UI Design: Developed a patient-centric, empathetic user interface that translates technical predictions into clear, understandable medical terms without overwhelming users.',
    ],
    whatILearned: [
      'I learned how to balance AI performance with transparency and responsible design, using confidence scores and urgency levels to make predictions more understandable. This experience reinforced the importance of empathetic and user-centric interfaces when building AI for sensitive healthcare decisions. Furthermore, I learned how to design the pipeline.',
    ],
    metrics: [
      { label: 'Triage Accuracy', value: 'High Sensitivity' },
      { label: 'Output Explanation', value: 'Confidence & Urgency' },
      { label: 'Screening Focus', value: 'Early Detection' },
    ],
    soundSample: {
      frequency: 220,
      type: 'pulse',
      note: 'A3 Neural Inference Tone',
    },
  },
  {
    id: 'drowsiness-detection',
    title: 'Drowsiness Detection',
    subtitle: 'Real-Time Driver Fatigue Monitoring with MobileNetV2, MediaPipe & Grad-CAM',
    category: 'Computer Vision & Deep Learning',
    description:
      'A real-time driver drowsiness detection system utilizing MobileNetV2, facial geometry (EAR/MAR), and landmark comparison (MediaPipe vs dlib) with continuous audio-visual alerting.',
    longDescription:
      'A safety-critical computer vision application engineered to prevent road accidents caused by driver fatigue. Combines deep learning classification (MobileNetV2) with classical facial geometry (Eye Aspect Ratio and Mouth Aspect Ratio) to track eye closure, yawning, and head pose in real-time, benchmarked across MediaPipe Face Mesh and dlib 68-point landmarks with Grad-CAM interpretability.',
    role: 'Computer Vision & Deep Learning Engineer',
    client: 'Applied Computer Vision Project',
    date: 'June 2026',
    year: '2026',
    highlight: true,
    imageUrl: '/assets/projects/drowsiness/drowsiness_1.png',
    images: [
      '/assets/projects/drowsiness/drowsiness_1.png',
      '/assets/projects/drowsiness/drowsiness_2.png',
      '/assets/projects/drowsiness/drowsiness_3.png',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/abbdool/Drowsiness-Detection-with-MobileNetV2', icon: 'github' },
      { label: 'Demo Video', url: '#', icon: 'presentation' },
    ],
    tags: [
      'Computer Vision',
      'MobileNetV2',
      'MediaPipe',
      'dlib',
      'Grad-CAM',
      'EAR & MAR',
      'Python',
      'Real-Time AI',
    ],
    aboutParagraphs: [
      'One of the leading causes of traffic accidents worldwide is driver fatigue, which typically occurs due to brief periods of drowsiness, which leaves drivers very unconscious and slow to react. Just a few seconds of drowsiness can cause a traffic accident because the driver is completely unconscious for that period of time.',
      'To address this, I built a real-time driver drowsiness detection system using MobileNetV2, facial geometry, and computer vision to monitor eye closure, yawning, and head pose. The project compares MediaPipe Face Mesh and dlib 68-point landmarks under the same evaluation setup, with Grad-CAM for model interpretability. The system provides continuous monitoring and audio-visual alerts for detected drowsiness.',
    ],
    roleContributions: [
      'Deep Learning Architecture: Trained and evaluated MobileNetV2 for lightweight, low-latency binary and multi-state drowsiness classification.',
      'Facial Geometric Feature Engineering: Calculated Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) to capture subtle micromovements, prolonged eyelid closure, and yawning frequency.',
      'Model Explainability & Safety Alerts: Implemented Grad-CAM heatmaps to visually verify attentional focus on facial ocular regions and deployed real-time audio-visual threshold alerting.',
    ],
    whatILearned: [
      'The development of this drowsiness detector taught me that real-world AI applications require more than just accurate predictions. This comparison of MediaPipe and dlib demonstrated the importance of evaluating different frameworks before implementation, while EAR and MAR demonstrated how classical geometric features can complement deep learning. The Grad-CAM implementation also reinforced the value of model explanations, especially in safety-critical applications.',
    ],
    metrics: [
      { label: 'Primary CNN', value: 'MobileNetV2' },
      { label: 'Evaluation Setup', value: 'MediaPipe vs dlib' },
      { label: 'Explainability', value: 'Grad-CAM Verified' },
    ],
    soundSample: {
      frequency: 440,
      type: 'pulse',
      note: 'A4 Fatigue Alert Pulse',
    },
  },
  {
    id: 'path-of-winter',
    title: 'Path of Winter',
    subtitle: 'Pure Java 2D Engine, Custom Game Loop & OOP Architecture',
    category: 'Game Development & Software Engineering',
    description:
      'A 2D desktop game built in pure Java without external engines, featuring a custom rendering pipeline, 60 FPS game loop, tile collision system, and MySQL player persistence.',
    longDescription:
      'The Path of Winter is a Java-based desktop game developed from scratch to demonstrate low-level game programming concepts without relying on high-level game engines. It features a custom 2D rendering pipeline, deterministic game loop, grid-based tile collision and movement, enemy pathfinding, and a persistent MySQL-integrated authentication and player state system.',
    role: 'Game Developer',
    client: 'OOP Team Project',
    date: 'November 2025',
    year: '2025',
    highlight: true,
    imageUrl: '/assets/projects/path_of_winter/path_of_winter_1.png',
    images: [
      '/assets/projects/path_of_winter/path_of_winter_1.png',
      '/assets/projects/path_of_winter/path_of_winter_2.png',
      '/assets/projects/path_of_winter/path_of_winter_3.png',
      '/assets/projects/path_of_winter/path_of_winter_4.png',
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/AxelS27/the-path-of-winter', icon: 'github' },
    ],
    tags: [
      'Java',
      'OOP Architecture',
      'Custom 2D Engine',
      'Collision Detection',
      'MySQL',
      'Desktop Game',
    ],
    aboutParagraphs: [
      'Learning how to develop games using a game engine often overlooks fundamental programming concepts that are crucial to the efficient operation of a game. Many programmers struggle to understand aspects like the rendering pipeline, game loop, collision detection, and object-oriented design because these are handled automatically by the game engine.',
      'I built The Path of Winter, a Java-based desktop game developed as a team project using pure Java, featuring a custom 2D rendering system without relying on external game engines. The game showcases core OOP principles through collision detection, tile-based movement, and interactive gameplay elements, along with a MySQL-integrated login system for storing player data.',
    ],
    roleContributions: [
      'Tile-Based Physics & Collision Engine: Implemented bounding-box collision detection and grid-based coordinate mapping for smooth entity movement and obstacle handling.',
      'Object-Oriented Architecture: Structured modular class hierarchies (Entity, Player, NPC, TileMap, LevelManager) enforcing strict encapsulation and polymorphism.',
      'Relational Database Integration: Connected the game to a MySQL backend with prepared statements for secure player registration, login authentication, and saved-game states.',
    ],
    whatILearned: [
      'Building The Path of Winter from scratch taught me how rendering and the game loop work at a low level. I learned how to apply OOP principles to a scalable game architecture, and tile-based movement and enemy pathfinding strengthened my understanding of real-time performance. Integrating MySQL also gave me practical experience with database design and persistent user data.',
    ],
    metrics: [
      { label: 'Core Engine', value: '100% Pure Java' },
      { label: 'Architecture', value: 'OOP & Custom Loop' },
      { label: 'Data Persistence', value: 'MySQL Integrated' },
    ],
    soundSample: {
      frequency: 293.66,
      type: 'ambient',
      note: 'D4 Winter Chime Tone',
    },
  },
  {
    id: 'forest-guardian',
    title: 'Forest Guardian',
    subtitle: '3D Environmental Conservation Educational Game in Unity',
    category: 'Game Development & Educational Technology',
    description:
      'A 3D educational game developed in Unity where players explore forest ecosystems, rescue distressed wildlife, investigate environmental damage, and collect restoration resources.',
    longDescription:
      'Forest Guardian (ForestGuard) is an immersive 3D environmental conservation game developed in Unity to connect younger audiences emotionally with nature. Players navigate a dynamic forest environment, rescue endangered wildlife, diagnose deforestation and wildfire damage, solve interactive eco-quizzes, and collect native saplings and clean water to restore degraded habitats to their pristine state.',
    role: 'Game Developer & Interactive Learning Designer',
    client: 'Environmental Educational Innovation Project',
    date: 'April 2025',
    year: '2025',
    highlight: true,
    imageUrl: '/assets/projects/forest_guardian/forest_guardian_1.png',
    images: [
      '/assets/projects/forest_guardian/forest_guardian_1.png',
      '/assets/projects/forest_guardian/forest_guardian_2.png',
      '/assets/projects/forest_guardian/forest_guardian_3.png',
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/nandana-sambodo', icon: 'github' },
      { label: 'Gameplay Showcase', url: '#', icon: 'presentation' },
    ],
    tags: [
      'Unity',
      'C#',
      '3D Game Design',
      'Gamification',
      'Environmental Education',
      'Interactive Quizzes',
      'Audio-Visual Design',
    ],
    aboutParagraphs: [
      'Environmental degradation, including deforestation, forest fires, and biodiversity loss, is a critical global issue. Traditional environmental education methods, such as textbooks and lectures, often fail to deeply engage young audiences or create strong emotional connections with nature.',
      'In response to this problem, I developed an environmental conservation educational game called ForestGuard, which is a three-dimensional game played in a forest environment using Unity. Players get to interact in this environment by finding distressed animals, finding out why some of the trees in this environment are damaged. The game requires that players collect certain things in order to restore the forest back to its original condition.',
    ],
    roleContributions: [
      'Unity 3D World Building: Constructed a responsive forest environment featuring ambient wildlife AI and procedural terrain details.',
      'Restoration Gameplay Mechanics: Engineered interactive player quests including wildlife rescue triage, tree damage diagnostics, and item collection mechanics to revive degraded biomes.',
      'Gamified Environmental Quizzes: Integrated real-time educational quiz triggers and feedback loops that reinforce biodiversity preservation and fire prevention concepts.',
      'Audio-Visual Immersion: Implemented atmospheric soundscapes and intuitive HUD elements designed for young learners.',
    ],
    whatILearned: [
      'Building ForestGuard taught me how to balance engaging gameplay with meaningful learning outcomes. I learned to integrate Unity with gamified coding mechanisms and create immersive environmental interactions. Interactive quizzes and gameplay-based learning reinforced conservation concepts, showing me how gamification can make education more engaging and inspire awareness.',
    ],
    metrics: [
      { label: 'Engine & Tech', value: 'Unity 3D & C#' },
      { label: 'Gameplay Focus', value: 'Wildlife & Eco-Restoration' },
      { label: 'Methodology', value: 'Gamified Education' },
    ],
    soundSample: {
      frequency: 523.25,
      type: 'nature',
      note: 'C5 Rainforest Canopy Melody',
    },
  },
  {
    id: 'bot-judol-detection',
    title: 'Bot Judol Detection',
    subtitle: 'AI-Powered Online Gambling Spam Bot Classification & Moderation',
    category: 'NLP & Cyber Threat Intelligence',
    description:
      'An AI-powered moderation system classifying online gambling spam comments on Indonesian social media using multi-model ML architectures (SVM, Naive Bayes, Logistic Regression).',
    longDescription:
      'BotGuard ID is a machine learning cyber threat detection platform built to combat the proliferation of automated online gambling (judol) spam bots across Indonesian social media ecosystems. Features Indonesian slang/lexicon NLP preprocessing, multi-model evaluation (Logistic Regression, Naive Bayes, Support Vector Machine), real-time single comment analysis, batch CSV processing, and transparent confidence score distributions.',
    role: 'Lead ML & NLP Engineer',
    client: 'NLP Project',
    date: 'May 2026',
    year: '2026',
    highlight: true,
    imageUrl: '/assets/projects/bot_judol/bot_judol_1.png',
    images: [
      '/assets/projects/bot_judol/bot_judol_1.png',
      '/assets/projects/bot_judol/bot_judol_2.png',
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://judolspamgit-hehe.streamlit.app/', icon: 'github' },
      { label: 'Interactive Demo', url: 'https://drive.google.com/file/d/1JgHrxHfh_b5l5LeL5HO0KCJRKnF5pxic/view?usp=sharing', icon: 'presentation' },
    ],
    tags: [
      'Machine Learning',
      'NLP',
      'Indonesian Slang NLP',
      'Cyber Threat Detection',
      'SVM',
      'Naive Bayes',
      'Logistic Regression',
      'FastAPI',
    ],
    aboutParagraphs: [
      'Online gambling spam bots have become a widespread digital crisis on Indonesian social media, with over 10 million users exposed and economic losses reaching Rp 150 trillion. Approximately 85% of perpetrators are young people aged 18-30, and more than 500,000 cases have been reported. Manual detection is unable to keep up with the speed and volume of bot proliferation',
      'To solve this, I built BotGuard ID, an AI-powered spam bot detection system that analyzes social media comments using multiple Machine Learning models including Logistic Regression, Naive Bayes, and Support Vector Machine. The system provides real-time quick testing for instant comment analysis, batch prediction for large-scale data processing, confidence score visualization for prediction transparency',
    ],
    roleContributions: [
      'Custom Indonesian Slang NLP Pipeline: Engineered specialized tokenizers, text normalization, and stopword filters handling obfuscated gambling keywords, typo-squatting, and leetspeak.',
      'Multi-Model Benchmark & Ensembling: Trained and comparatively evaluated Logistic Regression, Multinomial Naive Bayes, and Support Vector Machines (Linear & RBF kernels).',
      'Transparent Confidence Calibration: Implemented visual probability score distributions and model decision breakdowns to ensure explainable threat moderation.',
    ],
    whatILearned: [
      'Building BotGuard ID taught me that effective AI threat detection requires more than accuracy. I learned the importance of specialized NLP for Indonesian slang, multi-model comparison, transparent predictions, and scalable processing. This experience showed me how AI can combine technical performance with real-world impact to better protect communities.',
    ],
    metrics: [
      { label: 'Detection Accuracy', value: '96.8% F1-Score' },
      { label: 'Models Compared', value: 'SVM, NB, LogReg' },
      { label: 'Inference Speed', value: '< 25ms / comment' },
    ],
    soundSample: {
      frequency: 370,
      type: 'pulse',
      note: 'F#4 Cyber Shield Pulse',
    },
  },
  {
    id: 'simkost-management',
    title: 'SIMKOST',
    subtitle: 'Relational Database Architecture & Figma UI/UX System for Automated Boarding House Management',
    category: 'Database Systems & UI/UX Design',
    description:
      'A comprehensive boarding house (kost) management platform engineered to automate core operational transactions, such as monthly recurring billing and real-time room availability, ensuring data integrity through referential integrity and Stored Procedures while providing efficient reporting on room occupancy and overdue invoices.',
    longDescription:
      'The SIMKOST application is designed to automate core boarding house management transactions, such as recurring monthly invoice generation and real-time room availability updates, ensuring data integrity through the implementation of referential integrity and Stored Procedures, as well as delivering efficient analytical reports on room statuses and overdue bills.',
    role: 'Database Designer & UI/UX Designer',
    client: 'Database Technology Final Project (FINPRO LAB DATABASE)',
    date: 'January 2026',
    year: '2026',
    highlight: true,
    imageUrl: '/assets/projects/simkost/simkost_1.png',
    images: [
      '/assets/projects/simkost/simkost_1.png',
      '/assets/projects/simkost/simkost_2.png',
      '/assets/projects/simkost/simkost_3.png',
      '/assets/projects/simkost/simkost_4.png',
      '/assets/projects/simkost/simkost_5.png',
    ],
    links: [
      {
        label: 'Figma Prototype',
        url: 'https://www.figma.com/design/gkB6gDssRcHJO7qVmjgXiZ/FINPRO-LAB-DATABASE-SIMKOST?node-id=0-1&t=hpylvPiwI3SidhL5-1',
        icon: 'presentation',
      },
    ],
    tags: [
      'Figma',
      'UI/UX Design',
      'Database Design',
      'MySQL',
      'Stored Procedures',
      'Referential Integrity',
      'ERD & 3NF Normalization',
      'Boarding House System',
    ],
    aboutParagraphs: [
      'Managing boarding houses (kost) manually often leads to human errors in monthly billing calculations, delayed overdue payment notices, room occupancy misallocations, and data redundancy across tenant records.',
      'The SIMKOST platform was developed to resolve these challenges by automating core operational transactions, including automated monthly billing generation and real-time room availability status toggling during check-in and check-out workflows.',
      'The project focuses on architecting a robust relational database schema (Entity-Relationship Modeling, 3NF normalization, referential integrity constraints, and automated SQL Stored Procedures & Triggers), seamlessly paired with a high-fidelity, interactive Figma UI/UX prototype.',
    ],
    roleContributions: [
      'Relational Database Schema Architecture: Designed the Entity-Relationship Diagram (ERD), normalized schemas up to Third Normal Form (3NF), and enforced strict Foreign Key Referential Integrity across master and transaction tables to eliminate data anomalies.',
      'Stored Procedures & Trigger Automation: Engineered modular SQL Stored Procedures (e.g., sp_GenerateMonthlyInvoices) for recurring invoice generation and active database Triggers for real-time room status synchronization upon tenant check-in and check-out.',
      'Interactive Figma UI/UX Design: Crafted a clean, modern, and accessible interface prototype on Figma featuring a live room availability grid, tenant onboarding workflows, billing tracking, and overdue alert mechanisms.',
    ],
    whatILearned: [
      'Through the development of SIMKOST, I mastered the process of translating complex business requirements into an ACID-compliant relational database schema with Stored Procedures, Triggers, and strict referential integrity. I also refined my UI/UX design workflow in Figma, ensuring the user interface seamlessly mirrors real-time backend data states.',
    ],
    metrics: [
      { label: 'Database Architecture', value: '3NF & Stored Procedures' },
      { label: 'UI/UX System', value: 'Interactive Figma Prototype' },
      { label: 'Core Automation', value: 'Real-Time Billing & Rooms' },
    ],
    soundSample: {
      frequency: 330,
      type: 'ambient',
      note: 'E4 Database Sync Tone',
    },
  },
];

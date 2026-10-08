import { JourneyExperience } from '../types';

export const journeyExperiences: JourneyExperience[] = [
  {
    id: 'exp-01',
    number: '01',
    title: 'Undergraduate Computer Science',
    role: 'BINUS University @ Malang',
    category: 'Academic Degree',
    year: 'AUG 2024 - FEB 2026',
    shortDescription:
      'Pursuing an undergraduate degree in Computer Science specializing in Intelligent Systems, focusing on Artificial Intelligence, Machine Learning algorithms, and applied data solutions.',
    highlights: [
      'Maintained a cumulative GPA of 3.89 / 4.00 with strong academic distinction in core computing subjects.',
      'Specialized in Intelligent Systems, Deep Learning, NLP, and Computer Vision architectures.',
      'Developed end-to-end Machine Learning pipelines achieving >90% accuracy in predictive and clinical health applications.',
    ],
    tags: [
      'INTELLIGENT SYSTEMS',
      'MACHINE LEARNING',
      'COMPUTER VISION',
      'NLP',
      'DATA STRUCTURES',
    ],
    imageUrl: '/assets/binus_malang.jpeg',
    imageAlt: 'BINUS University campus building',
    side: 'left',
    popupSide: 'right',
  },
  {
    id: 'exp-02',
    number: '02',
    title: 'BNCC Learning & Training',
    role: 'Bina Nusantara Computer Club (BNCC)',
    category: 'Tech Organization & Training',
    year: '2024 - 2025',
    shortDescription:
      'Engaging in intensive technical acceleration, hands-on programming workshops, and collaborative software development under BNCC.',
    highlights: [
      'Coordinated the preparation and execution of technical training programs, ensuring smooth delivery of learning materials for 40+ BNCC members.',
      'Assisted trainers during 2 technical training sessions and resolved participants\' technical issues on the spot.',
      'Collaborated with the Learning & Training team to coordinate schedules and resource allocation for technical workshops in 2024-2025.',
    ],
    tags: [
      'FULL STACK DEV',
      'GIT & GITHUB',
      'AGILE WORKFLOW',
      'SOFTWARE ENGINEERING',
      'PROBLEM SOLVING',
    ],
    imageUrl: '/assets/bncc_learning_training.png',
    imageAlt: 'BNCC Learning & Training',
    side: 'right',
    popupSide: 'left',
    objectFit: 'contain',
  },
];


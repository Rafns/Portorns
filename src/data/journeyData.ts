import { JourneyExperience } from '../types';

export const journeyExperiences: JourneyExperience[] = [
  {
    id: 'exp-01',
    number: '01',
    title: 'Undergraduate Computer Science',
    role: 'BINUS University @ Malang',
    year: 'AUG 2024 - FEB 2026',
    shortDescription:
      'Pursuing an undergraduate degree in Computer Science at BINUS University @ Malang, focusing on Artificial Intelligence, Data, Machine Learning, and intelligent software systems.',
    tags: ['BINUS UNIVERSITY', 'COMPUTER SCIENCE', 'AI & DATA'],
    imageUrl: '/assets/binus_malang.jpeg',
    imageAlt: 'BINUS University campus building',
    side: 'left',
    popupSide: 'right',
  },
  {
    id: 'exp-02',
    number: '02',
    title: 'BNCC Learning & Training',
    role: 'Bina Nusantara Computer Club',
    year: '2024',
    shortDescription:
      'Engaging in technical skill acceleration, hands-on programming workshops, and collaborative computing projects under BNCC Learning & Training.',
    tags: ['BNCC', 'LEARNING & TRAINING', 'DEVELOPMENT'],
    imageUrl: '/assets/bncc_learning_training.png',
    imageAlt: 'BNCC Learning & Training',
    side: 'right',
    popupSide: 'left',
    objectFit: 'contain',
  },
];


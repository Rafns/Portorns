export type SectionId =
  | 'beranda'
  | 'about'
  | 'experience'
  | 'proyek'
  | 'tech-stack'
  | 'certifications'
  | 'contact';

export interface CertificateItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  description: string;
  isHighlighted?: boolean;
}

export interface TechSignalNode {
  id: string;
  number: string;
  name: string;
  description: string;
  keywords: string[];
  isPrimary: boolean;
  x: number;
  y: number;
  popupSide: 'left' | 'right';
}

export interface JourneyExperience {
  id: string;
  number: string;
  title: string;
  year: string;
  role?: string;
  category?: string;
  shortDescription: string;
  highlights?: string[];
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  side: 'left' | 'right';
  popupSide: 'right' | 'left';
  isNow?: boolean;
  bgWhite?: boolean;
  objectFit?: 'cover' | 'contain';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  highlight?: boolean;
  imageUrl?: string;
  images?: string[];
  role?: string;
  client?: string;
  date?: string;
  links?: {
    label: string;
    url: string;
    icon?: 'paper' | 'github' | 'presentation' | 'external';
  }[];
  aboutParagraphs?: string[];
  roleContributions?: string[];
  whatILearned?: string[];
  demoUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  soundSample?: {
    frequency: number;
    type: 'ambient' | 'drone' | 'nature' | 'pulse';
    note: string;
  };
}

export interface PortfolioProfile {
  name: string;
  role: string;
  headline: string;
  tagline1: string;
  tagline2: string;
  bioHighlighted1: string;
  bioHighlighted2: string;
  bioPrefix: string;
  bioMid: string;
  bioDescription: string;
  focus: string;
  currently: string;
  ageBase: string;
  specialization: string;
  interests: string;
  email: string;
  location: string;
  timezone: string;
  whoAmI?: string;
  myApproach?: string;
  phone?: string;
  placeOfBirth?: string;
  gpa?: string;
}

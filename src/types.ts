export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  twitter?: string;
}

export interface ContactInfo {
  phone: string;
  location: string;
  email: string;
}

export interface AboutData {
  name: string;
  titles: string[];
  tagline: string;
  aboutText: string;
  careerObjective: string;
  interests: string[];
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
  resumeDriveUrl?: string;
}

export interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  metrics?: string;
  githubUrl: string;
  demoUrl: string;
  image: string;
  features?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  date: string;
  image: string;
  credentialUrl: string;
}

export interface ExperienceItem {
  id: string;
  type: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  keySkills: string[];
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

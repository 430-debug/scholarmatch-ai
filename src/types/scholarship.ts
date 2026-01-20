export interface StudentProfile {
  name: string;
  email: string;
  gpa: number;
  major: string;
  yearOfStudy: string;
  financialNeed: boolean;
  ethnicity: string;
  gender: string;
  interests: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  deadline: Date;
  matchScore: number;
  requirements: string[];
  description: string;
  applicationUrl: string;
  category: string;
}

export type UrgencyLevel = 'urgent' | 'soon' | 'upcoming';

export const getUrgencyLevel = (deadline: Date): UrgencyLevel => {
  const daysUntilDeadline = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilDeadline <= 7) return 'urgent';
  if (daysUntilDeadline <= 30) return 'soon';
  return 'upcoming';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDeadline = (deadline: Date): string => {
  const daysUntilDeadline = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilDeadline <= 0) return 'Expired';
  if (daysUntilDeadline === 1) return '1 day left';
  if (daysUntilDeadline <= 7) return `${daysUntilDeadline} days left`;
  return deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

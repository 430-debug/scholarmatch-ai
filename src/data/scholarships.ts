import { Scholarship } from '@/types/scholarship';

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Future Leaders STEM Scholarship',
    provider: 'National Science Foundation',
    amount: 10000,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    matchScore: 95,
    requirements: ['GPA 3.5+', 'STEM Major', 'US Citizen'],
    description: 'Supporting the next generation of STEM innovators with merit-based funding for undergraduate studies.',
    applicationUrl: 'https://example.com/apply',
    category: 'STEM',
  },
  {
    id: '2',
    name: 'Community Impact Grant',
    provider: 'Gates Foundation',
    amount: 15000,
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    matchScore: 88,
    requirements: ['GPA 3.0+', 'Community Service', 'Financial Need'],
    description: 'Empowering students who demonstrate exceptional commitment to community service and social impact.',
    applicationUrl: 'https://example.com/apply',
    category: 'Community',
  },
  {
    id: '3',
    name: 'Women in Technology Award',
    provider: 'Tech Industry Alliance',
    amount: 8000,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    matchScore: 92,
    requirements: ['Female Identifying', 'Tech/CS Major', 'Sophomore+'],
    description: 'Advancing diversity in technology by supporting women pursuing careers in computer science and engineering.',
    applicationUrl: 'https://example.com/apply',
    category: 'Diversity',
  },
  {
    id: '4',
    name: 'First Generation College Fund',
    provider: 'Education Equity Foundation',
    amount: 12000,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    matchScore: 85,
    requirements: ['First-Gen Student', 'GPA 2.8+', 'Financial Need'],
    description: 'Breaking barriers for first-generation college students with comprehensive financial support.',
    applicationUrl: 'https://example.com/apply',
    category: 'First-Gen',
  },
  {
    id: '5',
    name: 'Creative Arts Excellence Award',
    provider: 'National Arts Council',
    amount: 5000,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    matchScore: 78,
    requirements: ['Arts/Design Major', 'Portfolio Required', 'Full-time Student'],
    description: 'Celebrating exceptional talent in visual arts, design, and creative disciplines.',
    applicationUrl: 'https://example.com/apply',
    category: 'Arts',
  },
  {
    id: '6',
    name: 'Minority Business Leaders Scholarship',
    provider: 'Chamber of Commerce',
    amount: 7500,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    matchScore: 90,
    requirements: ['Business Major', 'Underrepresented Minority', 'GPA 3.2+'],
    description: 'Fostering diverse leadership in business by supporting underrepresented students.',
    applicationUrl: 'https://example.com/apply',
    category: 'Business',
  },
];

export const matchScholarships = (profile: Partial<{
  gpa: number;
  major: string;
  financialNeed: boolean;
  gender: string;
}>): Scholarship[] => {
  return mockScholarships
    .map(scholarship => ({
      ...scholarship,
      matchScore: calculateMatchScore(scholarship, profile),
    }))
    .filter(s => s.matchScore >= 60)
    .sort((a, b) => b.matchScore - a.matchScore);
};

const calculateMatchScore = (scholarship: Scholarship, profile: Partial<{
  gpa: number;
  major: string;
  financialNeed: boolean;
  gender: string;
}>): number => {
  let score = scholarship.matchScore;
  
  // Adjust based on profile matches
  if (profile.gpa && profile.gpa >= 3.5) score += 5;
  if (profile.major && scholarship.category === 'STEM' && ['Computer Science', 'Engineering', 'Biology', 'Mathematics'].includes(profile.major)) {
    score += 3;
  }
  if (profile.financialNeed && scholarship.requirements.some(r => r.includes('Financial Need'))) {
    score += 5;
  }
  
  return Math.min(score, 100);
};

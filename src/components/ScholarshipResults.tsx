import { useState } from 'react';
import { Search, SlidersHorizontal, Trophy, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScholarshipCard from './ScholarshipCard';
import { Scholarship } from '@/types/scholarship';

interface ScholarshipResultsProps {
  scholarships: Scholarship[];
  studentName: string;
}

type SortOption = 'match' | 'deadline' | 'amount';

const ScholarshipResults = ({ scholarships, studentName }: ScholarshipResultsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('match');

  const filteredScholarships = scholarships
    .filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return a.deadline.getTime() - b.deadline.getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'match':
        default:
          return b.matchScore - a.matchScore;
      }
    });

  const totalPotential = scholarships.reduce((sum, s) => sum + s.amount, 0);
  const avgMatch = Math.round(scholarships.reduce((sum, s) => sum + s.matchScore, 0) / scholarships.length);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Matched Scholarships
          </h2>
          <p className="text-muted-foreground text-lg">
            Great news, {studentName}! We found <span className="text-primary font-semibold">{scholarships.length} scholarships</span> that match your profile.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 animate-slide-up">
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold">${(totalPotential / 1000).toFixed(0)}K+</div>
            <div className="text-xs text-muted-foreground">Total Available</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-xl font-bold">{avgMatch}%</div>
            <div className="text-xs text-muted-foreground">Avg Match</div>
          </div>
          <div className="text-center p-4 bg-card rounded-xl shadow-sm">
            <Clock className="w-6 h-6 text-urgent mx-auto mb-2" />
            <div className="text-xl font-bold">{scholarships.filter(s => (s.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 7).length}</div>
            <div className="text-xs text-muted-foreground">Closing Soon</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-48 h-12">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
              <SelectItem value="amount">Amount (Highest)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship, index) => (
            <ScholarshipCard 
              key={scholarship.id} 
              scholarship={scholarship} 
              index={index}
            />
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No scholarships match your search.</p>
            <Button variant="link" onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScholarshipResults;

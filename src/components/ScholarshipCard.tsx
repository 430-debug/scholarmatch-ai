import { Calendar, ExternalLink, Trophy, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scholarship, getUrgencyLevel, formatCurrency, formatDeadline } from '@/types/scholarship';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  index: number;
}

const ScholarshipCard = ({ scholarship, index }: ScholarshipCardProps) => {
  const urgency = getUrgencyLevel(scholarship.deadline);

  const urgencyConfig = {
    urgent: {
      bgClass: 'bg-urgent/10',
      textClass: 'text-urgent',
      borderClass: 'border-urgent/30',
      icon: AlertTriangle,
      label: 'Apply Now!',
    },
    soon: {
      bgClass: 'bg-warning/10',
      textClass: 'text-warning',
      borderClass: 'border-warning/30',
      icon: Clock,
      label: 'Closing Soon',
    },
    upcoming: {
      bgClass: 'bg-success/10',
      textClass: 'text-success',
      borderClass: 'border-success/30',
      icon: Calendar,
      label: 'Open',
    },
  };

  const config = urgencyConfig[urgency];
  const UrgencyIcon = config.icon;

  return (
    <Card 
      className="group border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {scholarship.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs font-medium ${config.bgClass} ${config.textClass} ${config.borderClass}`}
              >
                <UrgencyIcon className="w-3 h-3 mr-1" />
                {config.label}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {scholarship.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{scholarship.provider}</p>
          </div>
          
          {/* Match Score Circle */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#matchGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(scholarship.matchScore / 100) * 176} 176`}
              />
              <defs>
                <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--success))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{scholarship.matchScore}%</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {scholarship.description}
        </p>

        {/* Requirements Tags */}
        <div className="flex flex-wrap gap-2">
          {scholarship.requirements.map((req, i) => (
            <span 
              key={i}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
            >
              {req}
            </span>
          ))}
        </div>

        {/* Amount and Deadline */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-bold text-lg text-foreground">
              {formatCurrency(scholarship.amount)}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 text-sm ${config.textClass}`}>
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{formatDeadline(scholarship.deadline)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          variant={urgency === 'urgent' ? 'hero' : 'default'} 
          className="w-full"
          asChild
        >
          <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer">
            Apply Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipCard;

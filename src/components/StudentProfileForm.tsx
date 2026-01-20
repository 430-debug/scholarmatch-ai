import { useState } from 'react';
import { User, GraduationCap, BookOpen, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentProfileFormProps {
  onSubmit: (profile: StudentFormData) => void;
}

export interface StudentFormData {
  name: string;
  email: string;
  gpa: string;
  major: string;
  yearOfStudy: string;
  financialNeed: boolean;
  gender: string;
}

const majors = [
  'Computer Science',
  'Engineering',
  'Business',
  'Biology',
  'Mathematics',
  'Psychology',
  'Arts & Design',
  'Communications',
  'Education',
  'Nursing',
  'Other',
];

const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

const StudentProfileForm = ({ onSubmit }: StudentProfileFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    gpa: '',
    major: '',
    yearOfStudy: '',
    financialNeed: false,
    gender: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof StudentFormData>(field: K, value: StudentFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="profile-form" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">Build Your Profile</CardTitle>
              <CardDescription className="text-base mt-2">
                Tell us about yourself so we can find scholarships tailored to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@university.edu"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                {/* Academic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gpa" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Current GPA
                    </Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      placeholder="3.50"
                      value={formData.gpa}
                      onChange={(e) => updateField('gpa', e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Field of Study
                    </Label>
                    <Select value={formData.major} onValueChange={(v) => updateField('major', v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your major" />
                      </SelectTrigger>
                      <SelectContent>
                        {majors.map((major) => (
                          <SelectItem key={major} value={major}>
                            {major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Year and Gender */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Year of Study</Label>
                    <Select value={formData.yearOfStudy} onValueChange={(v) => updateField('yearOfStudy', v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={formData.gender} onValueChange={(v) => updateField('gender', v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Financial Need Toggle */}
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Financial Need</p>
                      <p className="text-sm text-muted-foreground">I qualify for need-based scholarships</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.financialNeed}
                    onCheckedChange={(checked) => updateField('financialNeed', checked)}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Find My Scholarships
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StudentProfileForm;

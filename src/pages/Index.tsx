import { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StudentProfileForm, { StudentFormData } from '@/components/StudentProfileForm';
import ScholarshipResults from '@/components/ScholarshipResults';
import Footer from '@/components/Footer';
import { matchScholarships } from '@/data/scholarships';
import { Scholarship } from '@/types/scholarship';

const Index = () => {
  const [profile, setProfile] = useState<StudentFormData | null>(null);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileSubmit = (formData: StudentFormData) => {
    setProfile(formData);
    
    // Match scholarships based on profile
    const matched = matchScholarships({
      gpa: parseFloat(formData.gpa),
      major: formData.major,
      financialNeed: formData.financialNeed,
      gender: formData.gender,
    });
    
    setScholarships(matched);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onGetStarted={scrollToForm} />
      
      <main className="flex-1">
        <HeroSection onGetStarted={scrollToForm} />
        
        <div ref={formRef}>
          <StudentProfileForm onSubmit={handleProfileSubmit} />
        </div>
        
        {scholarships.length > 0 && profile && (
          <ScholarshipResults 
            scholarships={scholarships} 
            studentName={profile.name.split(' ')[0] || 'there'}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

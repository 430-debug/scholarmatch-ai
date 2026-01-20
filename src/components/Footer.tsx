import { GraduationCap, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">ScholarMatch</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              Contact
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              FAQ
            </a>
          </nav>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-sm opacity-70">
            Made with <Heart className="w-4 h-4 fill-current text-urgent" /> for students
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

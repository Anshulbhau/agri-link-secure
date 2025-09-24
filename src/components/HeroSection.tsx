import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 agri-gradient-bg opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Transparent
          <br />
          <span className="text-primary-glow">Agricultural</span>
          <br />
          Supply Chain
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
          Track your produce from farm to table with blockchain technology. 
          Ensure transparency, quality, and fair pricing for all stakeholders.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="glass-button bg-white/20 text-white border-white/30 hover:bg-white/30 hover:scale-105 text-lg px-8 py-6 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="glass-button border-white/30 text-white hover:bg-white/20 hover:scale-105 text-lg px-8 py-6 transition-all duration-300"
          >
            View Demo
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-card hover:glass-strong transition-all duration-300 hover:scale-105">
            <Shield className="h-12 w-12 mx-auto mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
            <p className="text-white/80">Immutable records ensure data integrity and prevent fraud</p>
          </div>
          
          <div className="glass-card hover:glass-strong transition-all duration-300 hover:scale-105">
            <Zap className="h-12 w-12 mx-auto mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-white/80">Monitor your produce journey instantly with QR codes</p>
          </div>
          
          <div className="glass-card hover:glass-strong transition-all duration-300 hover:scale-105">
            <Globe className="h-12 w-12 mx-auto mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">Global Network</h3>
            <p className="text-white/80">Connect with farmers, distributors, and retailers worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
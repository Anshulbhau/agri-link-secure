import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FarmerDashboard from "@/components/FarmerDashboard";
import DistributorDashboard from "@/components/DistributorDashboard";
import RetailerDashboard from "@/components/RetailerDashboard";
import ConsumerInterface from "@/components/ConsumerInterface";
import BlockchainExplorer from "@/components/BlockchainExplorer";

type UserRole = "farmer" | "distributor" | "retailer" | "consumer" | null;

const Index = () => {
  console.log("Index page rendering...");
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const handleGetStarted = () => {
    setCurrentRole("farmer");
  };

  const renderContent = () => {
    switch (currentRole) {
      case "farmer":
        return <FarmerDashboard />;
      case "distributor":
        return <DistributorDashboard />;
      case "retailer":
        return <RetailerDashboard />;
      case "consumer":
        return <ConsumerInterface />;
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: "1s"}}></div>
      </div>
      
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      <main className="relative z-10">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {currentRole && (
        <footer className="border-t border-white/10 mt-16 glass-subtle">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-2 text-lg">AgriChain Network</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent agricultural supply chain powered by blockchain technology
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentRole(null)}
                  className="glass-nav hover:glass-strong transition-all duration-300 hover:scale-105"
                >
                  Back to Overview
                </button>
                <button 
                  onClick={() => alert('Blockchain Explorer - Feature coming soon!')}
                  className="glass-nav hover:glass-strong transition-all duration-300 hover:scale-105"
                >
                  Blockchain Explorer
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;

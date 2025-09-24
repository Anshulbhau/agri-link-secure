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
    <div className="min-h-screen bg-background">
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      <main>
        {renderContent()}
      </main>

      {currentRole && (
        <footer className="border-t mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-2">AgriChain Network</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent agricultural supply chain powered by blockchain technology
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentRole(null)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Back to Overview
                </button>
                <button 
                  onClick={() => alert('Blockchain Explorer - Feature coming soon!')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
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

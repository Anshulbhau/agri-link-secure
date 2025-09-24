import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  QrCode, 
  Users, 
  ShoppingCart, 
  Truck, 
  Sprout,
  Menu,
  X
} from "lucide-react";

interface HeaderProps {
  currentRole?: "farmer" | "distributor" | "retailer" | "consumer" | null;
  onRoleChange?: (role: "farmer" | "distributor" | "retailer" | "consumer" | null) => void;
}

const Header = ({ currentRole, onRoleChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roleIcons = {
    farmer: Sprout,
    distributor: Truck,
    retailer: ShoppingCart,
    consumer: QrCode,
  };

  const roles = [
    { key: "farmer", label: "Farmer", icon: Sprout },
    { key: "distributor", label: "Distributor", icon: Truck },
    { key: "retailer", label: "Retailer", icon: ShoppingCart },
    { key: "consumer", label: "Consumer", icon: QrCode },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full glass-nav backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold agri-text-gradient">AgriChain</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button
            variant={currentRole === null ? "default" : "ghost"}
            onClick={() => onRoleChange?.(null)}
            className="glass-button border-0 bg-transparent hover:glass-strong"
          >
            <Users className="h-4 w-4" />
            <span>Overview</span>
          </Button>
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Button
                key={role.key}
                variant={currentRole === role.key ? "default" : "ghost"}
                onClick={() => onRoleChange?.(role.key)}
                className="glass-button border-0 bg-transparent hover:glass-strong"
              >
                <Icon className="h-4 w-4" />
                <span>{role.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden glass-button border-0 bg-transparent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-strong backdrop-blur-xl">
          <nav className="flex flex-col space-y-2 p-4">
            <Button
              variant={currentRole === null ? "default" : "ghost"}
              onClick={() => {
                onRoleChange?.(null);
                setIsMenuOpen(false);
              }}
              className="justify-start glass-button border-0 bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" />
              Overview
            </Button>
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Button
                  key={role.key}
                  variant={currentRole === role.key ? "default" : "ghost"}
                  onClick={() => {
                    onRoleChange?.(role.key);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start glass-button border-0 bg-transparent"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {role.label}
                </Button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
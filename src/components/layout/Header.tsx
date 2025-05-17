
import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  username: string;
  hospital: string;
  onLogout: () => void;
}

const Header = ({ username, hospital, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-border shadow-sm py-3 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-medium text-healthcare-dark">
          <span className="text-healthcare-primary">HIS</span>x<span className="text-healthcare-secondary">1</span>
        </h1>
        <div className="hidden md:block text-sm text-muted-foreground">
          {hospital}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="bg-healthcare-light p-1 rounded-full">
            <User className="h-5 w-5 text-healthcare-primary" />
          </div>
          <span className="text-sm font-medium hidden md:block">{username}</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogout}
          className="text-sm"
        >
          ออกจากระบบ
        </Button>
      </div>
    </header>
  );
};

export default Header;

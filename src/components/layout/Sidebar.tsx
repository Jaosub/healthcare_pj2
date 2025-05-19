
import { cn } from '@/lib/utils';
import { Home, Search, FileText, Calendar, Settings, Menu, CloudDownload } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navigation = [
    {
      name: 'แดชบอร์ด',
      href: '/dashboard',
      icon: Home,
    },
    // {
    //   name: 'ค้นหาผู้ป่วย',
    //   href: '/search',
    //   icon: Search,
    // },
    {
      name: 'ข้อมูลผู้ป่วย',
      href: '/dashboardpatient',
      icon: FileText,
    },
     {
    name: 'ข้อมูลการรักษา',
    href: '/encounters',
    icon: Calendar, // หรือเปลี่ยนเป็น icon อื่น เช่น ClipboardList
  },
 {
  name: "ดึงข้อมูลจาก Firebase",
  href: "/encounters-firebase",
  icon: CloudDownload, // หรืออื่น ๆ
}
,

  ];
  
  return (
    <div className={cn(
      "flex flex-col bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h2 className="text-lg font-medium text-healthcare-primary">ระบบข้อมูล</h2>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-sidebar-accent"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.href 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p>ระบบ HISxHIS v1.0</p>
            <p>© 2025 Healthcare Systems</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

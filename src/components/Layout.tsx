
import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="group fixed left-0 top-0 h-full z-50">
        {/* Hover trigger area */}
        <div className="w-4 h-full absolute left-0 top-0 bg-transparent group-hover:bg-blue-50 transition-colors" />
        
        {/* Sidebar that slides in on hover */}
        <div className="transform -translate-x-60 group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
          <Sidebar />
        </div>
      </div>
      
      {/* Main content with padding only when sidebar is visible */}
      <main className="flex-1 group-hover:ml-64 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
};

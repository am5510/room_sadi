import React from 'react';
import { 
  MapPin as MapPinIcon, 
  Layout, 
  Layers, 
  Box, 
  Coffee,
  LifeBuoy,
  Moon
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-[calc(100vh-80px)] sticky top-20 bg-surface-container-low flex flex-col py-8">
      <div className="px-6 mb-8">
        <h3 className="font-inter text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
          Filters
        </h3>
        <p className="text-[10px] text-on-surface-variant/50">Refine your view</p>
      </div>

      <nav className="flex-1 space-y-1">
        <button className="w-full flex items-center px-6 py-3 text-primary font-bold bg-surface-container-lowest rounded-l-lg ml-2 pl-4 transition-all translate-x-1">
          <MapPinIcon className="w-5 h-5 mr-3" />
          <span className="text-sm">All Locations</span>
        </button>
        
        <button className="w-full flex items-center px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all">
          <Layout className="w-5 h-5 mr-3" />
          <span className="text-sm">Boardrooms</span>
        </button>

        <button className="w-full flex items-center px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all">
          <Layers className="w-5 h-5 mr-3" />
          <span className="text-sm">Creative Studios</span>
        </button>

        <button className="w-full flex items-center px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all">
          <Box className="w-5 h-5 mr-3" />
          <span className="text-sm">Focus Pods</span>
        </button>

        <button className="w-full flex items-center px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all">
          <Coffee className="w-5 h-5 mr-3" />
          <span className="text-sm">Lounge Areas</span>
        </button>
      </nav>

      <div className="mt-auto px-6 space-y-6">
        <button className="w-full bg-primary text-surface py-3 rounded-md font-bold text-xs tracking-wide shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
          Quick Book
        </button>
        
        <div className="pt-4 border-t border-outline-variant/10 space-y-2">
          <button className="flex items-center text-on-surface-variant/70 text-[10px] py-1 hover:text-primary transition-colors">
            <LifeBuoy className="w-4 h-4 mr-2" />
            Support
          </button>
          <button className="flex items-center text-on-surface-variant/70 text-[10px] py-1 hover:text-primary transition-colors">
            <Moon className="w-4 h-4 mr-2" />
            Dark Mode
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

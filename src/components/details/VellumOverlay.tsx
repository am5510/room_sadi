import React from 'react';
import { X, Users, Tv, Wind, Calendar, Edit } from 'lucide-react';

interface VellumOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  room?: any; // Mock for now
}

const VellumOverlay: React.FC<VellumOverlayProps> = ({ isOpen, onClose, room }) => {
  return (
    <>
      {/* Backdrop Blur */}
      <div 
        className={`fixed inset-0 bg-on-surface/5 backdrop-blur-md z-[55] transition-opacity duration-500
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-[480px] bg-surface-container-lowest shadow-[-32px_0_64px_rgba(26,27,32,0.06)] 
          z-[60] border-l border-outline-variant/10 transform transition-transform duration-500 ease-out p-10 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button 
          onClick={onClose}
          className="self-start p-2 mb-8 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
          <header>
            <span className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded mb-4 uppercase tracking-tighter">
              Occupied
            </span>
            <h2 className="text-4xl font-black text-primary tracking-tighter font-manrope">
              Boardroom B
            </h2>
            <p className="text-on-surface-variant/70 text-sm mt-1 font-inter">Floor 2 • West Wing</p>
          </header>

          <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-surface-container-high group shadow-lg">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
              alt="Boardroom"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container-low rounded-lg group hover:bg-surface-container-high transition-colors">
              <div className="flex items-center text-on-surface-variant/50 mb-1">
                <Users className="w-3 h-3 mr-2" />
                <p className="text-[9px] font-bold uppercase tracking-widest">Capacity</p>
              </div>
              <p className="text-xl font-black text-primary font-manrope">12 People</p>
            </div>
            
            <div className="p-4 bg-surface-container-low rounded-lg group hover:bg-surface-container-high transition-colors">
              <div className="flex items-center text-on-surface-variant/50 mb-1">
                <Tv className="w-3 h-3 mr-2" />
                <p className="text-[9px] font-bold uppercase tracking-widest">Amenities</p>
              </div>
              <p className="text-xl font-black text-primary font-manrope">Full AV / 4K</p>
            </div>
          </div>

          <section className="pt-8 border-t border-outline-variant/10">
            <h4 className="text-xs font-bold font-manrope text-on-surface uppercase tracking-widest mb-6">Current Booking</h4>
            <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl border border-outline-variant/5">
              <img 
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/5" 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Organizer" 
              />
              <div>
                <p className="font-extrabold text-on-surface text-sm">Elena Rossi</p>
                <p className="text-[10px] text-on-surface-variant font-medium">Global Strategy Review • 10:00 - 12:30</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-auto pt-8 flex flex-col space-y-3">
          <button className="w-full py-4 text-primary font-bold border border-primary/20 rounded-md hover:bg-primary/5 transition-all font-manrope text-xs uppercase tracking-widest">
            View Full Availability
          </button>
          <button className="w-full py-4 bg-primary text-surface font-black rounded-md shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 font-manrope text-xs uppercase tracking-widest">
            Edit Booking
          </button>
        </footer>
      </div>
    </>
  );
};

export default VellumOverlay;

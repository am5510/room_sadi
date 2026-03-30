"use client";

import React, { useState } from 'react';
import BookingReport from '@/components/admin/BookingReport';
import AddBookingForm from '@/components/admin/AddBookingForm';
import { Home, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-inter">
      {/* Signature Direct Header - Lime Green (#99FF66) */}
      <nav className="w-full h-16 bg-[#99FF66] flex items-center justify-center px-10 shadow-sm border-none relative z-10">
        <h2 className="text-xl font-black tracking-tighter text-on-surface font-manrope">
          ตารางจองห้อง สพต.
        </h2>
        
        {/* Navigation Overlays (Discreet) */}
        <div className="absolute right-10 flex items-center gap-6">
          <button 
            onClick={() => router.push("/admin/rooms")}
            title="Manage Rooms"
            className="p-2 text-on-surface hover:bg-white/40 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => router.push("/")}
            title="Home"
            className="p-2 text-on-surface hover:bg-white/40 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-on-surface hover:bg-white/40 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main UI Layout - Two Columns as requested */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-12 lg:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Room Usage Report (65%) */}
          <div className="lg:col-span-8 h-full">
             <BookingReport refreshTrigger={refreshTrigger} />
          </div>

          {/* Right Column: Add Room Form (35%) */}
          <div className="lg:col-span-4 h-full">
             <AddBookingForm onSuccess={() => setRefreshTrigger(prev => prev + 1)} />
          </div>

        </div>
      </main>
    </div>
  );
}

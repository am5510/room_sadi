"use client";

import React, { useState } from 'react';
import RoomForm from '@/components/admin/RoomForm';
import RoomList from '@/components/admin/RoomList';
import { Home, LogOut, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RoomManagement() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleEdit = (room: any) => {
    setEditingRoom(room);
  };

  const handleFormSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingRoom(null);
  };

  const handleCancel = () => {
    setEditingRoom(null);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-inter">
      {/* Header */}
      <nav className="w-full h-16 bg-[#99FF66] flex items-center justify-center px-10 shadow-sm border-none fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#FFFFFF' }}>
        <h2 className="text-xl font-black tracking-tighter text-on-surface font-manrope" style={{ color: '#000000' }}>
          จัดการห้อง
        </h2>
        
        {/* Navigation */}
        <div className="absolute right-10 flex items-center gap-6">
          <button 
            onClick={() => router.push("/admin")}
            title="Back to Admin"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ color: '#000000' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => router.push("/")}
            title="Home"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ color: '#000000' }}
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={handleLogout}
            title="Logout"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ color: '#000000' }}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-12 lg:p-20 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Room List */}
          <div className="lg:col-span-8 h-full">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-primary font-manrope tracking-tight mb-2">
                รายการห้องทั้งหมด
              </h3>
              <p className="text-sm text-on-surface-variant/60">
                จัดการข้อมูลห้องทั้งหมดในระบบ
              </p>
            </div>
            <RoomList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
          </div>

          {/* Right Column: Add/Edit Room Form */}
          <div className="lg:col-span-4 h-full">
            <RoomForm 
              onSuccess={handleFormSuccess} 
              initialData={editingRoom}
              onCancel={editingRoom ? handleCancel : undefined}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

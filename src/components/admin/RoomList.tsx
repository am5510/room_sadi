"use client";

import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RoomListProps {
  onEdit: (room: any) => void;
  refreshTrigger: number;
}

const RoomList: React.FC<RoomListProps> = ({ onEdit, refreshTrigger }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const fetchRooms = async () => {
    setIsPending(true);
    try {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load spaces.");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบห้องนี้?")) return;

    try {
      const response = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchRooms();
      } else {
        const data = await response.json();
        alert(data.error || "ลบห้องไม่สำเร็จ");
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการลบห้อง");
    }
  };

  if (isPending) return <div className="p-12 text-center text-on-surface-variant font-medium text-sm animate-pulse">กำลังโหลดข้อมูลห้อง...</div>;
  if (error) return <div className="p-12 text-center text-error font-bold flex flex-col items-center gap-2"><AlertCircle className="w-8 h-8" /> {error}</div>;

  return (
    <div className="space-y-4 font-inter">
      {rooms.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30">
          <p className="text-sm text-on-surface-variant/40 font-bold uppercase tracking-widest">ยังไม่มีห้องที่ลงทะเบียน</p>
        </div>
      ) : (
        rooms.map((room) => (
          <div 
            key={room.id}
            className="flex items-center justify-between p-6 bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-all duration-300 group border border-outline-variant/5"
          >
            <div className="flex items-center gap-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-manrope font-black text-xl border-2"
                style={{ backgroundColor: room.color || '#99FF66', borderColor: room.color || '#99FF66' }}
              >
                {room.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-black text-primary font-manrope tracking-tight">{room.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                    {room.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="mr-6 px-3 py-1 bg-secondary-container/50 text-on-secondary-container text-[8px] font-bold rounded uppercase tracking-tighter flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                ใช้งาน
              </div>
              
              <button 
                onClick={() => onEdit(room)}
                className="p-2 hover:bg-primary/10 rounded-full transition-all text-primary"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(room.id)}
                className="p-2 hover:bg-error/10 rounded-full transition-all text-error"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(room.id)}
                className="p-2 hover:bg-error/10 rounded-full transition-all text-error"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RoomList;

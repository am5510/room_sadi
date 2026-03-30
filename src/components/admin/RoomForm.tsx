"use client";

import React, { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';

interface RoomFormProps {
  onSuccess: () => void;
  initialData?: any;
  onCancel?: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSuccess, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    color: initialData?.color || "#99FF66",
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const predefinedColors = [
    { name: "เขียว", value: "#99FF66" },
    { name: "ฟ้า", value: "#66CCFF" },
    { name: "ชมพู", value: "#FF66CC" },
    { name: "ส้ม", value: "#FFAA66" },
    { name: "ม่วง", value: "#CC66FF" },
    { name: "เหลือง", value: "#FFFF66" },
    { name: "แดง", value: "#FF6666" },
    { name: "เทา", value: "#999999" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const url = initialData ? `/api/rooms/${initialData.id}` : "/api/rooms";
    const method = initialData ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        if (!initialData) {
          setFormData({
            name: "",
            color: "#99FF66",
          });
        }
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save room.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-surface-container-high rounded-2xl p-8 border border-outline-variant/10 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-primary font-manrope tracking-tight">
          {initialData ? "แก้ไขห้อง" : "เพิ่มห้องใหม่"}
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70 pl-1">
              ชื่อห้อง
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="เช่น ห้องประชุม, ห้องกาล่า"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70 pl-1">
              สีที่แสดงบนปฏิทิน
            </label>
            <div className="grid grid-cols-4 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`h-10 rounded-lg border-2 transition-all ${
                    formData.color === color.value 
                      ? 'border-primary shadow-lg scale-105' 
                      : 'border-outline-variant/20 hover:border-outline-variant/40'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-xs"
              placeholder="#99FF66"
            />
          </div>
        </div>

        {error && (
          <p className="text-error text-xs font-bold pl-1 animate-pulse">
            {error}
          </p>
        )}

        <div className="pt-4 flex items-center justify-end space-x-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-surface px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center shadow-lg shadow-primary/10 hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังประมวลผล...
              </>
            ) : (
              <>
                {initialData ? "อัปเดตห้อง" : "เพิ่มห้อง"}
                <Plus className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;

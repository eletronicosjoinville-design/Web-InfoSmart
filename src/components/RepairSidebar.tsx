import React, { useState } from 'react';
import { X, Wrench, Smartphone, Laptop, Cpu, Send } from 'lucide-react';

interface RepairSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RepairSidebar({ isOpen, onClose }: RepairSidebarProps) {
  const [deviceType, setDeviceType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá InfoSmart! Gostaria de um orçamento:\n\n*Aparelho:* ${deviceType}\n*Problema:* ${description}`;
    window.open(`https://wa.me/5547999021010?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-gray-950 h-full border-l border-gray-800 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900">
          <div className="flex items-center gap-3">
            <Wrench className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Assistência Técnica</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex-1 space-y-6 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-4">Tipo de Aparelho</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Smartphone', icon: Smartphone },
                { label: 'Notebook', icon: Laptop },
                { label: 'PC Gamer', icon: Cpu },
                { label: 'Outros', icon: Wrench },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setDeviceType(item.label)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    deviceType === item.label 
                    ? 'border-blue-600 bg-blue-600/10 text-white' 
                    : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">O que está acontecendo?</label>
            <textarea
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white h-32 focus:border-blue-600 outline-none"
              placeholder="Ex: Não liga, tela quebrada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!deviceType || !description}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar para InfoSmart
          </button>
        </form>
      </div>
    </div>
  );
}
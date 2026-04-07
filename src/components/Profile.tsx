import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User, MapPin, Save, Phone, Fingerprint } from 'lucide-react';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    cpf: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as any);
        }
      }
    };
    loadUserData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), formData);
        alert("Perfil InfoSmart atualizado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar informações.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/40 backdrop-blur-md border border-gray-800 p-8 rounded-[2rem] text-white animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-6">
        <div className="bg-blue-600 p-3 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Meu Perfil</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Gerenciar Dados Pessoais</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome Completo</label>
          <div className="relative">
             <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
             <input 
               type="text"
               value={formData.displayName}
               onChange={(e) => setFormData({...formData, displayName: e.target.value})}
               className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-4 pl-12 focus:border-blue-600 outline-none transition-all font-bold"
               placeholder="Como você quer ser chamado?"
             />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">CPF</label>
          <div className="relative">
             <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
             <input 
               type="text"
               value={formData.cpf}
               onChange={(e) => setFormData({...formData, cpf: e.target.value})}
               className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-4 pl-12 focus:border-blue-600 outline-none transition-all font-bold"
               placeholder="000.000.000-00"
             />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">WhatsApp / Telefone</label>
          <div className="relative">
             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
             <input 
               type="text"
               value={formData.phone}
               onChange={(e) => setFormData({...formData, phone: e.target.value})}
               className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-4 pl-12 focus:border-blue-600 outline-none transition-all font-bold"
               placeholder="(47) 99999-9999"
             />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Endereço de Entrega Completo</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-600" />
            <textarea 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-4 pl-12 h-32 focus:border-blue-600 outline-none transition-all font-bold resize-none"
              placeholder="Rua, Número, Bairro, Joinville - SC"
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase italic tracking-tighter shadow-lg shadow-blue-600/20 active:scale-95"
        >
          {loading ? 'Processando...' : <><Save className="w-5 h-5" /> Salvar Perfil</>}
        </button>
      </form>
    </div>
  );
}
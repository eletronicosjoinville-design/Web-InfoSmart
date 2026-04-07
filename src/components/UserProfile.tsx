import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User, Phone, MapPin, Calendar, Camera, Save, ArrowLeft } from 'lucide-react';

export default function UserProfile({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    age: '',
    address: '',
    photoUrl: ''
  });

  useEffect(() => {
    const loadData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data() as any);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), profile);
      alert("Perfil InfoSmart atualizado!");
    }
  };

  if (loading) return <div className="text-white text-center mt-20 font-black italic">CARREGANDO...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-[#0f1115] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-500 font-bold mb-8 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> VOLTAR AO CATÁLOGO
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gray-900 rounded-full border-2 border-blue-600 flex items-center justify-center overflow-hidden mb-4">
            {profile.photoUrl ? <img src={profile.photoUrl} alt="Perfil" className="w-full h-full object-cover" /> : <Camera className="w-10 h-10 text-gray-700" />}
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-blue-500">Meu Perfil</h2>
        </div>

        <div className="grid gap-4">
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-600 w-5 h-5" />
            <input type="text" placeholder="Nome Completo" className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-xl" 
              value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative"><Phone className="absolute left-4 top-4 text-gray-600 w-5 h-5" /><input type="text" placeholder="WhatsApp" className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-xl" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} /></div>
            <div className="relative"><Calendar className="absolute left-4 top-4 text-gray-600 w-5 h-5" /><input type="number" placeholder="Idade" className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-xl" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} /></div>
          </div>
          <div className="relative"><MapPin className="absolute left-4 top-4 text-gray-600 w-5 h-5" /><input type="text" placeholder="Endereço em Joinville" className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-xl" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} /></div>
          
          <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl mt-4 flex items-center justify-center gap-2 uppercase italic">
            <Save className="w-5 h-5" /> Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

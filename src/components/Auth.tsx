import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { X, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

export default function Auth({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Bem-vindo de volta à InfoSmart!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
      }
      onClose();
    } catch (error: any) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f1115] w-full max-w-md rounded-3xl border border-gray-800 p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic text-blue-500 uppercase tracking-tighter">
            {isLogin ? 'Login' : 'Cadastro'}
          </h2>
          <p className="text-gray-500 text-sm font-bold mt-2">INFOSMART TECH CATALOG</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input 
              type="email" placeholder="Seu e-mail"
              className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all"
              value={email} onChange={e => setEmail(e.target.value)} required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input 
              type="password" placeholder="Sua senha"
              className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all"
              value={password} onChange={e => setPassword(e.target.value)} required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all uppercase italic flex items-center justify-center gap-2">
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isLogin ? 'Entrar agora' : 'Criar minha conta'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-gray-500 hover:text-blue-500 text-sm font-bold transition-colors"
        >
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui conta? Faça login'}
        </button>
      </div>
    </div>
  );
}
  
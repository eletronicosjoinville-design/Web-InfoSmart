import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { X, Mail, Lock, UserPlus, LogIn, User, Chrome } from 'lucide-react';

export default function Auth({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  // FUNÇÃO: Salvar ou atualizar dados do usuário no Firestore
  const saveUserToDatabase = async (user: any, additionalData?: any) => {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    // Só cria um novo perfil se ele não existir
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: additionalData?.name || user.displayName || 'Cliente InfoSmart',
        email: user.email,
        photoUrl: user.photoURL || '',
        role: 'client', // Sempre cliente por padrão
        city: 'Joinville',
        phone: '',
        address: '',
        age: '',
        createdAt: new Date().toISOString(),
        garantias: [],
        pedidos: []
      });
    }
  };

  // LOGIN/CADASTRO COM E-MAIL E SENHA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Bem-vindo à InfoSmart!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToDatabase(userCredential.user, { name });
        alert("Conta criada com sucesso!");
      }
      onClose();
    } catch (error: any) {
      alert("Erro: " + error.message);
    }
  };

  // LOGIN COM GOOGLE (Vincular Gmail)
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToDatabase(result.user);
      alert("Login com Google realizado!");
      onClose();
    } catch (error) {
      alert("Erro ao entrar com Google.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f1115] w-full max-w-md rounded-3xl border border-gray-800 p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic text-blue-500 uppercase tracking-tighter">
            {isLogin ? 'Login' : 'Cadastro'}
          </h2>
          <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-2 uppercase">InfoSmart Tech Catalog</p>
        </div>

        <div className="space-y-4">
          {/* BOTAO GOOGLE */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black font-bold py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all uppercase text-sm italic"
          >
            <Chrome className="w-5 h-5" />
            Entrar com Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-[1px] bg-gray-800 flex-1"></div>
            <span className="text-gray-600 text-[10px] font-bold">OU</span>
            <div className="h-[1px] bg-gray-800 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input 
                  type="text" placeholder="Nome Completo"
                  className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all"
                  value={name} onChange={e => setName(e.target.value)} required={!isLogin}
                />
              </div>
            )}

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
            className="w-full mt-4 text-gray-500 hover:text-blue-500 text-xs font-bold transition-colors uppercase tracking-wider"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
}

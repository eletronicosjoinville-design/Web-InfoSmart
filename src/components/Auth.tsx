import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Importando db para acessar o Firestore
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Funções para gravar no banco
import { X, Mail, Lock, UserPlus, LogIn, User } from 'lucide-react';

export default function Auth({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Novo estado para o nome do cliente

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN EXISTENTE
        await signInWithEmailAndPassword(auth, email, password);
        alert("Bem-vindo de volta à InfoSmart!");
      } else {
        // NOVO CADASTRO + CRIAÇÃO DE PERFIL NO DATABASE
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ORGANIZAÇÃO DO DATABASE: Cria o documento na coleção 'users'
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          role: 'client', // Define como cliente padrão
          city: 'Joinville',
          createdAt: new Date().toISOString(),
          garantias: [], // Espaço para futuras garantias de hardware
          pedidos: []    // Histórico de compras/serviços
        });

        alert("Conta InfoSmart criada com sucesso!");
      }
      onClose();
    } catch (error: any) {
      // Tratamento de erros comuns do Firebase
      if (error.code === 'auth/email-already-in-use') {
        alert("Este e-mail já está cadastrado.");
      } else if (error.code === 'auth/weak-password') {
        alert("A senha deve ter pelo menos 6 dígitos.");
      } else {
        alert("Erro: " + error.message);
      }
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CAMPO DE NOME: Aparece apenas no Cadastro */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input 
                type="text" placeholder="Nome Completo"
                className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                value={name} onChange={e => setName(e.target.value)} required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input 
              type="email" placeholder="Seu e-mail"
              className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              value={email} onChange={e => setEmail(e.target.value)} required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input 
              type="password" placeholder="Sua senha"
              className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              value={password} onChange={e => setPassword(e.target.value)} required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all uppercase italic flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isLogin ? 'Entrar agora' : 'Criar minha conta'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-gray-500 hover:text-blue-500 text-xs font-bold transition-colors uppercase tracking-wider"
        >
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui conta? Faça login'}
        </button>
      </div>
    </div>
  );
}

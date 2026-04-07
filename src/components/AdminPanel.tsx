import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AdminPanel() {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Notebooks',
    condition: 'Novo',
    profile: 'Gamer',
    image: '',
    specs: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Salva direto no Firebase (Mercado Livre Style!)
      await addDoc(collection(db, "products"), {
        ...product,
        price: Number(product.price),
        specs: product.specs.split(',').map(s => s.trim()), // Transforma "16GB, SSD" em lista
        installments: 10
      });
      alert("Produto cadastrado com sucesso na InfoSmart!");
      setProduct({ name: '', brand: '', price: '', category: 'Notebooks', condition: 'Novo', profile: 'Gamer', image: '', specs: '' });
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-[#0f1115] rounded-3xl border border-gray-800 mt-10">
      <h2 className="text-2xl font-black italic text-blue-500 mb-6 uppercase">Painel de Cadastro - InfoSmart</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Nome do Produto (Ex: Acer Nitro V15)"
          className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white"
          value={product.name} onChange={e => setProduct({...product, name: e.target.value})}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" placeholder="Marca"
            className="bg-black border border-gray-800 p-3 rounded-xl text-white"
            value={product.brand} onChange={e => setProduct({...product, brand: e.target.value})}
          />
          <input 
            type="number" placeholder="Preço (Ex: 4890)"
            className="bg-black border border-gray-800 p-3 rounded-xl text-white"
            value={product.price} onChange={e => setProduct({...product, price: e.target.value})}
          />
        </div>

        <textarea 
          placeholder="Especificações (Separe por vírgula: 16GB RAM, RTX 2050, SSD 512GB)"
          className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white h-24"
          value={product.specs} onChange={e => setProduct({...product, specs: e.target.value})}
        />

        <input 
          type="text" placeholder="Link da Imagem (ou nome do arquivo na pasta public)"
          className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white"
          value={product.image} onChange={e => setProduct({...product, image: e.target.value})}
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all uppercase italic">
          Cadastrar Produto na Vitrine
        </button>
      </form>
    </div>
  );
}
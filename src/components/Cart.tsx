import { X, Trash2, Facebook, Instagram } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onRemoveItem, onCheckout }: CartProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay para fechar ao clicar fora */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-gray-950 border-l border-gray-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Seu Carrinho</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-gray-700" />
              </div>
              <p className="text-gray-500 font-bold">Seu carrinho está vazio.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 group hover:border-blue-600/50 transition-all">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-800" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{item.product.name}</h3>
                  <p className="text-blue-500 font-black mt-1">
                    R$ {item.product.price?.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">Qtd: {item.quantity}</p>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.product.id)} 
                  className="self-center p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé e Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-black/50 backdrop-blur-md">
            <div className="flex justify-between mb-6">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Estimado</span>
              <span className="text-2xl font-black text-white italic">
                R$ {total.toLocaleString('pt-BR')}
              </span>
            </div>
            
            <div className="space-y-4">
              {/* BOTÃO DO WHATSAPP ESTILIZADO */}
              <button 
                onClick={onCheckout} 
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-black uppercase italic tracking-tighter shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Finalizar via WhatsApp
              </button>

              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Siga a InfoSmart:</span>
                <a 
                  href="https://www.instagram.com/infosmartjoinville/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-blue-600 group transition-all"
                >
                  <Instagram className="w-4 h-4 text-gray-500 group-hover:text-white" />
                 
                </a>
                <span>
                <a href="https://www.facebook.com/profile.php?id=100083277665173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-blue-600 group transition-all"
                  >
                  <Facebook className="w-4 h-4 text-gray-500 group-hover:text-white" />

                   </a>
                   </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { Product } from '../data/products';
import { CreditCard, ShoppingCart } from 'lucide-react';

// 1. Interface atualizada com a nova prop de adicionar ao carrinho
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const installmentValue = product.price / product.installments;

  return (
    /* 2. Tema mais escuro (bg-[#0d0d0d]) e bordas mais arredondadas */
    <div className="bg-[#0d0d0d] border border-gray-900 rounded-[2rem] overflow-hidden hover:border-blue-600/50 transition-all duration-500 group flex flex-col h-full shadow-lg">
      
      {/* Imagem com fundo mais escuro e overlay suave */}
      <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
              product.condition === 'Novo'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            {product.condition}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Marca e Nome */}
        <div className="mb-3">
          <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">{product.brand}</span>
          <h3 className="text-white font-bold text-lg leading-tight mt-1 group-hover:text-blue-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Especificações com estilo escuro premium */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.specs.map((spec, index) => (
            <span
              key={index}
              className="text-[10px] bg-gray-900 text-gray-400 px-2 py-1 rounded-md border border-gray-800 font-medium"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-gray-900 pt-4">
          {/* Preço Principal */}
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl font-black text-white tracking-tighter">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Parcelamento */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {product.installments}x de R${' '}
              {installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} SEM JUROS
            </span>
          </div>

          {/* 3. Botão funcional de Adicionar ao Carrinho */}
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
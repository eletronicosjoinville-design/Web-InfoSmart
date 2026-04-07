import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, CreditCard, Truck } from 'lucide-react';

// 1. Interface de Propriedades
interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  cartItemCount: number;
  onOpenCart: () => void;
}

export default function Header({ onSearch, searchQuery, cartItemCount, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Define o ponto onde a animação de minimizar acontece
      if (currentScrollY > 50) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <header className={`bg-gray-950 text-white sticky top-0 z-50 border-b border-gray-800 transition-all duration-500 ease-in-out ${isScrolled ? 'shadow-[0_20px_50px_rgba(0,0,0,0.7)]' : ''}`}>
      
      {/* Top Bar - Promoções (Minimiza ao rolar) */}
      <div className={`bg-blue-600 text-white overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 py-2 opacity-100'}`}>
        <div className="container mx-auto flex justify-center gap-6 text-[10px] md:text-xs font-black tracking-widest uppercase italic">
          <span className="flex items-center gap-2">
            <CreditCard className="w-3 h-3" /> 10X SEM JUROS
          </span>
          <span className="opacity-30">|</span>
          <span className="flex items-center gap-2">
            <Truck className="w-3 h-3" /> JOINVILLE: FRETE GRÁTIS
          </span>
        </div>
      </div>

      {/* Main Header - A altura e padding diminuem no scroll */}
      <div className={`container mx-auto px-4 transition-all duration-500 ease-in-out ${isScrolled ? 'py-2 md:py-3' : 'py-6 md:py-10'}`}>
        <div className="flex items-center justify-between gap-4 md:gap-10">
          
          {/* Logo - Animação de escala ao minimizar */}
          <a href="/" className="flex-shrink-0 group">
            <img 
              src="/logo.png" 
              alt="InfoSmart" 
              className={`w-auto transition-all duration-700 ease-in-out group-hover:brightness-110 ${
                isScrolled ? 'h-10 md:h-12' : 'h-24 md:h-40 lg:h-48'
              }`}
            />
          </a>

          {/* Navigation - Links que se ajustam visualmente */}
          <nav className="hidden xl:flex items-center gap-8 font-black uppercase tracking-tighter italic text-sm">
            <a href="#" className="hover:text-blue-500 transition-colors relative group">
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#catálogo" className="hover:text-blue-500 transition-colors relative group">
              Catálogo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#serviços" className="hover:text-blue-500 transition-colors relative group">
              Serviços
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Search Bar - Fica mais compacta no scroll */}
          <div className="flex-1 max-w-sm relative hidden lg:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
              placeholder="O que você procura?" 
              className={`w-full bg-gray-900 border-2 border-gray-800 rounded-xl px-5 pl-12 focus:border-blue-600 outline-none transition-all duration-500 text-white placeholder:text-gray-600 ${
                isScrolled ? 'py-2 text-sm' : 'py-3.5'
              }`}
            />
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 transition-all ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Info Badge (Some ao minimizar para limpar o visual) */}
            <div className={`hidden sm:flex flex-col items-end border-r border-gray-800 pr-4 transition-all duration-500 ${isScrolled ? 'opacity-0 scale-90 w-0 overflow-hidden border-none' : 'opacity-100 flex'}`}>
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Joinville / SC</span>
              <span className="text-xl font-black text-blue-500 italic leading-none">INFOSMART</span>
            </div>
            
            {/* Carrinho - Ícone reduz levemente */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-200 hover:text-blue-500 transition-all duration-300 transform active:scale-90"
            >
              <ShoppingCart className={`transition-all duration-500 ${isScrolled ? 'h-6 w-6' : 'h-9 w-9'}`} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-black text-white px-1 border-2 border-gray-950 animate-in zoom-in duration-300">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button className="lg:hidden p-2 hover:text-blue-500 transition-colors">
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
import { useState, useMemo } from 'react';
import { Search, User, ShoppingCart, ChevronDown, CreditCard, Truck, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import Services from './components/Services';
import Footer from './components/Footer';
import Cart from './components/Cart';
import RepairSidebar from './components/RepairSidebar';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth'; // O import agora encontrará o arquivo na pasta correta
import { products } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isRepairOpen, setIsRepairOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Estado para controlar o Modal de Login
  
  const [filters, setFilters] = useState<any>({ 
    category: [], 
    brand: [], 
    condition: [], 
    profile: [], 
    priceRange: [0, 10000] 
  });

  const handleCheckout = () => {
    const phoneNumber = "5547999021010";
    if (cartItems.length === 0) return;
    const itensMsg = cartItems.map(item => 
      `• ${item.product.name} - R$ ${item.product.price.toLocaleString('pt-BR')}`
    ).join('\n');
    const total = cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
    const mensagemBase = `Olá InfoSmart! Gostaria de um orçamento para os seguintes itens:\n\n${itensMsg}\n\n*Total: R$ ${total.toLocaleString('pt-BR')}*`;
    const linkZap = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagemBase)}`;
    window.open(linkZap, '_blank');
  };

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return (products || []).filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !filters.category || filters.category.length === 0 || filters.category.includes(p.category);
      const matchesBrand = !filters.brand || filters.brand.length === 0 || filters.brand.includes(p.brand);
      const matchesCondition = !filters.condition || filters.condition.length === 0 || filters.condition.includes(p.condition);
      const matchesProfile = !filters.profile || filters.profile.length === 0 || filters.profile.includes(p.profile);
      const productPrice = p.price || 0; 
      const matchesPrice = productPrice >= filters.priceRange[0] && productPrice <= filters.priceRange[1];
      return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesProfile && matchesPrice;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-black text-white pt-36 relative selection:bg-blue-600">
      
      {/* Botão de Teste ADMIN (Flutuante) */}
      <button 
        onClick={() => setIsAdminView(!isAdminView)}
        className="fixed bottom-6 right-6 z-[100] bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-lg flex items-center gap-2 font-bold transition-all shadow-blue-500/20"
      >
        <Settings className="w-5 h-5" />
        <span>{isAdminView ? "VER LOJA" : "PAINEL ADMIN"}</span>
      </button>

      {/* HEADER FLUTUANTE */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[95%] max-w-[1200px] bg-[#0f1115]/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-[0_15px_50px_-12px_rgba(0,0,0,1)] overflow-hidden">
        <div className="flex justify-center items-center gap-8 bg-gray-900/60 py-2.5 text-[11px] font-bold text-gray-400 border-b border-gray-800 tracking-wider">
          <div className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-blue-500" />
            <span>Parcelamento em até 10x sem juros</span>
          </div>
          <div className="w-px h-3 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-blue-500" />
            <span>Frete grátis para Joinville</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 gap-6">
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wide">
            <a href="#" onClick={() => setIsAdminView(false)} className="text-white hover:text-blue-500 transition-colors uppercase">Início</a>
            <button className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors uppercase">Catálogo <ChevronDown className="w-4 h-4" /></button>
            <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase">Serviços</a>
            <div className="relative">
              <span className="text-white uppercase cursor-pointer">Contato</span>
              <div className="absolute -bottom-[26px] left-0 w-full h-[3px] bg-blue-500 rounded-t-full shadow-[0_-2px_15px_rgba(59,130,246,0.8)]"></div>
            </div>
          </nav>

          <div className="flex-1 max-w-xl relative group">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/70 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="O que você procura?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181a20] border border-gray-700/60 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:block text-right">
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Joinville / SC</p>
              <p className="text-sm font-black text-blue-500 uppercase italic">InfoSmart</p>
            </div>
            <div className="flex items-center gap-6">
              {/* Ícone de Pessoa agora abre o Modal de Auth */}
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
              
              <button onClick={() => setIsCartOpen(true)} className="relative text-gray-400 hover:text-white group">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0f1115]">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isAdminView ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AdminPanel />
            </motion.div>
          ) : (
            <motion.div
              key="shop"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col lg:flex-row gap-8 items-start"
            >
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <Filters filters={filters} onFilterChange={setFilters} onClose={() => {}} />
              </aside>
              
              <div className="flex-1 min-w-0">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                      >
                        <ProductCard product={p} onAddToCart={handleAddToCart} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800">
                    <p className="text-gray-500 font-bold">Nenhum produto encontrado.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Services onOpenRepair={() => setIsRepairOpen(true)} />
      <Footer />
      
      {/* MODAL DE LOGIN / CADASTRO */}
      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.product.id !== id))}
        onCheckout={handleCheckout}
      />
      <RepairSidebar isOpen={isRepairOpen} onClose={() => setIsRepairOpen(false)} />
    </div>
  );
}

export default App;
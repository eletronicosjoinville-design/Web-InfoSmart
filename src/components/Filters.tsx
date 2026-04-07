import { X, Check } from 'lucide-react';
// Certifique-se que estes nomes existem exatamente assim no seu arquivo de dados
import { categories, conditions, profiles, brands } from '../data/products';

export interface FilterState {
  category: string[];
  condition: string[];
  profile: string[];
  brand: string[];
  priceRange: [number, number];
}

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function Filters({ filters, onFilterChange, isMobile, onClose }: FiltersProps) {
  // Garantia de que sempre teremos um objeto de filtros válido
  const safeFilters: FilterState = {
    category: filters?.category || [],
    condition: filters?.condition || [],
    profile: filters?.profile || [],
    brand: filters?.brand || [],
    priceRange: filters?.priceRange || [0, 10000],
  };

  const toggleFilter = (type: keyof Omit<FilterState, 'priceRange'>, value: string) => {
    const currentValues = safeFilters[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ ...safeFilters, [type]: newValues });
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [safeFilters.priceRange[0], safeFilters.priceRange[1]];
    newRange[index] = value;
    onFilterChange({ ...safeFilters, priceRange: newRange });
  };

  const clearFilters = () => {
    onFilterChange({
      category: [],
      condition: [],
      profile: [],
      brand: [],
      priceRange: [0, 10000],
    });
  };

  // Seção de dados com fallback para array vazio caso o import falhe
  const sections = [
    { label: 'Categoria', key: 'category' as const, data: categories || [] },
    { label: 'Estado', key: 'condition' as const, data: conditions || [] },
    { label: 'Perfil de Uso', key: 'profile' as const, data: profiles || [] },
    { label: 'Marca', key: 'brand' as const, data: brands || [] },
  ];

  const content = (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-xs font-bold text-blue-500 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-full border border-blue-500/30 transition-all duration-300"
        >
          Limpar Tudo
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.label} className="animate-in fade-in slide-in-from-left-4 duration-500">
          <h4 className="text-xs font-black text-gray-500 mb-4 uppercase tracking-[0.2em]">{section.label}</h4>
          <div className="grid grid-cols-1 gap-2">
            {section.data.map((item) => {
              const isActive = safeFilters[section.key]?.includes(item);
              return (
                <label 
                  key={item} 
                  className={`flex items-center justify-between gap-2 cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 group ${
                    isActive 
                    ? 'bg-blue-600/10 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                    : 'bg-gray-800/40 border-transparent hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${isActive ? 'bg-blue-600 scale-110' : 'bg-gray-700'}`}>
                      {isActive && <Check className="w-3 h-3 text-white stroke-[4px]" />}
                    </div>
                    <span className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {item}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => toggleFilter(section.key, item)}
                    className="hidden"
                  />
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Faixa de Preço */}
      <div className="pt-4">
        <h4 className="text-xs font-black text-gray-500 mb-6 uppercase tracking-[0.2em]">Faixa de Preço</h4>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 uppercase">Min</span>
              <input
                type="number"
                value={safeFilters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="w-full bg-gray-950 text-white border-2 border-gray-800 rounded-xl pl-10 pr-3 py-3 text-sm font-bold focus:border-blue-600 outline-none transition-all"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 uppercase">Max</span>
              <input
                type="number"
                value={safeFilters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="w-full bg-gray-950 text-white border-2 border-gray-800 rounded-xl pl-10 pr-3 py-3 text-sm font-bold focus:border-blue-600 outline-none transition-all"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={safeFilters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end">
        <div className="bg-gray-950 w-full rounded-t-[2.5rem] border-t-2 border-blue-600/30 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-950/80 backdrop-blur-md z-10 p-6 flex items-center justify-between border-b border-gray-900">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Refinar Busca</h2>
            <button onClick={onClose} className="bg-gray-900 p-2 rounded-full text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 rounded-[2rem] p-8 sticky top-24 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto">
      {content}
    </div>
  );
}
import { Wrench, Smartphone, Monitor, HardDrive } from 'lucide-react';

interface ServicesProps {
  onOpenRepair: () => void;
}

export default function Services({ onOpenRepair }: ServicesProps) {
  const services = [
    { icon: Monitor, title: 'Notebooks', description: 'Reparos e Upgrades.' },
    { icon: Smartphone, title: 'Smartphones', description: 'Telas e Baterias.' },
    { icon: HardDrive, title: 'Hardware', description: 'PC Gamer e Escritório.' },
    { icon: Wrench, title: 'Assistência', description: 'Limpeza e Software.' },
  ];

  return (
    <section id="serviços" className="bg-gray-900/50 py-20 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Serviços Especializados</h2>
        <p className="text-gray-400 mb-12">Assistência técnica de confiança em Joinville.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-gray-950 p-6 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={onOpenRepair}
          className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-xl transition-all uppercase tracking-widest text-sm"
        >
          Solicitar Orçamento via WhatsApp
        </button>
      </div>
    </section>
  );
}
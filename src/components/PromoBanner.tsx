import { CreditCard, Gift } from 'lucide-react';

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-white">
            <CreditCard className="w-5 h-5" />
            <span className="text-sm font-medium">Parcelamento em até 10x sem juros</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Gift className="w-5 h-5" />
            <span className="text-sm font-medium">Frete grátis para Joinville</span>
          </div>
        </div>
      </div>
    </div>
  );
}

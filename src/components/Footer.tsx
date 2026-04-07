import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IS</span>
              </div>
              <span className="text-white font-bold text-xl">InfoSmart</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Sua loja especializada em tecnologia e reparos em Joinville/SC.
              Qualidade e confiança há mais de 5 anos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100083277665173"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/infosmartjoinville/"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="tel:+5547999999999"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm">(47) 99902-1010</span>
              </a>
              <a
                href="mailto:contato@infosmart.com.br"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">contato@infosmart.com.br</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span className="text-sm">
                  Av. Getulio Vargas, 1446
      
                  <br />
                  Bucarein - Joinville/SC
                  <br />
                  CEP: 89202-002
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Horário de Funcionamento</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Segunda a Sabado: 10h às 22h</p>
            
              <p>Domingo: 14h às 20h
        
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">Formas de Pagamento</h3>
              <p className="text-sm text-gray-400">
                Aceitamos todas as formas de pagamento: PIX, Cartão de Crédito/Débito,
                Dinheiro e Transferência.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} InfoSmart. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

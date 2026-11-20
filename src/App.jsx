import { useState, useEffect } from 'react';
import { siteConfig } from './config';
import monogramaImg from '../public/monograma.png';
import { Menu, X, Clock, MapPin, CameraOff, Heart, Check, Copy, ChevronDown, Flower2, CreditCard } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'História', id: 'historia' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'Detalhes', id: 'detalhes' },
    { label: 'Local', id: 'local' },
    { label: 'Presença', id: 'presenca' },
    { label: 'Presentes', id: 'presentes' },
  ];

  return (
    <header className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        <a href="#" className="flex items-center justify-center">
          <img 
            src={monogramaImg} 
            alt="Monograma" 
            className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10' : 'h-14'}`}
          />
        </a>
        
        <nav className="hidden md:flex gap-6 lg:gap-8">
          {links.map(link => (
            <a key={link.id} href={`#${link.id}`} className={`text-sm uppercase tracking-[0.15em] hover:text-[#C29B98] transition-colors ${isScrolled ? 'text-[#4A4A4A]' : 'text-white'}`}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X color={isScrolled ? '#4A4A4A' : '#FFF'} /> : <Menu color={isScrolled ? '#4A4A4A' : '#FFF'} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 gap-6 md:hidden">
          {links.map(link => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} className="text-[#4A4A4A] uppercase tracking-widest text-sm">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const target = new Date(siteConfig.dataCasamento).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = target - now;
      const remaining = Math.max(0, distance);
      setTimeLeft({
        dias: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        horas: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((remaining % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${siteConfig.imagens.capa})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#C29B98]/40" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto my-auto">
        <p className="uppercase tracking-[0.3em] text-xs md:text-sm mb-4 font-light opacity-90">{siteConfig.casal.fraseCapa}</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide mb-1 drop-shadow-sm">
          {siteConfig.casal.noiva}
        </h1>
        <div className="font-['Great_Vibes'] text-4xl md:text-6xl text-[#C29B98] my-[-5px]">&</div>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide mt-1 drop-shadow-sm">
          {siteConfig.casal.noivo}
        </h1>
        
        <p className="font-serif italic text-lg md:text-2xl mt-6 tracking-wider">
          {siteConfig.dataFormatada}
        </p>

        <div className="flex gap-4 md:gap-8 justify-center mt-8 md:mt-10 backdrop-blur-sm bg-white/10 py-4 px-6 md:px-8 rounded-sm border border-white/20 max-w-lg mx-auto">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-4xl">{String(value).padStart(2, '0')}</span>
              <span className="text-[9px] md:text-xs uppercase tracking-widest mt-1 opacity-80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-center text-white opacity-90 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest mb-1">Role para descobrir</span>
        <ChevronDown size={18} strokeWidth={1} />
      </div>
    </section>
  );
};

const Story = () => (
  <section id="historia" className="py-24 px-6 max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl text-[#4A4A4A] mb-4 font-serif">Nossa História</h2>
      <p className="font-['Great_Vibes'] text-3xl text-[#C29B98]">Como tudo começou</p>
    </div>

    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="order-2 md:order-1 relative">
        <div className="absolute inset-0 bg-[#C29B98]/10 transform translate-x-4 translate-y-4 rounded-t-full"></div>
        <img 
          src={siteConfig.imagens.historia} 
          alt="Casal" 
          className="relative z-10 w-full h-[600px] object-cover rounded-t-full shadow-lg"
        />
      </div>
      <div className="order-1 md:order-2 flex flex-col gap-6 text-center md:text-left">
        <p className="text-lg leading-relaxed text-gray-600 font-light">{siteConfig.historia.texto1}</p>
        <p className="text-lg leading-relaxed text-gray-600 font-light">{siteConfig.historia.texto2}</p>
        
        <div className="mt-8 border-l border-[#C29B98]/30 pl-6 flex flex-col gap-6 text-left">
          <div>
            <span className="text-xs font-bold text-[#C29B98] tracking-widest uppercase">2023</span>
            <h4 className="font-serif text-xl">Quando nos conhecemos</h4>
          </div>
          <div>
            <span className="text-xs font-bold text-[#C29B98] tracking-widest uppercase">2023</span>
            <h4 className="font-serif text-xl">O primeiro "Eu te amo"</h4>
          </div>
          <div>
            <span className="text-xs font-bold text-[#C29B98] tracking-widest uppercase">2025</span>
            <h4 className="font-serif text-xl">O pedido inesquecível</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Gallery = () => {
  return (
    <section id="galeria" className="py-24 px-6 bg-[#FDF9F9]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#4A4A4A] mb-4 font-serif">Galeria</h2>
          <p className="text-gray-500 font-light tracking-wide uppercase text-sm">Momentos Inesquecíveis</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {siteConfig.imagens.galeria.map((imagem, idx) => (
            <div key={idx} className="relative overflow-hidden group aspect-[4/5]">
              <img 
                src={imagem} 
                alt={`Galeria ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Verse = () => (
  <section className="bg-white py-24 px-6 text-center border-y border-gray-100">
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      <Heart className="text-[#C29B98] mb-8" size={32} strokeWidth={1} />
      <h3 className="font-serif text-3xl md:text-4xl italic leading-relaxed text-[#693938] mb-6">
        "{siteConfig.versiculo.texto}"
      </h3>
      <p className="uppercase tracking-[0.2em] text-sm text-gray-500">{siteConfig.versiculo.referencia}</p>
    </div>
  </section>
);

const Details = () => (
  <section id="detalhes" className="py-24 px-6 max-w-6xl mx-auto">  
    <div className="text-center mt-12">
      <h3 className="font-serif text-3xl mb-10">Para que tudo saia perfeito</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <Clock className="text-[#C29B98]" strokeWidth={1} size={32} />
          <h5 className="font-serif text-lg">Pontualidade</h5>
          <p className="text-xs text-gray-500">A cerimônia iniciará pontualmente às {siteConfig.local.horario}. Chegue 30 min antes.</p>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <CameraOff className="text-[#C29B98]" strokeWidth={1} size={32} />
          <h5 className="font-serif text-lg">Dress Code</h5>
          <p className="text-xs text-gray-500">Sintam-se lindas! Pedimos, por favor, com muito carinho, que os tons de branco, off-white e nude muito claro sejam reservados exclusivamente à noiva.</p>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <MapPin className="text-[#C29B98]" strokeWidth={1} size={32} />
          <h5 className="font-serif text-lg">Localização</h5>
          <p className="text-xs text-gray-500">Verifique o trajeto com antecedência para evitar imprevistos.</p>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <Heart className="text-[#C29B98]" strokeWidth={1} size={32} />
          <h5 className="font-serif text-lg">Aproveitem</h5>
          <p className="text-xs text-gray-500">Preparamos tudo com muito amor. Divirtam-se ao máximo conosco! Este convite foi preparado com carinho especialmente para você e é pessoal e intransferível. Esperamos celebrar esse momento ao seu lado!</p>
        </div>
      </div>
    </div>
  </section>
);

const Location = () => (
  <section id="local" className="bg-[#FDF9F9] py-24 px-6 border-y border-gray-100">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl text-[#4A4A4A] mb-12 font-serif">Localização</h2>
      
      <div className="mb-10">
        <h3 className="font-serif text-3xl text-[#693938] mb-2">{siteConfig.local.cerimonia}</h3>
        <p className="text-gray-500 font-light text-sm uppercase tracking-wider mb-6">{siteConfig.local.endereco}</p>
        
        <a 
          href={siteConfig.local.googleMapsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block border border-[#C29B98] text-[#C29B98] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#C29B98] hover:text-white transition-all duration-300"
        >
          Como chegar
        </a>
      </div>

      <div className="w-full h-[400px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500 shadow-sm border border-gray-200">
        <iframe 
          title="Mapa"
          src={siteConfig.local.mapaEmbed} 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  </section>
);

const RSVP = () => {
  const [nome, setNome] = useState('');

  const handleRSVP = (e) => {
    e.preventDefault();
    const texto = `Olá! Sou ${nome} e gostaria de confirmar minha presença no casamento de ${siteConfig.casal.noiva} & ${siteConfig.casal.noivo}.`;
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <section id="presenca" className="bg-white py-24 px-6 border-b border-gray-100">
      <div className="max-w-xl mx-auto text-center bg-[#FDF9F9] p-10 md:p-14 shadow-sm border border-gray-50">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">Confirme sua Presença</h2>
        <p className="text-sm text-gray-500 font-light mb-8">Por favor, confirme sua presença até o dia 01 de Dezembro.</p>
        
        <form onSubmit={handleRSVP} className="flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Seu Nome Completo" 
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border-b border-gray-300 py-3 bg-transparent text-sm focus:outline-none focus:border-[#C29B98] text-center font-light placeholder-gray-400"
          />
          
          <button type="submit" className="mt-6 bg-[#4A4A4A] text-white py-4 text-sm uppercase tracking-widest hover:bg-[#693938] transition-colors">
            Confirmar Presença
          </button>
        </form>
      </div>
    </section>
  );
};

const GiftsModal = ({ isOpen, onClose, presente }) => {
  const [copiado, setCopiado] = useState(false);

  if (!isOpen || !presente) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.pix.chave);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 3000);
    } catch {
      const campo = document.createElement('textarea');
      campo.value = siteConfig.pix.chave;
      campo.style.position = 'fixed';
      campo.style.opacity = '0';
      document.body.appendChild(campo);
      campo.select();
      const copiou = document.execCommand('copy');
      campo.remove();
      if (copiou) {
        setCopiado(true);
        window.setTimeout(() => setCopiado(false), 3000);
      }
    }
  };

  const valorFormatado = presente.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const mensagemWhatsapp = `Olá! Acabei de presentear vocês com "${presente.nome}" no valor de ${valorFormatado}. Muito feliz em fazer parte desse momento!`;
  const linkWhatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full relative p-8 text-center shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#4A4A4A]">
          <X size={24} strokeWidth={1.5} />
        </button>
        
        <h3 className="font-serif text-2xl text-[#C29B98] mb-2">Você escolheu presentear</h3>
        <p className="font-medium text-lg mb-1">{presente.nome}</p>
        <p className="text-2xl font-serif mb-6">{valorFormatado}</p>
        
        {presente.linkCartao && (
          <div className="mb-6">
            <a 
              href={presente.linkCartao}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#4A4A4A] text-white py-4 text-sm uppercase tracking-widest hover:bg-black transition-colors"
            >
              <CreditCard size={18} />
              Pagar com Cartão
            </a>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Via ambiente seguro</p>
          </div>
        )}

        <div className="border-t border-b border-gray-100 py-6 mb-6">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Ou Pagamento via PIX</p>
          
          <img src={siteConfig.imagens.qrcode} alt="QR Code PIX" className="w-36 h-36 mx-auto mb-4 border p-2 object-contain" />
          
          <p className="text-xs text-gray-500 mb-1">Chave PIX: {siteConfig.pix.chave}</p>
          <p className="text-xs text-gray-500 mb-4">Nome: {siteConfig.pix.nomeRecebedor}</p>
          
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 w-full border border-[#4A4A4A] py-3 text-sm hover:bg-[#4A4A4A] hover:text-white transition-colors"
          >
            {copiado ? <Check size={18} /> : <Copy size={18} />}
            {copiado ? "Chave copiada!" : "Copiar Chave PIX"}
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4">Após o pagamento, se desejar, envie o comprovante.</p>
        <a 
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#C29B98] text-white py-3 text-sm uppercase tracking-widest hover:bg-[#A97571] transition-colors"
        >
          Avisar os Noivos
        </a>
      </div>
    </div>
  );
};

const Gifts = () => {
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);

  return (
    <section id="presentes" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-[#4A4A4A] mb-4 font-serif">Lista de Presentes</h2>
        <p className="text-gray-500 font-light max-w-2xl mx-auto">
          Sua presença é o nosso maior presente. Mas se desejar nos abençoar com algo a mais para o início da nossa vida a dois, criamos esta lista com muito carinho.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {siteConfig.presentes.map((presente) => (
          <div key={presente.id} className="group bg-white flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative overflow-hidden h-32 md:h-48 bg-gray-50">
              <img 
                src={presente.imagem} 
                alt={presente.nome} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 md:p-6 flex flex-col flex-grow text-center">
              <h4 className="font-serif text-lg md:text-xl mb-2 leading-tight">{presente.nome}</h4>
              <p className="hidden md:block text-xs text-gray-500 font-light flex-grow mb-4">{presente.descricao}</p>
              <p className="font-serif text-base md:text-lg text-[#693938] mb-4 mt-auto">
                {presente.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <button 
                onClick={() => setPresenteSelecionado(presente)}
                className="w-full border border-[#C29B98] text-[#C29B98] py-2 text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#C29B98] hover:text-white transition-colors"
              >
                Presentear
              </button>
            </div>
          </div>
        ))}
      </div>

      <GiftsModal 
        isOpen={!!presenteSelecionado} 
        onClose={() => setPresenteSelecionado(null)} 
        presente={presenteSelecionado} 
      />
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white py-16 text-center border-t border-gray-100">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="font-['Great_Vibes'] text-4xl md:text-5xl text-[#C29B98] mb-3">Com amor,</h2>
      <p className="font-serif text-2xl tracking-wide text-[#4A4A4A] mb-5">
        {siteConfig.casal.noiva} & {siteConfig.casal.noivo}
      </p>
      <div className="flex justify-center mb-5 text-gray-300">
        <Flower2 size={22} strokeWidth={1} />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-12">
        Mal podemos esperar para viver esse dia ao lado de vocês.
      </p>
      
      {/* RODAPÉ COM DESTAQUE PROFISSIONAL E VISÍVEL */}
      <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
        <p className="tracking-wide">© 2026 Mylene & Victor. Todos os direitos reservados.</p>
        <p className="tracking-wide font-medium">
          Desenvolvido por <span className="text-[#4A4A4A] font-bold">Matheus Sousa</span> — Desenvolvedor & Designer
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="font-sans text-[#4A4A4A]">
      <Header />
      <main>
        <Hero />
        <Story />
        <Gallery />
        <Verse />
        <Details />
        <Location />
        <RSVP />
        <Gifts />
      </main>
      <Footer />
    </div>
  );
}
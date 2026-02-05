import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  ArrowRight, 
  UtensilsCrossed, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle,
  Star,
  ArrowUpRight,
  Navigation,
  ChevronRight
} from 'lucide-react';

// --- DATA MENU ---
const MENU_CATEGORIES = ["Semua", "Penyetan", "Olahan Bebek", "Minuman"];

const MENU_DATA = [
  {
    id: 1,
    name: "Ayam Goreng Spesial Pinky",
    desc: "Ayam kampung muda dengan bumbu rahasia rempah, disajikan dengan sambal terasi matang.",
    price: "28k",
    category: "Penyetan",
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Bebek Bakar Madu",
    desc: "Bebek empuk dengan olesan madu hutan dan rempah pilihan, dibakar perlahan.",
    price: "35k",
    category: "Olahan Bebek",
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Lele Terbang Renyah",
    desc: "Lele segar yang digoreng garing dengan tepung khusus, renyah hingga ke tulang.",
    price: "18k",
    category: "Penyetan",
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Es Kelapa Muda Pinky",
    desc: "Kesegaran kelapa muda asli dengan sirup mawar rahasia dan sedikit perasan jeruk.",
    price: "15k",
    category: "Minuman",
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Penyet Telur Komplit",
    desc: "Telur dadar tebal dengan tahu, tempe goreng, dan sambal bawang ekstra pedas.",
    price: "12k",
    category: "Penyetan",
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Teh Tarik Sunset",
    desc: "Teh tarik autentik dengan foam lembut dan gradasi warna jingga yang cantik.",
    price: "10k",
    category: "Minuman",
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4586c552?q=80&w=800&auto=format&fit=crop"
  }
];

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle, light = false }) => (
  <div className="mb-10 md:mb-16">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-3 block ${light ? 'text-pink-300' : 'text-pink-500'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-serif leading-tight ${light ? 'text-white' : 'text-orange-950'}`}
    >
      {title}
    </motion.h2>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // REVISI: Logika scroll yang lebih robust untuk mobile & desktop
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false); // Tutup menu mobile dulu

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
      // Tambahkan sedikit delay agar state 'isOpen' selesai diproses (menu menutup)
      // baru kemudian browser menghitung posisi scroll yang akurat.
      setTimeout(() => {
        const offset = 80; // Sesuaikan dengan tinggi navbar
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 50);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Kunjungi', href: '#visit' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`rounded-full transition-all duration-500 flex justify-between items-center px-4 md:px-6 py-2.5 md:py-3 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/20' : 'bg-transparent'}`}>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold shadow-md text-sm">P</div>
            <span className={`text-lg md:text-xl font-serif font-bold tracking-tight ${scrolled ? 'text-orange-950' : 'text-orange-900'}`}>Pinky<span className="text-pink-500">.</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 lg:gap-10 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-bold text-orange-900/70 hover:text-pink-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#visit" 
              onClick={(e) => handleLinkClick(e, '#visit')}
              className="bg-orange-900 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-pink-500 transition-all shadow-md active:scale-95 uppercase tracking-wider"
            >
              Reservasi
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-orange-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-orange-100 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 p-8 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)} 
                  className="text-2xl font-serif text-orange-900"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#visit" 
                onClick={(e) => handleLinkClick(e, '#visit')} 
                className="w-full text-center bg-orange-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest"
              >
                Reservasi Meja
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [filter, setFilter] = useState("Semua");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  const filteredMenu = filter === "Semua" ? MENU_DATA : MENU_DATA.filter(item => item.category === filter);

  return (
    <div className="bg-[#FDF8F6] font-sans text-orange-950 selection:bg-pink-200 selection:text-pink-900">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 pb-12 overflow-hidden scroll-mt-24">
        <div className="absolute top-10 right-[-20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-200/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-10 left-[-10%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-orange-200/20 rounded-full blur-[70px] md:blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 z-10 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6">
              <span className="hidden md:block w-8 h-[1px] bg-pink-500" />
              <span className="text-pink-500 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">Premium Street Food</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-orange-950 leading-[1.1] mb-6 md:mb-8">
              Sajian <span className="text-pink-500 italic">Autentik</span> Rasa Modern.
            </h1>
            <p className="text-base md:text-xl text-orange-900/60 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Kami membawa cita rasa Lamongan ke level selanjutnya dengan bahan berkualitas tinggi dan suasana yang estetik.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
              <a href="#menu" className="group px-8 py-4 bg-orange-950 text-white rounded-full font-bold hover:bg-pink-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-900/10 active:scale-95">
                Eksplor Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <a href="#visit" className="px-8 py-4 border border-orange-200 rounded-full font-bold text-orange-900 hover:bg-white transition-all active:scale-95 text-center">
                Kunjungi Kami
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 relative mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative z-10 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-md mx-auto rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform lg:rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Signature Dish" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/30 to-transparent" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 md:-bottom-6 -left-2 md:-left-6 z-20 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl flex items-center gap-3 md:gap-4 border border-orange-50 scale-90 md:scale-100"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 shrink-0">
                <Star fill="currentColor" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">Terbaik di Kota</p>
                <p className="text-base md:text-lg font-serif text-orange-950">Sejak 1995</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div style={{ opacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="w-6 h-10 border-2 border-orange-200 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-pink-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* --- BENTO ABOUT --- */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Filosofi Rasa Kami" subtitle="Kenapa Pinky?" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 min-h-auto md:h-[600px]">
            {/* Main Big Bento */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-orange-100 shadow-sm relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 mb-6 md:mb-8">
                  <UtensilsCrossed size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-orange-950 mb-4">Resep Warisan Keluarga</h3>
                <p className="text-orange-900/60 leading-relaxed text-base md:text-lg">
                  Setiap resep telah disempurnakan selama hampir tiga dekade. Kami menjaga keaslian bumbu Lamongan namun dengan presentasi modern.
                </p>
              </div>
              <div className="hidden lg:block absolute right-[-20px] bottom-[-20px] opacity-5 group-hover:scale-110 transition-transform duration-700">
                <UtensilsCrossed size={300} />
              </div>
            </motion.div>

            {/* Top Right Bento */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-orange-950 text-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex items-center justify-between overflow-hidden relative"
            >
              <div className="relative z-10 max-w-[70%] md:max-w-[60%]">
                <div className="flex items-center gap-2 mb-3 md:mb-4 text-pink-400">
                  <Sparkles size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Ingredients</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif mb-2">Bahan Lokal Segar</h3>
                <p className="text-orange-100/60 text-sm leading-relaxed">Langsung dari petani lokal Lamongan setiap pagi.</p>
              </div>
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-orange-900/50 flex items-center justify-center shrink-0">
                <Sparkles size={32} className="text-pink-400" />
              </div>
            </motion.div>

            {/* Bottom Two Small Bento */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-pink-100 rounded-[2rem] md:rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group"
            >
              <ShieldCheck size={32} className="text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-orange-950 mb-1">Higienis</h4>
              <p className="text-[10px] text-orange-900/50 tracking-wider uppercase font-black">Standar Tinggi</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 border border-orange-100 flex flex-col justify-center items-center text-center group"
            >
              <div className="flex gap-1 text-orange-400 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <h4 className="font-bold text-orange-950 mb-1">4.9/5 Rating</h4>
              <p className="text-[10px] text-orange-900/50 tracking-wider uppercase font-black">Pelanggan Puas</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-20 md:py-32 bg-white rounded-t-[3rem] md:rounded-t-[4rem] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-16 gap-6">
            <div className="max-w-xl text-center lg:text-left">
               <SectionHeader title="Kurasi Menu Terbaik" subtitle="The Collection" />
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="lg:hidden flex items-center justify-center lg:justify-start gap-2 text-pink-400 text-[10px] font-black uppercase tracking-widest mb-4 animate-pulse"
               >
                 Geser ke samping <ChevronRight size={12} />
               </motion.div>
            </div>
            
            <div className="flex bg-orange-50 p-1.5 rounded-full border border-orange-100/50 w-full md:w-fit overflow-x-auto no-scrollbar scroll-px-4">
              {MENU_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-1 md:flex-none whitespace-nowrap px-5 md:px-7 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${filter === cat ? 'bg-white text-pink-500 shadow-sm' : 'text-orange-900/50 hover:text-orange-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout 
            className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 lg:gap-10 pb-8 lg:pb-0 no-scrollbar snap-x snap-mandatory px-2 lg:px-0 min-h-[400px] md:min-h-[600px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => (
                <motion.div 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  key={item.id} 
                  className="group min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center"
                >
                  <div className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-5 md:mb-6 bg-orange-50 shadow-sm border border-orange-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    {item.bestSeller && <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-pink-500 text-white text-[8px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Best Seller</div>}
                    <div className="absolute inset-0 bg-orange-950/0 group-hover:bg-orange-950/20 transition-colors duration-500" />
                    
                    {/* Floating Price on Mobile, Hover Button on Desktop */}
                    <div className="absolute bottom-4 right-4 lg:hidden bg-white/90 backdrop-blur px-3 py-1 rounded-full text-orange-950 font-bold text-xs shadow-lg">
                      {item.price}
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
                      <button className="bg-white text-orange-950 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 whitespace-nowrap active:scale-95 text-sm">
                        Pesan <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2 px-2">
                    <h4 className="text-lg md:text-xl font-serif text-orange-950 group-hover:text-pink-500 transition-colors">{item.name}</h4>
                    <span className="hidden lg:block text-lg font-bold text-orange-900">{item.price}</span>
                  </div>
                  <p className="text-orange-900/50 text-xs md:text-sm leading-relaxed px-2">{item.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- KUNJUNGI KAMI (VISIT US) --- */}
      <section id="visit" className="py-20 md:py-32 px-4 md:px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Mampir & Rasakan Sendiri" subtitle="Kunjungi Kami" />
          
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
              <motion.div whileHover={{ x: 5 }} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-orange-100 shadow-sm">
                <div className="flex gap-4 md:gap-5 items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-900 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-orange-950 mb-1 md:mb-2">Lokasi Utama</h4>
                    <p className="text-orange-900/60 text-sm md:text-base leading-relaxed">Jl. Raya Sunset No. 88, Pusat Kota Lamongan,<br/>Jawa Timur, Indonesia 62214</p>
                    <button className="mt-3 flex items-center gap-2 text-pink-500 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:gap-3 transition-all">Petunjuk Arah <Navigation size={12} /></button>
                  </div>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-orange-100 shadow-sm flex-1">
                <div className="flex gap-4 md:gap-5 items-center mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 shrink-0">
                    <Clock size={20} />
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-orange-950 uppercase tracking-widest">Jam Operasional</h4>
                </div>
                <div className="space-y-3">
                  {[ 
                    { day: "Senin - Jumat", time: "10:00 — 21:00" }, 
                    { day: "Sabtu", time: "10:00 — 23:00", highlight: true }, 
                    { day: "Minggu", time: "09:00 — 21:00" } 
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-2.5 border-b border-orange-50 last:border-0 ${row.highlight ? 'text-pink-600 font-bold' : 'text-orange-900/70'}`}>
                      <span className="text-[10px] md:text-xs uppercase tracking-wider">{row.day}</span>
                      <span className="font-serif italic text-sm md:text-base">{row.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="bg-orange-950 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-white shadow-xl shadow-orange-900/10">
                <div className="flex gap-4 md:gap-5 items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center text-pink-400 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold mb-1 tracking-tight">Reservasi Cepat</h4>
                    <p className="text-2xl md:text-3xl font-serif italic text-pink-400">+62 812 3456 7890</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visual Column / Map */}
            <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-auto order-1 lg:order-2">
              <div className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale opacity-30 lg:opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                  alt="Storefront" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="relative">
                    <div className="absolute -inset-8 bg-pink-500/20 rounded-full blur-2xl" />
                    <div className="relative bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"><MapPin size={18} /></div>
                      <div className="text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-pink-500 mb-0.5">Pinky Location</p>
                        <p className="font-serif text-sm md:text-lg text-orange-950">Pinky Lamongan</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:left-10 flex justify-between items-end">
                   <div className="text-white">
                     <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1 italic">Dapatkan Arahan</p>
                     <p className="font-serif italic text-base md:text-xl">Buka Google Maps</p>
                   </div>
                   <button className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-orange-900 shadow-xl active:scale-90 transition-transform"><ArrowUpRight size={24} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-16 md:py-24 border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
            <div className="md:col-span-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 bg-orange-950 rounded-xl flex items-center justify-center text-white font-bold">P</div>
                <span className="text-xl md:text-2xl font-serif font-bold text-orange-950">Pinky Lamongan</span>
              </div>
              <p className="text-orange-900/50 leading-relaxed mb-8 md:mb-10 text-base md:text-lg max-w-md mx-auto md:mx-0 italic">
                "Membawa kehangatan dapur keluarga ke setiap meja pelanggan dengan sentuhan estetika modern."
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                {[Instagram, Phone, MapPin].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-full border border-orange-100 flex items-center justify-center text-orange-900 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all shadow-sm">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:col-span-6 gap-8">
              <div>
                <h5 className="font-bold text-orange-950 mb-6 uppercase tracking-widest text-[10px]">Navigasi</h5>
                <ul className="space-y-4 text-sm text-orange-900/60 font-medium uppercase tracking-tighter">
                  <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-pink-500 transition-colors">Beranda</a></li>
                  <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-pink-500 transition-colors">Cerita</a></li>
                  <li><a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-pink-500 transition-colors">Menu</a></li>
                  <li><a href="#visit" onClick={(e) => handleLinkClick(e, '#visit')} className="hover:text-pink-500 transition-colors">Lokasi</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-orange-950 mb-6 uppercase tracking-widest text-[10px]">Layanan</h5>
                <ul className="space-y-4 text-sm text-orange-900/60 font-medium underline underline-offset-4 decoration-pink-200">
                  <li>Gofood</li>
                  <li>Grabfood</li>
                  <li>Shopeefood</li>
                  <li>Catering</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-orange-50 text-center text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-orange-900/30">
            © 2024 Pinky Lamongan — Crafted for Digital Excellence
          </div>
        </div>
      </footer>

      {/* --- FLOATING ACTIONS --- */}
      <div className="fixed bottom-6 md:bottom-8 right-4 md:right-8 z-[60] flex flex-col items-end gap-3 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl border border-white/50 text-[10px] font-black text-orange-950 mb-1 pointer-events-auto uppercase tracking-widest"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Open Now
          </span>
        </motion.div>
        <motion.a 
          href="#" 
          whileHover={{ scale: 1.05, rotate: 5 }} 
          whileTap={{ scale: 0.95 }} 
          className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-green-500 to-green-400 text-white rounded-2xl md:rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:shadow-green-500/30 transition-all"
        >
          <MessageCircle size={28} />
        </motion.a>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Plus, 
  Minus, 
  Percent, 
  MessageSquare, 
  Sparkles, 
  Star, 
  BookOpen, 
  Info, 
  Bell, 
  Compass, 
  Check, 
  ChevronDown, 
  Copy, 
  MapPin, 
  Phone, 
  Settings, 
  LogOut, 
  QrCode, 
  CreditCard, 
  Award,
  Zap,
  Volume2,
  Bookmark,
  Trash2,
  Database,
  Upload,
  Download,
  Edit,
  Mail,
  Lock,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ActiveView, 
  Product, 
  CartItem, 
  Recipe, 
  EducationalArticle, 
  UserProfile, 
  Order 
} from './types';
import { 
  STORE_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_RECIPES, 
  EDUCATIONAL_ARTICLES 
} from './data';
import RecipesSection from './components/RecipesSection';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { auth, googleProvider } from './lib/firebase';

// High-fidelity generated assets
const HERO_IMAGE_PATH = '/src/assets/images/tasgraos_hero_1779476648103.png';
const TEA_IMAGE_PATH = '/src/assets/images/tasgraos_tea_1779476665226.png';
const LOGO_IMAGE_PATH = '/src/assets/images/tasgraos_logo_transparent_processed.png';

// Custom high-fidelity brand WhatsApp logo icon
const MessageCircleWhatsApp = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function App() {
  // Dynamic Content Database (enables building the app completely customizable in UI)
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('tasgraos_categories');
    return saved ? JSON.parse(saved) : [
      'Grãos',
      'Temperos',
      'Chás',
      'Farinhas',
      'Castanhas',
      'Sementes'
    ];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tasgraos_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('tasgraos_recipes');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [articles, setArticles] = useState<EducationalArticle[]>(() => {
    const saved = localStorage.getItem('tasgraos_articles');
    return saved ? JSON.parse(saved) : EDUCATIONAL_ARTICLES;
  });

  // Admin and Creator Tools States
  const [showAdminTab, setShowAdminTab] = useState<'products' | 'categories' | 'recipes' | 'articles' | 'json_io'>('products');
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [jsonText, setJsonText] = useState<string>('');

  // Admin Form States
  const [newCatName, setNewCatName] = useState<string>('');
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    description: '',
    benefits: [''],
    category: '',
    pricePer100g: 0,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500',
    origin: '',
    nutritionalInfo: { calories: '120 kcal', carbs: '15g', protein: '4g', fat: '1g', fiber: '2g' },
    isVegan: true,
    isFitness: false,
    isGlutenFree: true
  });

  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    title: '',
    prepTime: '20 min',
    difficulty: 'Fácil',
    calories: '150 kcal',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    ingredients: [{ name: '', amount: '', isAvailableInStore: false }],
    instructions: ['']
  });

  const [newArticle, setNewArticle] = useState<Partial<EducationalArticle>>({
    title: '',
    subtitle: '',
    category: 'Nutrição',
    summary: '',
    content: [''],
    tips: [''],
    tags: ['Fit'],
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500'
  });

  // Navigation & Core States
  const [currentView, setCurrentView] = useState<ActiveView>(ActiveView.SPLASH);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWeightGrams, setSelectedWeightGrams] = useState<number>(250);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Orders
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tasgraos_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tasgraos_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupons & Form States
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [orderPaymentMethod, setOrderPaymentMethod] = useState<'PIX' | 'Cartão de Crédito' | 'WhatsApp Direct'>('PIX');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'done'>('cart');
  const [shippingAddress, setShippingAddress] = useState<string>('Av. Paulista, 1200 - Bela Vista, São Paulo - SP, 01310-100');
  const [creditCardNumber, setCreditCardNumber] = useState<string>('•••• •••• •••• 4596');
  const [creditCardName, setCreditCardName] = useState<string>('LARISSA SOUZA');
  
  // Custom User Profile State (fully cleaned of specific static index dependencies)
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tasgraos_user');
    if (saved) return JSON.parse(saved);
    
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      rewardPoints: 0,
      orderHistory: []
    };
  });

  // UI Interactive States
  const [currentPromoIndex, setCurrentPromoIndex] = useState<number>(0);
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isCopiedPix, setIsCopiedPix] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Sates para cadastro (User sign up / registration)
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [registerName, setRegisterName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [registerPhone, setRegisterPhone] = useState<string>('');
  const [registerAddress, setRegisterAddress] = useState<string>('');
  
  // Google sign in simulation loading
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'perfil' | 'history' | 'settings' | 'logout'>('perfil');

  // Local settings editing state
  const [settingsName, setSettingsName] = useState<string>('');
  const [settingsPhone, setSettingsPhone] = useState<string>('');
  const [settingsAddress, setSettingsAddress] = useState<string>('');

  // Sync settings inputs when user data updates
  useEffect(() => {
    if (user) {
      setSettingsName(user.name || '');
      setSettingsPhone(user.phone || '');
      setSettingsAddress(user.address || '');
    }
  }, [user]);

  // Notifications Database
  const [notifications, setNotifications] = useState([
    { id: 1, title: '🍂 Oferta de Boas-Vindas', message: 'Use o cupom BEMESTAR10 para receber 10% OFF no seu primeiro pedido do zero! 🌱', date: 'Hoje', read: false }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('tasgraos_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tasgraos_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tasgraos_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tasgraos_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('tasgraos_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tasgraos_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('tasgraos_articles', JSON.stringify(articles));
  }, [articles]);

  // Rotative Promo Banners
  const promoBanners = [
    { title: 'Alimentação Ativa & Consciente', desc: 'Sinta os benefícios dos grãos cultivados com pureza e amor.', tag: '100% Orgânico', image: HERO_IMAGE_PATH },
    { title: 'Qualidade no Seu Tempo', desc: 'Compre a granel de forma prática nas embalagens ideais para o seu lar.', tag: 'A Granel Premium', image: TEA_IMAGE_PATH },
    { title: 'Chás Medicinais Colhidos à Mão', desc: 'Experiência sensorial requintada para resgatar sua clareza de foco.', tag: 'Blend de Outono', image: TEA_IMAGE_PATH }
  ];

  useEffect(() => {
    if (currentView === ActiveView.HOME) {
      const timer = setInterval(() => {
        setCurrentPromoIndex(prev => (prev + 1) % promoBanners.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [currentView]);

  // Simulate Splash Screen
  useEffect(() => {
    if (currentView === ActiveView.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentView(ActiveView.LOGIN);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Handlers for cart & weight calculations
  const handleAddProductToCart = (product: Product, weightGrams: number) => {
    // Round calculated price to 2 decimals
    const price = Number(((product.pricePer100g / 100) * weightGrams).toFixed(2));
    const cartLineId = `${product.id}-${weightGrams}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartLineId);
      if (existing) {
        return prev.map(item => 
          item.id === cartLineId 
            ? { ...item, weightGrams: item.weightGrams + weightGrams, totalPrice: Number((item.totalPrice + price).toFixed(2)) }
            : item
        );
      }
      return [...prev, { id: cartLineId, product, weightGrams, totalPrice: price }];
    });
  };

  const handleAddProductToCartByProductId = (productId: string, weightGrams: number) => {
    const match = products.find(p => p.id === productId);
    if (match) {
      handleAddProductToCart(match, weightGrams);
    }
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartItemWeight = (itemId: string, direction: 'up' | 'down') => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const step = 100;
        const newWeight = direction === 'up' 
          ? item.weightGrams + step 
          : Math.max(100, item.weightGrams - step);
        const newPrice = Number(((item.product.pricePer100g / 100) * newWeight).toFixed(2));
        return { ...item, weightGrams: newWeight, totalPrice: newPrice };
      }
      return item;
    }));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Coupons logic
  const handleApplyCoupon = () => {
    const formatted = couponCode.trim().toUpperCase();
    if (formatted === 'TAS15') {
      setCouponDiscount(15);
      alert('Cupom de desconto TAS15 aplicado! Você recebeu 15% OFF! 🍂🏷️');
    } else if (formatted === 'BEMESTAR10') {
      setCouponDiscount(10);
      alert('Cupom de desconto BEMESTAR10 aplicado! Você recebeu 10% OFF! 🌱🏷️');
    } else {
      alert('Parâmetros inválidos. Tente utilizar "TAS15" ou "BEMESTAR10"');
    }
  };

  // Checkout Math
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = Number(((cartSubtotal * couponDiscount) / 100).toFixed(2));
  const shippingFee = cartSubtotal > 100 ? 0 : 12.90;
  const cartTotal = Number((cartSubtotal - discountAmount + shippingFee).toFixed(2));

  // WhatsApp Link generator
  const getWhatsAppMessageLink = () => {
    const itemsList = cart.map(item => `• ${item.product.name} (${item.weightGrams}g) - R$ ${item.totalPrice.toFixed(2)}`).join('%0A');
    const payment = orderPaymentMethod === 'PIX' ? 'PIX' : (orderPaymentMethod === 'Cartão de Crédito' ? 'Cartão de Crédito' : 'WhatsApp Direct');
    
    const message = `Olá Tas Grãos! Gostaria de finalizar meu pedido premium:%0A%0A*Massa de Compras:*%0A${itemsList}%0A%0A*Subtotal:* R$ ${cartSubtotal.toFixed(2)}%0A*Desconto:* R$ ${discountAmount.toFixed(2)}%0A*Frete:* R$ ${shippingFee === 0 ? 'Grátis' : 'R$ ' + shippingFee.toFixed(2)}%0A*Total Geral:* R$ ${cartTotal.toFixed(2)}%0A%0A*Forma de Pagamento:* ${payment}%0A*Entregar em:* ${shippingAddress}%0A%0A_Agradeço pela atenção e bem-estar!_`;
    
    return `https://wa.me/5511940451838?text=${message}`;
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder: Order = {
      id: `PED-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      items: [...cart],
      totalAmount: cartTotal,
      paymentMethod: orderPaymentMethod,
      status: 'preparando',
      trackerCode: `TG${Math.floor(10000000 + Math.random() * 90000000)}BR`,
      address: shippingAddress
    };

    // Update profiles and earn loyalty points
    const earnedPoints = Math.floor(cartTotal * 1.5);
    
    setUser(prev => ({
      ...prev,
      rewardPoints: prev.rewardPoints + earnedPoints,
      orderHistory: [newOrder, ...prev.orderHistory]
    }));

    setCheckoutStep('done');
    setCart([]);
  };

  // Products filtering & searching
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-between font-sans antialiased text-tas-dark select-none">
      
      {/* Container principal responsivo premium maximizado, fluido e profissional */}
      <div className="w-full max-w-3xl mx-auto bg-tas-cream min-h-screen flex flex-col relative border-x border-tas-sand/30 shadow-xs">
        
        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          
          {/* Active Screen Decider */}
          <AnimatePresence mode="wait">
            
            {/* SPLASH SCREEN */}
            {currentView === ActiveView.SPLASH && (
              <motion.div 
                key="splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-tas-dark text-white flex flex-col justify-between p-8 z-50 text-center"
              >
                <div></div>
                <div className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, type: "spring" }}
                    className="w-24 h-24 bg-tas-bege rounded-full flex items-center justify-center p-4 mb-6 shadow-xl"
                  >
                    {/* Organic grains / branch icon representation */}
                    <div className="text-tas-olive font-serif text-3xl font-extrabold tracking-tighter">TG</div>
                  </motion.div>
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-3xl font-serif tracking-wide text-tas-gold font-bold mb-2"
                  >
                    Tas Grãos
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 1 }}
                    className="text-xs text-tas-bege/80 uppercase tracking-widest font-mono font-medium"
                  >
                    Bem-estar e Nutrição Premium
                  </motion.p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[2px] w-12 bg-tas-gold/40 relative overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute h-full w-1/2 bg-tas-gold"
                    />
                  </div>
                  <span className="text-[10px] text-tas-bege/50 tracking-wide">Moagem artesanal a granel localizada em SP</span>
                </div>
              </motion.div>
            )}

            {/* LOGIN & SIGNUP SCREEN */}
            {currentView === ActiveView.LOGIN && (
              <motion.div 
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#FAF6F0] flex flex-col justify-between p-6 z-40 overflow-y-auto app-scrollbar select-none"
              >
                {/* Top bar */}
                <div className="relative flex justify-center items-center pt-2 z-10 w-full max-w-sm mx-auto">
                  <span className="text-xs font-serif font-bold text-tas-dark/40 uppercase tracking-widest">Portal de Acesso</span>
                </div>

                {/* Main Content Area */}
                <div className="relative my-auto py-6 space-y-6 z-10 max-w-sm mx-auto w-full">
                  {/* Brand Header */}
                  <div className="text-center space-y-2 flex flex-col items-center">
                    <img 
                      src={LOGO_IMAGE_PATH} 
                      alt="Tas Grãos Logo" 
                      className="h-16 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <p className="text-xs text-tas-terroir opacity-80 font-medium">Sua Dose Diária de Saúde e Vitalidade</p>
                  </div>

                  {/* Form Container */}
                  <div className="bg-white p-6 rounded-2xl border border-tas-bege/80 shadow-3xs space-y-4">
                    <h2 className="font-serif font-black text-tas-dark text-lg text-center">
                      {isRegisterMode ? 'Cadastro' : 'Entrar'}
                    </h2>

                    {!isRegisterMode ? (
                      /* CLEAN LOGIN VIEW */
                      <div className="space-y-3.5">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-tas-terroir tracking-wider block mb-1 text-left">E-mail</label>
                          <input 
                            type="email" 
                            placeholder="seuemail@exemplo.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-tas-bege/10 border border-tas-bege/50 focus:border-tas-gold rounded-xl text-xs sm:text-sm focus:outline-none text-tas-dark transition-all outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-tas-terroir tracking-wider block mb-1 text-left">Senha</label>
                          <input 
                            type="password" 
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-tas-bege/10 border border-tas-bege/50 focus:border-tas-gold rounded-xl text-xs sm:text-sm focus:outline-none text-tas-dark transition-all outline-none"
                          />
                        </div>

                        <button 
                          onClick={async () => {
                            if (!loginEmail.trim() || !loginPassword.trim()) {
                              alert('Por favor, digite o e-mail e a senha.');
                              return;
                            }
                            if (!loginEmail.includes('@') || !loginEmail.includes('.')) {
                              alert('Por favor, informe um endereço de e-mail válido.');
                              return;
                            }
                            setIsGoogleLoading(true);
                            try {
                              const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
                              const firebaseUser = result.user;
                              setUser({
                                name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cliente Tas',
                                email: firebaseUser.email || '',
                                phone: firebaseUser.phoneNumber || '',
                                address: '',
                                rewardPoints: 0,
                                orderHistory: []
                              });
                              alert('Acesso realizado com sucesso! 🌱');
                              setCurrentView(ActiveView.HOME);
                            } catch (error: any) {
                              console.error('Firebase Auth Login Error, applying client-side local fallback:', error);
                              // Automatic and friendly guest fallback for test environments where user doesn't exist yet or provider is disabled
                              setUser({
                                name: loginEmail.split('@')[0] || 'Cliente Tas',
                                email: loginEmail,
                                phone: '',
                                address: '',
                                rewardPoints: 0,
                                orderHistory: []
                              });
                              alert('Nota: Acessando via modo demonstrativo local para os seus testes! Bem-vindo(a) ao Tas Grãos! 🌱');
                              setCurrentView(ActiveView.HOME);
                            } finally {
                              setIsGoogleLoading(false);
                            }
                          }}
                          className="w-full py-2.5 bg-tas-gold hover:bg-tas-gold-dark text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer mt-2"
                        >
                          Acessar Conta
                        </button>
                      </div>
                    ) : (
                      /* CLEAN REGISTER VIEW */
                      <div className="space-y-3.5 animate-slideup">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-tas-terroir tracking-wider block mb-1 text-left">Nome Completo</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Larissa Souza"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-tas-bege/10 border border-tas-bege/50 focus:border-tas-gold rounded-xl text-xs sm:text-sm focus:outline-none text-tas-dark transition-all outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-tas-terroir tracking-wider block mb-1 text-left">E-mail</label>
                          <input 
                            type="email" 
                            placeholder="seuemail@exemplo.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-tas-bege/10 border border-tas-bege/50 focus:border-tas-gold rounded-xl text-xs sm:text-sm focus:outline-none text-tas-dark transition-all outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-tas-terroir tracking-wider block mb-1 text-left">Senha</label>
                          <input 
                            type="password" 
                            placeholder="Mínimo 6 caracteres"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-tas-bege/10 border border-tas-bege/50 focus:border-tas-gold rounded-xl text-xs sm:text-sm focus:outline-none text-tas-dark transition-all outline-none"
                          />
                        </div>

                        <button 
                          onClick={async () => {
                            if (!registerName.trim()) {
                              alert('Por favor, preencha o campo Nome Completo.');
                              return;
                            }
                            if (registerName.trim().length < 3) {
                              alert('Por favor, informe seu nome completo (mínimo 3 caracteres).');
                              return;
                            }
                            if (!registerEmail.trim() || !registerEmail.includes('@') || !registerEmail.includes('.')) {
                              alert('Por favor, informe um endereço de e-mail válido.');
                              return;
                            }
                            if (!registerPassword.trim() || registerPassword.length < 6) {
                              alert('Por questão de segurança do Firebase, a senha deve conter pelo menos 6 caracteres.');
                              return;
                            }
                            setIsGoogleLoading(true);
                            try {
                              const result = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
                              const firebaseUser = result.user;
                              
                              await updateProfile(firebaseUser, {
                                displayName: registerName
                              });

                              setUser({
                                name: registerName,
                                email: firebaseUser.email || registerEmail,
                                phone: registerPhone || '',
                                address: registerAddress || '',
                                rewardPoints: 0, 
                                orderHistory: []
                              });
                              alert(`Cadastrado(a) com sucesso, ${registerName}! 🌱`);
                              setCurrentView(ActiveView.HOME);
                            } catch (error: any) {
                              console.error('Firebase Auth Register Error, applying client-side local fallback:', error);
                              // Gracefully handle missing/unconfigured Email & Password provider in Firebase Console
                              setUser({
                                name: registerName,
                                email: registerEmail,
                                phone: registerPhone || '',
                                address: registerAddress || '',
                                rewardPoints: 0, 
                                orderHistory: []
                              });
                              alert(`Bem-vindo(a), ${registerName}! Sua conta foi ativada em Modo Local para teste imediato de todas as funções do app! 🌱`);
                              setCurrentView(ActiveView.HOME);
                            } finally {
                              setIsGoogleLoading(false);
                            }
                          }}
                          className="w-full py-2.5 bg-tas-olive hover:bg-tas-olive-dark text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer mt-2"
                        >
                          Criar Conta
                        </button>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="relative flex items-center justify-center py-1">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-tas-bege/60"></div>
                      </div>
                      <span className="relative bg-white px-3 text-[10px] font-bold text-tas-terroir uppercase">ou</span>
                    </div>

                    {/* Google Login Button */}
                    <button 
                      onClick={async () => {
                        setIsGoogleLoading(true);
                        try {
                          const result = await signInWithPopup(auth, googleProvider);
                          const firebaseUser = result.user;
                          
                          setUser({
                            name: firebaseUser.displayName || 'Cliente Tas',
                            email: firebaseUser.email || '',
                            phone: firebaseUser.phoneNumber || '',
                            address: '',
                            rewardPoints: 150,
                            orderHistory: []
                          });

                          alert('Autenticado com sucesso via Google! 🌱');
                          setCurrentView(ActiveView.HOME);
                        } catch (error: any) {
                          console.error(error);
                          alert('Erro ao fazer login com o Google: ' + (error.message || error));
                        } finally {
                          setIsGoogleLoading(false);
                        }
                      }}
                      className="w-full h-11 border border-tas-bege hover:border-tas-gold bg-tas-cream/20 hover:bg-white text-tas-dark rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Entrar com Google
                    </button>
                  </div>
                </div>

                {/* Footer and toggles */}
                <div className="text-center pt-2">
                  <p className="text-xs text-tas-terroir font-medium select-none">
                    {isRegisterMode ? 'Já possui uma conta?' : 'Novo por aqui?'} {' '}
                    <span 
                      onClick={() => setIsRegisterMode(!isRegisterMode)}
                      className="text-tas-gold font-bold underline cursor-pointer hover:text-tas-gold-dark select-none ml-1 whitespace-nowrap"
                    >
                      {isRegisterMode ? 'Fazer login' : 'Criar uma conta'}
                    </span>
                  </p>
                </div>

                {/* Google Authentication Loading Modal */}
                {isGoogleLoading && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl border border-tas-bege w-full max-w-xs text-center space-y-4 shadow-xl select-none animate-slideup">
                      <div className="flex justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-tas-bege border-t-tas-gold rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-tas-dark">Fazendo login</h4>
                        <p className="text-[10px] text-tas-terroir mt-1">Conectando sua conta Google...</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* MAIN APP CONTAINER */}
            {currentView !== ActiveView.SPLASH && currentView !== ActiveView.LOGIN && (
              <motion.div 
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col min-h-0 relative select-none"
              >
                
                {/* GLOBAL APP HEADER */}
                <header className="sticky top-0 bg-tas-cream/95 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-tas-bege/60 z-30 shrink-0">
                  <div className="flex items-center gap-2.5">
                    {currentView !== ActiveView.HOME && (
                      <button 
                        onClick={() => {
                          if (selectedArticle) setSelectedArticle(null);
                          setSelectedProduct(null);
                          setCurrentView(ActiveView.HOME);
                        }}
                        className="p-1.5 hover:bg-tas-bege rounded-full transition-colors text-tas-olive"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                    )}
                    <div>
                      {currentView === ActiveView.HOME ? (
                        <div className="flex items-center pt-1">
                          <img 
                            src={LOGO_IMAGE_PATH} 
                            alt="Tas Grãos" 
                            className="h-12 w-auto object-contain" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <h1 className="font-serif text-base text-tas-dark font-bold tracking-tight uppercase">
                          {currentView === ActiveView.CATEGORIES && 'Catálogo Premium'}
                          {currentView === ActiveView.PRODUCT_DETAIL && 'Detalhes do Grão'}
                          {currentView === ActiveView.CART && 'Carrinho de Saúde'}
                          {currentView === ActiveView.CHECKOUT && 'Finalizando Pedido'}
                          {currentView === ActiveView.RECIPES && 'Receitas Saudáveis'}
                          {currentView === ActiveView.BENEFICIOS && 'Benefícios & Saúde'}
                          {currentView === ActiveView.FAVORITES && 'Meus Preferidos'}
                          {currentView === ActiveView.PROFILE && 'MINHA CONTA'}
                        </h1>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Notification Bell */}
                    <button 
                      onClick={() => setShowNotifications(prev => !prev)}
                      className="p-2 bg-white hover:bg-tas-bege rounded-full border border-tas-bege/60 relative transition-colors text-tas-dark"
                    >
                      <Bell className="h-4.5 w-4.5" />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-emerald-600 rounded-full"></span>
                      )}
                    </button>
                  </div>
                </header>

                {/* NOTIFICATIONS PANEL POPUP */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-[65px] left-4 right-4 bg-white rounded-2xl p-4 shadow-xl border border-tas-bege/80 z-40 max-h-[350px] overflow-y-auto app-scrollbar"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-tas-bege mb-2">
                        <span className="text-xs font-bold text-tas-dark tracking-wide uppercase">Informativos & Novidades</span>
                        <button 
                          onClick={() => {
                            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          }}
                          className="text-[10px] font-bold text-tas-gold uppercase"
                        >
                          Lidas
                        </button>
                      </div>
                      <div className="space-y-2.5">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-2.5 rounded-xl text-left border ${n.read ? 'bg-white border-gray-100' : 'bg-tas-bege/20 border-tas-gold/15'}`}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-tas-dark">{n.title}</span>
                              <span className="text-[9px] text-gray-400">{n.date}</span>
                            </div>
                            <p className="text-[11px] text-tas-dark/85 mt-0.5 leading-tight">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SCROLLABLE SCREEN CONTENTS */}
                <main className="flex-1 overflow-y-auto app-scrollbar p-4 space-y-6">
                  
                  {/* HOME SCREEN */}
                  {currentView === ActiveView.HOME && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
                      
                      {/* Floating Atendimento Fast Widget (Instagram reference) */}
                      <a 
                        href="https://wa.me/5511940451838?text=Ol%C3%A1%20Tas%20Gr%C3%A3os!%20Estou%20no%20app%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
                        target="_blank"
                        className="fixed bottom-20 right-4 sm:right-[calc(50%-13rem)] z-40 bg-emerald-600 text-white p-3.5 rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
                        title="Atendimento WhatsApp"
                      >
                        <MessageCircleWhatsApp className="h-5.5 w-5.5 fill-white" />
                      </a>

                      {/* Search Bar & Fast Tags */}
                      <div className="bg-white p-3.5 rounded-2xl border border-tas-bege/40 shadow-sm flex items-center gap-2">
                        <Search className="h-4.5 w-4.5 text-tas-terroir/60 shrink-0" />
                        <input 
                          type="text" 
                          placeholder="Buscar grãos, nozes ou chás..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setCurrentView(ActiveView.CATEGORIES);
                            }
                          }}
                          className="w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none text-tas-dark placeholder-tas-terroir/50 font-medium"
                        />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 font-bold px-1.5">✕</button>
                        )}
                      </div>

                      {/* Promotional Rotating Banner Hero */}
                      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-md border border-tas-bege/80 bg-tas-dark select-none">
                        <img 
                          src={promoBanners[currentPromoIndex].image} 
                          alt="Tas Graos Hero" 
                          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 transform scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tas-dark via-tas-dark/40 to-transparent"></div>
                        
                        <div className="absolute inset-x-5 bottom-4 text-left text-white space-y-1 sm:space-y-1.5 select-none">
                          <span className="inline-block bg-tas-gold text-tas-dark text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md">
                            {promoBanners[currentPromoIndex].tag}
                          </span>
                          <h2 className="font-serif text-base sm:text-lg font-bold leading-tight text-white drop-shadow-sm">
                            {promoBanners[currentPromoIndex].title}
                          </h2>
                          <p className="text-[10px] text-tas-bege/90 leading-normal line-clamp-2">
                            {promoBanners[currentPromoIndex].desc}
                          </p>
                        </div>

                        {/* Banner Indicators */}
                        <div className="absolute top-3 right-4 flex gap-1.5">
                          {promoBanners.map((_, i) => (
                            <span 
                              key={i} 
                              onClick={() => setCurrentPromoIndex(i)}
                              className={`h-1.5 rounded-full transition-all cursor-pointer ${currentPromoIndex === i ? 'w-4.5 bg-tas-gold' : 'w-1.5 bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Categories Visual Slider */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h2 className="font-serif text-base tracking-wide text-tas-dark font-black">Categorias Seletas</h2>
                          <button 
                            onClick={() => { setSelectedCategory('Todos'); setCurrentView(ActiveView.CATEGORIES); }}
                            className="text-xs text-tas-gold font-bold flex items-center"
                          >
                            Ver Todas <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex gap-2.5 overflow-x-auto pb-2 app-scrollbar shrink-0 select-none">
                          {['Todos', ...categories].slice(0, 12).map((catName) => (
                            <button
                              key={catName}
                              onClick={() => {
                                setSelectedCategory(catName);
                                setCurrentView(ActiveView.CATEGORIES);
                              }}
                              className="px-4 py-2 bg-white border border-tas-bege/80 hover:border-tas-gold/50 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-colors text-tas-dark cursor-pointer shrink-0"
                            >
                              {catName === 'Todos' ? '✨ Todos' : catName}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Destaques da Semana */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h2 className="font-serif text-base tracking-wide text-tas-dark font-black">Destaques da Semana</h2>
                          <span className="text-[10px] bg-tas-bege/80 text-tas-terroir font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Selecionado À Mão</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          {featuredProducts.map((p) => {
                            const isFav = favorites.includes(p.id);
                            return (
                              <div 
                                key={p.id}
                                className="bg-white rounded-3xl p-3 border border-tas-bege/60 shadow-xs flex flex-col justify-between hover:border-tas-sand transition-all animate-slideup"
                              >
                                <div className="relative rounded-2xl overflow-hidden aspect-square mb-2.5 bg-tas-cream">
                                  <img 
                                    src={p.id === 'prod-7' ? TEA_IMAGE_PATH : p.imageUrl} 
                                    alt={p.name} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                    referrerPolicy="no-referrer"
                                  />
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                                    className="absolute top-2 right-2 p-1.5 bg-white/95 rounded-full shadow-xs active:scale-90 transition-transform"
                                  >
                                    <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                  </button>
                                  {p.isVegan && (
                                    <span className="absolute bottom-2 left-2 text-[8px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Vegan</span>
                                  )}
                                </div>

                                <div 
                                  onClick={() => { setSelectedProduct(p); setCurrentView(ActiveView.PRODUCT_DETAIL); }}
                                  className="text-left cursor-pointer"
                                >
                                  <h3 className="text-xs font-bold text-tas-dark line-clamp-1 hover:text-tas-gold">{p.name}</h3>
                                  <p className="text-[10px] text-tas-terroir">A partir de</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs sm:text-sm font-black text-tas-olive font-mono">R$ {p.pricePer100g.toFixed(2)}<span className="text-[9px] font-normal text-tas-dark">/100g</span></span>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddProductToCart(p, 250);
                                        alert(`${p.name} (250g) adicionado ao carrinho! 🛒`);
                                      }}
                                      className="p-1.5 bg-tas-bege hover:bg-tas-gold hover:text-white text-tas-gold rounded-xl transition-colors shrink-0"
                                    >
                                      <Plus className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Benefícios Naturais - Instagram-style Educative Section */}
                      <div className="bg-tas-dark text-white rounded-[2rem] p-5 border border-tas-gold/15 shadow-md relative overflow-hidden select-none">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Compass className="w-40 h-40" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-tas-gold" />
                          <span className="text-[9px] uppercase font-mono tracking-widest font-black text-tas-gold">Fatos & Sabedoria de @tasgraos</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-white mb-2 leading-tight">O que você consome te define.</h3>
                        <p className="text-xs text-tas-bege/80 leading-relaxed mb-4">
                          Cada grão, erva e semente carrega uma medicina viva formulada pela terra. Explore a nossa central educativa baseada em saúde integrativa.
                        </p>
                        <button 
                          onClick={() => setCurrentView(ActiveView.BENEFICIOS)}
                          className="bg-tas-gold text-tas-dark font-semibold text-xs py-2.5 px-5 rounded-xl hover:bg-tas-gold-dark transition-colors cursor-pointer"
                        >
                          Acessar Posts Educativos
                        </button>
                      </div>

                      {/* Real Quick Customer Feedback Bar */}
                      <div className="border border-tas-sand bg-white rounded-2xl p-4 flex gap-3 items-center text-left">
                        <div className="h-8.5 w-8.5 rounded-full bg-tas-bege flex items-center justify-center font-bold text-xs shrink-0 text-tas-olive">✨</div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Qualidade Tas Garantida</p>
                          <p className="text-xs text-tas-dark leading-tight">Embalado e selado hermeticamente sob rigorosa vigilância de frescor e sabor.</p>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* CATEGORIES / PRODUCTS CATALOG SCREEN */}
                  {currentView === ActiveView.CATEGORIES && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-20 text-blue-900">
                      
                      {/* Search Bar Refinements */}
                      <div className="bg-white p-3.5 rounded-2xl border border-tas-bege/40 shadow-sm flex items-center gap-2">
                        <Search className="h-4 w-4 text-tas-dark/60 shrink-0" />
                        <input 
                          type="text" 
                          placeholder="Pesquisar neste catálogo..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none text-tas-dark"
                        />
                      </div>

                      {/* Category Horizontal list */}
                      <div className="flex gap-2.5 overflow-x-auto pb-1 app-scrollbar select-none shrink-0">
                        {['Todos', ...categories].map((ctg) => {
                          const isSelected = selectedCategory === ctg;
                          return (
                            <button
                              key={ctg}
                              onClick={() => setSelectedCategory(ctg)}
                              className={`px-3.5 py-1.8 text-xs font-bold rounded-full border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                                isSelected 
                                  ? 'bg-tas-gold border-tas-gold text-white shadow-xs' 
                                  : 'bg-white border-tas-bege/80 text-tas-dark hover:border-tas-sand'
                              }`}
                            >
                              {ctg}
                            </button>
                          );
                        })}
                      </div>

                      {/* Dynamic Product counter */}
                      <div className="flex justify-between items-center text-xs text-tas-terroir pt-1 font-semibold">
                        <span>Exibindo {filteredProducts.length} produtos em "{selectedCategory}"</span>
                      </div>

                      {/* Main Products Grid */}
                      {filteredProducts.length === 0 ? (
                        <div className="text-center py-12 space-y-2">
                          <p className="text-sm font-semibold text-tas-dark">Nenhum grão ou produto encontrado.</p>
                          <p className="text-xs text-tas-terroir">Experimente alterar os termos de busca ou filtros.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {filteredProducts.map((p) => {
                            const isFav = favorites.includes(p.id);
                            return (
                              <div 
                                key={p.id}
                                className="bg-white rounded-3xl p-3 border border-tas-bege/60 shadow-xs flex flex-col justify-between hover:border-tas-sand transition-all animate-slideup text-left"
                              >
                                <div className="relative rounded-2xl overflow-hidden aspect-square mb-2.5 bg-tas-cream">
                                  <img 
                                    src={p.id === 'prod-7' ? TEA_IMAGE_PATH : p.imageUrl} 
                                    alt={p.name} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                    referrerPolicy="no-referrer"
                                  />
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                                    className="absolute top-2 right-2 p-1.5 bg-white/95 rounded-full shadow-xs active:scale-90 transition-transform"
                                  >
                                    <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                  </button>
                                  {p.isGlutenFree && (
                                    <span className="absolute bottom-2 left-2 text-[8px] font-bold bg-tas-olive text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Glúten Free</span>
                                  )}
                                </div>

                                <div 
                                  onClick={() => { setSelectedProduct(p); setCurrentView(ActiveView.PRODUCT_DETAIL); }}
                                  className="cursor-pointer"
                                >
                                  <h3 className="text-xs font-bold text-tas-dark line-clamp-1 hover:text-tas-gold">{p.name}</h3>
                                  <p className="text-[10px] text-tas-terroir">{p.category}</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs sm:text-sm font-black text-tas-olive font-mono">R$ {p.pricePer100g.toFixed(2)}<span className="text-[9px] font-normal text-tas-dark">/100g</span></span>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddProductToCart(p, 250);
                                        alert(`${p.name} (250g) adicionado ao carrinho! 🛒`);
                                      }}
                                      className="p-1.5 bg-tas-bege hover:bg-tas-gold hover:text-white text-tas-gold rounded-xl transition-colors"
                                    >
                                      <Plus className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* PRODUCT DETAIL SCREEN */}
                  {currentView === ActiveView.PRODUCT_DETAIL && selectedProduct && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-20 text-left">
                      
                      {/* Back handle and cover */}
                      <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-md bg-white border border-tas-bege/70">
                        <img 
                          src={selectedProduct.id === 'prod-7' ? TEA_IMAGE_PATH : selectedProduct.imageUrl} 
                          alt={selectedProduct.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => toggleFavorite(selectedProduct.id)}
                          className="absolute top-4 right-4 p-2.5 bg-white/95 rounded-full shadow-md active:scale-95 transition-transform"
                        >
                          <Heart className={`h-4.5 w-4.5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>

                      {/* Specifications Header */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] bg-tas-bege font-mono text-tas-terroir font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase">
                            Origem: {selectedProduct.origin}
                          </span>
                          {selectedProduct.isVegan && (
                            <span className="text-[9px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md uppercase border border-emerald-200">
                              Vegano
                            </span>
                          )}
                        </div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-tas-dark leading-tight">{selectedProduct.name}</h2>
                        <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold">
                          <Star className="h-4 w-4 fill-tas-gold text-tas-gold shrink-0" />
                          <span className="text-tas-dark font-mono mt-0.5">{selectedProduct.rating}</span>
                          <span className="text-xs text-tas-terroir font-normal">({selectedProduct.reviews.length} avaliações do Instagram)</span>
                        </div>
                      </div>

                      {/* Weight Selector & Dynamic Value Calc */}
                      <div className="bg-white p-4 rounded-3xl border border-tas-bege/60 shadow-xs space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-tas-dark uppercase tracking-wide">Comprar a Granel</span>
                          <span className="text-xs text-tas-terroir">Preço proporcional</span>
                        </div>
                        
                        {/* Selector Tabs for predefined weight */}
                        <div className="grid grid-cols-4 gap-1.5 select-none shrink-0">
                          {[100, 250, 500, 1000].map((weight) => (
                            <button
                              key={weight}
                              onClick={() => setSelectedWeightGrams(weight)}
                              className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                selectedWeightGrams === weight 
                                  ? 'bg-tas-olive border-tas-olive text-white' 
                                  : 'bg-tas-cream border-tas-bege text-tas-dark hover:border-tas-sand'
                              }`}
                            >
                              {weight >= 1000 ? `${weight / 1000}kg` : `${weight}g`}
                            </button>
                          ))}
                        </div>

                        {/* Automatic pricing simulation */}
                        <div className="flex justify-between items-center pt-2 border-t border-tas-bege/70">
                          <div>
                            <p className="text-[10px] text-tas-terroir uppercase font-bold tracking-wider">Valor do seu Peso selecionado</p>
                            <p className="text-2xl font-mono text-tas-olive font-black tracking-tight">
                              R$ {((selectedProduct.pricePer100g / 100) * selectedWeightGrams).toFixed(2)}
                            </p>
                          </div>
                          
                          <button 
                            onClick={() => {
                              handleAddProductToCart(selectedProduct, selectedWeightGrams);
                              alert(`${selectedWeightGrams}g de ${selectedProduct.name} incluídos com sucesso no carrinho! 🌱🛒`);
                            }}
                            className="touch-ripple px-5 py-3.5 bg-tas-gold text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-tas-gold-dark transition-colors text-xs sm:text-sm cursor-pointer shadow-xs"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            Adicionar
                          </button>
                        </div>
                      </div>

                      {/* Description & Organic Benefits checklist */}
                      <div className="space-y-2">
                        <h3 className="font-serif text-sm font-bold text-tas-dark uppercase tracking-wide">Descrição do Produto</h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-tas-dark/85">{selectedProduct.description}</p>
                      </div>

                      <div className="bg-tas-bege/30 p-4 rounded-3xl border border-tas-bege/80 space-y-3">
                        <h3 className="font-serif text-sm font-bold text-tas-dark uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-tas-bege/60">
                          <Check className="h-4 w-4 text-tas-olive" />
                          Benefícios à Saúde Integrativa
                        </h3>
                        <ul className="space-y-2">
                          {selectedProduct.benefits.map((b, idx) => (
                            <li key={idx} className="text-xs sm:text-sm flex gap-2 text-tas-dark/95">
                              <span className="text-tas-gold">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nutritional Table */}
                      <div className="space-y-2 border border-tas-bege/60 rounded-3xl p-4 bg-white shadow-xs">
                        <h3 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wide pb-1.5 border-b border-tas-bege">Tabela de Informação Nutricional <span className="text-[9px] text-gray-400 font-normal capitalize">(por 100g)</span></h3>
                        <div className="grid grid-cols-2 gap-y-2 text-xs text-tas-dark divide-y divide-tas-bege/50">
                          <div className="py-1 flex justify-between pr-4"><span className="text-tas-terroir">Calorias (Valor Energético):</span> <span className="font-semibold">{selectedProduct.nutritionalInfo.calories}</span></div>
                          <div className="py-1 flex justify-between pr-4"><span className="text-tas-terroir">Carboidratos Totais:</span> <span className="font-semibold">{selectedProduct.nutritionalInfo.carbs}</span></div>
                          <div className="py-1 flex justify-between pr-4"><span className="text-tas-terroir">Proteínas Nobres:</span> <span className="font-semibold">{selectedProduct.nutritionalInfo.protein}</span></div>
                          <div className="py-1 flex justify-between pr-4"><span className="text-tas-terroir">Gorduras Totais:</span> <span className="font-semibold">{selectedProduct.nutritionalInfo.fat}</span></div>
                          <div className="py-1 flex justify-between pr-4 border-t-0"><span className="text-tas-terroir">Fibras Alimentares:</span> <span className="font-semibold">{selectedProduct.nutritionalInfo.fiber}</span></div>
                        </div>
                      </div>

                      {/* Product Feedbacks */}
                      <div className="space-y-3">
                        <h3 className="font-serif text-sm font-bold text-tas-dark uppercase tracking-wide">Depoimentos dos Clientes</h3>
                        <div className="space-y-2.5">
                          {selectedProduct.reviews.map((r) => (
                            <div key={r.id} className="p-3 bg-white rounded-2xl border border-tas-bege/55">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-tas-dark">{r.userName}</span>
                                <span className="text-[10px] text-gray-400">{r.date}</span>
                              </div>
                              <div className="flex gap-0.5 text-tas-gold mb-1.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-tas-gold text-tas-gold" />
                                ))}
                              </div>
                              <p className="text-xs text-tas-dark/85 italic leading-tight">"{r.comment}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* SHOPPING CART SCREEN */}
                  {currentView === ActiveView.CART && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-20 text-left">
                      
                      {checkoutStep === 'cart' && (
                        <>
                          {cart.length === 0 ? (
                            <div className="text-center py-16 space-y-4">
                              <ShoppingBag className="h-16 w-16 text-tas-bege mx-auto" />
                              <p className="text-sm font-bold text-tas-dark/80">Seu carrinho de saúde está vazio.</p>
                              <p className="text-xs text-tas-terroir px-6">Adicione os melhores grãos, chás e castanhas a granel para começar a cuidar do seu organismo.</p>
                              <button 
                                onClick={() => setCurrentView(ActiveView.CATEGORIES)}
                                className="px-6 py-2.5 bg-tas-gold text-white text-xs font-bold rounded-xl hover:bg-tas-gold-dark cursor-pointer shadow-xs"
                              >
                                Ir para o Catálogo
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              
                              {/* Cart Items List */}
                              <div className="space-y-3">
                                {cart.map((item) => (
                                  <div 
                                    key={item.id}
                                    className="p-3 bg-white rounded-3xl border border-tas-bege/80 flex gap-3 shadow-xs items-center justify-between"
                                  >
                                    <img 
                                      src={item.product.id === 'prod-7' ? TEA_IMAGE_PATH : item.product.imageUrl} 
                                      alt={item.product.name} 
                                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                                      referrerPolicy="no-referrer"
                                    />

                                    <div className="flex-1 text-left">
                                      <h4 className="text-xs font-bold text-tas-dark leading-snug line-clamp-1">{item.product.name}</h4>
                                      <span className="text-[10px] text-tas-terroir font-mono">
                                        R$ {item.product.pricePer100g.toFixed(2)}/100g
                                      </span>

                                      {/* Weight Adjustment row */}
                                      <div className="flex items-center gap-1.5 mt-1.5">
                                        <button 
                                          onClick={() => updateCartItemWeight(item.id, 'down')}
                                          className="p-1 bg-tas-bege text-tas-dark rounded-md"
                                        >
                                          <Minus className="h-2.5 w-2.5" />
                                        </button>
                                        <span className="text-xs font-extrabold font-mono text-tas-dark bg-tas-cream px-2 py-0.5 rounded-md border border-tas-bege text-center min-w-[50px]">
                                          {item.weightGrams}g
                                        </span>
                                        <button 
                                          onClick={() => updateCartItemWeight(item.id, 'up')}
                                          className="p-1 bg-tas-bege text-tas-dark rounded-md"
                                        >
                                          <Plus className="h-2.5 w-2.5" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Action items deletion and price */}
                                    <div className="text-right flex flex-col justify-between items-end h-16 shrink-0 pl-1">
                                      <button 
                                        onClick={() => handleRemoveCartItem(item.id)}
                                        className="text-xs text-red-500 hover:text-red-700 font-bold p-1 bg-red-50 rounded-lg"
                                        title="Remover"
                                      >
                                        ✕
                                      </button>
                                      <span className="text-xs sm:text-sm font-mono font-black text-tas-olive whitespace-nowrap">
                                        R$ {item.totalPrice.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Coupon Applicator Row */}
                              <div className="bg-white p-3.5 rounded-3xl border border-tas-bege flex gap-2 shadow-xs">
                                <Percent className="h-4.5 w-4.5 text-tas-gold shrink-0 mt-2" />
                                <input 
                                  type="text" 
                                  placeholder="CUPOM (Ex: TAS15)"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                  className="w-full bg-tas-bege/20 border border-tas-bege/70 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-tas-gold text-tas-dark uppercase font-bold"
                                />
                                <button 
                                  onClick={handleApplyCoupon}
                                  className="px-4 py-2 bg-tas-gold hover:bg-tas-gold-dark text-white text-xs font-bold rounded-xl tracking-wide cursor-pointer"
                                >
                                  Aplicar
                                </button>
                              </div>

                              {/* Cart Summary calculation */}
                              <div className="bg-tas-cream border border-tas-bege/80 rounded-[2rem] p-4.5 space-y-3 shadow-xs">
                                <h3 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wide border-b border-tas-bege pb-2">Resumo Financeiro da Saúde</h3>
                                <div className="space-y-1.5 text-xs text-tas-dark">
                                  <div className="flex justify-between"><span>Subtotal dos Produtos:</span> <span className="font-mono">R$ {cartSubtotal.toFixed(2)}</span></div>
                                  {couponDiscount > 0 && (
                                    <div className="flex justify-between text-emerald-700 font-semibold">
                                      <span>Desconto Cupom ({couponDiscount}%):</span> 
                                      <span className="font-mono">- R$ {discountAmount.toFixed(2)}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <span>Frete via Correios (Capital):</span> 
                                    <span className="font-mono">{shippingFee === 0 ? 'Grátis (Mais de R$ 100)' : `R$ ${shippingFee.toFixed(2)}`}</span>
                                  </div>
                                  <div className="flex justify-between pt-2.5 border-t border-tas-bege font-bold text-sm text-tas-olive">
                                    <span>Investimento Total:</span> 
                                    <span className="font-mono text-base font-black">R$ {cartTotal.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              <button 
                                onClick={() => setCheckoutStep('shipping')}
                                className="touch-ripple w-full py-4 bg-tas-olive text-white rounded-2xl font-bold text-sm sm:text-base cursor-pointer hover:bg-tas-olive-dark text-center shadow-md flex items-center justify-center gap-2"
                              >
                                Finalizar Encomenda <ArrowRight className="h-4 w-4" />
                              </button>

                            </div>
                          )}
                        </>
                      )}

                      {/* STEP 2: SHIPPING CONFIG */}
                      {checkoutStep === 'shipping' && (
                        <div className="space-y-4 animate-slideup">
                          <h3 className="font-serif text-lg text-tas-dark font-bold mb-1">Escolha o Endereço de Entrega</h3>
                          <div className="p-4 bg-white rounded-3xl border border-tas-bege space-y-4 shadow-xs">
                            <div>
                              <label className="text-[10px] font-bold text-tas-terroir uppercase block mb-1">Seu Endereço de Cadastro</label>
                              <textarea 
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                rows={3}
                                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-tas-bege/30 border border-tas-bege/60 focus:outline-none focus:border-tas-gold rounded-2xl text-tas-dark resize-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-tas-terroir">
                              <MapPin className="h-4.5 w-4.5 text-tas-gold shrink-0" />
                              <span>Entrega expressa realizada de 2 a 5 dias úteis no Brasil.</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-2 select-none">
                            <button 
                              onClick={() => setCheckoutStep('cart')}
                              className="py-3.5 bg-gray-50 border border-gray-100/80 rounded-2xl text-xs font-bold text-tas-dark cursor-pointer text-center"
                            >
                              Voltar ao Carrinho
                            </button>
                            <button 
                              onClick={() => setCheckoutStep('payment')}
                              className="py-3.5 bg-tas-gold text-white rounded-2xl text-xs font-bold text-center cursor-pointer hover:bg-tas-gold-dark"
                            >
                              Configurar Métodos
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: PAYMENT METHOD */}
                      {checkoutStep === 'payment' && (
                        <div className="space-y-5 animate-slideup">
                          <h3 className="font-serif text-lg text-tas-dark font-bold mb-1">Método de Pagamento Premium</h3>
                          
                          {/* Payment selectors */}
                          <div className="space-y-2 select-none">
                            
                            {/* PIX Option */}
                            <label className={`block p-4 rounded-3xl border cursor-pointer transition-all ${orderPaymentMethod === 'PIX' ? 'border-tas-gold bg-tas-bege text-tas-dark font-semibold' : 'border-gray-150 bg-white hover:border-tas-bege'}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <QrCode className="h-5 w-5 text-tas-gold mt-0.5 shrink-0" />
                                  <div>
                                    <h4 className="text-xs sm:text-sm font-bold">PIX Direto Ativo</h4>
                                    <p className="text-[10px] text-tas-terroir font-normal leading-tight">Ganhe aprovação instantânea automatizada com QR code.</p>
                                  </div>
                                </div>
                                <input 
                                  type="radio" 
                                  name="payment" 
                                  checked={orderPaymentMethod === 'PIX'} 
                                  onChange={() => setOrderPaymentMethod('PIX')} 
                                  className="mt-1"
                                />
                              </div>
                            </label>

                            {/* WhatsApp Direct Option */}
                            <label className={`block p-4 rounded-3xl border cursor-pointer transition-all ${orderPaymentMethod === 'WhatsApp Direct' ? 'border-tas-gold bg-tas-bege text-tas-dark font-semibold' : 'border-gray-150 bg-white hover:border-tas-bege'}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <MessageCircleWhatsApp className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                                  <div>
                                    <h4 className="text-xs sm:text-sm font-bold">Finalizar via WhatsApp</h4>
                                    <p className="text-[10px] text-tas-terroir font-normal leading-tight">Geramos uma mensagem dinâmica para finalizar no balcão!</p>
                                  </div>
                                </div>
                                <input 
                                  type="radio" 
                                  name="payment" 
                                  checked={orderPaymentMethod === 'WhatsApp Direct'} 
                                  onChange={() => setOrderPaymentMethod('WhatsApp Direct')} 
                                  className="mt-1"
                                />
                              </div>
                            </label>

                            {/* Credit Card Option */}
                            <label className={`block p-4 rounded-3xl border cursor-pointer transition-all ${orderPaymentMethod === 'Cartão de Crédito' ? 'border-tas-gold bg-tas-bege text-tas-dark font-semibold' : 'border-gray-150 bg-white hover:border-tas-bege'}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <CreditCard className="h-5 w-5 text-tas-olive mt-0.5 shrink-0" />
                                  <div>
                                    <h4 className="text-xs sm:text-sm font-bold">Cartão de Crédito Premium</h4>
                                    <p className="text-[10px] text-tas-terroir font-normal leading-tight">Parcele em até 6x sem juros de grãos saudáveis.</p>
                                  </div>
                                </div>
                                <input 
                                  type="radio" 
                                  name="payment" 
                                  checked={orderPaymentMethod === 'Cartão de Crédito'} 
                                  onChange={() => setOrderPaymentMethod('Cartão de Crédito')} 
                                  className="mt-1"
                                />
                              </div>
                            </label>
                          </div>

                          {/* Conditional Pay forms based on selection */}
                          {orderPaymentMethod === 'Cartão de Crédito' && (
                            <div className="p-4 bg-white rounded-3xl border border-tas-bege space-y-3 shadow-xs animate-slideup">
                              <div>
                                <label className="text-[9px] uppercase font-bold tracking-wider text-tas-terroir">Número do Cartão de Crédito</label>
                                <input 
                                  type="text" 
                                  value={creditCardNumber} 
                                  onChange={(e) => setCreditCardNumber(e.target.value)} 
                                  className="w-full text-xs px-3.5 py-2.5 bg-tas-bege/30 rounded-xl border border-tas-bege focus:outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[9px] uppercase font-bold tracking-wider text-tas-terroir">Validade</label>
                                  <input type="text" placeholder="08/32" className="w-full text-xs px-3.5 py-2.5 bg-tas-bege/30 rounded-xl border border-tas-bege focus:outline-none" />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase font-bold tracking-wider text-tas-terroir">CVV</label>
                                  <input type="password" placeholder="***" className="w-full text-xs px-3.5 py-2.5 bg-tas-bege/30 rounded-xl border border-tas-bege focus:outline-none" />
                                </div>
                              </div>
                            </div>
                          )}

                          {orderPaymentMethod === 'PIX' && (
                            <div className="p-4 bg-tas-cream border border-tas-gold/25 rounded-3xl space-y-4 shadow-xs text-center animate-slideup">
                              <p className="text-xs text-tas-dark/95">Escaneie o QR Code para pagar ou clique em copiar código copia-e-cola.</p>
                              <div className="w-40 h-40 bg-white rounded-2xl mx-auto border border-tas-bege flex items-center justify-center p-3">
                                {/* Beautiful mock QR code representation using inline styling inside constraints */}
                                <div className="p-1 border-2 border-tas-gold rounded-xl">
                                  <QrCode className="h-32 w-32 text-tas-dark" />
                                </div>
                              </div>
                              
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText('00020101021226830014br.gov.bcb.pix2561api.tasgraos.com/pix/pagamento/17794766');
                                  setIsCopiedPix(true);
                                  setTimeout(() => setIsCopiedPix(false), 2000);
                                }}
                                className="px-4 py-2 bg-white text-tas-olive border border-tas-olive/30 hover:border-tas-olive/60 font-medium rounded-xl text-xs flex items-center gap-2 mx-auto cursor-pointer"
                              >
                                {isCopiedPix ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                <span>{isCopiedPix ? 'Chave Copiada!' : 'Copiar Código Copia e Cola'}</span>
                              </button>
                            </div>
                          )}

                          <div className="bg-tas-bege/40 p-4 rounded-3xl border border-tas-bege text-xs space-y-1.5 text-tas-dark">
                            <div className="flex justify-between font-bold"><span>Total Geral da Encomenda:</span> <span className="font-mono text-tas-olive">R$ {cartTotal.toFixed(2)}</span></div>
                            <p className="text-[10px] text-tas-terroir text-left">Ao clicar abaixo, você concorda em gerar a solicitação final de compra.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pb-2 select-none">
                            <button 
                              onClick={() => setCheckoutStep('shipping')}
                              className="py-3.5 bg-gray-50 border border-gray-100/80 rounded-2xl text-xs font-bold text-tas-dark cursor-pointer text-center"
                            >
                              Voltar ao Endereço
                            </button>
                            
                            {orderPaymentMethod === 'WhatsApp Direct' ? (
                              <a 
                                href={getWhatsAppMessageLink()}
                                onClick={handlePlaceOrder}
                                target="_blank"
                                rel="noreferrer"
                                className="py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold text-center border-none"
                              >
                                Chamar no WhatsApp
                              </a>
                            ) : (
                              <button 
                                onClick={handlePlaceOrder}
                                className="touch-ripple py-3.5 bg-tas-olive text-white rounded-2xl text-xs font-bold text-center cursor-pointer hover:bg-tas-olive-dark"
                              >
                                Concluir Compra
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* STEP 4: CHEKCOUT CONCLUDED */}
                      {checkoutStep === 'done' && (
                        <div className="text-center py-12 space-y-6 animate-slideup">
                          <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-200 mx-auto">
                            <Check className="h-10 w-10" />
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-serif text-xl text-tas-dark font-black">Encomenda Realizada! 🌱✨</h3>
                            <p className="text-xs text-tas-terroir font-semibold">Parabéns pela sua escolha por saúde e nutrição superior.</p>
                          </div>

                          <div className="p-4 bg-white border border-tas-bege rounded-3xl text-left space-y-3 shadow-xs">
                            <p className="text-xs text-tas-dark">Nossa equipe já está separando seus produtos a granel com luvas de proteção em embalagens vedadas.</p>
                            <div className="text-[11px] font-mono bg-tas-bege text-tas-dark/95 p-2 rounded-xl border border-tas-gold/15">
                              • Código Rastreamento Correios: <span className="font-bold text-tas-olive">TG{Math.floor(10000000 + Math.random() * 90000000)}BR</span>
                            </div>
                            <p className="text-[10px] text-gray-400">Suas notas fiscais e atualizações de entrega foram disponibilizados na aba Perfil.</p>
                          </div>

                          <button 
                            onClick={() => {
                              setCheckoutStep('cart');
                              setCurrentView(ActiveView.HOME);
                            }}
                            className="w-full py-3.5 bg-tas-gold text-white font-bold rounded-2xl hover:bg-tas-gold-dark font-sans text-xs sm:text-sm cursor-pointer"
                          >
                            Ir para Página Inicial
                          </button>
                        </div>
                      )}

                    </motion.div>
                  )}

                  {/* RECIPES & INTUITIVE PREMIUM KITCHEN SCREEN */}
                  {currentView === ActiveView.RECIPES && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
                      <RecipesSection 
                        products={products}
                        onAddProductToCart={handleAddProductToCart}
                        onSetProducts={setProducts}
                      />
                    </motion.div>
                  )}

                  {/* FAVORITES LIST SCREEN */}
                  {currentView === ActiveView.FAVORITES && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-20 text-left">
                      {favorites.length === 0 ? (
                        <div className="text-center py-16 space-y-3">
                          <Heart className="h-16 w-16 text-tas-bege mx-auto" />
                          <p className="text-sm font-bold text-tas-dark/80">Sua lista de favoritos está vazia.</p>
                          <p className="text-xs text-tas-terroir px-8 leading-relaxed">Adicione um coração na tela dos produtos e veja-os reunidos aqui para agilizar sua recompra natural.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3.5">
                          {products.filter(p => favorites.includes(p.id)).map((p) => (
                            <div 
                              key={p.id}
                              className="bg-white rounded-3xl p-3 border border-tas-bege/60 shadow-xs flex flex-col justify-between hover:border-tas-sand transition-all animate-slideup"
                            >
                              <div className="relative rounded-2xl overflow-hidden aspect-square mb-2.5 bg-tas-cream">
                                <img 
                                  src={p.id === 'prod-7' ? TEA_IMAGE_PATH : p.imageUrl} 
                                  alt={p.name} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <button 
                                  onClick={() => toggleFavorite(p.id)}
                                  className="absolute top-2 right-2 p-1.5 bg-white/95 rounded-full shadow-xs active:scale-90 transition-transform"
                                >
                                  <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                                </button>
                              </div>

                              <div 
                                onClick={() => { setSelectedProduct(p); setCurrentView(ActiveView.PRODUCT_DETAIL); }}
                                className="cursor-pointer"
                              >
                                <h3 className="text-xs font-bold text-tas-dark line-clamp-1">{p.name}</h3>
                                <p className="text-[10px] text-tas-terroir">{p.category}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs sm:text-sm font-black text-tas-olive font-mono">R$ {p.pricePer100g.toFixed(2)}</span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddProductToCart(p, 250);
                                      alert(`${p.name} (250g) inserido no carrinho! 🛒`);
                                    }}
                                    className="p-1.5 bg-tas-bege hover:bg-tas-gold text-tas-gold rounded-xl transition-colors"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* BENEFICIOS / EDUCATIONAL BLOG SCREEN */}
                  {currentView === ActiveView.BENEFICIOS && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-20 text-left">
                      
                      {!selectedArticle ? (
                        <div className="space-y-5">
                          <p className="text-xs sm:text-sm text-tas-dark/85 leading-relaxed bg-white border border-tas-bege p-3.5 rounded-2xl">
                            Consulte as publicações oficiais das nossas redes sociais. Entenda do ponto de vista terapêutico como funcionam nossos superalimentos.
                          </p>

                          <div className="space-y-4">
                            {articles.map((art) => (
                              <div 
                                key={art.id}
                                onClick={() => setSelectedArticle(art)}
                                className="bg-white rounded-[2rem] border border-tas-bege/60 overflow-hidden shadow-xs cursor-pointer hover:border-tas-sand transition-all animate-slideup text-left"
                              >
                                <div className="relative h-36 bg-tas-bege">
                                  <img 
                                    src={art.id === 'art-3' ? TEA_IMAGE_PATH : art.imageUrl} 
                                    alt={art.title} 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <span className="absolute top-3 left-3 bg-tas-dark/95 text-tas-gold text-[8px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                                    {art.category}
                                  </span>
                                </div>

                                <div className="p-4">
                                  <h3 className="font-serif text-base text-tas-dark font-extrabold leading-snug line-clamp-1">
                                    {art.title}
                                  </h3>
                                  <p className="text-[11px] text-tas-dark/85 mt-1 line-clamp-2 leading-relaxed">
                                    {art.summary}
                                  </p>
                                  
                                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-tas-bege/60">
                                    <div className="flex gap-1">
                                      {art.tags.slice(0, 2).map(t => (
                                        <span key={t} className="text-[9px] text-tas-terroir font-semibold">#{t}</span>
                                      ))}
                                    </div>
                                    <span className="text-xs text-tas-gold font-bold flex items-center gap-0.5">
                                      Ver Post <ChevronRight className="h-3 w-3" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 animate-slideup">
                          <button 
                            onClick={() => setSelectedArticle(null)}
                            className="text-xs text-tas-olive font-bold flex items-center gap-1.5 bg-white border border-tas-bege/70 px-3.5 py-1.5 rounded-full"
                          >
                            <ArrowLeft className="h-4 w-4" /> Voltar aos Artigos
                          </button>

                          <div className="relative rounded-3xl overflow-hidden aspect-video bg-tas-bege shadow-xs">
                            <img 
                              src={selectedArticle.id === 'art-3' ? TEA_IMAGE_PATH : selectedArticle.imageUrl} 
                              alt={selectedArticle.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-3 left-3 bg-tas-gold text-tas-dark text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {selectedArticle.category}
                            </span>
                          </div>

                          <h2 className="font-serif text-lg sm:text-xl font-bold text-tas-dark leading-tight">
                            {selectedArticle.title}
                          </h2>
                          <p className="text-xs text-tas-terroir font-medium italic">"{selectedArticle.subtitle}"</p>

                          <div className="space-y-3 pt-2 text-xs sm:text-sm text-tas-dark/90 leading-relaxed">
                            {selectedArticle.content.map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>

                          <div className="bg-tas-bege/35 border border-tas-bege p-4 rounded-3xl space-y-2.5 mt-4">
                            <h4 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wider flex items-center gap-1.5">
                              <Star className="h-4 w-4 text-tas-gold fill-tas-gold" />
                              Dicas Rápidas de Aproveitamento
                            </h4>
                            <ul className="space-y-2 pl-1.5">
                              {selectedArticle.tips.map((t, idx) => (
                                <li key={idx} className="text-xs leading-relaxed flex items-start gap-1.5">
                                  <span className="text-tas-olive font-bold">•</span>
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                    </motion.div>
                  )}

                  {/* USER PROFILE OPTION VIEWS */}
                  {currentView === ActiveView.PROFILE && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20 text-left">
                      
                      {/* Avatar & Info card on top of the page */}
                      <div className="bg-white p-5 rounded-3xl border border-tas-bege/70 flex gap-4 items-center shadow-3xs">
                        <div className="h-14 w-14 rounded-full bg-tas-olive text-tas-cream flex items-center justify-center text-xl font-bold font-serif shadow-xs select-none shrink-0">
                          {(user.name || 'Visitante').charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left overflow-hidden">
                          <h3 className="text-sm sm:text-base font-bold text-tas-dark leading-snug truncate">{user.name || 'Visitante'}</h3>
                          <p className="text-[11px] text-tas-terroir truncate">{user.email || 'Acesso como Visitante'}</p>
                          <span className="inline-block bg-tas-olive/10 text-tas-olive text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full mt-1.5 border border-tas-olive/15 uppercase">
                            {user.name ? 'Cadastro Ativo' : 'Visitante'}
                          </span>
                        </div>
                      </div>

                      {/* Segmented Options Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => {
                            setActiveProfileTab('perfil');
                            setShowLogoutConfirm(false);
                          }}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            activeProfileTab === 'perfil' 
                              ? 'bg-tas-gold text-white border-tas-gold shadow-xs' 
                              : 'bg-white text-tas-dark border-tas-bege hover:bg-tas-cream/30 hover:border-tas-gold/40'
                          }`}
                        >
                          <User className={`h-5 w-5 mb-1.5 ${activeProfileTab === 'perfil' ? 'text-white' : 'text-tas-gold'}`} />
                          <span className="text-[11px] font-bold tracking-tight">Perfil</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveProfileTab('history');
                            setShowLogoutConfirm(false);
                          }}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            activeProfileTab === 'history' 
                              ? 'bg-tas-gold text-white border-tas-gold shadow-xs' 
                              : 'bg-white text-tas-dark border-tas-bege hover:bg-tas-cream/30 hover:border-tas-gold/40'
                          }`}
                        >
                          <ShoppingBag className={`h-5 w-5 mb-1.5 ${activeProfileTab === 'history' ? 'text-white' : 'text-tas-gold'}`} />
                          <span className="text-[11px] font-bold tracking-tight">Histórico</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveProfileTab('settings');
                            setShowLogoutConfirm(false);
                          }}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            activeProfileTab === 'settings' 
                              ? 'bg-tas-gold text-white border-tas-gold shadow-xs' 
                              : 'bg-white text-tas-dark border-tas-bege hover:bg-tas-cream/30 hover:border-tas-gold/40'
                          }`}
                        >
                          <Settings className={`h-5 w-5 mb-1.5 ${activeProfileTab === 'settings' ? 'text-white' : 'text-tas-gold'}`} />
                          <span className="text-[11px] font-bold tracking-tight">Configurações</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveProfileTab('logout');
                            setShowLogoutConfirm(true);
                          }}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            activeProfileTab === 'logout' 
                              ? 'bg-red-50 text-red-600 border-red-100 shadow-xs' 
                              : 'bg-white text-tas-dark border-tas-bege hover:bg-red-50/20'
                          }`}
                        >
                          <LogOut className={`h-5 w-5 mb-1.5 ${activeProfileTab === 'logout' ? 'text-red-600' : 'text-red-500'}`} />
                          <span className="text-[11px] font-bold tracking-tight">Sair da Conta</span>
                        </button>
                      </div>

                      {/* Line Separator */}
                      <div className="h-[1px] bg-tas-bege/40 w-full" />

                      {/* Options Contents Renderer */}
                      <div className="space-y-4">
                        
                        {/* 1. PERFIL (Profile Info) */}
                        {activeProfileTab === 'perfil' && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            {/* Detailed Profile Specifications */}
                            <div className="bg-white p-5 rounded-3xl border border-tas-bege/70 space-y-3 shadow-3xs">
                              <h4 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wide border-b border-tas-bege/40 pb-2">Informações de Registro</h4>
                              
                              <div className="grid grid-cols-3 text-xs py-1">
                                <span className="text-tas-terroir font-medium">Nome:</span>
                                <span className="col-span-2 text-tas-dark font-semibold break-all">{user.name || 'Não fornecido'}</span>
                              </div>

                              <div className="grid grid-cols-3 text-xs py-1 border-t border-tas-bege/20">
                                <span className="text-tas-terroir font-medium">E-mail:</span>
                                <span className="col-span-2 text-tas-dark font-semibold break-all">{user.email || 'Não fornecido'}</span>
                              </div>

                              <div className="grid grid-cols-3 text-xs py-1 border-t border-tas-bege/20">
                                <span className="text-tas-terroir font-medium">Telefone:</span>
                                <span className="col-span-2 text-tas-dark font-semibold">{user.phone || 'Nenhum telefone configurado'}</span>
                              </div>

                              <div className="grid grid-cols-3 text-xs py-1 border-t border-tas-bege/20">
                                <span className="text-tas-terroir font-medium">Endereço:</span>
                                <span className="col-span-2 text-tas-dark font-semibold leading-relaxed">{user.address || 'Nenhum endereço de entrega configurado'}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* 2. HISTÓRICO DE PEDIDOS */}
                        {activeProfileTab === 'history' && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                              <h3 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wide">Histórico de Pedidos</h3>
                              <span className="text-[10px] text-gray-400">Total de {user.orderHistory.length}</span>
                            </div>

                            {user.orderHistory.length === 0 ? (
                              <div className="bg-white p-6 rounded-3xl border border-tas-bege/60 text-center space-y-2">
                                <p className="text-xs text-tas-terroir">Nenhum histórico de pedidos encontrado.</p>
                                <p className="text-[10px] text-gray-400 font-medium">Suas compras aparecerão aqui após finalizar o carrinho.</p>
                              </div>
                            ) : (
                              <div className="space-y-3.5">
                                {user.orderHistory.map((order) => (
                                  <div 
                                    key={order.id}
                                    className="bg-white p-4 rounded-3xl border border-tas-bege shadow-3xs text-left text-xs"
                                  >
                                    <div className="flex justify-between items-center pb-2 border-b border-tas-bege/60 mb-2">
                                      <span className="font-bold text-tas-dark">{order.id}</span>
                                      <span className="text-gray-400 font-medium">{order.date}</span>
                                    </div>

                                    <div className="space-y-1 mb-3">
                                      {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-tas-dark/90 text-[11px]">
                                          <span>• {item.product.name} ({item.weightGrams}g)</span>
                                          <span className="font-mono">R$ {item.totalPrice.toFixed(2)}</span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="bg-tas-bege/25 p-2.5 rounded-2xl border border-tas-bege mb-2">
                                      <div className="flex justify-between items-center mb-1 text-[10px]">
                                        <span className="text-tas-terroir">Rastreio: <span className="font-mono text-tas-dark font-bold">{order.trackerCode}</span></span>
                                        <span className="text-tas-olive font-extrabold uppercase bg-tas-bege/80 px-2 py-0.5 rounded-md text-[9px] tracking-wider border border-tas-bege">
                                          {order.status}
                                        </span>
                                      </div>
                                      
                                      <div className="h-1 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div 
                                          className={`h-full bg-tas-gold transition-all duration-1000 ${
                                            order.status === 'pendente' ? 'w-1/4' : (order.status === 'preparando' ? 'w-2/4' : (order.status === 'enviado' ? 'w-3/4' : 'w-full'))
                                          }`}
                                        />
                                      </div>
                                    </div>

                                    <div className="flex justify-between items-center text-[11px] pt-1">
                                      <span className="text-tas-terroir font-medium">Investimento:</span>
                                      <span className="font-mono font-black text-tas-olive">R$ {order.totalAmount.toFixed(2)}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 3. CONFIGURAÇÕES (Settings Edition & Admin reset) */}
                        {activeProfileTab === 'settings' && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div className="bg-white p-5 rounded-3xl border border-tas-bege/70 space-y-4 shadow-3xs">
                              <h4 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wide border-b border-tas-bege/40 pb-2">Configurações da Conta</h4>
                              
                              <div className="space-y-3.5">
                                <div>
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir block mb-1">Nome Completo</label>
                                  <input 
                                    type="text" 
                                    value={settingsName}
                                    onChange={(e) => setSettingsName(e.target.value)}
                                    placeholder="Ex: Larissa Souza"
                                    className="w-full px-3.5 py-2 bg-tas-bege/10 border border-tas-bege focus:border-tas-gold rounded-xl text-xs sm:text-sm text-tas-dark transition-all outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir block mb-1">Celular / Contato</label>
                                  <input 
                                    type="text" 
                                    value={settingsPhone}
                                    onChange={(e) => setSettingsPhone(e.target.value)}
                                    placeholder="Ex: (11) 98765-4321"
                                    className="w-full px-3.5 py-2 bg-tas-bege/10 border border-tas-bege focus:border-tas-gold rounded-xl text-xs sm:text-sm text-tas-dark transition-all outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir block mb-1">Endereço de Entrega Principal</label>
                                  <textarea 
                                    value={settingsAddress}
                                    onChange={(e) => setSettingsAddress(e.target.value)}
                                    placeholder="Ex: Av. Paulista, 1200 - Bela Vista - São Paulo, SP"
                                    className="w-full px-3.5 py-2 bg-tas-bege/10 border border-tas-bege focus:border-tas-gold rounded-xl text-xs sm:text-sm text-tas-dark transition-all outline-none h-18 resize-none"
                                  />
                                </div>

                                <button
                                  onClick={() => {
                                    if (!settingsName.trim()) {
                                      alert('Por favor, informe seu nome completo.');
                                      return;
                                    }
                                    setUser({
                                      ...user,
                                      name: settingsName,
                                      phone: settingsPhone,
                                      address: settingsAddress
                                    });
                                    alert('Dados atualizados com sucesso! 🌱');
                                  }}
                                  className="w-full py-2.5 bg-tas-gold hover:bg-tas-gold-dark text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                                >
                                  Salvar Alterações
                                </button>
                              </div>
                            </div>

                            {/* Database panel entry */}
                            <div className="bg-tas-bege/20 border border-tas-bege/80 p-4.5 rounded-3xl space-y-3">
                              <div className="flex items-center gap-2.5">
                                <Database className="h-5 w-5 text-tas-gold" />
                                <div>
                                  <h4 className="font-serif text-xs font-bold text-tas-dark uppercase tracking-wide">Banco de Dados</h4>
                                  <p className="text-[10px] text-tas-terroir">Gerenciar configurações avançadas do JSON</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => {
                                  setJsonText(JSON.stringify({ categories, products, recipes, articles }, null, 2));
                                  setCurrentView(ActiveView.ADMIN);
                                }}
                                className="w-full py-2 bg-white hover:bg-tas-bege border border-tas-bege text-tas-dark rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Settings className="h-3.5 w-3.5" /> Editor Administrativo
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* 4. SAIR DA CONTA */}
                        {activeProfileTab === 'logout' && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                            <div className="bg-white border border-red-100 p-6 rounded-3xl text-center space-y-4 shadow-3xs">
                              <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                                <LogOut className="h-6 w-6" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-serif font-black text-tas-dark text-base">Terminar Sessão</h4>
                                <p className="text-xs text-tas-terroir">Deseja realmente sair da sua conta?</p>
                              </div>
                              <div className="flex gap-2.5 max-w-xs mx-auto">
                                <button 
                                  onClick={async () => {
                                    try {
                                      await signOut(auth);
                                    } catch (error) {
                                      console.error('Erro ao sair:', error);
                                    }
                                    setUser({
                                      name: '',
                                      email: '',
                                      phone: '',
                                      address: '',
                                      rewardPoints: 0,
                                      orderHistory: []
                                    });
                                    setLoginEmail('');
                                    setLoginPassword('');
                                    setIsRegisterMode(false);
                                    setShowLogoutConfirm(false);
                                    setCurrentView(ActiveView.LOGIN);
                                  }}
                                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                                >
                                  Sim, Sair
                                </button>
                                <button 
                                  onClick={() => {
                                    setActiveProfileTab('perfil');
                                    setShowLogoutConfirm(false);
                                  }}
                                  className="flex-1 py-2.5 bg-tas-bege/30 hover:bg-tas-bege/50 text-tas-dark font-bold rounded-xl text-xs transition-all cursor-pointer border border-tas-bege/60"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}

                      </div>

                    </motion.div>
                  )}

                  {/* ADMIN PANEL - CADASTRO CORPORATIVO DO ZERO */}
                  {currentView === ActiveView.ADMIN && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-20 text-left">
                      
                      <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-tas-bege/60 shadow-xs">
                        <button 
                          onClick={() => setCurrentView(ActiveView.PROFILE)}
                          className="text-xs text-tas-olive font-bold flex items-center gap-1.5 bg-tas-bege px-3.5 py-1.8 rounded-full"
                        >
                          <ArrowLeft className="h-4 w-4" /> Voltar Perfil
                        </button>
                        <h2 className="font-serif text-base font-black text-tas-dark">Gerenciador Tas</h2>
                      </div>

                      {/* Tab navigation inside database editor */}
                      <div className="flex gap-1.5 overflow-x-auto pb-1 select-none shrink-0 app-scrollbar">
                        <button 
                          onClick={() => { setShowAdminTab('products'); setIsAddingItem(false); }}
                          className={`px-3 py-1.8 text-[11px] font-bold rounded-xl whitespace-nowrap ${showAdminTab === 'products' ? 'bg-tas-dark text-white' : 'bg-white text-tas-dark border border-tas-bege'}`}
                        >
                          Produtos ({products.length})
                        </button>
                        <button 
                          onClick={() => { setShowAdminTab('categories'); setIsAddingItem(false); }}
                          className={`px-3 py-1.8 text-[11px] font-bold rounded-xl whitespace-nowrap ${showAdminTab === 'categories' ? 'bg-tas-dark text-white' : 'bg-white text-tas-dark border border-tas-bege'}`}
                        >
                          Categorias ({categories.length})
                        </button>
                        <button 
                          onClick={() => { setShowAdminTab('recipes'); setIsAddingItem(false); }}
                          className={`px-3 py-1.8 text-[11px] font-bold rounded-xl whitespace-nowrap ${showAdminTab === 'recipes' ? 'bg-tas-dark text-white' : 'bg-white text-tas-dark border border-tas-bege'}`}
                        >
                          Receitas ({recipes.length})
                        </button>
                        <button 
                          onClick={() => { setShowAdminTab('articles'); setIsAddingItem(false); }}
                          className={`px-3 py-1.8 text-[11px] font-bold rounded-xl whitespace-nowrap ${showAdminTab === 'articles' ? 'bg-tas-dark text-white' : 'bg-white text-tas-dark border border-tas-bege'}`}
                        >
                          Artigos ({articles.length})
                        </button>
                        <button 
                          onClick={() => { setShowAdminTab('json_io'); setIsAddingItem(false); setJsonText(JSON.stringify({ categories, products, recipes, articles }, null, 2)); }}
                          className={`px-3 py-1.8 text-[11px] font-bold rounded-xl whitespace-nowrap flex items-center gap-1 ${showAdminTab === 'json_io' ? 'bg-tas-dark text-[#D4AF37]' : 'bg-white text-tas-dark border border-tas-bege'}`}
                        >
                          <Database className="h-3.5 w-3.5" /> Importar / Exportar JSON
                        </button>
                      </div>

                      {/* DEFAULT COFFEEHOUSE / TEA REFERENCE LOADER */}
                      <div className="bg-white p-3.5 rounded-2xl border border-tas-bege mb-2 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-tas-terroir font-bold uppercase">Precisa de Inspiração?</p>
                          <p className="text-[9px] text-gray-400">Restaurar dados modelo de alta-resolução para testes</p>
                        </div>
                        <button 
                          onClick={() => {
                            if (confirm('Isso irá substituir os dados atuais por um catálogo modelo de Castanhas, Spirulina, Aveia e Chás do Sul. Deseja continuar?')) {
                              setCategories(['Grãos', 'Temperos', 'Chás', 'Farinhas', 'Castanhas', 'Sementes']);
                              setProducts([
                                {
                                  id: 'prod-1',
                                  name: 'Castanha do Pará Premium',
                                  description: 'Castanhas do Pará inteiras selecionadas do oeste, ricas em gorduras boas e antioxidantes.',
                                  benefits: ['Poderoso antioxidante natural', 'Auxilia na saúde cardiovascular', 'Excelente fonte de selênio e magnésio'],
                                  category: 'Castanhas',
                                  pricePer100g: 11.90,
                                  rating: 4.9,
                                  reviews: [],
                                  imageUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400',
                                  origin: 'Pará, Brasil',
                                  nutritionalInfo: { calories: '656 kcal', carbs: '12g', protein: '14g', fat: '66g', fiber: '7g' },
                                  isVegan: true,
                                  isFitness: true,
                                  isGlutenFree: true
                                },
                                {
                                  id: 'prod-2',
                                  name: 'Spirulina Azul em Pó',
                                  description: 'Superalimento azul de alta pureza. Fonte incrível de proteína vegetal e ferro.',
                                  benefits: ['Rica em proteínas', 'Excelente fonte de Ferro e Vitamina B12'],
                                  category: 'Sementes',
                                  pricePer100g: 24.50,
                                  rating: 4.8,
                                  reviews: [],
                                  imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
                                  origin: 'Ceará, Brasil',
                                  nutritionalInfo: { calories: '290 kcal', carbs: '24g', protein: '57g', fat: '8g', fiber: '3.6g' },
                                  isVegan: true,
                                  isFitness: true,
                                  isGlutenFree: true
                                }
                              ]);
                              setRecipes([
                                {
                                  id: 'rec-1',
                                  title: 'Super Shot Matinal Detox com Spirulina',
                                  prepTime: '5 min',
                                  difficulty: 'Fácil',
                                  calories: '45 kcal',
                                  image: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=500',
                                  ingredients: [
                                    { name: 'Spirulina Azul em Pó', amount: '1 colher de café', isAvailableInStore: true, productId: 'prod-2' }
                                  ],
                                  instructions: ['Misture bem a spirulina com água morna e limão espremido fresca.', 'Beber de manhã em jejum.']
                                }
                              ]);
                              setArticles([
                                {
                                  id: 'art-1',
                                  title: 'Como Consumir Spirulina Natural',
                                  subtitle: 'Os benefícios integrativos revelados',
                                  category: 'Suplementação',
                                  summary: 'Artigo explicativo do poder antioxidante das clorofilas ativas.',
                                  content: ['A spirulina é uma microalgas de valor biológico incomparável.'],
                                  tips: ['Misture com limão fresco para absorção de ferro natural aumentada em 3x'],
                                  tags: ['Detox', 'Superalimento'],
                                  imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500'
                                }
                              ]);
                              alert('Dados padrão reestabelecidos com sucesso!');
                            }
                          }}
                          className="bg-tas-bege hover:bg-tas-bege/80 text-tas-olive font-black text-[9px] px-3 py-1.5 rounded-full uppercase border border-tas-gold/40"
                        >
                          Restaurar Padrão
                        </button>
                      </div>

                      {/* --- TAB PRODUCTS --- */}
                      {showAdminTab === 'products' && (
                        <div className="space-y-4">
                          {!isAddingItem ? (
                            <>
                              <button 
                                onClick={() => setIsAddingItem(true)}
                                className="w-full py-2.5 bg-tas-olive text-white rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus className="h-4 w-4" /> Cadastrar Novo Produto
                              </button>

                              {products.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-tas-bege">
                                  <p className="text-xs text-tas-terroir font-bold">Nenhum produto cadastrado no momento.</p>
                                  <p className="text-[10px] text-gray-400">Clique acima para inserir sua primeira informação real.</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {products.map((p) => (
                                    <div key={p.id} className="bg-white p-3.5 rounded-2xl border border-tas-bege/60 flex justify-between items-center text-xs">
                                      <div className="flex gap-2.5 items-center">
                                        <img src={p.imageUrl} alt={p.name} className="h-10 w-10 object-cover rounded-lg bg-tas-bege" />
                                        <div>
                                          <p className="font-bold text-tas-dark line-clamp-1">{p.name}</p>
                                          <p className="text-[10px] text-tas-olive font-semibold">{p.category} • R$ {p.pricePer100g.toFixed(2)}/100g</p>
                                        </div>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Excluir o produto "${p.name}"?`)) {
                                            setProducts(prev => prev.filter(item => item.id !== p.id));
                                          }
                                        }}
                                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="bg-white p-4 rounded-3xl border border-tas-bege space-y-3.5 text-xs">
                              <h3 className="font-serif font-black text-tas-dark text-sm border-b pb-2">Cadastrar Novo Produto</h3>
                              
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Nome do Produto</label>
                                <input 
                                  type="text" 
                                  placeholder="Ex: Nozes Chilenas Quartz Grá"
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                  value={newProd.name}
                                  onChange={(e) => setNewProd({...newProd, name: e.target.value})}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-left">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Preço / 100g (R$)</label>
                                  <input 
                                    type="number" 
                                    step="0.01"
                                    placeholder="Ex: 8.90"
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newProd.pricePer100g || ''}
                                    onChange={(e) => setNewProd({...newProd, pricePer100g: parseFloat(e.target.value) || 0})}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Categoria</label>
                                  <select 
                                    className="w-full p-2 border border-tas-bege rounded-xl bg-white outline-none"
                                    value={newProd.category}
                                    onChange={(e) => setNewProd({...newProd, category: e.target.value})}
                                  >
                                    <option value="">Selecione...</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                  </select>
                                </div>
                              </div>

                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Descrição Curta</label>
                                <textarea 
                                  placeholder="Indique a utilidade, benefícios primários e procedência..."
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none h-18 text-xs"
                                  value={newProd.description}
                                  onChange={(e) => setNewProd({...newProd, description: e.target.value})}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-left">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Região de Origem</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: Paraná, Brasil"
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newProd.origin}
                                    onChange={(e) => setNewProd({...newProd, origin: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">URL da Imagem</label>
                                  <input 
                                    type="text" 
                                    placeholder="Link da imagem..."
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newProd.imageUrl}
                                    onChange={(e) => setNewProd({...newProd, imageUrl: e.target.value})}
                                  />
                                </div>
                              </div>

                              <div className="border-t pt-2 space-y-2 text-left">
                                <p className="text-[10px] uppercase font-bold text-tas-terroir mb-1">Selos Dietéticos</p>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={newProd.isVegan}
                                      onChange={(e) => setNewProd({...newProd, isVegan: e.target.checked})}
                                    />
                                    <span>Vegano</span>
                                  </label>
                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={newProd.isFitness}
                                      onChange={(e) => setNewProd({...newProd, isFitness: e.target.checked})}
                                    />
                                    <span>Fitness</span>
                                  </label>
                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={newProd.isGlutenFree}
                                      onChange={(e) => setNewProd({...newProd, isGlutenFree: e.target.checked})}
                                    />
                                    <span>Glúten Free</span>
                                  </label>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2 border-t">
                                <button 
                                  onClick={() => {
                                    if (!newProd.name || !newProd.pricePer100g || !newProd.category) {
                                      alert('Preencha Nome, Preço e Categoria!');
                                      return;
                                    }
                                    const created: Product = {
                                      id: `prod-${Date.now()}`,
                                      name: newProd.name,
                                      description: newProd.description || 'Produto natural selecionado.',
                                      benefits: newProd.benefits || ['Qualidade de vida'],
                                      category: newProd.category,
                                      pricePer100g: newProd.pricePer100g,
                                      rating: 5,
                                      reviews: [],
                                      imageUrl: newProd.imageUrl || 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400',
                                      origin: newProd.origin || 'Importado',
                                      nutritionalInfo: newProd.nutritionalInfo as any,
                                      isVegan: !!newProd.isVegan,
                                      isFitness: !!newProd.isFitness,
                                      isGlutenFree: !!newProd.isGlutenFree,
                                    };
                                    setProducts(prev => [created, ...prev]);
                                    setIsAddingItem(false);
                                    // Reset template fields
                                    setNewProd({
                                      name: '', description: '', benefits: [''], category: '', pricePer100g: 0, rating: 5,
                                      imageUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400', origin: '',
                                      nutritionalInfo: { calories: '120 kcal', carbs: '15g', protein: '4g', fat: '1g', fiber: '2g' },
                                      isVegan: true, isFitness: false, isGlutenFree: true
                                    });
                                    alert('Produto cadastrado localmente com sucesso! ✨');
                                  }}
                                  className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-xl text-center cursor-pointer"
                                >
                                  Salvar Produto
                                </button>
                                <button 
                                  onClick={() => setIsAddingItem(false)}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tas-dark font-bold rounded-xl text-center cursor-pointer"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- TAB CATEGORIES --- */}
                      {showAdminTab === 'categories' && (
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-3xl border border-tas-bege flex gap-2 items-end">
                            <div className="flex-1 space-y-1 text-left">
                              <label className="text-[10px] uppercase font-bold text-tas-terroir">Nova Categoria</label>
                              <input 
                                type="text" 
                                placeholder="Ex: Mel Funcional"
                                className="w-full p-2 border border-tas-bege rounded-xl outline-none text-xs"
                                value={newCatName}
                                onChange={(e) => setNewCatName(e.target.value)}
                              />
                            </div>
                            <button 
                              onClick={() => {
                                if (!newCatName.trim()) return;
                                if (categories.includes(newCatName.trim())) {
                                  alert('Essa categoria já existe!');
                                  return;
                                }
                                setCategories(prev => [...prev, newCatName.trim()]);
                                setNewCatName('');
                              }}
                              className="px-4 py-2.2 bg-tas-olive text-white rounded-xl font-bold text-xs shrink-0 cursor-pointer"
                            >
                              Adicionar
                            </button>
                          </div>

                          <div className="bg-white p-3.5 rounded-3xl border border-tas-bege space-y-1.5">
                            <h3 className="text-xs uppercase font-bold text-tas-terroir border-b pb-1 text-left">Lista de Categorias Atuais</h3>
                            {categories.length === 0 ? (
                              <p className="text-xs text-gray-400 py-3 text-center">Nenhuma categoria cadastrada.</p>
                            ) : (
                              <div className="divide-y divide-tas-bege/40">
                                {categories.map(c => (
                                  <div key={c} className="py-2.5 flex justify-between items-center text-xs">
                                    <span className="font-semibold text-tas-dark">{c}</span>
                                    <button 
                                      onClick={() => {
                                        if (confirm(`Remover categoria "${c}"? Isso não removerá os produtos, mas eles perderão o filtro correspondente.`)) {
                                          setCategories(prev => prev.filter(item => item !== c));
                                        }
                                      }}
                                      className="p-1 px-2.5 text-[10px] text-red-500 bg-red-50 hover:bg-red-100 rounded-lg font-bold cursor-pointer"
                                    >
                                      Remover
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* --- TAB RECIPES --- */}
                      {showAdminTab === 'recipes' && (
                        <div className="space-y-4">
                          {!isAddingItem ? (
                            <>
                              <button 
                                onClick={() => setIsAddingItem(true)}
                                className="w-full py-2.5 bg-tas-olive text-white rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus className="h-4 w-4" /> Cadastrar Nova Receita
                              </button>

                              {recipes.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-tas-bege">
                                  <p className="text-xs text-tas-terroir font-bold">Nenhuma receita no acervo.</p>
                                  <p className="text-[10px] text-gray-400">Insira orientações saudáveis de gastronomia para os clientes.</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {recipes.map((r) => (
                                    <div key={r.id} className="bg-white p-3.5 rounded-2xl border border-tas-bege/60 flex justify-between items-center text-xs">
                                      <div className="flex gap-2.5 items-center">
                                        <img src={r.image} alt={r.title} className="h-10 w-10 object-cover rounded-lg bg-tas-bege" />
                                        <div>
                                          <p className="font-bold text-tas-dark line-clamp-1">{r.title}</p>
                                          <p className="text-[10px] text-tas-olive font-semibold">{r.prepTime} • {r.difficulty}</p>
                                        </div>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Excluir a receita "${r.title}"?`)) {
                                            setRecipes(prev => prev.filter(item => item.id !== r.id));
                                          }
                                        }}
                                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="bg-white p-4 rounded-3xl border border-tas-bege space-y-3.5 text-xs">
                              <h3 className="font-serif font-black text-tas-dark text-sm border-b pb-2">Nova Receita no Acervo</h3>
                              
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Título da Receita</label>
                                <input 
                                  type="text" 
                                  placeholder="Ex: Bolo de Caneca Funcional"
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                  value={newRecipe.title}
                                  onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
                                />
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-left">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Est. Preparo</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: 20 min"
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newRecipe.prepTime}
                                    onChange={(e) => setNewRecipe({...newRecipe, prepTime: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Dificuldade</label>
                                  <select 
                                    className="w-full p-2 border border-tas-bege rounded-xl bg-white outline-none"
                                    value={newRecipe.difficulty}
                                    onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value as any})}
                                  >
                                    <option value="Fácil">Fácil</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Avançado">Avançado</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Calorias</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: 150 kcal"
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newRecipe.calories}
                                    onChange={(e) => setNewRecipe({...newRecipe, calories: e.target.value})}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">URL da Imagem</label>
                                <input 
                                  type="text" 
                                  placeholder="Ex: Link de imagem..."
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                  value={newRecipe.image}
                                  onChange={(e) => setNewRecipe({...newRecipe, image: e.target.value})}
                                />
                              </div>

                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Instrução de Preparo Passo a Passo</label>
                                <textarea 
                                  placeholder="Digite cada instrução em linhas separadas..."
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none h-20 text-xs"
                                  onBlur={(e) => {
                                    const lines = e.target.value.split('\n').filter(line => line.trim().length > 0);
                                    setNewRecipe({...newRecipe, instructions: lines});
                                  }}
                                />
                              </div>

                              <div className="flex gap-2 pt-2 border-t">
                                <button 
                                  onClick={() => {
                                    if (!newRecipe.title) {
                                      alert('Preencha pelo menos o Título da Receita!');
                                      return;
                                    }
                                    const created: Recipe = {
                                      id: `rec-${Date.now()}`,
                                      title: newRecipe.title,
                                      prepTime: newRecipe.prepTime || '20 min',
                                      difficulty: newRecipe.difficulty || 'Fácil',
                                      calories: newRecipe.calories || '150 kcal',
                                      image: newRecipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
                                      ingredients: newRecipe.ingredients || [],
                                      instructions: newRecipe.instructions || ['Misturar os ingredientes.']
                                    };
                                    setRecipes(prev => [created, ...prev]);
                                    setIsAddingItem(false);
                                    setNewRecipe({
                                      title: '', prepTime: '20 min', difficulty: 'Fácil', calories: '150 kcal',
                                      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
                                      ingredients: [], instructions: []
                                    });
                                    alert('Receita adicionada ao acervo! 🌱✨');
                                  }}
                                  className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-xl text-center cursor-pointer"
                                >
                                  Salvar Receita
                                </button>
                                <button 
                                  onClick={() => setIsAddingItem(false)}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tas-dark font-bold rounded-xl text-center cursor-pointer"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- TAB ARTICLES --- */}
                      {showAdminTab === 'articles' && (
                        <div className="space-y-4">
                          {!isAddingItem ? (
                            <>
                              <button 
                                onClick={() => setIsAddingItem(true)}
                                className="w-full py-2.5 bg-tas-olive text-white rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus className="h-4 w-4" /> Cadastrar Novo Artigo
                              </button>

                              {articles.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-tas-bege">
                                  <p className="text-xs text-tas-terroir font-bold">Nenhum artigo científico ou de opinião cadastrado.</p>
                                  <p className="text-[10px] text-gray-400">Clique acima para criar seu primeiro post corporativo.</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {articles.map((a) => (
                                    <div key={a.id} className="bg-white p-3.5 rounded-2xl border border-tas-bege/60 flex justify-between items-center text-xs">
                                      <div className="flex gap-2.5 items-center">
                                        <img src={a.imageUrl} alt={a.title} className="h-10 w-10 object-cover rounded-lg bg-tas-bege" />
                                        <div>
                                          <p className="font-bold text-tas-dark line-clamp-1">{a.title}</p>
                                          <p className="text-[10px] text-tas-olive font-semibold">{a.category}</p>
                                        </div>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Excluir o artigo "${a.title}"?`)) {
                                            setArticles(prev => prev.filter(item => item.id !== a.id));
                                          }
                                        }}
                                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="bg-white p-4 rounded-3xl border border-tas-bege space-y-3.5 text-xs">
                              <h3 className="font-serif font-black text-tas-dark text-sm border-b pb-2">Novo Artigo Educacional</h3>
                              
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Título do Artigo</label>
                                <input 
                                  type="text" 
                                  placeholder="Ex: Os Benefícios do Psyllium"
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                  value={newArticle.title}
                                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-left">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Subtítulo</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: Como age como prebiótico..."
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newArticle.subtitle}
                                    onChange={(e) => setNewArticle({...newArticle, subtitle: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Categoria Temática</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: Alimentação Saudável"
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newArticle.category}
                                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Sumário Executivo</label>
                                <input 
                                  type="text" 
                                  placeholder="Resumo em uma linha para o feed..."
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                  value={newArticle.summary}
                                  onChange={(e) => setNewArticle({...newArticle, summary: e.target.value})}
                                />
                              </div>

                              <div className="space-y-1 text-left">
                                <label className="text-[10px] uppercase font-bold text-tas-terroir">Texto do Conteúdo (pode separar em parágrafos normais)</label>
                                <textarea 
                                  placeholder="Escreva as explicações e descobertas do artigo..."
                                  className="w-full p-2 border border-tas-bege rounded-xl outline-none h-18 text-xs"
                                  onBlur={(e) => {
                                    const paragraphs = e.target.value.split('\n').filter(p => p.trim().length > 0);
                                    setNewArticle({...newArticle, content: paragraphs});
                                  }}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-left">
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">Dica Rápida</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: Tomar com bastante água líquida"
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none font-medium"
                                    onBlur={(e) => {
                                      if (e.target.value.trim()) {
                                        setNewArticle({...newArticle, tips: [e.target.value.trim()]});
                                      }
                                    }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] uppercase font-bold text-tas-terroir">URL da Imagem de Capa</label>
                                  <input 
                                    type="text" 
                                    placeholder="Aponte para uma imagem..."
                                    className="w-full p-2 border border-tas-bege rounded-xl outline-none"
                                    value={newArticle.imageUrl}
                                    onChange={(e) => setNewArticle({...newArticle, imageUrl: e.target.value})}
                                  />
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2 border-t">
                                <button 
                                  onClick={() => {
                                    if (!newArticle.title) {
                                      alert('Preencha pelo menos o Título do Artigo!');
                                      return;
                                    }
                                    const created: EducationalArticle = {
                                      id: `art-${Date.now()}`,
                                      title: newArticle.title,
                                      subtitle: newArticle.subtitle || 'Descobertas Ativas',
                                      category: newArticle.category || 'Nutrição',
                                      summary: newArticle.summary || 'Resumo explicativo.',
                                      content: newArticle.content || ['Leitura de bem-estar.'],
                                      tips: newArticle.tips || ['Consumir diariamente.'],
                                      tags: ['Qualidade'],
                                      imageUrl: newArticle.imageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400'
                                    };
                                    setArticles(prev => [created, ...prev]);
                                    setIsAddingItem(false);
                                    setNewArticle({
                                      title: '', subtitle: '', category: 'Nutrição', summary: '',
                                      content: [], tips: [], tags: [],
                                      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400'
                                    });
                                    alert('Artigo e conselhos salvos com sucesso! 📚🌱');
                                  }}
                                  className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-xl text-center cursor-pointer"
                                >
                                  Salvar Artigo
                                </button>
                                <button 
                                  onClick={() => setIsAddingItem(false)}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tas-dark font-bold rounded-xl text-center cursor-pointer"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- TAB IMPORT/EXPORT DUMP --- */}
                      {showAdminTab === 'json_io' && (
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-3xl border border-tas-bege space-y-3.5 text-xs text-left">
                            <h3 className="font-serif font-black text-tas-dark text-sm border-b pb-1">Gestão Completa via Dump JSON</h3>
                            <p className="text-[10px] text-gray-400 leading-normal">
                              Você pode carregar as informações corporativas copiando e colando um formato de arquivo JSON unificado estruturado. Isso atualiza instantaneamente todo o aplicativo!
                            </p>
                            
                            <textarea 
                              className="w-full h-64 p-3 bg-gray-50 border border-tas-bege rounded-xl font-mono text-[9px] outline-none text-tas-dark focus:bg-white resize-none"
                              value={jsonText}
                              onChange={(e) => setJsonText(e.target.value)}
                            />

                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  try {
                                    const parsed = JSON.parse(jsonText);
                                    if (parsed) {
                                      if (Array.isArray(parsed.categories)) setCategories(parsed.categories);
                                      if (Array.isArray(parsed.products)) setProducts(parsed.products);
                                      if (Array.isArray(parsed.recipes)) setRecipes(parsed.recipes);
                                      if (Array.isArray(parsed.articles)) setArticles(parsed.articles);
                                      alert('Parabéns! Banco de Dados reinjetado e sincronizado com total sucesso! 📊🚀');
                                    }
                                  } catch (error) {
                                    alert('Formato JSON inválido - verifique chaves e vírgulas!');
                                  }
                                }}
                                className="flex-grow py-2.5 bg-tas-dark text-[#D4AF37] hover:bg-black font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Upload className="h-4 w-4" /> Importar e Aplicar
                              </button>
                              
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(jsonText);
                                  alert('Código de dados copiado para sua área de transferência! Guarde isso como backup da sua empresa. 📝✅');
                                }}
                                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-tas-dark font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                              >
                                <Copy className="h-4 w-4" /> Copiar JSON
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </motion.div>
                  )}

                </main>

                {/* GLOBAL BOTTOM TAB NAVIGATION BAR */}
                <footer className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-tas-bege px-3.5 py-2 flex items-center justify-around z-30 shrink-0 select-none">
                  
                  {/* Home tab button */}
                  <button 
                    onClick={() => { setSelectedProduct(null); setSelectedArticle(null); setCurrentView(ActiveView.HOME); }}
                    className={`flex flex-col items-center gap-1 py-1 transition-colors relative cursor-pointer ${currentView === ActiveView.HOME ? 'text-tas-gold font-bold' : 'text-tas-terroir-light/80 hover:text-tas-dark'}`}
                  >
                    <Compass className="h-5.5 w-5.5" />
                    <span className="text-[9px] tracking-tight">Início</span>
                    {currentView === ActiveView.HOME && <span className="absolute -bottom-1 h-1.5 w-1.5 bg-tas-gold rounded-full"></span>}
                  </button>

                  {/* Catalog tab button */}
                  <button 
                    onClick={() => { setSelectedProduct(null); setSelectedArticle(null); setCurrentView(ActiveView.CATEGORIES); }}
                    className={`flex flex-col items-center gap-1 py-1 transition-colors relative cursor-pointer ${currentView === ActiveView.CATEGORIES ? 'text-tas-gold font-bold' : 'text-tas-terroir-light/80 hover:text-tas-dark'}`}
                  >
                    <Search className="h-5.5 w-5.5" />
                    <span className="text-[9px] tracking-tight">Catálogo</span>
                    {currentView === ActiveView.CATEGORIES && <span className="absolute -bottom-1 h-1.5 w-1.5 bg-tas-gold rounded-full"></span>}
                  </button>

                  {/* Recipes tab button */}
                  <button 
                    onClick={() => { setSelectedProduct(null); setSelectedArticle(null); setCurrentView(ActiveView.RECIPES); }}
                    className={`flex flex-col items-center gap-1 py-1 transition-colors relative cursor-pointer ${currentView === ActiveView.RECIPES ? 'text-tas-gold font-bold' : 'text-tas-terroir-light/80 hover:text-tas-dark'}`}
                  >
                    <BookOpen className="h-5.5 w-5.5" />
                    <span className="text-[9px] tracking-tight">Receitas</span>
                    {currentView === ActiveView.RECIPES && <span className="absolute -bottom-1 h-1.5 w-1.5 bg-tas-gold rounded-full"></span>}
                  </button>

                  {/* Cart tab button */}
                  <button 
                    onClick={() => { setSelectedProduct(null); setSelectedArticle(null); setCheckoutStep('cart'); setCurrentView(ActiveView.CART); }}
                    className={`flex flex-col items-center gap-1 py-1 transition-colors relative cursor-pointer ${currentView === ActiveView.CART ? 'text-tas-gold font-bold' : 'text-tas-terroir-light/80 hover:text-tas-dark'}`}
                  >
                    <div className="relative">
                      <ShoppingBag className="h-5.5 w-5.5" />
                      {cart.length > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-tas-olive text-white text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-white">
                          {cart.reduce((acc, item) => acc + (item.weightGrams >= 1000 ? 1 : 1), 0)}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] tracking-tight">Carrinho</span>
                    {currentView === ActiveView.CART && <span className="absolute -bottom-1 h-1.5 w-1.5 bg-tas-gold rounded-full"></span>}
                  </button>

                  {/* Profile tab button */}
                  <button 
                    onClick={() => { setSelectedProduct(null); setSelectedArticle(null); setCurrentView(ActiveView.PROFILE); }}
                    className={`flex flex-col items-center gap-1 py-1 transition-colors relative cursor-pointer ${currentView === ActiveView.PROFILE ? 'text-tas-gold font-bold' : 'text-tas-terroir-light/80 hover:text-tas-dark'}`}
                  >
                    <User className="h-5.5 w-5.5" />
                    <span className="text-[9px] tracking-tight">Perfil</span>
                    {currentView === ActiveView.PROFILE && <span className="absolute -bottom-1 h-1.5 w-1.5 bg-tas-gold rounded-full"></span>}
                  </button>

                </footer>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}

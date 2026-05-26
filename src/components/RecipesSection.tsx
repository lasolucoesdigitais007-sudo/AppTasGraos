import React, { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Heart, 
  Clock, 
  Flame, 
  ChevronRight, 
  Plus, 
  Check, 
  BookOpen, 
  Leaf, 
  Dumbbell, 
  Bookmark, 
  Eye, 
  X,
  TrendingUp,
  ShoppingBag,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { LIST_OF_50_RECIPES, RecipeType } from '../data/recipes';
import { Product } from '../types';

interface RecipesSectionProps {
  products: Product[];
  onAddProductToCart: (product: Product, weightGrams: number) => void;
  onSetProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function RecipesSection({ products, onAddProductToCart, onSetProducts }: RecipesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeRecipe, setActiveRecipe] = useState<RecipeType | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tasgraos_fav_recipes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tasgraos_fav_recipes', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(recipeId)) {
        showToast('Removido dos favoritos');
        return prev.filter(id => id !== recipeId);
      } else {
        showToast('Adicionado aos favoritos ❤️');
        return [...prev, recipeId];
      }
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Popular ingredient labels to filter by
  const popularFilterIngredients = [
    { label: 'Chia', key: 'chia' },
    { label: 'Aveia', key: 'aveia' },
    { label: 'Granola', key: 'granola' },
    { label: 'Castanhas', key: 'castanha' },
    { label: 'Cacau', key: 'cacau' },
    { label: 'Mel', key: 'mel' },
    { label: 'Amendoim', key: 'amendoim' },
    { label: 'Quinoa', key: 'quinoa' }
  ];

  const categories = [
    'Todas',
    'Café da manhã',
    'Lanches',
    'Fitness',
    'Vegano',
    'Sobremesas',
    'Low Carb',
    'Proteico',
    'Smoothies',
    'Receitas rápidas',
    'Receitas com granola',
    'Receitas com castanhas',
    'Receitas com chia',
    'Receitas com aveia'
  ];

  const handleToggleIngredientFilter = (ingredientKey: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientKey)
        ? prev.filter(k => k !== ingredientKey)
        : [...prev, ingredientKey]
    );
  };

  // Filter recipes
  const filteredRecipes = LIST_OF_50_RECIPES.filter(recipe => {
    // 1. Category filter
    if (selectedCategory !== 'Todas') {
      const matchCat = recipe.categorias.some(c => c.toLowerCase() === selectedCategory.toLowerCase()) || recipe.categoria.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchCat) return false;
    }

    // 2. Search search query (title, ingredients, categories)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = recipe.nome.toLowerCase().includes(q);
      const matchIngs = recipe.ingredientes.some(ing => ing.toLowerCase().includes(q));
      const matchCats = recipe.categorias.some(cat => cat.toLowerCase().includes(q));
      if (!matchTitle && !matchIngs && !matchCats) return false;
    }

    // 3. Selected Ingredients filter
    if (selectedIngredients.length > 0) {
      const matchesAll = selectedIngredients.every(filterKey => {
        return recipe.ingredientes.some(ing => ing.toLowerCase().includes(filterKey)) ||
               recipe.produtosTasGraos.some(p => p.nome.toLowerCase().includes(filterKey));
      });
      if (!matchesAll) return false;
    }

    return true;
  });

  // Smart Cart Integration: add all ingredients or a specific store product from the recipe to the cart
  const handleAddToolsToCart = (recipe: RecipeType) => {
    let addedCount = 0;
    
    recipe.produtosTasGraos.forEach(recipeProduct => {
      // 1. Try to find a matching product in the store's current active products
      let matchedProduct = products.find(p => 
        p.id === recipeProduct.idSugerido || 
        p.name.toLowerCase().includes(recipeProduct.nome.toLowerCase()) ||
        recipeProduct.nome.toLowerCase().includes(p.name.toLowerCase())
      );

      // 2. If no matching product exists yet (e.g., fresh database), let's dynamically create it in the database on-the-fly!
      // This is a robust UX choice so that the cart behaves perfectly and lists the authentic bulk product items.
      if (!matchedProduct) {
        const newCatalogProduct: Product = {
          id: recipeProduct.idSugerido,
          name: recipeProduct.nome,
          description: `Ingredientes premium selecionados sob demanda pela Tas Grãos para a receita ${recipe.nome}.`,
          benefits: ['Superalimento natural', 'Altamente nutritivo', 'Produto fresco a granel'],
          category: recipeProduct.categoriaSugerida || 'Grãos',
          pricePer100g: recipeProduct.precoSugerido100g || 4.50,
          rating: 4.8,
          reviews: [],
          imageUrl: recipe.imagem, // fallback to the recipe visual
          origin: 'Múltiplas origens selecionadas',
          nutritionalInfo: {
            calories: `${recipe.calorias / 2} kcal`,
            carbs: '15g',
            protein: `${recipe.proteina / 2}g`,
            fat: '4g',
            fiber: '3g'
          },
          isVegan: recipe.categorias.includes('Vegano'),
          isFitness: recipe.categorias.includes('Fitness') || recipe.categorias.includes('Proteico'),
          isGlutenFree: !recipeProduct.nome.toLowerCase().includes('trigo') && !recipeProduct.nome.toLowerCase().includes('centeio')
        };
        
        // Push newly instantiated ingredient product to products catalog so it displays and registers in cart properly
        onSetProducts(prev => {
          if (!prev.some(p => p.id === newCatalogProduct.id)) {
            const updated = [...prev, newCatalogProduct];
            localStorage.setItem('tasgraos_products', JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
        
        matchedProduct = newCatalogProduct;
      }

      // Add 250g as standard bulk recommendation
      onAddProductToCart(matchedProduct, 250);
      addedCount++;
    });

    showToast(`🛒 ${addedCount} ingredientes adicionados ao seu carrinho!`);
  };

  // Recipe of the Week ("Receita da Semana") - Overnight Oats
  const recipeOfTheWeek = LIST_OF_50_RECIPES.find(r => r.id === 'rec-p-1') || LIST_OF_50_RECIPES[0];

  // "Mais Saudáveis" section (Calories < 150)
  const healthiestRecipes = LIST_OF_50_RECIPES.filter(r => r.calorias <= 150).slice(0, 6);

  // "Mais Pedidas" section (featuring Granola and Oats)
  const popularRecipes = LIST_OF_50_RECIPES.filter(r => r.categorias.includes('Receitas com granola') || r.categorias.includes('Receitas com castanhas')).slice(0, 6);

  // "Receita Fitness" section
  const fitnessRecipes = LIST_OF_50_RECIPES.filter(r => r.categorias.includes('Fitness')).slice(0, 6);

  return (
    <div className="space-y-8 pb-32 text-left bg-[#FCFAF7] min-h-screen font-sans -mx-4 px-4 pt-4 sm:-mx-6 sm:px-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1C2C1C] text-[#E8D9C5] text-xs font-bold px-5 py-3 rounded-full shadow-2xl border border-[#D4AF37]/30 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. BRAND PREMIUM BANNER */}
      <div className="relative rounded-[2.5rem] bg-[#2E3F2E] text-white overflow-hidden p-6 sm:p-8 shadow-xl border border-emerald-900/40">
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=1000&auto=format&fit=crop&q=80" 
            alt="background nuts and leaves" 
            className="w-full h-full object-cover scale-110 filter blur-sm"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold opacity-80 flex items-center gap-1">
          <Leaf className="h-3 w-3 animate-pulse" /> Sabores Reais
        </div>

        <div className="relative z-10 space-y-2 max-w-lg mt-4 text-left">
          <span className="bg-[#E8D9C5] text-[#2E3F2E] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            ESPAÇO GOURMET TAS GRÃOS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF6F0] pt-1">
            Receitas de Verdade para uma Vida Leve
          </h2>
          <p className="text-xs sm:text-sm text-[#E8D9C5] leading-relaxed font-light">
            Cozinhe pratos deliciosos e incrivelmente saudáveis utilizando nossos superalimentos a granel selecionados a dedo. Saúde para seu corpo e alma.
          </p>
        </div>
      </div>

      {/* 2. Destaque da Semana ("Receita da Semana") */}
      {searchQuery === '' && selectedCategory === 'Todas' && selectedIngredients.length === 0 && (
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-serif text-lg font-black text-[#1C2C1C]">
              ⭐ Receita da Semana
            </h3>
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-[#E8D9C5] text-[#2E3F2E] px-2.5 py-1 rounded-lg">
              Campanha Saudável
            </span>
          </div>

          <div 
            onClick={() => setActiveRecipe(recipeOfTheWeek)}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#E8D9C5]/80 shadow-md hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 md:flex flex-row cursor-pointer"
          >
            <div className="md:w-1/2 relative h-56 md:h-64 bg-[#E8D9C5]/20 overflow-hidden">
              <img 
                src={recipeOfTheWeek.imagem} 
                alt={recipeOfTheWeek.nome} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 bg-[#1C2C1C]/90 text-[#FAF6F0] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {recipeOfTheWeek.tempoPreparo}
              </span>
            </div>

            <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2 text-[10px] text-emerald-800 font-bold">
                  {recipeOfTheWeek.categorias.slice(0, 3).map((c, idx) => (
                    <span key={idx} className="bg-[#E8D9C5]/50 px-2 py-0.5 rounded-md">
                      {c}
                    </span>
                  ))}
                </div>
                
                <h4 className="font-serif text-xl text-[#2E3F2E] font-extrabold leading-tight">
                  {recipeOfTheWeek.nome}
                </h4>

                <p className="text-xs text-gray-500 line-clamp-2">
                  Uma fantástica receita nutritiva à base de {recipeOfTheWeek.ingredientes[0]}, {recipeOfTheWeek.ingredientes[1]} e sementes premium selecionadas de nosso catálogo.
                </p>

                <div className="flex gap-4 pt-2 text-[11px] text-[#2E3F2E] font-medium border-t border-[#FCFAF7]">
                  <span className="flex items-center gap-1">🔥 <strong className="font-extrabold text-xs">{recipeOfTheWeek.calorias} kcal</strong></span>
                  <span className="flex items-center gap-1">💪 <strong className="font-extrabold text-xs">{recipeOfTheWeek.proteina}g ptn</strong></span>
                  <span className="flex items-center gap-1">⚙️ <strong className="font-extrabold text-xs">{recipeOfTheWeek.dificuldade}</strong></span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToolsToCart(recipeOfTheWeek);
                  }}
                  className="flex-1 py-3 bg-[#2E3F2E] hover:bg-[#1C2C1C] text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]"
                >
                  <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
                  Comprar Ingredientes
                </button>
                <button 
                  onClick={(e) => toggleFavorite(recipeOfTheWeek.id, e)}
                  className="p-3 border border-[#E8D9C5] rounded-2xl bg-white hover:bg-[#FCFAF7] transition-all"
                >
                  <Heart className={`h-4.5 w-4.5 transition-all ${favorites.includes(recipeOfTheWeek.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-[#2E3F2E]'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MULTI-FILTER COMPONENT (SEARCH, CATEGORY PILLS, INGREDIENT TAGS) */}
      <div className="space-y-4 bg-white p-5 rounded-[2.5rem] border border-[#E8D9C5]/50 shadow-sm">
        <h4 className="text-xs font-black uppercase text-[#2E3F2E] tracking-widest flex items-center gap-1.5 mb-2">
          🔍 Filtros de Busca Avançados
        </h4>

        {/* Text Search */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Buscar receitas por nome, ingrediente da receita..."
            className="w-full pl-11 pr-4 py-3 text-xs bg-[#FCFAF7] border border-[#E8D9C5]/80 rounded-2xl outline-none focus:ring-1 focus:ring-[#2E3F2E] text-[#1C2C1C] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2E3F2E]/60" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gray-200/80 hover:bg-gray-200 flex items-center justify-center text-xs text-gray-500 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Category horizontal scroller */}
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase font-extrabold text-gray-400">Filtrar por Categoria</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.8 text-xs font-bold rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-[#2E3F2E] text-[#E8D9C5] shadow-sm transform scale-102' 
                    : 'bg-[#FCFAF7] text-[#2E3F2E] border border-[#E8D9C5]/60 hover:border-[#2E3F2E]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients multi-select toggle array */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] uppercase font-extrabold text-gray-400">Ingredientes Principais Tas Grãos</p>
          <div className="flex flex-wrap gap-1.5">
            {popularFilterIngredients.map((ing) => {
              const isSelected = selectedIngredients.includes(ing.key);
              return (
                <button
                  key={ing.key}
                  onClick={() => handleToggleIngredientFilter(ing.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#D4AF37] text-white shadow-xs' 
                      : 'bg-[#FCFAF7] text-gray-600 border border-gray-150 hover:bg-gray-100/55'
                  }`}
                >
                  {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  {ing.label}
                </button>
              );
            })}
            
            {selectedIngredients.length > 0 && (
              <button 
                onClick={() => setSelectedIngredients([])}
                className="text-[10px] font-bold text-red-600 underline pl-1"
              >
                Limpar Sementes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. CHRONOLOGICAL FILTERED RESULTS OR STANDARD PREMIUM HOME SECTIONS */}
      
      {/* Search outcome or specific filters page view */}
      {(searchQuery !== '' || selectedCategory !== 'Todas' || selectedIngredients.length > 0) ? (
        <div className="space-y-5 text-left animate-slideup">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-serif text-lg font-black text-[#1C2C1C]">
              🔍 Resultados Encontrados ({filteredRecipes.length})
            </h3>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todas');
                setSelectedIngredients([]);
              }}
              className="text-xs text-emerald-800 font-extrabold hover:underline"
            >
              Resetar Tudo
            </button>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-[#E8D9C5]/60 text-center space-y-3 shadow-xs">
              <BookOpen className="h-12 w-12 text-[#E8D9C5] mx-auto animate-bounce" />
              <p className="text-sm font-bold text-[#1C2C1C]">Nenhuma receita corresponde aos seus filtros.</p>
              <p className="text-xs text-gray-400">Experimente habilitar outras sementes ou limpar o campo de busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  favorites={favorites} 
                  toggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                  onSelect={() => setActiveRecipe(recipe)}
                  onAddToCart={() => handleAddToolsToCart(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD RENDER: PINTEREST & SPOTIFY INSPIRED GOURMET DIET MODULES */
        <div className="space-y-10">

          {/* Section A: MAIS SAUDÁVEIS (Antioxidantes / Baixa Caloria) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <div>
                <h3 className="font-serif text-lg font-black text-[#1C2C1C] flex items-center gap-1.5">
                  <Leaf className="h-5 w-5 text-emerald-700 animate-pulse" /> Mais Saudáveis
                </h3>
                <p className="text-[10px] text-gray-400 bg-emerald-50 px-2 py-0.5 mt-0.5 rounded rounded-full inline-block">Opções ricas com calorias controladas até 150 kcal</p>
              </div>
            </div>
            
            <div className="flex gap-4.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {healthiestRecipes.map((recipe) => (
                <div key={recipe.id} className="w-[82%] sm:w-[48%] md:w-[31%] shrink-0 snap-start">
                  <RecipeCard 
                    recipe={recipe} 
                    favorites={favorites} 
                    toggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                    onSelect={() => setActiveRecipe(recipe)}
                    onAddToCart={() => handleAddToolsToCart(recipe)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section B: MAIS PEDIDAS (Granolas & Castanhas) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <div>
                <h3 className="font-serif text-lg font-black text-[#1C2C1C] flex items-center gap-1.5">
                  <TrendingUp className="h-5 w-5 text-amber-600 animate-pulse" /> Mais Pedidas
                </h3>
                <p className="text-[10px] text-gray-400 bg-amber-50 px-2 py-0.5 mt-0.5 rounded rounded-full inline-block">As campeãs de vendas no balcão da Tas Grãos</p>
              </div>
            </div>

            <div className="flex gap-4.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {popularRecipes.map((recipe) => (
                <div key={recipe.id} className="w-[82%] sm:w-[48%] md:w-[31%] shrink-0 snap-start">
                  <RecipeCard 
                    recipe={recipe} 
                    favorites={favorites} 
                    toggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                    onSelect={() => setActiveRecipe(recipe)}
                    onAddToCart={() => handleAddToolsToCart(recipe)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section C: RECEITAS FITNESS (Energia & Whey Protein) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <div>
                <h3 className="font-serif text-lg font-black text-[#1C2C1C] flex items-center gap-1.5">
                  <Dumbbell className="h-5 w-5 text-indigo-700 animate-pulse" /> Receitas Fitness
                </h3>
                <p className="text-[10px] text-gray-400 bg-indigo-50 px-2 py-0.5 mt-0.5 rounded rounded-full inline-block">Propostas proteicas e energéticas para atletas de alta demanda</p>
              </div>
            </div>

            <div className="flex gap-4.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {fitnessRecipes.map((recipe) => (
                <div key={recipe.id} className="w-[82%] sm:w-[48%] md:w-[31%] shrink-0 snap-start">
                  <RecipeCard 
                    recipe={recipe} 
                    favorites={favorites} 
                    toggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                    onSelect={() => setActiveRecipe(recipe)}
                    onAddToCart={() => handleAddToolsToCart(recipe)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. GOURMET RECIPE DETAIL DRAWER MODAL */}
      <AnimatePresence>
        {activeRecipe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 text-left"
            onClick={() => setActiveRecipe(null)}
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white w-full sm:max-w-xl rounded-t-[2.5rem] sm:rounded-[2.5rem] max-h-[88vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl border-t border-emerald-900/10 flex flex-col focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Visual Image */}
              <div className="relative h-56 sm:h-64 bg-[#E8D9C5]/30 shrink-0">
                <img 
                  src={activeRecipe.imagem} 
                  alt={activeRecipe.nome} 
                  className="w-full h-full object-cover"
                />
                
                {/* Close Button */}
                <button 
                  onClick={() => setActiveRecipe(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Info Badges */}
                <span className="absolute bottom-4 left-4 bg-[#1C2C1C]/90 text-[#FAF6F0] text-[9.5px] font-black px-3.5 py-1.8 rounded-full uppercase tracking-widest">
                  ⏱️ {activeRecipe.tempoPreparo}
                </span>

                <span className="absolute bottom-4 right-4 bg-[#D4AF37] text-[#1C2C1C] text-[9.5px] font-black px-3.5 py-1.8 rounded-full uppercase tracking-widest shadow-lg">
                  💪 {activeRecipe.dificuldade}
                </span>
              </div>

              {/* Main Content Body Container */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider bg-[#1C2C1C]/5 px-3 py-1 rounded-full">{activeRecipe.categoria}</span>
                  <h3 className="font-serif text-2xl font-black text-[#2E3F2E] tracking-tight leading-tight mt-2">{activeRecipe.nome}</h3>
                </div>

                {/* Mini Nutrition Infographic */}
                <div className="grid grid-cols-2 gap-3 bg-[#FCFAF7] p-4 rounded-3xl border border-[#E8D9C5]/60">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-extrabold text-gray-400">🔥 Valor Energético</p>
                    <p className="text-xl font-mono font-black text-[#2E3F2E]">{activeRecipe.calorias} <span className="text-xs font-sans font-normal text-gray-500">kcal</span></p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: `${Math.min(100, (activeRecipe.calorias / 600) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-extrabold text-gray-400">💪 Proteínas</p>
                    <p className="text-xl font-mono font-black text-[#2E3F2E]">{activeRecipe.proteina}g <span className="text-xs font-sans font-normal text-gray-500">g de ptn</span></p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: `${Math.min(100, (activeRecipe.proteina / 35) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Left/Right Split details: Ingredients & Preparo */}
                <div className="space-y-4">
                  <h4 className="font-serif text-sm font-black text-[#1C2C1C] border-b pb-1 flex items-center gap-1">
                    📝 Lista de Ingredientes
                  </h4>
                  <ul className="space-y-2">
                    {activeRecipe.ingredientes.map((ing, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-gray-600 leading-relaxed">
                        <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full mt-1.8 shrink-0"></span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif text-sm font-black text-[#1C2C1C] border-b pb-1 flex items-center gap-1">
                    👩‍🍳 Modo de Preparo
                  </h4>
                  <ol className="space-y-3.5">
                    {activeRecipe.preparo.map((step, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs text-gray-600 leading-relaxed">
                        <span className="flex items-center justify-center font-mono font-black h-5 w-5 bg-[#E8D9C5] text-[#2E3F2E] text-[10px] rounded-full shrink-0">
                          {idx + 1}
                        </span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Special Highlight: Tas Grãos matching products used in this recipe! */}
                <div className="bg-[#2E3F2E]/5 border border-[#2E3F2E]/20 rounded-3xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="text-[11px] font-black uppercase text-[#2E3F2E] tracking-widest">
                      🌿 Produtos Tas Grãos Utilizados
                    </h5>
                    <span className="text-[9px] text-[#2E3F2E]/80 font-bold bg-[#E8D9C5] px-2 py-0.5 rounded">Garantia Nutricional</span>
                  </div>
                  
                  <div className="space-y-2">
                    {activeRecipe.produtosTasGraos.map((p, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs pb-1.5 border-b border-[#E8D9C5]/40 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="font-bold text-[#1C2C1C]">{p.nome}</span>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#2E3F2E] font-mono">
                          R$ {p.precoSugerido100g.toFixed(2)} /100g
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Interactive Actions inside Modal container */}
                <div className="flex gap-3 pt-4 border-t border-[#FCFAF7] shrink-0">
                  <button 
                    onClick={() => {
                      handleAddToolsToCart(activeRecipe);
                      setActiveRecipe(null);
                    }}
                    className="flex-1 py-4 bg-[#2E3F2E] hover:bg-[#1C2C1C] text-[#FAF6F0] rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-98"
                  >
                    <ShoppingBag className="h-4.5 w-4.5 text-[#D4AF37]" />
                    Adicionar Ingredientes ao Carrinho
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      toggleFavorite(activeRecipe.id, e);
                    }}
                    className="p-4 border border-[#E8D9C5] bg-white hover:bg-[#FCFAF7] rounded-2xl text-[#2E3F2E] transition-all"
                  >
                    <Heart className={`h-5 w-5 transition-all ${favorites.includes(activeRecipe.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-[#2E3F2E]'}`} />
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* HIGH FIDELITY SMALL COMPONENT: RECIPE CARD EXCELLENCE */
interface RecipeCardProps {
  key?: string;
  recipe: RecipeType;
  favorites: string[];
  toggleFavorite: (e: React.MouseEvent) => void;
  onSelect: () => void;
  onAddToCart: () => void;
}

function RecipeCard({ recipe, favorites, toggleFavorite, onSelect, onAddToCart }: RecipeCardProps) {
  const isFav = favorites.includes(recipe.id);
  
  return (
    <motion.div 
      initial={{ opacity:0, y: 15 }}
      animate={{ opacity:1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      onClick={onSelect}
      className="group bg-white rounded-[2rem] border border-[#E8D9C5]/60 hover:border-[#D4AF37]/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[390px] cursor-pointer"
    >
      {/* Decorative Image header frame */}
      <div className="relative h-44 bg-[#E8D9C5]/10 overflow-hidden shrink-0">
        <img 
          src={recipe.imagem} 
          alt={recipe.nome} 
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Favorite circle on the top-right corner */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3.5 right-3.5 p-2 bg-white/95 rounded-full shadow-xs hover:scale-110 active:scale-90 transition-transform z-10"
        >
          <Heart className={`h-4 w-4 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
        </button>

        {/* Cook Prep time label in top-left */}
        <span className="absolute top-3.5 left-3.5 bg-[#1C2C1C]/90 text-[#FAF6F0] text-[8px] font-black px-2.5 py-1.2 rounded-full uppercase tracking-wider">
          ⏱️ {recipe.tempoPreparo}
        </span>
      </div>

      {/* Text block body inside card */}
      <div className="p-4 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Main category label */}
          <span className="text-[9px] font-extrabold uppercase text-[#D4AF37] tracking-wider">{recipe.categoria}</span>
          
          <h4 className="font-serif text-sm font-bold text-[#2E3F2E] leading-tight line-clamp-2 mt-1 group-hover:text-amber-800 transition-colors">
            {recipe.nome}
          </h4>

          {/* Quick Stats banner */}
          <div className="flex gap-3 text-[10px] text-gray-500 font-medium py-2 border-b border-[#FCFAF7]/20 mt-1">
            <span className="flex items-center gap-0.5">🔥 <strong className="font-extrabold text-[#1C2C1C] font-mono">{recipe.calorias} kcal</strong></span>
            <span className="flex items-center gap-0.5">💪 <strong className="font-extrabold text-[#1C2C1C] font-mono">{recipe.proteina}g ptn</strong></span>
            <span className="flex items-center gap-0.5">⚙️ <strong className="font-extrabold text-[#1C2C1C]">{recipe.dificuldade}</strong></span>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          {/* Ingredients snippet label */}
          <p className="text-[10px] text-gray-400 font-medium truncate">
            {recipe.ingredientes.join(' • ')}
          </p>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full py-2.8 bg-[#2E3F2E] hover:bg-[#1C2C1C] active:scale-98 text-white rounded-xl text-[10.5px] font-bold transition-all flex items-center justify-center gap-1 hover:shadow-sm"
          >
            <Plus className="h-3.5 w-3.5 text-[#D4AF37] font-black" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </motion.div>
  );
}

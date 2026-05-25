import { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, ShoppingCart, Apple, Zap, Moon, Heart, Trash2 } from 'lucide-react';
import { Recipe, Product } from '../types';

interface NutritionistAIProps {
  onAddProductToCartByProductId: (id: string, weightGrams: number) => void;
  allProducts: Product[];
}

export default function NutritionistAI({ onAddProductToCartByProductId, allProducts }: NutritionistAIProps) {
  const [goal, setGoal] = useState<string>('Disposição & Energia');
  const [ingredients, setIngredients] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const healthGoals = [
    { label: 'Disposição & Energia', icon: Zap, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { label: 'Detox & Digestão', icon: Apple, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'Apoio ao Sono', icon: Moon, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { label: 'Ganho de Massa Fit', icon: Sparkles, color: 'text-tas-gold bg-tas-bege border-tas-gold/30' },
  ];

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          goal,
          ingredients,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Falha ao sintonizar receita saudável.');
      }

      const data = await response.json();
      if (data.recipe) {
        // Generate a random seed image for food presentation
        const seedValue = Math.floor(Math.random() * 1000);
        data.recipe.image = `https://picsum.photos/seed/recipe${seedValue}/800/600`;
        data.recipe.isAiGenerated = true;
        setGeneratedRecipe(data.recipe);
      } else {
        throw new Error('Retorno inválido do servidor.');
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyIngredients = () => {
    if (!generatedRecipe) return;
    let addedCount = 0;
    generatedRecipe.ingredients.forEach((ing) => {
      if (ing.isAvailableInStore) {
        // Try matching by name or predefined ID
        let matchedProduct = allProducts.find(
          (p) =>
            p.name.toLowerCase().includes(ing.name.toLowerCase()) ||
            ing.name.toLowerCase().includes(p.name.toLowerCase())
        );
        if (matchedProduct) {
          onAddProductToCartByProductId(matchedProduct.id, 250); // Add 250g as standard package
          addedCount++;
        } else if (ing.productId) {
          onAddProductToCartByProductId(ing.productId, 250);
          addedCount++;
        }
      }
    });

    if (addedCount > 0) {
      alert(`${addedCount} ingredientes naturais da Tas Grãos foram adicionados ao seu carrinho (250g cada)! 🌱🛒`);
    } else {
      alert('Ingredientes adicionados com sucesso!');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-tas-bege animate-slideup">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 sm:p-3 bg-tas-bege rounded-2xl">
          <Sparkles className="h-5 w-5 text-tas-gold" />
        </div>
        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-tas-dark font-semibold">Chef AI Nutricionista</h2>
          <p className="text-xs text-tas-terroir">Sintonize receitas fit & funcionais personalizadas</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-tas-dark/80 mb-6 leading-relaxed">
        Não sabe como usar spirulina, chia ou farinhas funcionais? Escolha seu objetivo de bem-estar ou conte quais ingredientes você já possui, e nossa Inteligência Artificial criará uma culinária gourmet saudável para você!
      </p>

      {/* Goal Selector */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-tas-dark mb-2 tracking-wide uppercase">1. Seu Objetivo de Saúde</label>
        <div className="grid grid-cols-2 gap-2">
          {healthGoals.map((g) => {
            const Icon = g.icon;
            const isSelected = goal === g.label;
            return (
              <button
                key={g.label}
                onClick={() => setGoal(g.label)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all text-xs sm:text-sm ${
                  isSelected
                    ? 'border-tas-gold bg-tas-bege font-semibold text-tas-dark'
                    : 'border-gray-100 bg-gray-50/50 text-tas-dark/70 hover:border-tas-bege'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-tas-gold' : 'text-gray-400'}`} />
                <span className="truncate">{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ingredients & Prompt Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-tas-dark mb-1 tracking-wide uppercase">2. Ingredientes Disponíveis (Opcional)</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ex: aveia, cacau em pó, chia..."
            className="w-full px-4 py-3 bg-slate-50 border border-gray-100/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-tas-gold text-tas-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-tas-dark mb-1 tracking-wide uppercase">3. Preferência extra (Opcional)</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Quero um bolo fofinho sem glúten..."
            rows={2}
            className="w-full px-4 py-3 bg-slate-50 border border-gray-100/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-tas-gold text-tas-dark resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateRecipe}
        disabled={loading}
        className="touch-ripple w-full py-4.5 bg-tas-olive text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-tas-olive-dark shadow-sm disabled:bg-tas-olive/50 disabled:cursor-not-allowed text-sm sm:text-base cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sintonizando Grãos & Sabores...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 text-tas-gold-light" />
            <span>Criar Receita Exclusiva IA</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 leading-relaxed text-center font-medium">
          {error}
        </div>
      )}

      {/* Generated Content Box */}
      {generatedRecipe && (
        <div className="mt-8 border-t border-tas-bege pt-6 animate-slideup">
          <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video shadow-sm">
            <img
              src={generatedRecipe.image}
              alt={generatedRecipe.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-tas-olive text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider backdrop-blur-md bg-opacity-90">
              <Sparkles className="h-3 w-3 text-tas-gold" />
              Sua Fórmula Exclusiva
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-tas-dark font-bold leading-tight mb-2">
            {generatedRecipe.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-tas-terroir mb-5 font-medium">
            <span className="bg-tas-bege px-2.5 py-1 rounded-lg">⏱️ {generatedRecipe.prepTime}</span>
            <span className="bg-tas-bege px-2.5 py-1 rounded-lg">🔥 {generatedRecipe.calories}</span>
            <span className="bg-tas-bege px-2.5 py-1 rounded-lg">🏋️ {generatedRecipe.difficulty}</span>
          </div>

          <div className="mb-5 bg-tas-cream border border-tas-gold/15 rounded-2xl p-4">
            <h4 className="font-serif text-sm font-semibold text-tas-dark mb-3 flex items-center gap-2 border-b border-tas-bege pb-2">
              <Apple className="h-4 w-4 text-tas-olive" />
              Ingredientes Selecionados:
            </h4>
            <ul className="space-y-2.5">
              {generatedRecipe.ingredients.map((ing, index) => (
                <li key={index} className="text-xs sm:text-sm flex items-start justify-between gap-1 text-tas-dark">
                  <span className="font-medium text-tas-dark/95">
                    • {ing.name} <span className="text-gray-400 font-normal">({ing.amount})</span>
                  </span>
                  {ing.isAvailableInStore && (
                    <span className="text-[10px] bg-tas-olive/10 text-tas-olive font-semibold px-2 py-0.5 rounded-full uppercase shrink-0">
                      Disponível na Tas Grãos
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-serif text-sm font-semibold text-tas-dark mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-tas-gold" />
              Instruções de Preparo:
            </h4>
            <ol className="space-y-3 pl-1">
              {generatedRecipe.instructions.map((step, index) => (
                <li key={index} className="text-xs sm:text-sm leading-relaxed flex gap-2.5">
                  <span className="text-tas-gold font-bold font-mono bg-tas-bege h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] sm:text-xs">
                    {index + 1}
                  </span>
                  <span className="text-tas-dark/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={handleBuyIngredients}
            className="touch-ripple w-full py-4 bg-tas-gold text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-tas-gold-dark text-sm sm:text-base cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Adicionar Ingredientes ao Carrinho</span>
          </button>
        </div>
      )}
    </div>
  );
}

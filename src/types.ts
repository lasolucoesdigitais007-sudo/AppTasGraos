export enum ActiveView {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  CATEGORIES = 'CATEGORIES',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  RECIPES = 'RECIPES',
  BENEFICIOS = 'BENEFICIOS',
  FAVORITES = 'FAVORITES',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN'
}

export interface ClientReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  category: string;
  pricePer100g: number;
  rating: number;
  reviews: ClientReview[];
  imageUrl: string;
  origin: string;
  nutritionalInfo: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
    fiber: string;
  };
  isVegan: boolean;
  isFitness: boolean;
  isGlutenFree: boolean;
}

export interface CartItem {
  id: string; // unique cart line ID (combines product.id + weightGrams)
  product: Product;
  weightGrams: number; // e.g. 100, 250, 500, 1000
  totalPrice: number;
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  ingredients: { name: string; amount: string; isAvailableInStore: boolean; productId?: string }[];
  instructions: string[];
  difficulty: "Fácil" | "Médio" | "Avançado";
  calories: string;
  image: string;
  isAiGenerated?: boolean;
}

export interface EducationalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  content: string[];
  tips: string[];
  tags: string[];
  imageUrl: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'PIX' | 'Cartão de Crédito' | 'WhatsApp Direct';
  status: 'pendente' | 'preparando' | 'enviado' | 'entregue';
  trackerCode: string;
  address: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  rewardPoints: number;
  orderHistory: Order[];
}

export interface RecipeType {
  id: string;
  nome: string;
  categoria: string; // Categoria principal
  categorias: string[]; // Todas as categorias associadas
  imagem: string;
  tempoPreparo: string;
  dificuldade: 'Fácil' | 'Médio' | 'Difícil';
  ingredientes: string[];
  preparo: string[];
  produtosTasGraos: {
    nome: string;
    precoSugerido100g: number;
    categoriaSugerida: string;
    idSugerido: string;
  }[];
  calorias: number;
  proteina: number;
  favorito?: boolean;
}

export const LIST_OF_50_RECIPES: RecipeType[] = [
  {
    id: "rec-p-1",
    nome: "Overnight Oats de Morango e Chia",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Receitas com chia", "Receitas com aveia", "Receitas rápidas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "4 colheres de sopa de Aveia Laminada",
      "1 colher de sopa de Semente de Chia",
      "100ml de leite vegetal (amêndoas ou coco)",
      "4 morangos frescos picados",
      "1 colher de sobremesa de Mel Puro"
    ],
    preparo: [
      "Em um pote de vidro de 200ml, misture a aveia laminada, a chia e o leite vegetal.",
      "Adoce com o mel e mexa bem para que a chia absorva o líquido de forma homogênea.",
      "Adicione os morangos picados no topo ou em camadas.",
      "Tampe o pote e leve à geladeira por pelo menos 4 horas (ou durante a noite).",
      "Sirva gelado pela manhã."
    ],
    produtosTasGraos: [
      { nome: "Aveia Laminada Premium", precoSugerido100g: 2.80, categoriaSugerida: "Grãos", idSugerido: "grain-aveia" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Mel Silvestre Silvestre Orgânico", precoSugerido100g: 8.90, categoriaSugerida: "Temperos", idSugerido: "temp-mel" }
    ],
    calorias: 245,
    proteina: 8
  },
  {
    id: "rec-p-2",
    nome: "Panqueca Proteica de Banana e Aveia",
    categoria: "Fitness",
    categorias: ["Fitness", "Proteico", "Receitas com aveia", "Café da manhã"],
    imagem: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 banana madura",
      "2 ovos inteiros",
      "3 colheres de sopa de Aveia em Flocos Finos",
      "1 scoop de Whey Protein Grãos (Baunilha ou Cacau)",
      "1 pitada de Canela em Pó"
    ],
    preparo: [
      "Em um prato prático, amasse bem a banana com um garfo.",
      "Misture os ovos, a aveia, a dose de whey protein e a pitada de canela até obter uma massa uniforme.",
      "Aqueça uma frigideira antiaderente untada com um fio de óleo de coco.",
      "Despeje porções da massa e cozinhe em fogo baixo até dourar os dois lados.",
      "Sirva quente com toppings saudáveis, como rodelas de banana ou mel."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Finos", precoSugerido100g: 2.60, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-finos" },
      { nome: "Canela em Pó Pura", precoSugerido100g: 4.80, categoriaSugerida: "Temperos", idSugerido: "temp-canela" },
      { nome: "Whey Protein Pure Concentrado", precoSugerido100g: 18.90, categoriaSugerida: "Sementes", idSugerido: "seed-whey" }
    ],
    calorias: 320,
    proteina: 26
  },
  {
    id: "rec-p-3",
    nome: "Cookies de Aveia e Gotas de Chocolate Fit",
    categoria: "Lanches",
    categorias: ["Lanches", "Sobremesas", "Receitas com aveia", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "20 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 bananas bem maduras amassadas",
      "1 xícara de Aveia em Flocos Grossos",
      "2 colheres de sopa de Coco Ralado Fino sem Açúcar",
      "3 colheres de sopa de Cacau Nibs Premium",
      "1 colher de sopa de Mel ou Açúcar de Coco"
    ],
    preparo: [
      "Pré-aqueça o forno a 180°C e prepare uma fôrma untada ou com papel manteiga.",
      "Misture bem em um recipiente todos os ingredientes descritos até formar uma massa pegajosa mas moldável.",
      "Com o auxílio de uma colher, faça bolinhas e amasse-as no formato de cookies na fôrma.",
      "Leve para assar por cerca de 15 minutos até as bordas ficarem sequinhas e crocantes.",
      "Deixe esfriar completamente antes de retirar para garantir a crocância perfecta."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Grossos", precoSugerido100g: 2.70, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-grossa" },
      { nome: "Cacau Nibs Orgânico Premium", precoSugerido100g: 14.50, categoriaSugerida: "Sementes", idSugerido: "seed-cacau-nibs" },
      { nome: "Coco Ralado Integral sem Açúcar", precoSugerido100g: 5.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-ralado" }
    ],
    calorias: 180,
    proteina: 5
  },
  {
    id: "rec-p-4",
    nome: "Smoothie Energético de Açaí e Guaraná",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Fitness", "Receitas rápidas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 polpa de açaí puro (sem xarope de guaraná artificial)",
      "1 colher de chá de Guaraná em Pó",
      "1 banana congelada fatiada",
      "150ml de água de coco natural",
      "1 colher de chá de Sementes de Cânhamo ou Girassol"
    ],
    preparo: [
      "Coloque tudo no liquidificador: o açaí, o guaraná em pó, a banana congelada e a água de coco.",
      "Bata na velocidade máxima até obter um creme espesso, aveludado e uniforme.",
      "Despeje no copo e salpique sementes de girassol por cima para dar uma textura crocante.",
      "Consuma imediatamente antes do treino esportivo."
    ],
    produtosTasGraos: [
      { nome: "Guaraná em Pó Natural", precoSugerido100g: 7.20, categoriaSugerida: "Sementes", idSugerido: "seed-guarana" },
      { nome: "Sementes de Girassol Sem Casca Tostadas", precoSugerido100g: 3.90, categoriaSugerida: "Sementes", idSugerido: "seed-girassol" }
    ],
    calorias: 215,
    proteina: 4
  },
  {
    id: "rec-p-5",
    nome: "Granola Caseira Premium com Mel e Nozes",
    categoria: "Receitas com granola",
    categorias: ["Receitas com granola", "Receitas com castanhas", "Receitas rápidas", "Lanches", "Sobremesas"],
    imagem: "https://images.unsplash.com/photo-1517093157656-b9ecdfaa4e08?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "20 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 xícaras de Aveia Grossa",
      "1/2 xícara de Nozes Quartzo Chilenas picadas",
      "1/4 xícara de Castanha de Caju W1 Tostada",
      "3 colheres de sopa de Mel Silvestre",
      "2 colheres de sopa de Sementes de Abóbora descascadas"
    ],
    preparo: [
      "Misture a aveia, as nozes picadas, as castanhas e as sementes em um recipiente tigela.",
      "Despeje o mel e envolva delicadamente todos os grãos na mistura adocicada.",
      "Espalhe em uma assadeira ampla, deixando o mais nivelado possível.",
      "Leve ao forno baixo (150°C) por 15 minutos, mexendo no meio do tempo para dourar de forma equilibrada.",
      "Espere esfriar totalmente na fôrma para ficar maravilhosamente crocante."
    ],
    produtosTasGraos: [
      { nome: "Nozes Quartzo Chilenas Extra", precoSugerido100g: 13.90, categoriaSugerida: "Castanhas", idSugerido: "nut-nozes" },
      { nome: "Castanha de Caju Tostada W1", precoSugerido100g: 12.50, categoriaSugerida: "Castanhas", idSugerido: "nut-caju" },
      { nome: "Semente de Abóbora sem Casca", precoSugerido100g: 6.80, categoriaSugerida: "Sementes", idSugerido: "seed-abobora" }
    ],
    calorias: 290,
    proteina: 9
  },
  {
    id: "rec-p-6",
    nome: "Barrinha de Cereal de Damasco e Linhaça",
    categoria: "Lanches",
    categorias: ["Lanches", "Vegano", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1548695607-9c73430ba065?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "8 Damascos Turcos Desidratados picados",
      "1 xícara de Tâmaras sem Caroço",
      "2 colheres de sopa de Farinha de Linhaça Marrom",
      "1/2 xícara de Amendoim sem Pele Tostado",
      "1 colher de sopa de Semente de Gergelim"
    ],
    preparo: [
      "No processador de alimentos ou liquidificador potente, bata os damascos e as tâmaras até formar uma pasta altamente colante.",
      "Adicione os amendoins tostados, a farinha de linhaça e o gergelim no processador.",
      "Pressione levemente usando a função pulsar para triturar os amendoins, sem desmanchar por completo.",
      "Forre uma pequena vasilha com filme plástico, pressione a massa no fundo preenchendo as bordas com espessura de 1,5cm.",
      "Leve ao congelador por 1 hora e, em seguida, corte com uma faca no formato de barrinhas."
    ],
    produtosTasGraos: [
      { nome: "Damasco Seco Turco Premium", precoSugerido100g: 9.80, categoriaSugerida: "Sementes", idSugerido: "seed-damasco" },
      { nome: "Tâmara Seca sem Caroço", precoSugerido100g: 7.50, categoriaSugerida: "Sementes", idSugerido: "seed-tamara" },
      { nome: "Farinha de Linhaça Marrom Pura", precoSugerido100g: 2.20, categoriaSugerida: "Farinhas", idSugerido: "flour-linhaca" },
      { nome: "Amendoim Tostado sem Pele Premium", precoSugerido100g: 3.10, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim" }
    ],
    calorias: 140,
    proteina: 4
  },
  {
    id: "rec-p-7",
    nome: "Bolo Fit de Banana e Farinha de Coco",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Low Carb", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "35 min",
    dificuldade: "Fácil",
    ingredientes: [
      "3 bananas maduras médias",
      "3 ovos orgânicos",
      "4 colheres de sopa de Farinha de Coco Integral Clara",
      "2 colheres de sopa de Óleo de Coco Extra Virgem",
      "1 colher de sopa de Fermento Químico em Pó"
    ],
    preparo: [
      "Bata no liquidificador as bananas amassadas, os ovos e o óleo de coco até dissolver todo o ovo.",
      "Despeje em uma vasilha e acrescente a farinha de coco aos poucos, misturando até que a farinha absorva a umidade.",
      "Incorpore o fermento químico suavemente com uma colher.",
      "Disponha em pequenas fôrmas de silicone individuais ou fôrma média de bolo inglês.",
      "Asse em forno médio (180°C) por 25 a 30 minutos ou até passar no teste do palito."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Coco Integral Clara", precoSugerido100g: 4.80, categoriaSugerida: "Farinhas", idSugerido: "flour-coco" },
      { nome: "Óleo de Coco Extra Virgem 200ml", precoSugerido100g: 15.00, categoriaSugerida: "Temperos", idSugerido: "temp-coco-oil" }
    ],
    calorias: 195,
    proteina: 6
  },
  {
    id: "rec-p-8",
    nome: "Mix de Castanhas Premium com Coco Chips",
    categoria: "Receitas com castanhas",
    categorias: ["Receitas com castanhas", "Lanches", "Low Carb", "Receitas rápidas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1/2 xícara de Castanha do Pará inteiras",
      "1/2 xícara de Amêndoas Cruas Inteiras",
      "1/4 xícara de Coco Desidratado Chips Tostado",
      "1/4 xícara de Uva Passa Escura Sem Caroço"
    ],
    preparo: [
      "Esse mix dispensa forno: basta combinar a Castanha do Pará, as Amêndoas, as Uvas Passas e as chips de Coco.",
      "Adicione em um pote de vidro hermeticamente higienizado e sacuda com cuidado.",
      "Excelente snack salutar para levar nas atividades diárias como trabalho, ginásio ou passeios de viagem."
    ],
    produtosTasGraos: [
      { nome: "Castanha do Pará Premium", precoSugerido100g: 11.90, categoriaSugerida: "Castanhas", idSugerido: "prod-1" },
      { nome: "Amêndoa Crua Inteira Select", precoSugerido100g: 8.90, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoa" },
      { nome: "Coco Desidratado Chips Tostado", precoSugerido100g: 6.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-chips" },
      { nome: "Uva Passa Escura Sem Caroço", precoSugerido100g: 2.90, categoriaSugerida: "Sementes", idSugerido: "seed-passas" }
    ],
    calorias: 160,
    proteina: 4
  },
  {
    id: "rec-p-9",
    nome: "Brigadeiro Fit de Whey Protein",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Proteico", "Fitness", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 colheres de sopa de Pasta de Amendoim Integral Integral",
      "1 scoop de Whey Protein sabor Chocolate",
      "1 colher de sopa de Cacau em Pó Solúvel 100%",
      "3 colheres de sopa de Leite de Amêndoas ou água morna",
      "Cacau Nibs para confeitar"
    ],
    preparo: [
      "Em um pequeno bowl ou xícara, mescle a pasta de amendoim, o cacau em pó e o whey protein de chocolate.",
      "Aos poucos, goteje água morna ou o leite vegetal, mexendo sem parar.",
      "Continue adicionando o líquido em colheradas mínimas para obter consistência pastosa idêntica a doce de colher.",
      "Divida em pequenos potinhos de porção única.",
      "Finalize decorando generosamente com Cacau Nibs em cima e leve à geladeira por 15 minutos."
    ],
    produtosTasGraos: [
      { nome: "Pasta de Amendoim Integral Gourmet", precoSugerido100g: 5.50, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim-pasta" },
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" },
      { nome: "Cacau Nibs Orgânico Premium", precoSugerido100g: 14.50, categoriaSugerida: "Sementes", idSugerido: "seed-cacau-nibs" }
    ],
    calorias: 190,
    proteina: 15
  },
  {
    id: "rec-p-10",
    nome: "Iogurte Proteico com Toppings de Sementes e Granola",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Receitas com granola", "Proteico", "Fitness", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 copo de iogurte grego natural desnatado",
      "3 colheres de sopa de Granola Artesanal Sem Açúcar",
      "1 colher de sopa de Gergelim Despeliculado Integral",
      "1 colher de chá de Sementes de Girassol Sem Casca"
    ],
    preparo: [
      "Coloque o iogurte grego na tigela de servir.",
      "Por cima, crie fileiras decorativas de granola artesanal.",
      "No meio, adicione o gergelim integral selecionado e as sementes de girassol.",
      "Misture ao saborear para extrair a melhor crocância das sementes da nossa loja."
    ],
    produtosTasGraos: [
      { nome: "Granola Artesanal Sem Açúcar", precoSugerido100g: 3.80, categoriaSugerida: "Grãos", idSugerido: "grain-granola" },
      { nome: "Gergelim Despeliculado Premium", precoSugerido100g: 4.10, categoriaSugerida: "Sementes", idSugerido: "seed-gergelim" },
      { nome: "Sementes de Girassol Sem Casca Tostadas", precoSugerido100g: 3.90, categoriaSugerida: "Sementes", idSugerido: "seed-girassol" }
    ],
    calorias: 230,
    proteina: 14
  },
  {
    id: "rec-p-11",
    nome: "Smoothie de Frutas Vermelhas com Linhaça Dourada",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Vegano", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1570222162624-9dfb5898cf85?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 xícara de frutas vermelhas congeladas (morangos, mirtilos, amoras)",
      "2 colheres de sopa de Farinha de Linhaça Dourada Estabilizada",
      "150ml de leite vegetal de coco ou amêndoa",
      "1 colher de sopa de Semente de Chia",
      "Adoçante Eritritol ou Stévia a gosto"
    ],
    preparo: [
      "No copo do liquidificador, verta o leite de coco ou amêndoa.",
      "Adicione as frutas congeladas, a farinha de linhaça dourada, a chia e o adoçante dietético.",
      "Bata por 2 minutos até que a chia e o gel congelado das frutas forme um suco super cremoso e homogêneo.",
      "Transfira para copo térmico e beba imediatamente no lanche da tarde."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Linhaça Dourada Premium", precoSugerido100g: 3.40, categoriaSugerida: "Farinhas", idSugerido: "flour-linhaca-dourada" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Eritritol Doce Natural 100% Puro", precoSugerido100g: 9.50, categoriaSugerida: "Temperos", idSugerido: "temp-eritritol" }
    ],
    calorias: 175,
    proteina: 5
  },
  {
    id: "rec-p-12",
    nome: "Bowl de Chia com Leite de Coco e Manga",
    categoria: "Receitas com chia",
    categorias: ["Receitas com chia", "Café da manhã", "Vegano", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "3 colheres de sopa de Semente de Chia Integral",
      "150ml de leite de coco espesso concentrado",
      "1/2 xícara de manga madura doce fatiada em cubos",
      "1 colher de sopa de Coco Desidratado Chips Tostado",
      "1 colher de chá de melado de cana ou mel"
    ],
    preparo: [
      "Em um copo ou potinho de sobremesa grande, dissolva bem a chia no leite de coco.",
      "Adicione o melado de cana e tampe o frasco por 10 minutos em temperatura ambiente, mexendo na metade do tempo para não empelotar.",
      "Leve para gelar por no mínimo 2 horas para adquirir textura de pudim.",
      "No momento de servir, complete no topo com os cubos de manga madura e salpique chips de coco tostados."
    ],
    produtosTasGraos: [
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Coco Desidratado Chips Tostado", precoSugerido100g: 6.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-chips" }
    ],
    calorias: 210,
    proteina: 6
  },
  {
    id: "rec-p-13",
    nome: "Pão Low Carb de Farinha de Amêndoas",
    categoria: "Low Carb",
    categorias: ["Low Carb", "Café da manhã", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "40 min",
    dificuldade: "Médio",
    ingredientes: [
      "1.5 xícaras de Farinha de Amêndoas Fina Select",
      "3 ovos frescos inteiros",
      "1/4 xícara de creme de leite ou iogurte natural",
      "1 colher de sopa de Fermento Químico em Pó",
      "1 colher de chá de Orégano Puro",
      "1 colher de sopa de Sementes de Gergelim para cobertura"
    ],
    preparo: [
      "No liquidificador ou mixer de mão, misture os ovos, o creme de leite, sal refinado e orégano até homogeneizar.",
      "Adicione a farinha de amêndoas e acione no pulsar até misturar completamente.",
      "Manual integre o fermento em pó mexendo lentamente.",
      "Disponha a massa fluida em uma fôrma tipo bolo inglês (retangular) previamente untada com manteiga.",
      "Asfalte as sementes de gergelim no topo e asse em forno pré-aquecido a 180°C por 30 minutos, vigiando para dourar a crosta."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Amêndoas Fina Select", precoSugerido100g: 14.80, categoriaSugerida: "Farinhas", idSugerido: "flour-amendoas" },
      { nome: "Orégano Chileno Desidratado", precoSugerido100g: 3.50, categoriaSugerida: "Temperos", idSugerido: "temp-oregano" },
      { nome: "Gergelim Despeliculado Premium", precoSugerido100g: 4.10, categoriaSugerida: "Sementes", idSugerido: "seed-gergelim" }
    ],
    calorias: 220,
    proteina: 11
  },
  {
    id: "rec-p-14",
    nome: "Muffin de Mousse de Cacau e Castanhas",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Receitas com castanhas", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "25 min",
    dificuldade: "Médio",
    ingredientes: [
      "1 xícara de Farelo de Aveia Fino",
      "3 colheres de sopa de Cacau em Pó Solúvel 100%",
      "3 colheres de sopa de Castanha do Pará picadas",
      "2 ovos inteiros",
      "3 colheres de sopa de Mel Silvestre",
      "1 colher de sopa de óleo de coco"
    ],
    preparo: [
      "Em um recipiente médio, quebre os ovos e junte o óleo de coco e o mel.",
      "Incorpore o cacau em pó puro e o farelo de aveia fina.",
      "Misture agressivamente com um fouet até eliminar bolhas sólidas.",
      "Adicione as castanhas do pará grosseiramente fatiadas na tigela, reservando umas poucas.",
      "Coloque nas forminhas de muffin, posicione o restante das castanhas no topo e asse por 18 minutos a 180°C."
    ],
    produtosTasGraos: [
      { nome: "Farelo de Aveia Fino Premium", precoSugerido100g: 2.20, categoriaSugerida: "Grãos", idSugerido: "grain-farelo-aveia" },
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" },
      { nome: "Castanha do Pará Premium", precoSugerido100g: 11.90, categoriaSugerida: "Castanhas", idSugerido: "prod-1" }
    ],
    calorias: 185,
    proteina: 6
  },
  {
    id: "rec-p-15",
    nome: "Salada Premium com Quinoa e Gergelim",
    categoria: "Vegano",
    categorias: ["Vegano", "Fitness", "Lanches", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "20 min",
    dificuldade: "Médio",
    ingredientes: [
      "1/2 xícara de Quinoa em Grãos Branca",
      "1 xícara de folhas verdes (rúcula ou alface)",
      "1/2 pimentão vermelho picado",
      "1 colher de sopa de Gergelim Despeliculado Premium",
      "Suco de limão fresco e sal rosa do Himalaia a gosto"
    ],
    preparo: [
      "Lave a quinoa crua sob água corrente abundante em peneira fina.",
      "Cozinhe a quinoa em 1 xícara de água fervendo com sal por 12-15 minutos até a água secar e ficar soltinha.",
      "Deixe esfriar completamente.",
      "Combine em um prato fundo salada as folhas verdes de sua preferência, o pimentão e a quinoa cozida fria.",
      "Tempere a gosto e decore salpicando as sementes tostadas de gergelim integral no encerramento."
    ],
    produtosTasGraos: [
      { nome: "Quinoa Branca Premium em Grãos", precoSugerido100g: 6.90, categoriaSugerida: "Grãos", idSugerido: "grain-quinoa" },
      { nome: "Gergelim Despeliculado Premium", precoSugerido100g: 4.10, categoriaSugerida: "Sementes", idSugerido: "seed-gergelim" },
      { nome: "Sal Rosa do Himalaia Fino", precoSugerido100g: 1.90, categoriaSugerida: "Temperos", idSugerido: "temp-sal-rosa" }
    ],
    calorias: 165,
    proteina: 7
  },
  {
    id: "rec-p-16",
    nome: "Tapioca Funcional com Semente de Linhaça",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Receitas rápidas", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "3 colheres de sopa de goma hidratada para tapioca",
      "1 colher de sopa de Semente de Linhaça Marrom Pura",
      "2 fatias de queijo minas frescal (ou recheio vegano)",
      "1 pitada de Orégano Chileno"
    ],
    preparo: [
      "Antes de levar ao fogo, misture de maneira seca a goma de tapioca hidratada com a semente de linhaça marrom.",
      "Peneire ou espalhe finamente a massa funcional combinada na chapa fria.",
      "Aqueça a frigideira em fogo moderado. Quando a goma começar a soltar as pontas, vire-a.",
      "Adicione as fatias de queijo frescal ou creme de tofu, salpique orégano natural.",
      "Dobre e sirva quente com café purista."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Linhaça Marrom Pura", precoSugerido100g: 2.20, categoriaSugerida: "Farinhas", idSugerido: "flour-linhaca" },
      { nome: "Orégano Chileno Desidratado", precoSugerido100g: 3.50, categoriaSugerida: "Temperos", idSugerido: "temp-oregano" }
    ],
    calorias: 190,
    proteina: 8
  },
  {
    id: "rec-p-17",
    nome: "Mingau de Aveia com Creme de Amendoim",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Receitas com aveia", "Lanches"],
    imagem: "https://images.unsplash.com/photo-1517431301282-eeb66b596168?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "8 min",
    dificuldade: "Fácil",
    ingredientes: [
      "4 colheres de sopa de Aveia em Flocos Finos",
      "200ml de leite desnatado ou leite de coco",
      "1.5 colheres de sopa de Pasta de Amendoim Integral",
      "1 banana picada em fatias",
      "1 colher de chá de mel para regar"
    ],
    preparo: [
      "Leve ao fogo brando a aveia com flocos finos e o leite de sua escolha.",
      "Mexa sem parar até engrossar em consistência cremosa clássica de mingau infantil.",
      "Desligue as chamas e deite a mistura quente em um prato de servir fundo.",
      "Adicione a pasta de amendoim integral integral no meio — ela vai derreter perfeitamente devido ao calor do prato.",
      "Decore o perímetro com as bananas fatiadas e a linha fina de mel natural."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Finos", precoSugerido100g: 2.60, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-finos" },
      { nome: "Pasta de Amendoim Integral Gourmet", precoSugerido100g: 5.50, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim-pasta" }
    ],
    calorias: 310,
    proteina: 11
  },
  {
    id: "rec-p-18",
    nome: "Mousse de Abacate Fit com Cacau 100%",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Low Carb", "Vegano", "Fitness", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 abacate grande tipo avocado maduro",
      "3 colheres de sopa de Cacau em Pó Solúvel 100%",
      "3 colheres de sopa de mel para adoçar (ou Eritritol dietético)",
      "1 colher de chá de essência baunilha líquida"
    ],
    preparo: [
      "Abra e extraia toda a polpa verde rica do abacate, descartando casca dura e caroço central.",
      "Coloque no copo de liquidificador juntando o cacau em pó puro, o mel de abelhas e essência de baunilha.",
      "Abuse do processamento manual ou motorizado até criar um mousse espumoso e verde escuro sem pedacinhos brutos.",
      "Divida nas taças individuais de sua cristaleira gourmet.",
      "Deixe resfriar por no mínimo uma hora antes de apresentar às visitas do almoço fitness."
    ],
    produtosTasGraos: [
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" },
      { nome: "Eritritol Doce Natural 100% Puro", precoSugerido100g: 9.50, categoriaSugerida: "Temperos", idSugerido: "temp-eritritol" }
    ],
    calorias: 195,
    proteina: 3
  },
  {
    id: "rec-p-19",
    nome: "Trufas de Tâmara e Castanha de Caju",
    categoria: "Lanches",
    categorias: ["Lanches", "Sobremesas", "Receitas com castanhas", "Vegano", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1544967082-d9d25dca7229?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 xícara de Tâmaras Secas sem Caroço",
      "1/2 xícara de Castanha de Caju Tostada W1 picada",
      "2 colheres de sopa de Coco Ralado Fino sem Açúcar",
      "1 colher de sopa de Cacau em Pó 100%"
    ],
    preparo: [
      "Deixe as tâmaras secas hidratando em água quente por 10 minutos para amolecerem as fibras.",
      "Escoe toda a água e processe-as até formar um puré maleável.",
      "Coloque na tigela adicionando a castanha de caju triturada fina e o cacau em pó puro.",
      "Forme bolinhas de tamanho médio com as próprias palmas das mãos ligeiramente molhadas.",
      "Passe todas as bolinhas no coco ralado fino até revestir por completo e sirva gelatinosas."
    ],
    produtosTasGraos: [
      { nome: "Tâmara Seca sem Caroço", precoSugerido100g: 7.50, categoriaSugerida: "Sementes", idSugerido: "seed-tamara" },
      { nome: "Castanha de Caju Tostada W1", precoSugerido100g: 12.50, categoriaSugerida: "Castanhas", idSugerido: "nut-caju" },
      { nome: "Coco Ralado Integral sem Açúcar", precoSugerido100g: 5.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-ralado" },
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" }
    ],
    calorias: 110,
    proteina: 3
  },
  {
    id: "rec-p-20",
    nome: "Pudim de Chia com Leite de Amêndoas e Kiwi",
    categoria: "Receitas com chia",
    categorias: ["Receitas com chia", "Sobremesas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "3 colheres de sopa de Semente de Chia",
      "150ml de leite de amêndoas suave premium",
      "1 kiwi inteiro picado em rodelas bem finas",
      "1 colher de sopa de Mel Silvestre Orgânico"
    ],
    preparo: [
      "Dissolva a chia de alta pureza no leite de amêndoas e adoce com o mel.",
      "Agite bem as sementes para banharem-se uniformemente no recipiente transparente.",
      "Acomode na geladeira guardado tampado por pelo menos 3 horas para ativar o gel da chia.",
      "Monte as taças encaixando fatias de kiwi fresco nas paredes do copo, despeje o pudim e devore."
    ],
    produtosTasGraos: [
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Mel Silvestre Silvestre Orgânico", precoSugerido100g: 8.90, categoriaSugerida: "Temperos", idSugerido: "temp-mel" }
    ],
    calorias: 180,
    proteina: 5
  },
  {
    id: "rec-p-21",
    nome: "Smoothie Verde Detox com Quinoa",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Fitness", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 colheres de sopa de Quinoa Branca cozida fina",
      "1 folha de couve picada e higienizada",
      "1/2 maçã verde ácida descascada",
      "Suco de 1 limão espremido na hora",
      "1 colher de chá de Semente de Chia para texturizar"
    ],
    preparo: [
      "Prepare os pedaços pequenos de maçã verde e couve.",
      "Introduza no liquidificador somando a quinoa cozida fria, o sumo azedo e 150ml de água com gelo.",
      "Processe os grãos de quinoa até virar uma emulsão cremosa.",
      "Coe ou consuma as fibras naturais adicionando as sementes de chia no topo para enriquecer as propriedades."
    ],
    produtosTasGraos: [
      { nome: "Quinoa Branca Premium em Grãos", precoSugerido100g: 6.90, categoriaSugerida: "Grãos", idSugerido: "grain-quinoa" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" }
    ],
    calorias: 145,
    proteina: 6
  },
  {
    id: "rec-p-22",
    nome: "Quebra-queixo Saudável de Coco e Mel",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Receitas rápidas", "Low Carb"],
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1.5 xícaras de Coco Desidratado Chips Tostado",
      "4 colheres de sopa de Mel Silvestre",
      "1 colher de chá de essência de amêndoas"
    ],
    preparo: [
      "Em uma panela funda de fogo lento, despeje o mel cozinhando-o até formar pequenas borbulhas sem queimar.",
      "Acrescente as chips de coco desidratado integral tostadas e mexa de forma contínua até caramelizar envoltos no mel.",
      "Goteje a essência perfumada para dar um toque gourmet na nossa confeitaria fitness.",
      "Vertam pequenas colheradas do quebra-queixo em uma forma forrada com pergaminho de papel.",
      "Após o esfriamento total os doces endurecem ficando extraordinários."
    ],
    produtosTasGraos: [
      { nome: "Coco Desidratado Chips Tostado", precoSugerido100g: 6.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-chips" },
      { nome: "Mel Silvestre Silvestre Orgânico", precoSugerido100g: 8.90, categoriaSugerida: "Temperos", idSugerido: "temp-mel" }
    ],
    calorias: 230,
    proteina: 4
  },
  {
    id: "rec-p-23",
    nome: "Crepioca Funcional com Chia e Ervas",
    categoria: "Fitness",
    categorias: ["Fitness", "Receitas com chia", "Receitas rápidas", "Café da manhã"],
    imagem: "https://images.unsplash.com/photo-1564490292-143e4a30b429?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 ovo caipira inteiro",
      "2 colheres de sopa de goma hidratada para tapioca",
      "1 colher de sopa de Semente de Chia",
      "1 pitada de Orégano Chileno Desidratado",
      "1 pitada de Sal Rosa do Himalaia Fino"
    ],
    preparo: [
      "Bata rapidamente o ovo inteiro com as colheres de goma de tapioca usando garfo pequeno em um prato.",
      "Introduza os grãos de chia crua, as ervas secas de orégano chileno e o sal rosa fino.",
      "Frite ambos os lados da crepioca dourando-a na frigideira quente com teflon intacto.",
      "Dobre ou recheie com folhas verdes e pasta saudável de ricota desnatada."
    ],
    produtosTasGraos: [
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Orégano Chileno Desidratado", precoSugerido100g: 3.50, categoriaSugerida: "Temperos", idSugerido: "temp-oregano" },
      { nome: "Sal Rosa do Himalaia Fino", precoSugerido100g: 1.90, categoriaSugerida: "Temperos", idSugerido: "temp-sal-rosa" }
    ],
    calorias: 215,
    proteina: 9
  },
  {
    id: "rec-p-24",
    nome: "Quiche Low Carb de Gergelim",
    categoria: "Low Carb",
    categorias: ["Low Carb", "Lanches"],
    imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "30 min",
    dificuldade: "Médio",
    ingredientes: [
      "1 xícara de Farinha de Amêndoas Fina Select",
      "3 colheres de sopa de Gergelim Despeliculado Premium",
      "1 ovo caipira",
      "2 colheres de sopa de manteiga gelada",
      "Recheio a gosto (ex: alho-poró cozido com ricota)"
    ],
    preparo: [
      "Una a farinha de amêndoas fina, o gergelim integral espetacular, o ovo e a manteiga gelada numa tigela grande.",
      "Amasse com as pontas dos dedos até solidificar em uma massa quebradiça úmida (massa podre saudável).",
      "Revista o fundo e beiradas de pequenas forminhas de silicone com a base crocante.",
      "Introduza o creme de recheio assado levemente por 10 minutos prévios.",
      "Asse tudo por mais 18 minutos no forno, finalizando até a beira de amêndoas dourar formosamente."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Amêndoas Fina Select", precoSugerido100g: 14.80, categoriaSugerida: "Farinhas", idSugerido: "flour-amendoas" },
      { nome: "Gergelim Despeliculado Premium", precoSugerido100g: 4.10, categoriaSugerida: "Sementes", idSugerido: "seed-gergelim" }
    ],
    calorias: 280,
    proteina: 10
  },
  {
    id: "rec-p-25",
    nome: "Mingau de Whey com Amêndoas Laminadas",
    categoria: "Proteico",
    categorias: ["Proteico", "Fitness", "Café da manhã", "Receitas com aveia"],
    imagem: "https://images.unsplash.com/photo-1517431301282-eeb66b596168?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "8 min",
    dificuldade: "Fácil",
    ingredientes: [
      "4 colheres de sopa de Farelo de Aveia Fino Premium",
      "1 scoop de Whey Protein Pure Baunilha",
      "2 colheres de sopa de Amêndoa Laminada Crua Premium",
      "1 colher de chá de Sementes de Chia",
      "150ml de água morna ou leite desnatado"
    ],
    preparo: [
      "Em uma caneca média, hidrate o farelo de aveia fina em água ou leite aquecido.",
      "Sem ferver diretamente, integre vigorosamente o scoop de whey protein de baunilha para manter os bioativos.",
      "Espalhe como cobertura as amêndoas fatiadas fininhas e as sementes cruas de chia.",
      "Consuma morno para um café da manhã altamente nutritivo que promove máxima hipertrofia de fibras corporais."
    ],
    produtosTasGraos: [
      { nome: "Farelo de Aveia Fino Premium", precoSugerido100g: 2.20, categoriaSugerida: "Grãos", idSugerido: "grain-farelo-aveia" },
      { nome: "Amêndoa Laminada Crua Premium", precoSugerido100g: 10.50, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoa-slice" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" }
    ],
    calorias: 290,
    proteina: 28
  },
  {
    id: "rec-p-26",
    nome: "Cookies Veganos de Pasta de Amendoim",
    categoria: "Vegano",
    categorias: ["Vegano", "Lanches", "Sobremesas", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1558961309-dbdf71799f14?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1/2 xícara de Pasta de Amendoim Integral Gourmet",
      "1/4 xícara de melado de cana (ou adoçante natural)",
      "4 colheres de sopa de Farelo de Aveia Fino",
      "1/4 xícara de Amendoim Sem Pele picado"
    ],
    preparo: [
      "Misture a pasta de amendoim integral e o melado de cana até virar uma mistura colante.",
      "Adicione as colheres de aveia fina e os pedacinhos triturados cru de amendoim selecionado.",
      "Modele pequenos discos chatos com colher de sopa.",
      "Distribua na bandeja e asse em forno delicado de 180°C por meros 10-12 minutos.",
      "São cookies de baixíssima caloria para os vegetarianos amantes de oleaginosas."
    ],
    produtosTasGraos: [
      { nome: "Pasta de Amendoim Integral Gourmet", precoSugerido100g: 5.50, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim-pasta" },
      { nome: "Farelo de Aveia Fino Premium", precoSugerido100g: 2.20, categoriaSugerida: "Grãos", idSugerido: "grain-farelo-aveia" },
      { nome: "Amendoim Tostado sem Pele Premium", precoSugerido100g: 3.10, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim" }
    ],
    calorias: 175,
    proteina: 7
  },
  {
    id: "rec-p-27",
    nome: "Smoothie Proteico de Cappuccino Fit",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Proteico", "Fitness", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 scoop de Whey Protein sabor Chocolate",
      "1 colher de chá de café solúvel forte",
      "200ml de leite vegetal de amêndoas gelado",
      "1 pitada de Canela em Pó Pura",
      "1 colher de chá de cacau em pó puro"
    ],
    preparo: [
      "Coloque no copo alto do mixer o leite de amêndoas refrigerado, o whey protein de chocolate e o café solúvel de sua marca favorita.",
      "Adicione as generosidades de cacau em pó original e canela moída aromática.",
      "Bata por 1 minuto de forma contínua para homogeneizar a espuma aerada do whey.",
      "Servir bem gelado. É ideal para antes do treino ou para acalmar os ânimos vespertinos."
    ],
    produtosTasGraos: [
      { nome: "Canela em Pó Pura", precoSugerido100g: 4.80, categoriaSugerida: "Temperos", idSugerido: "temp-canela" },
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" }
    ],
    calorias: 160,
    proteina: 24
  },
  {
    id: "rec-p-28",
    nome: "Snack Salgado de Grão de Bico e Alecrim",
    categoria: "Lanches",
    categorias: ["Lanches", "Vegano", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "25 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 xícara de grão-de-bico cozido e bem seco",
      "1 colher de sopa de Alecrim Chileno Desidratado",
      "1 colher de chá de Cúrcuma Pura em Pó",
      "1 colher de chá de Sal Rosa do Himalaia",
      "1 colher de sopa de azeite"
    ],
    preparo: [
      "Certifique-se de escorrer toda a umidade dos grãos de bico cozidos em papel toalha absorbente.",
      "Misture os grãos em um bowl com o azeite, o alecrim desidratado, pó dourado de cúrcuma e sal rosa moído.",
      "Disponha os grãos espaçados na grelha do forno ou gaveta da Airfryer.",
      "Asse a 200°C por 20 minutos agitando sempre até que fiquem parecendo pepitas crocantes sequinhas.",
      "Petisque assistindo futebol ou estudando à noite."
    ],
    produtosTasGraos: [
      { nome: "Alecrim Folhas Desidratado", precoSugerido100g: 3.60, categoriaSugerida: "Temperos", idSugerido: "temp-alecrim" },
      { nome: "Cúrcuma Pura em Pó (Açafrão)", precoSugerido100g: 4.20, categoriaSugerida: "Temperos", idSugerido: "temp-curcuma" },
      { nome: "Sal Rosa do Himalaia Fino", precoSugerido100g: 1.90, categoriaSugerida: "Temperos", idSugerido: "temp-sal-rosa" }
    ],
    calorias: 140,
    proteina: 6
  },
  {
    id: "rec-p-29",
    nome: "Pipoca Funcional com Gergelim e Cúrcuma",
    categoria: "Lanches",
    categorias: ["Lanches", "Receitas rápidas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1/2 xícara de milho especial para pipoca premium",
      "1 colher de sopa de Gergelim Despeliculado Premium",
      "1 colher de chá de Cúrcuma Pura em Pó",
      "1 colher de óleo de coco"
    ],
    preparo: [
      "Estoure a pipoca na panela untada com óleo de coco em fogo alto.",
      "Assim que reduzir o tempo dos estalos, transborde as pipocas quentes em uma travessa.",
      "Ainda quentes, salpique sal refinado, cúrcuma douradora e as sementes ricas de gergelim.",
      "Misture rapidamente gerando excelente fixação aromática saudável com antioxidantes incríveis."
    ],
    produtosTasGraos: [
      { nome: "Gergelim Despeliculado Premium", precoSugerido100g: 4.10, categoriaSugerida: "Sementes", idSugerido: "seed-gergelim" },
      { nome: "Cúrcuma Pura em Pó (Açafrão)", precoSugerido100g: 4.20, categoriaSugerida: "Temperos", idSugerido: "temp-curcuma" }
    ],
    calorias: 120,
    proteina: 4
  },
  {
    id: "rec-p-30",
    nome: "Creme de Papaya com Sementes de Chia",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Proteico", "Café da manhã"],
    imagem: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 mamão papaia maduro médio descaroçado",
      "1 scoop de Whey Protein sabor Baunilha",
      "2 colheres de sopa de Semente de Chia",
      "1 colher de sopa de Mel Silvestre"
    ],
    preparo: [
      "Bata no liquidificador ou use mixer direto para misturar a polpa mole do mamão e o whey de baunilha.",
      "Adoce sutilmente com uma colher de mel orgânico.",
      "Numa taça, adicione as sementes cruas de chia e misture levemente com uma espátula de silicone.",
      "Consuma frio para ajudar a melhorar o trânsito intestinal e absorver fitoativos."
    ],
    produtosTasGraos: [
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Mel Silvestre Silvestre Orgânico", precoSugerido100g: 8.90, categoriaSugerida: "Temperos", idSugerido: "temp-mel" }
    ],
    calorias: 220,
    proteina: 22
  },
  {
    id: "rec-p-31",
    nome: "Pão de Queijo de Frigideira com Aveia",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Receitas rápidas", "Receitas com aveia", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "8 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 ovo inteiro caipira",
      "2 colheres de sopa de polvilho doce ou azedo",
      "2 colheres de sopa de Aveia em Flocos Finos",
      "1 colher de sopa de queijo cottage ou requeijão light",
      "1 colher de chá de Sementes de Chia"
    ],
    preparo: [
      "Combine em um prato fundo o ovo caipira, o polvilho, a aveia para fins culinários e o queijo creme.",
      "Acrescente a chia e bata tudo com o garfo por um minuto.",
      "Despeje na frigideira untada mantendo o fogo moderado.",
      "Abuse do cozimento até ambos os lados dourarem perfeitamente com perfume típico de pão de queijo quentinho."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Finos", precoSugerido100g: 2.60, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-finos" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" }
    ],
    calorias: 180,
    proteina: 10
  },
  {
    id: "rec-p-32",
    nome: "Geleia Caseira Funcional de Red Berries com Chia",
    categoria: "Lanches",
    categorias: ["Lanches", "Receitas com chia", "Receitas rápidas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "12 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 xícaras de amora e morango orgânicos frescos",
      "2 colheres de sopa de Semente de Chia",
      "2 colheres de sopa de Eritritol ou adoçante natural",
      "Suco espremido de meio limão taiti"
    ],
    preparo: [
      "Ferva os morangos picados e as amoras no fogo brando com o sumo ácido de limão por cerca de 8 minutos até desmanchar as frutas.",
      "Remova o tacho do fogo mantendo as bagas quentes na panela.",
      "Misture a colherada mágica de sementes cruas de chia e Eritritol adoçador.",
      "As sementes de chia vão gelatinizar o suco quente de forma instantânea gerando excelente geleia sem necessidade de açúcar industrial."
    ],
    produtosTasGraos: [
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Eritritol Doce Natural 100% Puro", precoSugerido100g: 9.50, categoriaSugerida: "Temperos", idSugerido: "temp-eritritol" }
    ],
    calorias: 80,
    proteina: 2
  },
  {
    id: "rec-p-33",
    nome: "Torta de Limão Fit com Base de Castanhas",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Receitas com castanhas", "Low Carb", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "25 min",
    dificuldade: "Médio",
    ingredientes: [
      "1/2 xícara de Castanha de Caju Tostada W1 picada",
      "1/2 xícara de Nozes Quartzo Chilenas",
      "2 colheres de sopa de melado de cana",
      "Recheio: iogurte grego misturado com suco concentrado de 2 limões e adoçado com Stévia"
    ],
    preparo: [
      "No miniprocessador de alimentos, triture de forma conjunta as nozes seleccionadas e castanhas de caju selecionadas com o melado.",
      "Molde a crosta úmida caramelizada no interior de forminhas para tortinhas prensando firme com colher.",
      "Refrigere por vinte minutos para sedimentar as estruturas oleaginosas.",
      "Preencha com o iogurte cítrico refrescante de limão e decore com raspas verdes frescas."
    ],
    produtosTasGraos: [
      { nome: "Castanha de Caju Tostada W1", precoSugerido100g: 12.50, categoriaSugerida: "Castanhas", idSugerido: "nut-caju" },
      { nome: "Nozes Quartzo Chilenas Extra", precoSugerido100g: 13.90, categoriaSugerida: "Castanhas", idSugerido: "nut-nozes" }
    ],
    calorias: 240,
    proteina: 7
  },
  {
    id: "rec-p-34",
    nome: "Waffle Proteico de Granola e Mel",
    categoria: "Receitas com granola",
    categorias: ["Receitas com granola", "Proteico", "Café da manhã"],
    imagem: "https://images.unsplash.com/photo-1546272989-40c929af9c66?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 ovo inteiro caipira",
      "3 colheres de sopa de Aveia em Flocos Finos",
      "1 scoop de Whey de Baunilha",
      "2 colheres de sopa de Granola Artesanal Sem Açúcar",
      "Mel Silvestre Orgânico para regar"
    ],
    preparo: [
      "Misture intimamente o ovo caipira, a aveia clássica e o whey de baunilha em recipiente cilíndrico.",
      "Deite a massa na sua máquina de waffles previamente untada e quente.",
      "Asse até o sinal verde de crocância extrema.",
      "Adorne em cima espalhando o mix crocante em grãos de granola artesanal sem açúcar e fios de mel silvestre."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Finos", precoSugerido100g: 2.60, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-finos" },
      { nome: "Granola Artesanal Sem Açúcar", precoSugerido100g: 3.80, categoriaSugerida: "Grãos", idSugerido: "grain-granola" },
      { nome: "Mel Silvestre Silvestre Orgânico", precoSugerido100g: 8.90, categoriaSugerida: "Temperos", idSugerido: "temp-mel" }
    ],
    calorias: 260,
    proteina: 18
  },
  {
    id: "rec-p-35",
    nome: "Barra de Proteína Caseira de Amendoim",
    categoria: "Proteico",
    categorias: ["Proteico", "Fitness", "Lanches", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1548695607-9c73430ba065?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1/2 xícara de Pasta de Amendoim Integral Gourmet",
      "2 colheres de mel puro orgânico",
      "2 scoops de Whey Protein concentrado de chocolate",
      "3 colheres de sopa de Farelo de Aveia Fino Premium"
    ],
    preparo: [
      "Em um pequeno recipiente refratário, derreta brevemente a pasta de amendoim com mel de abelhas no microondas por 20 segundos.",
      "Integre de forma homogênea os copos dosadores de whey de cacau e o farelo fino de aveia.",
      "Transfira a pella consistente cinzenta para uma fôrma mini forrada e nivele uniformemente.",
      "Refrigere por 30 minutos na geladeira esportiva e corte fatias simétricas de puro ganho biológico."
    ],
    produtosTasGraos: [
      { nome: "Pasta de Amendoim Integral Gourmet", precoSugerido100g: 5.50, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim-pasta" },
      { nome: "Farelo de Aveia Fino Premium", precoSugerido100g: 2.20, categoriaSugerida: "Grãos", idSugerido: "grain-farelo-aveia" }
    ],
    calorias: 210,
    proteina: 18
  },
  {
    id: "rec-p-36",
    nome: "Topping Salad de Frutas com Sementes",
    categoria: "Vegano",
    categorias: ["Vegano", "Café da manhã", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1519996521430-02b798c1d881?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "Frutas da estação fatiadas (laranja, banana, uva, maçã)",
      "1 colher de sopa de Semente de Chia",
      "1 colher de sopa de Semente de Abóbora descascada",
      "1 colher de sopa de Sementes de Girassol Sem Casca"
    ],
    preparo: [
      "Monte uma farta salada de frutas frescas variadas em uma tigela de vidro.",
      "Por cima, despeje o trio poderoso de sementes cruas de chia, girassol tostado e abóbora higienizada.",
      "Dessa forma, equilibramos a carga glicêmica das frutas maduras retardando a digestão."
    ],
    produtosTasGraos: [
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Semente de Abóbora sem Casca", precoSugerido100g: 6.80, categoriaSugerida: "Sementes", idSugerido: "seed-abobora" },
      { nome: "Sementes de Girassol Sem Casca Tostadas", precoSugerido100g: 3.90, categoriaSugerida: "Sementes", idSugerido: "seed-girassol" }
    ],
    calorias: 140,
    proteina: 5
  },
  {
    id: "rec-p-37",
    nome: "Bolo de Caneca Funcional com Aveia",
    categoria: "Receitas rápidas",
    categorias: ["Receitas rápidas", "Sobremesas", "Receitas com aveia", "Lanches"],
    imagem: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "3 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 ovo caipira pequeno",
      "3 colheres de sopa de Aveia em Flocos Finos",
      "1 colher de sobremesa de Cacau em Pó Solúvel 100%",
      "1 colher de sopa de mel",
      "1 colher de café de fermento"
    ],
    preparo: [
      "Misture em um caneco de porcelana com capacidade superior a 250ml o ovo, a aveia fina e o cacau escuro purista.",
      "Coloque o mel de abelha e bata freneticamente até atingir um caldo denso.",
      "Manual integre o fermento em pó e asse no microondas por noventa segundos.",
      "Deguste quente com colher no desjejum."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Finos", precoSugerido100g: 2.60, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-finos" },
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" }
    ],
    calorias: 195,
    proteina: 8
  },
  {
    id: "rec-p-38",
    nome: "Shake Hipercalórico de Granola Amendoada",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Proteico", "Lanches", "Receitas com granola"],
    imagem: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "5 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1.5 copos de leite integral nutritivo ou leite vegetal",
      "4 colheres de sopa de Granola Artesanal Sem Açúcar",
      "1.5 colheres de sopa de Pasta de Amendoim Integral",
      "1 banana de casca amarela madura",
      "1 scoop de Whey de chocolate"
    ],
    preparo: [
      "Introduza as colheres de granola de alta-resolução da nossa loja com a banana fatiada no copo misturador.",
      "Acrescente a colher de goma pastosa de pasta de amendoim integral e uma dose de whey mineral.",
      "Processar por 2 minutos liquidificando bem até que as castanhas contidas na granola fiquem micromolhadas.",
      "Um excelente shake integral focado em volumoso estresse biológico focado no anabolismo muscular saudável."
    ],
    produtosTasGraos: [
      { nome: "Granola Artesanal Sem Açúcar", precoSugerido100g: 3.80, categoriaSugerida: "Grãos", idSugerido: "grain-granola" },
      { nome: "Pasta de Amendoim Integral Gourmet", precoSugerido100g: 5.50, categoriaSugerida: "Castanhas", idSugerido: "nut-amendoim-pasta" }
    ],
    calorias: 480,
    proteina: 32
  },
  {
    id: "rec-p-39",
    nome: "Molho de Ervas com Creme de Castanha",
    categoria: "Vegano",
    categorias: ["Vegano", "Lanches", "Low Carb", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 xícara de Castanha de Caju Crua selecionadas",
      "1 colher de sopa de Alecrim Chileno Desidratado",
      "1 dente de alho",
      "Suco espremido de meio limão"
    ],
    preparo: [
      "Com a castanha de caju crua deitada de molho prévio em água morna por 1 hora.",
      "Bata-as no liquidificador potente ou processador somando o alho, óleo, sumo cítrico e alecrim chileno desidratado.",
      "Vá despejando pequenos goles de água potável até modular em uma pasta cremosa homogênea similar a requeijão nobre.",
      "Excelente para barrar torradas na sua dieta natural com gorduras monoinsaturadas ricas."
    ],
    produtosTasGraos: [
      { nome: "Castanha de Caju Crua Tipo Exportação", precoSugerido100g: 12.50, categoriaSugerida: "Castanhas", idSugerido: "nut-caju-crua" },
      { nome: "Alecrim Folhas Desidratado", precoSugerido100g: 3.60, categoriaSugerida: "Temperos", idSugerido: "temp-alecrim" }
    ],
    calorias: 160,
    proteina: 5
  },
  {
    id: "rec-p-40",
    nome: "Maionese Vegana de Quinoa e Azeite",
    categoria: "Vegano",
    categorias: ["Vegano", "Lanches", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1470641474972-78c975027d54?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1/2 xícara de Quinoa Branca Premium cozida",
      "1/4 xícara de azeite extra virgem de oliva",
      "1 pitada de Sal Rosa do Himalaia",
      "Suco de meio limão fresco"
    ],
    preparo: [
      "Prepare ou recicle a quinoa cozida sem tempero frio e úmido.",
      "Coloque tudo no liquidificador: a quinoa escoada, a pitada de sal rosa do Himalaia e o suco do limão.",
      "Bata derramando um fio contínuo e gradual de azeite até a mistura incorporar oxigênio e adquirir um creme espesso brilhante de maionese saudável.",
      "Resfrie e divirta-se nos lanches gourmet à beira mar."
    ],
    produtosTasGraos: [
      { nome: "Quinoa Branca Premium em Grãos", precoSugerido100g: 6.90, categoriaSugerida: "Grãos", idSugerido: "grain-quinoa" },
      { nome: "Sal Rosa do Himalaia Fino", precoSugerido100g: 1.90, categoriaSugerida: "Temperos", idSugerido: "temp-sal-rosa" }
    ],
    calorias: 165,
    proteina: 4
  },
  {
    id: "rec-p-41",
    nome: "Doce de Abóbora com Coco sem Açúcar",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Low Carb", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "20 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 xícaras de abóbora cozida amassada",
      "1/2 xícara de Coco Ralado Integral sem Açúcar",
      "3 colheres de sopa de Eritritol ou adoçante natural",
      "3 Cravos da Índia aromáticos"
    ],
    preparo: [
      "Leve ao fogo brando a abóbora triturada úmida com o cravinho aromático e Eritritol fino.",
      "Mexa por 10 minutos integrando o coco ralado integral integral espetacular da nossa loja de grãos.",
      "Remova os cravos após o final do cozimento para não amargar.",
      "Transfira o doce amarelado para potes de vidro para armazenar de forma vedada na geladeira por 1 semana."
    ],
    produtosTasGraos: [
      { nome: "Coco Ralado Integral sem Açúcar", precoSugerido100g: 5.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-ralado" },
      { nome: "Eritritol Doce Natural 100% Puro", precoSugerido100g: 9.50, categoriaSugerida: "Temperos", idSugerido: "temp-eritritol" }
    ],
    calorias: 110,
    proteina: 2
  },
  {
    id: "rec-p-42",
    nome: "Energy Bite de Castanha do Pará e Café",
    categoria: "Fitness",
    categorias: ["Fitness", "Receitas com castanhas", "Lanches", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1544967082-d9d25dca7229?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1/2 xícara de Castanha do Pará inteiras",
      "1/2 xícara de Tâmaras Secas sem Caroço",
      "1 colher de chá de café solúvel forte em pó",
      "Coco ralado ou cacau em pó para cobrir"
    ],
    preparo: [
      "Bata as castanhas do Pará ligeiramente para fragmentá-las no mixer de alimentos.",
      "Acrescente as tâmaras previamente hidratadas e amolecidas e o pó fino de café de alta-resolução.",
      "Processe tudo em pulsar até aglutinar em uma massa gordurosa aromática de alta taxa energética.",
      "Molde deliciosas esferas de energia de 10 gramas, passe-as levemente no cacau em pó fino.",
      "Ideal lanche para mastigar em jejum matinal desportivo."
    ],
    produtosTasGraos: [
      { nome: "Castanha do Pará Premium", precoSugerido100g: 11.90, categoriaSugerida: "Castanhas", idSugerido: "prod-1" },
      { nome: "Tâmara Seca sem Caroço", precoSugerido100g: 7.50, categoriaSugerida: "Sementes", idSugerido: "seed-tamara" }
    ],
    calorias: 140,
    proteina: 3
  },
  {
    id: "rec-p-43",
    nome: "Tartar Vegano de Abacate e Linhaça",
    categoria: "Vegano",
    categorias: ["Vegano", "Low Carb", "Lanches", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "8 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 xícara de abacate fatiado em cubos pequenos",
      "1 colher de sopa de Semente de Linhaça Marrom",
      "1 colher de chá de Semente de Chia",
      "Sal rosa fina e rodelas picadas de tomate"
    ],
    preparo: [
      "Em um prato cerâmico para entradinhas elegantes, misture as sementes de linhaça e grãos cru de chia com os cubos de tomate.",
      "Acomode os cubos brilhantes de abacate no meio misturando com cuidado.",
      "Tempere asperamente com sal rosa do Himalaia e fios de azeite cítrico.",
      "Apresenta um layout contemporâneo focado na alta culinária natural."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Linhaça Marrom Pura", precoSugerido100g: 2.20, categoriaSugerida: "Farinhas", idSugerido: "flour-linhaca" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" },
      { nome: "Sal Rosa do Himalaia Fino", precoSugerido100g: 1.90, categoriaSugerida: "Temperos", idSugerido: "temp-sal-rosa" }
    ],
    calorias: 135,
    proteina: 3
  },
  {
    id: "rec-p-44",
    nome: "Panqueca Verde Funcional de Espinafre",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Fitness", "Receitas com chia", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1564490292-143e4a30b429?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 ovo inteiro caipira",
      "3 colheres de sopa de farinha de arroz ou farelo aveia",
      "6 folhinhas lavadas de espinafre cru",
      "1 colher de chá de Semente de Chia",
      "Sal e temperos desidratados"
    ],
    preparo: [
      "Bata no liquidificador ou use mixer direto para liquidificar o ovo caipira, a farinha de aveia fina e o espinafre orgânico fresco.",
      "Misture a colherada de sementes cruas de chia na massa líquida obtida verde cintilante.",
      "Grelhe dos dois lados na frigideira regada de óleo saudável.",
      "Fica excelente recheada com queijos moles cozidos."
    ],
    produtosTasGraos: [
      { nome: "Farelo de Aveia Fino Premium", precoSugerido100g: 2.20, categoriaSugerida: "Grãos", idSugerido: "grain-farelo-aveia" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" }
    ],
    calorias: 170,
    proteina: 8
  },
  {
    id: "rec-p-45",
    nome: "Creme Quente Funcional de Quinoa",
    categoria: "Vegano",
    categorias: ["Vegano", "Lanches"],
    imagem: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "20 min",
    dificuldade: "Médio",
    ingredientes: [
      "1/2 xícara de Quinoa Branca cozida escoada",
      "1 xícara de abóbora cozida lisa com água",
      "1 pitada de Cúrcuma Pura em Pó",
      "Noz-moscada ralada e sal rosa fino"
    ],
    preparo: [
      "Misture a abóbora amassada cozida em caldo de legumes leve com a quinoa previamente cozida.",
      "Ferva no fogo brando por cinco minutos para adensar e incorporar amidos saudáveis.",
      "Tempere salpicando a cúrcuma premium e raspa sutil de noz-moscada.",
      "Sirva quente em bowl térmico com fios rústicos de azeite."
    ],
    produtosTasGraos: [
      { nome: "Quinoa Branca Premium em Grãos", precoSugerido100g: 6.90, categoriaSugerida: "Grãos", idSugerido: "grain-quinoa" },
      { nome: "Cúrcuma Pura em Pó (Açafrão)", precoSugerido100g: 4.20, categoriaSugerida: "Temperos", idSugerido: "temp-curcuma" },
      { nome: "Sal Rosa do Himalaia Fino", precoSugerido100g: 1.90, categoriaSugerida: "Temperos", idSugerido: "temp-sal-rosa" }
    ],
    calorias: 180,
    proteina: 7
  },
  {
    id: "rec-p-46",
    nome: "Overnight de Banana e Whey Proteico",
    categoria: "Café da manhã",
    categorias: ["Café da manhã", "Proteico", "Receitas com aveia", "Fitness"],
    imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "10 min",
    dificuldade: "Fácil",
    ingredientes: [
      "4 colheres de sopa de Aveia em Flocos Finos",
      "1 scoop de Whey de chocolate ou baunilha",
      "100ml de leite desnatado gelado",
      "1 banana picada fatiada fatias"
    ],
    preparo: [
      "Combine de maneira firme em pote cilíndrico de vidro a aveia para fins culinários com o copo de leite gelado.",
      "Manual integre o whey protein vigorosamente para que dissolvesse no repouso gelado.",
      "Alinhe nas paredes do vidro fatias de banana e leve à geladeira por 5 horas.",
      "Perfeito lanche fortificante para tomar logo após despertar matinal desportivo."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Finos", precoSugerido100g: 2.60, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-finos" }
    ],
    calorias: 295,
    proteina: 25
  },
  {
    id: "rec-p-47",
    nome: "Crocante de Granola Salgada",
    categoria: "Receitas com granola",
    categorias: ["Receitas com granola", "Lanches", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "20 min",
    dificuldade: "Fácil",
    ingredientes: [
      "2 xícaras de Aveia em Flocos Grossos",
      "1/2 xícara de Semente de Abóbora sem Casca",
      "1/2 xícara de Sementes de Girassol Sem Casca",
      "1 colher de chá de Orégano Chileno Desidratado",
      "1 colher de chá de Cúrcuma Pura em Pó",
      "2 colheres de sopa de azeite e sal"
    ],
    preparo: [
      "Misture todos os ingredientes secos, as sementes ricas de girassol tocado, abóbora descascada e aveia grossa.",
      "Envolva delicadamente com o azeite de oliva e sal rosa a gosto em recipiente amplo.",
      "Asse no forno na bandeja por 15 minutos em fogo baixo mexendo sempre.",
      "Excelente para salpicar em cima de caldos gourmet e sopas quentinhas."
    ],
    produtosTasGraos: [
      { nome: "Aveia em Flocos Grossos", precoSugerido100g: 2.70, categoriaSugerida: "Grãos", idSugerido: "grain-aveia-grossa" },
      { nome: "Semente de Abóbora sem Casca", precoSugerido100g: 6.80, categoriaSugerida: "Sementes", idSugerido: "seed-abobora" },
      { nome: "Sementes de Girassol Sem Casca Tostadas", precoSugerido100g: 3.90, categoriaSugerida: "Sementes", idSugerido: "seed-girassol" },
      { nome: "Orégano Chileno Desidratado", precoSugerido100g: 3.50, categoriaSugerida: "Temperos", idSugerido: "temp-oregano" },
      { nome: "Cúrcuma Pura em Pó (Açafrão)", precoSugerido100g: 4.20, categoriaSugerida: "Temperos", idSugerido: "temp-curcuma" }
    ],
    calorias: 180,
    proteina: 7
  },
  {
    id: "rec-p-48",
    nome: "Smoothie Calmante de Maracujá com Linhaça",
    categoria: "Smoothies",
    categorias: ["Smoothies", "Receitas rápidas", "Vegano"],
    imagem: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "4 min",
    dificuldade: "Fácil",
    ingredientes: [
      "Polpa fresca de 1 maracujá (com sementes)",
      "1 banana congelada de casca amarela",
      "2 colheres de sopa de Farinha de Linhaça Marrom",
      "150ml de água mineral gelada"
    ],
    preparo: [
      "Adicione as colheradas de linhaça marrom da nossa loja, a banana gelada fatiada e a polpa fresca ácida no misturador.",
      "Bata de forma rítmica por um minuto até as sementes de maracujá e grãos de linhaça triturarem sutilmente.",
      "Diverte-se no fim do dia para regular hormônios e acalmar o estresse psicofísico."
    ],
    produtosTasGraos: [
      { nome: "Farinha de Linhaça Marrom Pura", precoSugerido100g: 2.20, categoriaSugerida: "Farinhas", idSugerido: "flour-linhaca" }
    ],
    calorias: 160,
    proteina: 4
  },
  {
    id: "rec-p-49",
    nome: "Brigadeiro Vegano com Leite de Coco",
    categoria: "Sobremesas",
    categorias: ["Sobremesas", "Vegano", "Receitas rápidas"],
    imagem: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "15 min",
    dificuldade: "Médio",
    ingredientes: [
      "1 xícara de leite de coco concentrado integral",
      "3 colheres de sopa de Cacau em Pó Solúvel 100%",
      "3 colheres de sopa de açúcar de coco ou Eritritol doce",
      "Cacau Nibs para confeitar"
    ],
    preparo: [
      "Coloque na panela antiaderente pequena o leite de coco, a colher de cacau sólido purista e o adoçante Eritritol.",
      "Mexa consistentemente até começar a ver o fundo brilhante dourado da panela por 12 minutos.",
      "Despeje em mini pratinhos cerâmicos, salpique pedacinhos crus refinados de cacau nibs.",
      "Comer de colherada fria assistindo filmes do cinema saudável."
    ],
    produtosTasGraos: [
      { nome: "Cacau em Pó Solúvel 100% Puro", precoSugerido100g: 4.50, categoriaSugerida: "Farinhas", idSugerido: "flour-cacau-po" },
      { nome: "Eritritol Doce Natural 100% Puro", precoSugerido100g: 9.50, categoriaSugerida: "Temperos", idSugerido: "temp-eritritol" },
      { nome: "Cacau Nibs Orgânico Premium", precoSugerido100g: 14.50, categoriaSugerida: "Sementes", idSugerido: "seed-cacau-nibs" }
    ],
    calorias: 140,
    proteina: 2
  },
  {
    id: "rec-p-50",
    nome: "Super Bowl de Pitaya com Granola",
    categoria: "Fitness",
    categorias: ["Fitness", "Receitas com granola", "Smoothies", "Vegano", "Café da manhã"],
    imagem: "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=600&auto=format&fit=crop&q=80",
    tempoPreparo: "7 min",
    dificuldade: "Fácil",
    ingredientes: [
      "1 xícara de polpa rosa congelada de pitaya",
      "1 banana de casca amarela congelada em cubos",
      "4 colheres de sopa de Granola Artesanal Sem Açúcar",
      "1 colher de sopa de Coco Desidratado Chips Tostado",
      "1 colher de chá de Semente de Chia"
    ],
    preparo: [
      "Crie um creme rosa espesso batendo a pitada e banana congeladas no processador ou mixer.",
      "Despeje em um bowl fundo de bambu de alto impacto visual natural.",
      "Finalize o cardápio arrumando em fileiras: a granola artesanal farta, sementes de chia e chips de coco chips.",
      "Completamente refrescante, com antioxidantes potentes em dose generosa diária de vida ativa."
    ],
    produtosTasGraos: [
      { nome: "Granola Artesanal Sem Açúcar", precoSugerido100g: 3.80, categoriaSugerida: "Grãos", idSugerido: "grain-granola" },
      { nome: "Coco Desidratado Chips Tostado", precoSugerido100g: 6.20, categoriaSugerida: "Sementes", idSugerido: "seed-coco-chips" },
      { nome: "Semente de Chia Integral", precoSugerido100g: 5.40, categoriaSugerida: "Sementes", idSugerido: "seed-chia" }
    ],
    calorias: 220,
    proteina: 5
  }
];

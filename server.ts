import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI if key is present
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in environment secrets.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getAiClient();

// API: Check health/availability
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasAi: !!ai,
    time: new Date().toISOString()
  });
});

// API: Generate premium recipe using Gemini
app.post("/api/gemini/recipe", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    if (!ai) {
      res.status(503).json({
        error: "Serviço Gemini temporariamente indisponível. Cadastre a chave GEMINI_API_KEY nas Configurações da plataforma."
      });
      return;
    }

    const { prompt, goal, ingredients } = req.body;
    
    const userPrompt = `Crie uma receita saudável premium e moderna para a loja Tas Grãos.
Foco de saúde/objetivo: ${goal || "Não especificado"}.
Ingredientes preferidos do cliente: ${ingredients || "Não especificados"}.
Solicitação extra do usuário: ${prompt || "Nenhuma"}.

Por favor, inclua ingredientes comuns do e-commerce da Tas Grãos como aveia, sementes (chia, linhaça), castanhas (caju, pará), cúrcuma, spirulina, farinhas especiais, quinoa, etc.`;

    const systemInstruction = `Você é o Chef AI Nutricionista especializado em culinária saudável e e-commerce premium de produtos naturais da Tas Grãos. 
Crie receitas originais, sofisticadas, nutritivas e funcionais em português do Brasil.
Apenas devolva dados estruturados em conformidade com o esquema JSON solicitado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Título criativo e premium da receita" },
            prepTime: { type: Type.STRING, description: "Tempo de preparo em minutos, ex: '25 min'" },
            difficulty: { type: Type.STRING, description: "Grau de dificuldade: 'Fácil', 'Médio' ou 'Avançado'" },
            calories: { type: Type.STRING, description: "Calorias estimadas por porção, ex: '220 kcal'" },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Nome do ingrediente saudável, ex: 'Semente de Chia Negra Premium'" },
                  amount: { type: Type.STRING, description: "Quantidade exata para a receita, ex: '2 colheres de sopa'" },
                  isAvailableInStore: { type: Type.BOOLEAN, description: "Verdadeiro se esse ingrediente está comumente disponível na loja de produtos naturais de grãos a granel (Sementes, Nozes, Farinhas funcionais, Chás, Temperos, Suplementos)." }
                },
                required: ["name", "amount", "isAvailableInStore"]
              }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Modo de preparo passo a passo detalhado e claro"
            }
          },
          required: ["title", "prepTime", "difficulty", "calories", "ingredients", "instructions"]
        }
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Opacidade: Gemini retornou resposta em branco.");
    }

    const recipeData = JSON.parse(responseText.trim());
    res.json({ recipe: recipeData });
  } catch (error: any) {
    console.error("Gemini Recipe Generation error:", error);
    res.status(500).json({
      error: "Ocorreu um erro ao gerar a sua receita premium de saúde. Por favor, tente novamente mais tarde.",
      details: error.message
    });
  }
});

// Setup Vite Dev Server / Static Hosting
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tas Grãos App running at http://localhost:${PORT}`);
  });
}

startServer();

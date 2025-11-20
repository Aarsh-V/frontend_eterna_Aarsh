import { type Token, type InsertToken, type TokenCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllTokens(category: TokenCategory): Promise<Token[]>;
  getTokenById(id: string): Promise<Token | undefined>;
  createToken(token: InsertToken): Promise<Token>;
  updateTokenPrice(id: string, price: number, priceChange24h: number): Promise<Token | undefined>;
}

export class MemStorage implements IStorage {
  private tokens: Map<string, Token>;

  constructor() {
    this.tokens = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockTokens = this.generateMockTokens();
    mockTokens.forEach((token) => {
      this.tokens.set(token.id, token);
    });
  }

  private generateMockTokens(): Token[] {
    const categories: TokenCategory[] = ["new_pairs", "final_stretch", "migrated"];
    const tokens: Token[] = [];

    const tokenNames = [
      { symbol: "PEPE", name: "Pepe Coin" },
      { symbol: "DOGE", name: "Doge Inu" },
      { symbol: "SHIB", name: "Shiba Token" },
      { symbol: "FLOKI", name: "Floki Inu" },
      { symbol: "MOON", name: "Moon Shot" },
      { symbol: "ROCKET", name: "Rocket Finance" },
      { symbol: "SAFE", name: "Safe Moon" },
      { symbol: "APE", name: "Ape Token" },
      { symbol: "WOJAK", name: "Wojak Coin" },
      { symbol: "GIGA", name: "Giga Chad" },
      { symbol: "CHAD", name: "Chad Token" },
      { symbol: "BASED", name: "Based Finance" },
      { symbol: "LAMBO", name: "Lambo Dreams" },
      { symbol: "FROG", name: "Frog Token" },
      { symbol: "CAT", name: "Cat Coin" },
      { symbol: "DOG", name: "Dog Finance" },
      { symbol: "BEAR", name: "Bear Market" },
      { symbol: "BULL", name: "Bull Run" },
      { symbol: "PUMP", name: "Pump Token" },
      { symbol: "DUMP", name: "Dump Coin" },
    ];

    categories.forEach((category, catIndex) => {
      for (let i = 0; i < 20; i++) {
        const tokenInfo = tokenNames[i % tokenNames.length];
        const basePrice = Math.random() * 0.1;
        const priceChange = (Math.random() - 0.5) * 100;
        const marketCap = Math.random() * 5000000;
        const age = category === "new_pairs" 
          ? Math.random() * 3600 
          : category === "final_stretch" 
          ? Math.random() * 86400 + 3600 
          : Math.random() * 604800 + 86400;

        tokens.push({
          id: randomUUID(),
          symbol: `${tokenInfo.symbol}${catIndex}${i}`,
          name: `${tokenInfo.name} ${catIndex}${i}`,
          contractAddress: `${randomUUID().replace(/-/g, '').slice(0, 32)}`,
          logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${tokenInfo.symbol}${i}`,
          age: age,
          marketCap: marketCap,
          liquidity: marketCap * (0.1 + Math.random() * 0.3),
          volume24h: marketCap * (0.05 + Math.random() * 0.2),
          price: basePrice,
          priceChange24h: priceChange,
          holderCount: Math.floor(50 + Math.random() * 1000),
          topHolderPercentage: 5 + Math.random() * 40,
          snipersPercentage: Math.random() * 30,
          txCount: Math.floor(100 + Math.random() * 5000),
          bondingCurveProgress: category === "final_stretch" ? 75 + Math.random() * 24 : undefined,
          riskLevel: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
          isVerified: Math.random() > 0.5,
          category: category,
          timestamp: Date.now() - age * 1000,
        });
      }
    });

    return tokens;
  }

  async getAllTokens(category: TokenCategory): Promise<Token[]> {
    return Array.from(this.tokens.values())
      .filter((token) => token.category === category)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async getTokenById(id: string): Promise<Token | undefined> {
    return this.tokens.get(id);
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = randomUUID();
    const token: Token = { 
      ...insertToken, 
      id,
      timestamp: insertToken.timestamp || Date.now(),
    };
    this.tokens.set(id, token);
    return token;
  }

  async updateTokenPrice(
    id: string,
    price: number,
    priceChange24h: number
  ): Promise<Token | undefined> {
    const token = this.tokens.get(id);
    if (token) {
      const updatedToken = { ...token, price, priceChange24h };
      this.tokens.set(id, updatedToken);
      return updatedToken;
    }
    return undefined;
  }
}

export const storage = new MemStorage();

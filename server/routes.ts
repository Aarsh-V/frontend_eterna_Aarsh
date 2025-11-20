import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { tokenCategorySchema, type PriceUpdate } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tokens/:category", async (req, res) => {
    try {
      const categoryResult = tokenCategorySchema.safeParse(req.params.category);
      
      if (!categoryResult.success) {
        return res.status(400).json({ 
          error: "Invalid category. Must be one of: new_pairs, final_stretch, migrated" 
        });
      }

      const tokens = await storage.getAllTokens(categoryResult.data);
      res.json(tokens);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      res.status(500).json({ error: "Failed to fetch tokens" });
    }
  });

  app.get("/api/tokens/:category/:id", async (req, res) => {
    try {
      const token = await storage.getTokenById(req.params.id);
      
      if (!token) {
        return res.status(404).json({ error: "Token not found" });
      }

      res.json(token);
    } catch (error) {
      console.error("Error fetching token:", error);
      res.status(500).json({ error: "Failed to fetch token" });
    }
  });

  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    const interval = setInterval(async () => {
      const categories = ["new_pairs", "final_stretch", "migrated"] as const;
      
      for (const category of categories) {
        const tokens = await storage.getAllTokens(category);
        const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
        
        if (randomToken) {
          const priceChange = (Math.random() - 0.5) * 0.05;
          const newPrice = randomToken.price * (1 + priceChange);
          const newPriceChange24h = randomToken.priceChange24h + (Math.random() - 0.5) * 5;

          await storage.updateTokenPrice(randomToken.id, newPrice, newPriceChange24h);

          const priceUpdate: PriceUpdate = {
            tokenId: randomToken.id,
            price: newPrice,
            priceChange24h: newPriceChange24h,
            timestamp: Date.now(),
          };

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(priceUpdate));
          }
        }
      }
    }, 2000);

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clearInterval(interval);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clearInterval(interval);
    });
  });

  return httpServer;
}

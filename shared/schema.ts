import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tokenCategorySchema = z.enum(["new_pairs", "final_stretch", "migrated"]);
export type TokenCategory = z.infer<typeof tokenCategorySchema>;

export const tokens = pgTable("tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  contractAddress: text("contract_address").notNull().unique(),
  logo: text("logo"),
  age: integer("age").notNull(),
  marketCap: real("market_cap").notNull(),
  liquidity: real("liquidity").notNull(),
  volume24h: real("volume_24h").notNull(),
  price: real("price").notNull(),
  priceChange24h: real("price_change_24h").notNull(),
  holderCount: integer("holder_count").notNull(),
  topHolderPercentage: real("top_holder_percentage").notNull(),
  snipersPercentage: real("snipers_percentage").notNull(),
  txCount: integer("tx_count").notNull(),
  bondingCurveProgress: real("bonding_curve_progress"),
  riskLevel: text("risk_level", { enum: ["low", "medium", "high"] }).notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  category: text("category", { enum: ["new_pairs", "final_stretch", "migrated"] }).notNull(),
  timestamp: integer("timestamp").notNull(),
}, (table) => ({
  categoryIdx: index("category_idx").on(table.category),
  timestampIdx: index("timestamp_idx").on(table.timestamp),
}));

export const insertTokenSchema = createInsertSchema(tokens).omit({ id: true });
export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;

export const priceUpdateSchema = z.object({
  tokenId: z.string(),
  price: z.number(),
  priceChange24h: z.number(),
  timestamp: z.number(),
});

export type PriceUpdate = z.infer<typeof priceUpdateSchema>;

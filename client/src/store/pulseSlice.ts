import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Token, TokenCategory, PriceUpdate } from '@shared/schema';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  column: string | null;
  direction: SortDirection;
}

interface PulseState {
  activeTab: TokenCategory;
  sortConfig: SortConfig;
  selectedToken: Token | null;
  priceUpdates: Record<string, PriceUpdate>;
  flashingTokens: Record<string, 'green' | 'red'>;
}

const initialState: PulseState = {
  activeTab: 'new_pairs',
  sortConfig: { column: null, direction: null },
  selectedToken: null,
  priceUpdates: {},
  flashingTokens: {},
};

const pulseSlice = createSlice({
  name: 'pulse',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TokenCategory>) => {
      state.activeTab = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const update = action.payload;
      const existing = state.priceUpdates[update.tokenId];
      
      state.priceUpdates[update.tokenId] = update;
      
      if (existing && existing.price !== update.price) {
        state.flashingTokens[update.tokenId] = update.price > existing.price ? 'green' : 'red';
      }
    },
    clearFlash: (state, action: PayloadAction<string>) => {
      delete state.flashingTokens[action.payload];
    },
  },
});

export const { setActiveTab, setSortConfig, setSelectedToken, updatePrice, clearFlash } = pulseSlice.actions;
export default pulseSlice.reducer;

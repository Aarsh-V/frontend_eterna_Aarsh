import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updatePrice } from '@/store/pulseSlice';
import { queryClient } from '@/lib/queryClient';
import type { PriceUpdate, Token } from '@shared/schema';

export function useWebSocket() {
  const dispatch = useAppDispatch();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
          try {
            const priceUpdate: PriceUpdate = JSON.parse(event.data);
            dispatch(updatePrice(priceUpdate));

            ['new_pairs', 'final_stretch', 'migrated'].forEach((category) => {
              const queryKey = ['/api/tokens', category];
              const cachedData = queryClient.getQueryData<Token[]>(queryKey);
              
              if (cachedData) {
                const updatedData = cachedData.map((token) =>
                  token.id === priceUpdate.tokenId
                    ? { ...token, price: priceUpdate.price, priceChange24h: priceUpdate.priceChange24h }
                    : token
                );
                queryClient.setQueryData(queryKey, updatedData);
              }
            });
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected, attempting to reconnect...');
          wsRef.current = null;
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 3000);
        };
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [dispatch]);
}


import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { getAVAXExchangeRate } from "@/functions/get-avax-exchange-rate"

// Get current AVAX price
 export const useAvaxRate = () => {
    const { data: avaxPrice, isLoading, isError, error } = useQuery({
        queryKey: ['avax-price'],
        queryFn: async () => {
            const exchangeRate = await getAVAXExchangeRate();
            return exchangeRate;
        },
        refetchInterval: 30000, // Refetch every 30 seconds
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 25000,
  });

  return {
    avaxPrice, 
    isLoading, 
    isError,
    error
  }
 }

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAvaxRate } from "@/hooks/use-avax-rate"


const PriceTicker = () => {
  const{ avaxPrice, isLoading, isError, error} = useAvaxRate()

  if (isLoading) {
    return (
      <div className="glass-card px-4 py-2 rounded-full animate-pulse">
        <div className="h-4 w-32 bg-gray-600 rounded"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card px-4 py-2 rounded-full border border-red-500/30">
        <span className="text-sm text-red-400">
          Price unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="glass-card px-4 py-2 rounded-full border border-neon-blue/30 transition-all duration-300 hover:border-neon-blue/50">
      <span className="text-sm font-medium text-neon-blue">
        1 AVAX = KES {avaxPrice?.toLocaleString('en-KE', { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
};

export default PriceTicker;

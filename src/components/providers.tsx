
import { ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { avalanche, avalancheFuji } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            staleTime: 30000,
            refetchOnWindowFocus: false,
        },
    },
});

const projectId = import.meta.env.VITE_REOWN_AVAPAY_PROJECT_ID!

const metadata = {
    name: 'Avapay',
    description: 'The easiest way to buy AVAX in Kenya using M-PESA. Instant, secure, and Web3-ready.',
    url: 'https://uat-avapay.vercel.app',
    icons: ['https://uat-avapay.vercel.app/og-image.png']
}

const networks = [avalanche, avalancheFuji]


const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
});

createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true,
        legalCheckbox: true,
        onramp: false,
        connectMethodsOrder: ["wallet", "social", "email"]
    },
    defaultNetwork: avalancheFuji
})

export default function Providers({
    children
}: {
    children: ReactNode
}) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
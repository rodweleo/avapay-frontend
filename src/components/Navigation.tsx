
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PriceTicker from "./PriceTicker";
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open, close } = useAppKit();
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Avapay" className="size-12 bg-avax-red rounded-full" />
            <span className="font-sora font-bold text-white text-xl">Avapay</span>
          </div>

          <div className="hidden md:block">
            <PriceTicker/>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center gap-6">
          {isConnected ? 
          <Button
          onClick={() => open({ view: "Account" })}
          className="bg-avax-red hover:bg-avax-red/80 text-white py-3 font-semibold rounded-xl avax-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <div className="size-2 rounded-full bg-green-500 animate-pulse"/>
          <p className="text-white">{address.slice(0, 5) + "..." + address.slice(address.length - 5, address.length)}</p>
        </Button>
        : <Button
        onClick={() => open({ view: "Connect" })}
        className="bg-avax-red hover:bg-avax-red/80 text-white py-3 font-semibold rounded-xl avax-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >Create Wallet  / Login</Button>
          }
          </div>

          {/* Mobile Menu Button
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </Button> */}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-white/10 pt-4">
            <Button
              variant="ghost"
              className="w-full text-left text-gray-300 hover:text-white justify-start"
              onClick={() => scrollToSection('buy-section')}
            >
              Buy AVAX
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left text-gray-300 hover:text-white justify-start"
              onClick={() => scrollToSection('wallet-section')}
            >
              Wallet
            </Button>
            <div className="pt-2">
              <PriceTicker />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

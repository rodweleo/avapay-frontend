
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BuyAvaxSection from "@/components/BuyAvaxSection";
import WalletSection from "@/components/WalletSection";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <BuyAvaxSection />
      <ChatInterface />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p className="mb-2">🔒 Powered by M-Pesa • 💼 Secured using Avalanche</p>
          <p>© {currentYear} Avapay Kenya. Ready for the future of money.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

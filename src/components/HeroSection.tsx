
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToBuySection = () => {
    const buySection = document.getElementById('buy-section');
    buySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden web3-gradient-bg floating-particles">
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated AVAX Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-avax-red/20 flex items-center justify-center animate-spin-slow">
                <div className="w-16 h-16 rounded-full bg-avax-red flex items-center justify-center animate-glow-pulse">
                  <span className="text-2xl font-bold text-white">A</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-avax-red/30 animate-ping"></div>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sora">
            <span className="neon-glow">Buy AVAX</span>
            <br />
            <span className="text-white">in seconds using</span>
            <br />
            <span className="text-avax-red">M-PESA</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The easiest way to get AVAX in Kenya. No complicated exchanges, no waiting. Just M-PESA and magic.
          </p>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-neon-blue">M-Pesa</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-avax-red">Avalanche</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-neon-purple">Web3 Ready</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              onClick={scrollToBuySection}
              className="bg-avax-red hover:bg-avax-red/80 text-white px-8 py-4 text-lg font-semibold rounded-full avax-glow transition-all duration-300 hover:scale-105"
            >
              Start Purchase 🚀
            </Button>
            
            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-gray-400 mx-auto mt-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-neon-blue/10 rounded-full animate-float blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-avax-red/10 rounded-full animate-float blur-2xl" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-purple/5 rounded-full animate-float blur-3xl" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default HeroSection;

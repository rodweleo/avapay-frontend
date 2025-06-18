
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const WalletSection = () => {
  const [balance] = useState(0.0524); // Mock AVAX balance
  const [walletAddress] = useState("0x1234...5678"); // Mock wallet address
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x1234567890abcdef1234567890abcdef12345678");
    toast({
      title: "Address Copied! 📋",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleViewOnExplorer = () => {
    toast({
      title: "Opening Explorer 🔍",
      description: "Opening Avalanche Explorer in new tab",
    });
    // In real app: window.open(`https://snowtrace.io/address/${walletAddress}`, '_blank');
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-md">
        <Card className="glass-card border-neon-blue/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-sora text-white mb-2">
              Your AVAX Wallet 💼
            </CardTitle>
            <p className="text-gray-400">Secure & Non-Custodial</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Balance Display */}
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-neon-blue">
                {balance.toFixed(4)} AVAX
              </div>
              <div className="text-gray-400">
                ≈ KES {(balance * 4850).toLocaleString()}
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Wallet Address
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm font-mono">
                  {walletAddress}
                </div>
                <Button
                  onClick={handleCopyAddress}
                  variant="outline"
                  size="sm"
                  className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
                >
                  📋
                </Button>
              </div>
            </div>

            {/* Transaction History Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Recent Transactions</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 px-3 bg-gray-800/30 rounded-lg">
                  <div className="text-sm">
                    <div className="text-white">Bought AVAX</div>
                    <div className="text-gray-400 text-xs">2 hours ago</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-sm">+0.0206 AVAX</div>
                    <div className="text-gray-400 text-xs">KES 100</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 px-3 bg-gray-800/30 rounded-lg">
                  <div className="text-sm">
                    <div className="text-white">Bought AVAX</div>
                    <div className="text-gray-400 text-xs">1 day ago</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-sm">+0.0318 AVAX</div>
                    <div className="text-gray-400 text-xs">KES 154</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleViewOnExplorer}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white"
              >
                View on Avalanche Explorer 🔍
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-avax-red text-avax-red hover:bg-avax-red/10"
              >
                Withdraw to External Wallet 📤
              </Button>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-center pt-4">
              <div className="w-32 h-32 bg-gray-800/50 rounded-lg mx-auto flex items-center justify-center border border-gray-600">
                <span className="text-gray-400 text-xs">QR Code</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Scan to receive AVAX</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WalletSection;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SmartPhoneInput from "./SmartPhoneInput";
import QuickAmountButtons from "./QuickAmountButtons";
import LoadingSkeleton from "./LoadingSkeleton";
import { useAvaxRate } from "@/hooks/use-avax-rate"
import { isAddress } from 'ethers';
import { socket } from "@/utils/socket.io";
import axios from "axios"

const BuyAvaxSection = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { avaxPrice } = useAvaxRate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTransactionSuccess = (data: any) => {
    toast({
      title: "Transaction Successful!",
      description: `You bought ${calculateAvax()} AVAX for KES ${data.amount}`,
    });
  };

  useEffect(() => {

    socket.on("transaction-success", handleTransactionSuccess);

    // Cleanup on component unmount
    return () => {
      socket.off("payment-success", handleTransactionSuccess);
      socket.disconnect();
    };
  }, [])

  const handleBuyAvax = async () => {
    if (!phoneNumber || !amount || !walletAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter your wallet address, phone number and amount",
        variant: "destructive"
      });
      return;
    }

    // Validate phone number format
    if (!phoneNumber.startsWith('254') || phoneNumber.length !== 12) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive"
      });
      return;
    }

    if (!isAddress(walletAddress)) {
      toast({
        title: "Invalid Wallet Address",
        description: "Please enter a valid wallet address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    socket.emit("register", phoneNumber);

    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }



    const processTransaction = async () => {
      try {
        const base_url = import.meta.env.VITE_BACKEND_PROD_SERVER_URL!;
        const res = await axios.post(`${base_url}/transactions/buy-avax`, { phone: phoneNumber, amountKES: amount, walletAddress })
        const { success } = res.data

        if (!success) {
          toast({
            title: "Transaction Failed",
            description: "Please try again or contact support",
            variant: "destructive"
          });
        }
        toast({
          title: "STK Push Sent!",
          description: `Check your phone (${phoneNumber.replace('254', '+254 ')}) to approve the transaction`,
        });

        setIsLoading(false);
      } catch (error) {

        toast({
          title: "Transaction Failed",
          description: "Please try again or contact support",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false)
      }
    };

    processTransaction();
  };

  const calculateAvax = () => {
    if (!amount || !avaxPrice) return "0";
    return (parseFloat(amount) / avaxPrice).toFixed(4);
  };

  const formatAmount = (value: string) => {
    // Remove non-digits
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';

    // Add thousand separators
    return parseInt(numbers).toLocaleString('en-KE');
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (!isAddress(rawValue)) {
      return;
    }
    setWalletAddress(rawValue);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue);
    }
  };

  const handleQuickAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
  };

  return (
    <section id="buy-section" className="py-20 px-4 grid place-items-center min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <Card className="glass-card border-neon-blue/30 transition-all duration-300 hover:border-neon-blue/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-sora text-white">
              Buy AVAX with M-PESA
            </CardTitle>
            <p className="text-gray-400">Quick, secure, and instant</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Custom Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Avalanche Wallet Address
              </label>
              <Input
                type="text"
                placeholder="Enter avalanche wallet address e.g. 0x123...7rF"
                // value={formatAmount(amount)}
                onChange={handleWalletChange}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue transition-colors"
              />
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                M-PESA Phone Number
              </label>
              <SmartPhoneInput
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue transition-colors"
              />
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Amount (KES)
              </label>
              <Input
                type="text"
                placeholder="Enter amount"
                value={formatAmount(amount)}
                onChange={handleAmountChange}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue transition-colors"
              />
              {amount && avaxPrice && (
                <div className="flex justify-between text-sm">
                  <span className="text-neon-blue">
                    You'll receive: {calculateAvax()} AVAX
                  </span>
                  <span className="text-gray-400">
                    @ KES {avaxPrice.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Quick Select
              </label>
              <QuickAmountButtons
                onAmountSelect={handleQuickAmountSelect}
                selectedAmount={amount}
              />
            </div>

            {/* Buy Button */}
            <Button
              onClick={handleBuyAvax}
              disabled={isLoading}
              className="w-full bg-avax-red hover:bg-avax-red/80 text-white py-3 font-semibold rounded-xl avax-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing STK Push...
                </div>
              ) : (
                "Buy AVAX Now 🚀"
              )}
            </Button>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-700">
              🔒 Secured on Avalanche • 💼 Your AVAX goes to your wallet
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BuyAvaxSection;

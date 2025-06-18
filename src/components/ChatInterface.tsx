
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LoadingSkeleton from "./LoadingSkeleton";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hey there! I'm your Avapay assistant. How much do you want to buy today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const quickReplies = useMemo(() => [
    "Buy 1000 KES",
    "Buy 5000 KES", 
    "Check AVAX price",
    "Help me"
  ], []);

  const addMessage = useCallback((text: string, isBot: boolean, isTyping = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      isTyping
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const handleSendMessage = useCallback(async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }

    // Add user message
    addMessage(messageText, false);
    setInputText("");
    setIsTyping(true);

    // Show typing indicator
    const typingId = addMessage("Typing...", true, true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Remove typing indicator
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
    setIsTyping(false);

    // Process and respond
    const response = processNaturalLanguage(messageText);
    addMessage(response, true);
  }, [inputText, addMessage]);

  const processNaturalLanguage = useCallback((text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Extract amount patterns
    const kesMatch = lowerText.match(/(\d+)\s*(kes|ksh|bob|shillings?)/);
    const avaxMatch = lowerText.match(/(\d+(?:\.\d+)?)\s*avax/);
    
    if (kesMatch) {
      const amount = kesMatch[1];
      const avaxAmount = (parseFloat(amount) / 4850).toFixed(4);
      toast({
        title: "STK Push Initiated! 📱",
        description: `Sending KES ${amount} request to your phone`,
      });
      return `Perfect! I'm sending an STK push for KES ${amount} to your phone. You'll receive ${avaxAmount} AVAX. Check your phone to approve! 🚀`;
    }
    
    if (avaxMatch) {
      const avaxAmount = avaxMatch[1];
      const kesAmount = (parseFloat(avaxAmount) * 4850).toFixed(0);
      return `To buy ${avaxAmount} AVAX, you'll need KES ${kesAmount}. Should I send the STK push?`;
    }
    
    if (lowerText.includes('help') || lowerText.includes('how')) {
      return "I can help you buy AVAX using M-PESA! Just tell me how much you want to buy, like '1000 bob' or '0.5 AVAX' and I'll handle the rest. 💫";
    }
    
    if (lowerText.includes('price')) {
      return "Current AVAX price is KES 4,850. Prices update every 30 seconds from CoinGecko! 📈";
    }
    
    return "I understand you want to buy AVAX! Tell me the amount in KES (like '1000 bob') or AVAX (like '0.5 AVAX') and I'll get started! 🚀";
  }, [toast]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-avax-red hover:bg-avax-red/80 avax-glow shadow-2xl z-50 p-0 transition-all duration-300 hover:scale-110"
        aria-label="Open chat assistant"
      >
        <span className="text-2xl">💬</span>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-xl h-[500px] z-50">
      <Card className="glass-card border-neon-blue/30 h-full flex flex-col transition-all duration-300 hover:border-neon-blue/50">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Avapay Assistant
          </h3>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            ✕
          </Button>
        </div>
        
        <CardContent className="flex-1 overflow-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  message.isBot
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-avax-red text-white'
                }`}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Quick Reply Buttons */}
        {!isTyping && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-1">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  onClick={() => handleSendMessage(reply)}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-neon-blue/50 transition-all duration-200"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue transition-colors"
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="bg-avax-red hover:bg-avax-red/80 px-3 transition-all duration-200 disabled:opacity-50"
              aria-label="Send message"
            >
              🚀
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;

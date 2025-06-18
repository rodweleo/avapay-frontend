
import { Button } from "@/components/ui/button";

interface QuickAmountButtonsProps {
  onAmountSelect: (amount: string) => void;
  selectedAmount?: string;
}

const QuickAmountButtons = ({ onAmountSelect, selectedAmount }: QuickAmountButtonsProps) => {
  const quickAmounts = [
    { label: "KES 100", value: "100" },
    { label: "KES 500", value: "500" },
    { label: "KES 1,000", value: "1000" },
    { label: "KES 5,000", value: "5000" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {quickAmounts.map((amount) => (
        <Button
          key={amount.value}
          variant={selectedAmount === amount.value ? "default" : "outline"}
          onClick={() => onAmountSelect(amount.value)}
          className={`text-sm transition-all duration-200 ${
            selectedAmount === amount.value
              ? "bg-avax-red hover:bg-avax-red/80 text-white border-avax-red"
              : "bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-neon-blue/50"
          }`}
        >
          {amount.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickAmountButtons;

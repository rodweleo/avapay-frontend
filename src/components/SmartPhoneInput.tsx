
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SmartPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SmartPhoneInput = ({ value, onChange, className }: SmartPhoneInputProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');
    
    // Handle Kenyan phone numbers
    if (digits.startsWith('254')) {
      // Already has country code
      return digits;
    } else if (digits.startsWith('0')) {
      // Replace leading 0 with 254
      return '254' + digits.slice(1);
    } else if (digits.startsWith('7') || digits.startsWith('1')) {
      // Add 254 prefix
      return '254' + digits;
    }
    
    return digits;
  };

  const formatDisplayValue = (value: string) => {
    if (value.startsWith('254')) {
      return `+${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 9)} ${value.slice(9)}`;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    const display = formatDisplayValue(formatted);
    
    setDisplayValue(display);
    onChange(formatted);
  };

  useEffect(() => {
    setDisplayValue(formatDisplayValue(value));
  }, [value]);

  return (
    <Input
      type="tel"
      placeholder="Enter phone number e.g. +254 712 345 678"
      value={displayValue}
      onChange={handleChange}
      className={className}
    />
  );
};

export default SmartPhoneInput;

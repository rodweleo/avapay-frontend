
export interface Message {
    id: string;
    text: string;
    isBot: boolean;
    timestamp: Date;
    isTyping?: boolean;
}
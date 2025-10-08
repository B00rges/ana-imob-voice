import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import anaAvatar from '@/assets/ana-avatar.png';

interface AnaAssistantProps {
  message: string;
  onUserResponse?: (response: string) => void;
  isListening?: boolean;
}

const AnaAssistant = ({ message, onUserResponse, isListening = false }: AnaAssistantProps) => {
  const { transcript, listening, startListening, stopListening, resetTranscript, supported } = useSpeechRecognition();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (message && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [message]);

  useEffect(() => {
    if (transcript && onUserResponse) {
      onUserResponse(transcript);
      resetTranscript();
    }
  }, [transcript, onUserResponse, resetTranscript]);

  const handleMicClick = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-700">
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl ${isSpeaking ? 'animate-pulse' : ''}`} />
        <img
          src={anaAvatar}
          alt="Ana - Assistente Virtual"
          className="relative w-40 h-40 rounded-full border-4 border-card shadow-strong object-cover"
        />
        {isSpeaking && (
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-3 shadow-medium animate-bounce">
            <Volume2 className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-soft max-w-md text-center border border-border">
        <p className="text-lg text-card-foreground leading-relaxed">{message}</p>
      </div>

      {isListening && supported && (
        <Button
          onClick={handleMicClick}
          size="lg"
          className={`rounded-full w-16 h-16 shadow-medium transition-all ${
            listening 
              ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {listening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
      )}

      {!supported && (
        <p className="text-sm text-muted-foreground">
          Reconhecimento de voz não disponível neste navegador
        </p>
      )}

      {listening && (
        <p className="text-sm text-primary animate-pulse">
          Estou ouvindo...
        </p>
      )}
    </div>
  );
};

export default AnaAssistant;

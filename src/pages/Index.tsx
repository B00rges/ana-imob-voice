import { useState, useEffect } from 'react';
import AnaAssistant from '@/components/AnaAssistant';
import PropertyCard from '@/components/PropertyCard';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/use-toast';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';

type ConversationStep = 'intro' | 'location-check' | 'showing-properties';

const Index = () => {
  const [step, setStep] = useState<ConversationStep>('intro');
  const [message, setMessage] = useState('');
  const { city, loading } = useGeolocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && city) {
      setTimeout(() => {
        setMessage('Olá! Me chamo Ana, sua assistente imobiliária. Estou aqui para te ajudar a encontrar o imóvel ideal!');
        setStep('intro');
        
        setTimeout(() => {
          setMessage(`Vi que você está em ${city}. Você pretende comprar um imóvel na sua cidade?`);
          setStep('location-check');
        }, 5000);
      }, 1000);
    }
  }, [loading, city]);

  const handleUserResponse = (response: string) => {
    const normalizedResponse = response.toLowerCase();
    
    if (step === 'location-check') {
      if (normalizedResponse.includes('sim') || normalizedResponse.includes('quero')) {
        setMessage(`Ótimo! Encontrei alguns imóveis interessantes em ${city}. Veja essas opções:`);
        setTimeout(() => {
          setStep('showing-properties');
        }, 3000);
      } else if (normalizedResponse.includes('não') || normalizedResponse.includes('nao')) {
        setMessage('Entendo! Em qual cidade você gostaria de procurar um imóvel?');
        toast({
          title: "Funcionalidade em desenvolvimento",
          description: "Em breve você poderá buscar imóveis em outras cidades!",
        });
      }
    }
  };

  const handleViewDetails = (propertyTitle: string) => {
    toast({
      title: "Visualizar detalhes",
      description: `Abrindo detalhes de ${propertyTitle}...`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            ImovelAI
          </h1>
          <p className="text-muted-foreground">Sua assistente inteligente para encontrar o imóvel perfeito</p>
        </header>

        <main className="max-w-6xl mx-auto">
          {step !== 'showing-properties' ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <AnaAssistant
                message={message}
                onUserResponse={handleUserResponse}
                isListening={step === 'location-check'}
              />
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
              <AnaAssistant message={message} isListening={false} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <PropertyCard
                  image={property1}
                  title="Apartamento Moderno"
                  price="R$ 450.000"
                  location={`${city}, PE`}
                  bedrooms={3}
                  bathrooms={2}
                  area="85m²"
                  onViewDetails={() => handleViewDetails('Apartamento Moderno')}
                />
                
                <PropertyCard
                  image={property2}
                  title="Casa com Jardim"
                  price="R$ 620.000"
                  location={`${city}, PE`}
                  bedrooms={4}
                  bathrooms={3}
                  area="150m²"
                  onViewDetails={() => handleViewDetails('Casa com Jardim')}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;

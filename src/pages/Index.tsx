import { useState, useEffect } from 'react';
import AnaAssistant from '@/components/AnaAssistant';
import PropertyCard from '@/components/PropertyCard';
import PropertyDetailsModal from '@/components/PropertyDetailsModal';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { properties } from '@/data/properties';
import { Property } from '@/types/property';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ConversationStep = 
  | 'intro' 
  | 'location-check' 
  | 'budget-question'
  | 'property-type-question'
  | 'showing-properties';

const Index = () => {
  const [step, setStep] = useState<ConversationStep>('intro');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState<'low' | 'medium' | 'high' | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { city, loading } = useGeolocation();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && city) {
      setTimeout(() => {
        setMessage('Olá! Me chamo Soldado, sua assistente imobiliária. Estou aqui para te ajudar a encontrar o imóvel ideal!');
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
        setMessage('Ótimo! Qual é a sua faixa de orçamento? Diga "até 500 mil", "até 700 mil" ou "acima de 700 mil".');
        setStep('budget-question');
      } else if (normalizedResponse.includes('não') || normalizedResponse.includes('nao')) {
        setMessage('Entendo! Em qual cidade você gostaria de procurar um imóvel?');
        toast({
          title: "Funcionalidade em desenvolvimento",
          description: "Em breve você poderá buscar imóveis em outras cidades!",
        });
      }
    } else if (step === 'budget-question') {
      let budgetRange: 'low' | 'medium' | 'high' = 'medium';
      
      if (normalizedResponse.includes('500') || normalizedResponse.includes('quinhentos')) {
        budgetRange = 'low';
        setBudget('low');
      } else if (normalizedResponse.includes('700') || normalizedResponse.includes('setecentos')) {
        budgetRange = 'medium';
        setBudget('medium');
      } else {
        budgetRange = 'high';
        setBudget('high');
      }
      
      setMessage('Perfeito! Você prefere apartamento, casa, cobertura ou sobrado?');
      setStep('property-type-question');
    } else if (step === 'property-type-question') {
      let type = 'apartamento';
      
      if (normalizedResponse.includes('casa')) {
        type = 'casa';
      } else if (normalizedResponse.includes('cobertura')) {
        type = 'cobertura';
      } else if (normalizedResponse.includes('sobrado')) {
        type = 'sobrado';
      }
      
      setPropertyType(type);
      
      // Filtrar propriedades
      const filtered = properties.filter(prop => {
        const budgetMatch = budget === 'low' ? prop.priceValue <= 500000 :
                           budget === 'medium' ? prop.priceValue <= 700000 :
                           prop.priceValue > 700000;
        const typeMatch = prop.type === type;
        return budgetMatch && typeMatch;
      });
      
      if (filtered.length > 0) {
        setFilteredProperties(filtered);
        setMessage(`Excelente escolha! Encontrei ${filtered.length} ${filtered.length === 1 ? 'imóvel' : 'imóveis'} que ${filtered.length === 1 ? 'corresponde' : 'correspondem'} ao seu perfil. Veja:`);
      } else {
        setFilteredProperties(properties.slice(0, 2));
        setMessage(`Não encontrei imóveis exatamente com essas características, mas separei algumas opções que podem te interessar:`);
      }
      
      setTimeout(() => {
        setStep('showing-properties');
      }, 3000);
    }
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleToggleFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    if (!showFavoritesOnly && favorites.length === 0) {
      toast({
        title: "Nenhum favorito",
        description: "Você ainda não adicionou imóveis aos favoritos.",
      });
    }
  };

  const displayProperties = showFavoritesOnly 
    ? filteredProperties.filter(p => isFavorite(p.id))
    : filteredProperties;

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
                isListening={step === 'location-check' || step === 'budget-question' || step === 'property-type-question'}
              />
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
              <AnaAssistant message={message} isListening={false} />
              
              <div className="flex justify-end">
                <Button
                  onClick={handleToggleFavorites}
                  variant={showFavoritesOnly ? 'default' : 'outline'}
                  className="shadow-soft"
                >
                  <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                  {showFavoritesOnly ? 'Ver todos' : `Favoritos (${favorites.length})`}
                </Button>
              </div>
              
              {displayProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Nenhum imóvel encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      image={property.image}
                      title={property.title}
                      price={property.price}
                      location={property.location}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      area={property.area}
                      isFavorite={isFavorite(property.id)}
                      onViewDetails={() => handleViewDetails(property)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <PropertyDetailsModal
        property={selectedProperty}
        open={selectedProperty !== null}
        onClose={() => setSelectedProperty(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedProperty ? isFavorite(selectedProperty.id) : false}
      />
    </div>
  );
};

export default Index;

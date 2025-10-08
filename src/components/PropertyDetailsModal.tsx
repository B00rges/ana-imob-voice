import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { Phone, MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { useState } from 'react';

interface PropertyDetailsModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: boolean;
}

const PropertyDetailsModal = ({
  property,
  open,
  onClose,
  onToggleFavorite,
  isFavorite
}: PropertyDetailsModalProps) => {
  if (!property) return null;

  const handleContact = () => {
    window.open(`https://wa.me/55${property.contactPhone.replace(/\D/g, '')}?text=Olá! Tenho interesse no imóvel: ${property.title}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">
            {property.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-medium">
              {property.price}
            </div>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="absolute top-4 right-4 bg-card/90 hover:bg-card p-3 rounded-full shadow-medium transition-all"
            >
              <Heart
                className={`w-6 h-6 ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
              />
            </button>
          </div>

          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{property.location}</span>
          </div>

          <div className="flex items-center justify-around p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Bed className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.bedrooms} quartos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.bathrooms} banheiros</span>
            </div>
            <div className="flex items-center space-x-2">
              <Maximize className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.area}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-card-foreground mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-card-foreground mb-3">Características</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleContact}
            size="lg"
            className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 shadow-soft"
          >
            <Phone className="w-5 h-5 mr-2" />
            Entrar em contato via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;

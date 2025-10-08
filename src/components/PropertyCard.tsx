import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  onViewDetails?: () => void;
}

const PropertyCard = ({
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  onViewDetails,
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 border-border">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-medium">
          {price}
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-card-foreground mb-2">{title}</h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} quartos</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} banheiros</span>
          </div>
          <div className="flex items-center space-x-1">
            <Maximize className="w-4 h-4" />
            <span>{area}</span>
          </div>
        </div>

        <Button 
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-soft"
        >
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

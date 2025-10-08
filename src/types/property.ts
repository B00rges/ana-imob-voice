export interface Property {
  id: string;
  image: string;
  gallery?: string[];
  title: string;
  price: string;
  priceValue: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaValue: number;
  type: 'apartamento' | 'casa' | 'cobertura' | 'sobrado';
  description: string;
  features: string[];
  contactPhone: string;
}

import { Property } from '@/types/property';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';

export const properties: Property[] = [
  {
    id: '1',
    image: property1,
    gallery: [property1],
    title: 'Apartamento Moderno Centro',
    price: 'R$ 450.000',
    priceValue: 450000,
    location: 'Paulista, PE',
    bedrooms: 3,
    bathrooms: 2,
    area: '85m²',
    areaValue: 85,
    type: 'apartamento',
    description: 'Excelente apartamento em localização privilegiada, próximo a comércios e escolas. Condomínio com área de lazer completa.',
    features: [
      'Varanda gourmet',
      'Piscina no condomínio',
      'Academia',
      'Salão de festas',
      '2 vagas de garagem',
      'Portaria 24h'
    ],
    contactPhone: '(81) 9 9999-0001'
  },
  {
    id: '2',
    image: property2,
    gallery: [property2],
    title: 'Casa com Jardim',
    price: 'R$ 620.000',
    priceValue: 620000,
    location: 'Paulista, PE',
    bedrooms: 4,
    bathrooms: 3,
    area: '150m²',
    areaValue: 150,
    type: 'casa',
    description: 'Linda casa com amplo jardim, perfeita para famílias. Espaço gourmet completo e acabamento de primeira.',
    features: [
      'Jardim amplo',
      'Churrasqueira',
      'Área gourmet',
      'Closet na suíte master',
      '3 vagas de garagem',
      'Energia solar'
    ],
    contactPhone: '(81) 9 9999-0002'
  },
  {
    id: '3',
    image: property3,
    gallery: [property3],
    title: 'Cobertura Luxo',
    price: 'R$ 890.000',
    priceValue: 890000,
    location: 'Paulista, PE',
    bedrooms: 4,
    bathrooms: 4,
    area: '180m²',
    areaValue: 180,
    type: 'cobertura',
    description: 'Cobertura de alto padrão com vista panorâmica. Acabamento premium e infraestrutura completa de lazer.',
    features: [
      'Vista panorâmica',
      'Piscina privativa',
      'Sauna',
      'Home theater',
      'Automação residencial',
      '4 vagas de garagem'
    ],
    contactPhone: '(81) 9 9999-0003'
  },
  {
    id: '4',
    image: property4,
    gallery: [property4],
    title: 'Sobrado Moderno',
    price: 'R$ 520.000',
    priceValue: 520000,
    location: 'Paulista, PE',
    bedrooms: 3,
    bathrooms: 3,
    area: '120m²',
    areaValue: 120,
    type: 'sobrado',
    description: 'Sobrado em condomínio fechado, segurança e conforto para sua família. Ótima localização.',
    features: [
      'Condomínio fechado',
      'Quintal',
      'Área de serviço coberta',
      'Armários planejados',
      '2 vagas de garagem',
      'Playground no condomínio'
    ],
    contactPhone: '(81) 9 9999-0004'
  }
];

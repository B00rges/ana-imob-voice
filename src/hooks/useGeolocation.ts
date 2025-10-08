import { useState, useEffect } from 'react';

interface Location {
  city: string;
  state: string;
  country: string;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    city: '',
    state: '',
    country: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocalização não é suportada pelo seu navegador',
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          setLocation({
            city: data.address.city || data.address.town || data.address.village || 'Paulista',
            state: data.address.state || 'Pernambuco',
            country: data.address.country || 'Brasil',
            loading: false,
            error: null,
          });
        } catch (error) {
          setLocation({
            city: 'Paulista',
            state: 'Pernambuco',
            country: 'Brasil',
            loading: false,
            error: null,
          });
        }
      },
      () => {
        setLocation({
          city: 'Paulista',
          state: 'Pernambuco',
          country: 'Brasil',
          loading: false,
          error: null,
        });
      }
    );
  }, []);

  return location;
};

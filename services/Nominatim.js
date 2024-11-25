export const getCityFromCoordinates = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.address) {
        return data.address.city || data.address.town || data.address.village || 'Ville non trouvée';
      } else {
        throw new Error('Erreur lors du géocodage');
      }
    } catch (error) {
      console.error(error);
      return 'Erreur lors de la récupération de la ville';
    }
  };

  
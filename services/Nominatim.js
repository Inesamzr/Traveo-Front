const cityCache = {};

export const getCityFromCoordinates = async (latitude, longitude) => {
  const cacheKey = `${latitude},${longitude}`;
  if (cityCache[cacheKey]) {
    console.log('Résultat en cache pour :', cacheKey);
    return cityCache[cacheKey];
  }

  // Effectuer l'appel API si le cache est vide
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TraveoApp/1.0 (your-email@example.com)',
      },
    });

    if (!response.ok) {
      console.error('Erreur HTTP :', response.status);
      return 'Erreur lors de la récupération de la ville';
    }

    const data = await response.json();

    if (data.address) {
      const city = data.address.city || data.address.town || data.address.village || 'Ville non trouvée';
      cityCache[cacheKey] = city; // Stockage en cache
      return city;
    } else {
      return 'Ville non trouvée';
    }
  } catch (error) {
    console.error('Erreur dans getCityFromCoordinates :', error);
    return 'Erreur lors de la récupération de la ville';
  }
};


  
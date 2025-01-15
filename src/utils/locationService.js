// sortRestaurantsByDistance.js

// Function to get the user's location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // Increased timeout
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy, // Optional for debugging
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("User denied the request for Geolocation."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information is unavailable."));
            break;
          case error.TIMEOUT:
            reject(new Error("The request to get user location timed out."));
            break;
          default:
            reject(new Error("An unknown error occurred."));
        }
      },
      options
    );
  });
};


// Function to calculate the distance between two coordinates using the Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Function to sort restaurants by distance from the user's location
export const sortRestaurantsByDistance = (restaurants, userLocation) => {
  if (!userLocation || !restaurants || restaurants.length === 0) {
    return restaurants; // Return the original array if no location or restaurants are provided
  }

  const sortedRestaurants = restaurants
    .map((restaurant) => {
      const restaurantLocation = restaurant.address.location_google_maps;
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurantLocation.lat,
        restaurantLocation.lng
      );
      return {
        ...restaurant,
        distance, // Add the calculated distance to the restaurant object
      };
    })
    .sort((a, b) => a.distance - b.distance); // Sort by distance (nearest first)

  return sortedRestaurants;
};

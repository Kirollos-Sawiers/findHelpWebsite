import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px'
};

const GoogleMapComponent = () => {
  const apiKey = "AIzaSyDqUdEh5B0fLBG6_PyuN9EdyuEvOwcGkq8";
  const [center, setCenter] = useState(); // Default center
  const googleMapsLoaded = useRef(false);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
            if (googleMapsLoaded.current) {
              getAddressFromLatLng(latitude, longitude); // Get address for initial location
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
            // Fallback to Google Geolocation API
            fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`, {
              method: 'POST',
            })
              .then(response => response.json())
              .then(data => {
                const { lat, lng } = data.location;
                setCenter({ lat, lng });
                if (googleMapsLoaded.current) {
                  getAddressFromLatLng(lat, lng); // Get address for fallback location
                }
              })
              .catch(error => {
                console.error("Error using Google Geolocation API:", error);
              });
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, [apiKey]);

  const getAddressFromLatLng = (lat, lng) => {
    if (!googleMapsLoaded.current) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        localStorage.setItem('location', JSON.stringify({ lat, lng, address }));
        // Log latitude, longitude, and address to the console
        console.log(`Latitude: ${lat}`);
        console.log(`Longitude: ${lng}`);
        console.log(`Address: ${address}`);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  const handleDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setCenter({ lat: newLat, lng: newLng });
    getAddressFromLatLng(newLat, newLng); // Get address for new location
  };

  const onLoad = () => {
    googleMapsLoaded.current = true;
    // Fetch address for the initial location after Google Maps API is loaded
    getAddressFromLatLng(center.lat, center.lng);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={onLoad}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker
          position={center}
          draggable={true}
          onDragEnd={handleDragEnd}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
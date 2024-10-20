import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px'
};

const GoogleMapComponent = () => {
  const apiKey = "AIzaSyDqUdEh5B0fLBG6_PyuN9EdyuEvOwcGkq8";
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 }); // Default center
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
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

  const handleDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setCenter({ lat: newLat, lng: newLng });

    // Use Geocoding API to get the address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
        // Log latitude, longitude, and address to the console
        console.log(`Latitude: ${newLat}`);
        console.log(`Longitude: ${newLng}`);
        console.log(`Address: ${results[0].formatted_address}`);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
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
import React, { useState, useEffect } from 'react';
import { APIProvider, Map , Marker} from '@vis.gl/react-google-maps';

const darkMode = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

function QuickApplyGoogleMap() {
  const APIKEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

   useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the location only once
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          // Fallback location (e.g. Sydney)
          setUserLocation({ lat: -33.860664, lng: 151.208138 });
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    } else {
      console.warn("Geolocation not supported, using fallback.");
      setUserLocation({ lat: -33.860664, lng: 151.208138 });
    }
  }, []);

  if (!userLocation) {
    return (
      <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading your location...</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={APIKEY}>
      <Map
        style={{ width: '100%', height: '500px' }}
        defaultZoom={15}
        defaultCenter={userLocation}
        center={userLocation}  // This updates map center as user moves
        gestureHandling={'greedy'}
        disableDefaultUI={false}
        styles={darkMode}
      >
        <Marker position={userLocation} title="You are here" />
      </Map>
    </APIProvider>
  );
}

export default QuickApplyGoogleMap;
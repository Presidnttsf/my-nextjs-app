"use client"; // Add this if using Next.js App Router

import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const libraries = ["places"]; // Keep libraries as a constant

const containerStyle = {
  width: "90vw",
  height: "90vh",
  textAlign: "center",
};

const center = { lat: 28.7041, lng: 77.1025 }; // Default to New Delhi

export default function GoogleMapComponent() {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [location, setLocation] = useState(center); // Stores selected location
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      map.panTo({ lat, lng }); // Center the map on selected location
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={12}
        onLoad={(map) => setMap(map)}
      >
        {/* Search Box */}
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search a place..."
            style={{
              width: "300px",
              padding: "10px",
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          />
        </Autocomplete>

        {/* Marker at the selected location */}
        <Marker position={location} />
      </GoogleMap>
      <h4 style={{textAlign: "center"}}>My Map</h4>
    </LoadScript>
  );
}

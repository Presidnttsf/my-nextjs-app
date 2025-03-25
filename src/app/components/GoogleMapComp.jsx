"use client"

import React, { useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // ✅ Move outside the component to avoid re-renders

const containerStyle = {
  width: "100vw",  // ✅ Full width of the screen
  height: "100vh", // ✅ Full height of the screen
  position: "absolute", // ✅ Ensures it covers the entire viewport
  top: 0,
  left: 0,
};



const center = { lat: 28.7041, lng: 77.1025 }; // Example: New Delhi

export default function GoogleMapComponent() {
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // ✅ Ensure this is set
    libraries, // ✅ Use the static variable here
  });

  useEffect(() => {
    if (isLoaded && !mapRef.current) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 10,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID, // ✅ Use your Map ID
      });

      mapRef.current = map;
    }
  }, [isLoaded]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return <div id="map" style={containerStyle}></div>;
}

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import "./MapPage.css";

const positions = [
  {
    lat: -22.87458545378236,
    lng: -43.48069354208628,
  },
  {
    lat: -22.97459826233762,
    lng: -43.39072434614163,
  },
];

export default function MapPage() {
  const [centerPosition, setCenterPosition] = useState(positions[0])
  const containerStyle = { width: "100%", height: "100%" };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCtcN5baK306MNVBXydSVXgztFG_iGmL2E",
  });

  Geocode.setApiKey("AIzaSyCtcN5baK306MNVBXydSVXgztFG_iGmL2E");

  Geocode.fromLatLng("-53.786037445068359", "-67.70022583007812").then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log("response", response);
      console.log("address", address);
    },
    (error) => {
      console.error(error);
    }
  );

  useEffect(() => {
    setInterval(() => {
      setCenterPosition(positions[1])
    }, 3000)
  }, [])

  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerPosition}
          zoom={12}
          options={{ mapTypeControl: false, fullscreenControl: false }}
        >
          {positions.map((position) => (
            <Marker position={position} />
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

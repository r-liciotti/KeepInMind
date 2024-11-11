import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useCallback, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Configurazione dell'icona per Leaflet
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { State } from "../../interfaces/Country";
import { setSelectedState } from "../../Slices/stateSlice";
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Componente che gestisce il click sulla mappa e imposta la posizione
const MapClickHandler = ({
  setPosition,
}: {
  setPosition: (position: [number, number]) => void;
}) => {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

// Componente per centrare la mappa
const ChangeMapView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
  return null;
};

interface GeocodingMapProps {
  lat: number;
  long: number;
}

const GeocodingMap = ({ lat, long }: GeocodingMapProps) => {
  const [position, setPosition] = useState<[number, number]>([lat, long]);
  if (!position) {
    setPosition([0, 0]);
  }
  const selectedState = useSelector(
    (state: RootState) => state.stateSelection.selectedState
  );
  const dispatch = useDispatch();
  console.log("GeocodingMap", lat, long);

  // Funzione ottimizzata per aggiornare la posizione con useCallback
  const updatePosition = useCallback((newPosition: [number, number]) => {
    setPosition(newPosition);

    const newState = {} as State;
    newState.id = 0;
    newState.latitudeNumber = newPosition[0];
    newState.longitudeNumber = newPosition[1];
    newState.name = "";

    dispatch(setSelectedState(newState));
  }, []);

  // Effettua l'aggiornamento della posizione ogni volta che cambia selectedState
  useEffect(() => {
    if (selectedState?.latitude && selectedState?.longitude) {
      const newLat = parseFloat(selectedState.latitude);
      const newLng = parseFloat(selectedState.longitude);
      updatePosition([newLat, newLng]);
    }
  }, [selectedState, updatePosition]);

  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: "200px", width: "100%", zIndex: 0 }}
      className="rounded-xl border-2 active:border-primary"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Cambia la vista della mappa sulla posizione selezionata */}
      {position && <ChangeMapView center={position} />}

      {/* Gestisce il click per aggiornare la posizione */}
      <MapClickHandler setPosition={updatePosition} />

      {/* Visualizza il marker solo se c'è una posizione */}
      {position && <Marker position={position} />}
    </MapContainer>
  );
};

export default GeocodingMap;

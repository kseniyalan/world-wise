import { useEffect, useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";

function Map() {
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const navigate = useNavigate();
    const { cities } = useCities();

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(
        function () {
          if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
      );

    return (
        <div className={styles.mapContainer} onClick={() => {navigate('form')}}>
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeMapCenter position={mapPosition} />
                <DetectClickOnMap />
            </MapContainer>
            
        </div>
    );
}

function ChangeMapCenter({ position }) {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
}

function DetectClickOnMap() {
    const navigate = useNavigate();
    useMapEvents({
        //click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
} 

export default Map;
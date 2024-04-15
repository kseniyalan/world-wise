import { useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'
import styles from "./Map.module.css";

function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const navigate = useNavigate();
    const { cities } = useCities();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    return (
        <div className={styles.mapContainer} onClick={() => {navigate('form')}}>
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
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
            </MapContainer>
        </div>
    );
}

export default Map;
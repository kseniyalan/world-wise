import { useEffect, useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import styles from "./Map.module.css";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const { cities } = useCities();
    const {
        isLoading: isLoadingGeoPosition,
        position: geoPosition,
        getPosition: getGeoPosition,
    } = useGeolocation(); 

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
          if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    useEffect(() => {
        if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
    }, [geoPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geoPosition && 
                <Button styleClass="position" onClick={getGeoPosition}>{isLoadingGeoPosition ? 'Loading...' : 'Use your position'}</Button>
            }
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
        click: (e) => navigate({
            pathname: 'form',
            search: `?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
        }),
    });
} 

export default Map;
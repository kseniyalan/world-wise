import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css'; 

CityItem.propTypes = {
    city: PropTypes.object.isRequired,
    onCityClick: PropTypes.func.isRequired
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city, onCityClick }) {
    const { currentCity } = useCities();
    const { id, cityName, emoji, date, position } = city;

    return (
        <li>
            <Link
                to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${id === currentCity.id && styles['cityItem--active']}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name} onClick={() => onCityClick(city)}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button
                    type='button'
                    className={styles.deleteBtn}
                    onClick={() => onCityClick(city)}
                >
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
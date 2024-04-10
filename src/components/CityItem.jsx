import PropTypes from 'prop-types';
import styles from './CityItem.module.css'; 
import { Link } from 'react-router-dom';

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
    const { id, cityName, emoji, date, position } = city;

    return (
        <li>
            <Link
                to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
                className={styles.cityItem}
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
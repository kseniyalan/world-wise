import PropTypes from 'prop-types';
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
    const { cityName, emoji, date } = city;

    return (
        <li className={styles.cityItem}>
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
        </li>
    );
}

export default CityItem;
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import styles from './CountryList.module.css';

CountryList.propTypes = {
    cities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if (cities.length === 0) return <Message message='Add your first city by clicking on the city on the map!' />;

    //Filter out the unique countries
    const countries = cities.reduce((acc, currentCity) => {
        if (!acc.map(el => el.country).includes(currentCity.country)) {
            return [...acc, { id: currentCity.id, country: currentCity.country, emoji: currentCity.emoji }];
        } else {
            return acc;
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.id} country={country} />)}
        </ul>
    );
}

export default CountryList;
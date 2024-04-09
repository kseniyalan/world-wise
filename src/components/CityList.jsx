import PropTypes from 'prop-types';

import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import styles from './CityList.module.css';

CityList.propTypes = {
    cities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message='Add your first city by clicking on the city on the map!' />;

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </ul>
    );
}

export default CityList;
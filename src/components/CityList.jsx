import styles from './CityList.module.css';

function CityList() {
    return (
        <ul className={styles.cityList}>
            <li>
                <a href="/city/1">City 1</a>
            </li>
            <li>
                <a href="/city/2">City 2</a>
            </li>
            <li>
                <a href="/city/3">City 3</a>
            </li>
        </ul>
    );
}

export default CityList;
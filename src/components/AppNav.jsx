import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';

function AppNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="cities" activeClassName={styles.active}>Cities</NavLink>
                </li>
                <li>
                    <NavLink to="countries" activeClassName={styles.active}>Countries</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default AppNav;
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ onClick, children, styleClass, type="button"}) {
    Button.propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.node.isRequired,
        styleClass: PropTypes.string,
    };

    return (
        <button
            type={type}
            className={`${styles.btn} ${styles[styleClass]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}



export default Button;
import styles from './Button.module.css';

function Button({ onClick, children, styleClass, type="button"}) {  
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
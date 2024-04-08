import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import SidebarFooter from "./SidebarFooter";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <p>List of cities</p>
            <SidebarFooter />
        </div>
    );
}

export default Sidebar;
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const { avatar, name } = user;
  const navigate = useNavigate();
  
  function handleLogOut() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={name} />
      <span>Welcome, {name}!</span>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default User;

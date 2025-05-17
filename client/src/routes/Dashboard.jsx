import styles from "../styles/Dashboard.module.css";
import Button from "../components/Button";
import { useAuth } from "../context/UserContext";
import Header from "../components/Header";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className={styles.dashboardMainBlock}>
      <Header />
      <div className={styles.dashboardSubMainBlock}>
        <h1>Welcome, {user.first_name}</h1>
      </div>
    </div>
  );
};

export default Dashboard;

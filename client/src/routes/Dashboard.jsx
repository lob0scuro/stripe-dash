import styles from "../styles/Dashboard.module.css";
import Button from "../components/Button";
import { useAuth } from "../context/UserContext";
import Header from "../components/Header";
import Subscriptions from "./Products";
import Customers from "./Customers";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboardMainBlock}>
      <Header />
      <h1>Welcome, {user.first_name}</h1>
      <div className={styles.dashboardSubMainBlock}>
        <Customers />
      </div>
    </div>
  );
};

export default Dashboard;

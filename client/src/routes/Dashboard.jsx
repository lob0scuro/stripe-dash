import styles from "../styles/Dashboard.module.css";
import Button from "../components/Button";
import { useAuth } from "../context/UserContext";
import Header from "../components/Header";
import { fetchSubs } from "../Utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const gittem = async () => {
      const gottem = await fetchSubs();
      if (!gottem.success) {
        toast.error(gottem.error);
      }
      setProducts(gottem.products);
    };
    gittem();
    console.log(products);
  }, []);
  return (
    <div className={styles.dashboardMainBlock}>
      <Header />
      <div className={styles.dashboardSubMainBlock}>
        <h1>Welcome, {user.first_name}</h1>
        <div className={styles.productsBlock}>
          <ul>
            {products?.map(({ id, active, description, name, url }) => (
              <li key={id} style={{ color: active ? "green" : "unset" }}>
                <p>{name}</p>
                <p>{description}</p>
                <p>{url}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

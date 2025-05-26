import styles from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import { fetchCurrentBalance } from "../Utils";

const Header = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const gittem = async () => {
      const gottem = await fetchCurrentBalance();
      if (!gottem.success) {
        toast.error(gottem.error);
        setBalance({});
      }
      console.log(gottem.balance);
      setBalance(gottem.balance);
    };
    gittem();
  }, []);

  return (
    <header className={styles.dashHeader}>
      <h2>Matt's Appliances</h2>
      <div>
        <h3>Current Balance: {balance?.available[0].amount}</h3>
      </div>
    </header>
  );
};

export default Header;

import styles from "../styles/CustomerPage.module.css";
import { useParams } from "react-router-dom";
import { fetchOneCustomer } from "../Utils";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const gittem = async () => {
      const gottem = await fetchOneCustomer(id);
      if (!gottem.success) {
        toast.error(gottem.error);
      }
      setCustomer(gottem.customer);
    };
    gittem();
  }, []);
  return (
    <div className={styles.customerPageBlock}>
      <h1>{customer.name}</h1>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
    </div>
  );
};

export default CustomerPage;

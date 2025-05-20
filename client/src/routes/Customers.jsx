import styles from "../styles/Customers.module.css";
import buttonStyles from "../styles/Button.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { fetchAllCustomers } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const gittem = async () => {
      const gottem = await fetchAllCustomers();
      if (!gottem.success) {
        toast.error(gottem.error);
        setCustomers([]);
      }
      setCustomers(gottem.customers);
    };
    gittem();
  }, []);

  return (
    <div className={styles.customersMainBlock}>
      <div>
        <h2 onClick={() => navigate("/customers")}>Customers</h2>
        <FontAwesomeIcon
          icon={faUserPlus}
          className={styles.addUserButton}
          onClick={() => navigate("/create-customer")}
        />
      </div>
      <ul>
        {customers.map(({ id, name, phone, email, balance, deliquent }) => (
          <li key={id} style={{ color: deliquent ? "red" : "" }}>
            <div>
              <p>{name}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>${balance}</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faUser}
                className={styles.userInfoLink}
                onClick={() => navigate(`/customer/${id}`)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;

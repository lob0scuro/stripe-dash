import styles from "../styles/Subscriptions.module.css";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../Utils";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const gittem = async () => {
      const gottem = await fetchProducts();
      if (!gottem.success) {
        toast.error(gottem.error);
      }
      setProducts(gottem.products);
    };
    gittem();
    console.log(products);
  }, []);

  return (
    <div className={styles.productsBlock}>
      <h1>Extended Warranty Programs</h1>
      <ul>
        {products?.map(({ id, active, description, name, url }) => (
          <li key={id} style={{ color: !active ? "green" : "unset" }}>
            <p>{name}</p>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

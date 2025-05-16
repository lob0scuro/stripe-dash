import styles from "../styles/Login.module.css";
import Button from "../components/Button";
import { fetchAllUsers } from "../Utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const gitem = async () => {
      const gotem = await fetchAllUsers();
      if (!gotem.success) {
        toast.error(gotem.error);
      }
      setUsers(gotem.users);
    };
    gitem();
  }, []);

  const renderUsers = users?.map(({ id, full_name }) => (
    <option value={id} key={id}>
      {full_name}
    </option>
  ));

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      toast.success(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <>
      <h1 className={styles.loginHeader}>Login</h1>
      <form className={styles.loginForm} onSubmit={submitForm}>
        <div>
          <select name="id" id="id">
            <option value="">--Select User--</option>
            {renderUsers}
          </select>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password..."
          />
        </div>
        <Button title="Login" type="submit" />
      </form>
    </>
  );
};

export default Login;

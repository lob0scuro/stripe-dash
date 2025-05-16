import styles from "../styles/Register.module.css";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    inputs.is_admin = inputs.is_admin === "on";
    try {
      const response = await fetch("/auth/register", {
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
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <>
      <h1 className={styles.registerHeader}>Register Employee</h1>
      <form className={styles.registerForm} onSubmit={submitForm}>
        <div>
          <label htmlFor="is_admin">Admin:</label>
          <input type="checkbox" name="is_admin" id="is_admin" />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="password1">Set password:</label>
          <input type="password" name="password1" id="password1" />
        </div>
        <div>
          <label htmlFor="password2">Enter password again:</label>
          <input type="password" name="password2" id="password2" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <Button type="submit" title="Register" />
      </form>
    </>
  );
};

export default Register;

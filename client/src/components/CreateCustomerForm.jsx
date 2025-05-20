import React from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import Header from "./Header";

const CreateCustomerForm = () => {
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    inputs.name = `${inputs.first_name} ${inputs.last_name}`;
    const sendObject = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
    };
    try {
      const response = await fetch("/api/create_customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendObject),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      toast.success(data.message);
      return;
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input type="text" name="first_name" id="last_name" required />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" id="phone" />
        </div>
        <Button title="Create new customer" type="submit" />
      </form>
    </>
  );
};

export default CreateCustomerForm;

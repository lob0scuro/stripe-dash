import React, { useEffect, useState } from "react";
import { fetchCurrentBalance } from "../Utils";
import toast from "react-hot-toast";

const AccountBalance = () => {
  const [balance, setBalance] = useState({});

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
  }, []);

  return (
    <div>
      <h2>Balance</h2>
    </div>
  );
};

export default AccountBalance;

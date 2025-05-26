export const fetchCurrentBalance = async () => {
  try {
    const response = await fetch("/api/get_current_balance");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, balance: data.balance };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await fetch("/read/fetch_all_users");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, users: data.users };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch("/api/get_products");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    console.log(data);
    return { success: true, products: data.products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchPrices = async () => {
  try {
    const response = await fetch("/api/get_prices");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, prices: data.prices };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchOneCustomer = async (id) => {
  try {
    const response = await fetch(`/api/get_one_customer/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, customer: data.customer };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchAllCustomers = async () => {
  try {
    const response = await fetch("/api/get_all_customers");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, customers: data.customers || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

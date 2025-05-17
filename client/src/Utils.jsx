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

export const fetchSubs = async () => {
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

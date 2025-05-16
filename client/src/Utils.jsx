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

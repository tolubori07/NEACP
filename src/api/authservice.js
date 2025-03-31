import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/dlogin`, userData, {
      crossDomain: true,
    });
    if (response.data) {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      // Set the value of the user atom
    }
    return response.data;
  } catch (err) {
    console.error(err);
    alert("Incorrect Password");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (token, newpassword, confirmPassword) => {
  try {
    if (newpassword == confirmPassword) {
      const response = await axios.put(
        `${API_URL}/updatepassword`,
        { newpassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } else {
      alert("Please make sure both fields are equal");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update password",
    );
  }
};

const authServices = {
  login,
  logout,
  register,
  updatePassword,
};
export default authServices;

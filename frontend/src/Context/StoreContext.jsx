import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = import.meta.env.VITE_BACKEND_URL;

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );

        if (!response.data.success) {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Add to cart failed:", error);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Remove from cart failed:", error);
      }
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      setFoodList(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // Fetch logged-in user's cart
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        setCartItems({});
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems({});
    }
  };

  // Login
  const login = async (userToken) => {
    if (!userToken) return;

    sessionStorage.setItem("token", userToken);

    setCartItems({});
    setToken(userToken);

    await loadCartData(userToken);
  };

  // Logout
  const logout = () => {
    sessionStorage.removeItem("token");

    setToken("");
    setCartItems({});
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const savedToken = sessionStorage.getItem("token");

      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
    loadCartData,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
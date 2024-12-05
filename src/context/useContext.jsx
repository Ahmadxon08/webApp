/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Context yaratish
const ProductContext = createContext();

// Provider yaratish
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItem, setCartItem] = useState([]);

  const handleAddCart = (item) => {
    const existItem = cartItem.find((c) => c.id === item.id);

    if (existItem) {
      // Agar mahsulot allaqachon savatchada bo'lsa, uning miqdorini oshiring
      const newData = cartItem.map((c) =>
        c.id === item.id ? { ...existItem, quantity: c.quantity + 1 } : c
      );
      setCartItem(newData);

      console.log("cart data", newData);
    } else {
      // Yangi mahsulotni savatchaga qo'shing
      const newdata = [...cartItem, { ...item, quantity: 1 }];

      console.log("new data", newdata);

      setCartItem(newdata);
    }
  };

  const handleRemoveCart = (item) => {
    const exitItem = cartItem.find((c) => c.id === item.id);
    if (exitItem.quantity === 1) {
      const newData = cartItem.filter((c) => c.id !== exitItem.id);

      console.log("Delete cart item 0", newData);

      setCartItem(newData);
    } else {
      const newData = cartItem.map((c) =>
        c.id === exitItem.id
          ? { ...exitItem, quantity: exitItem.quantity - 1 }
          : c
      );
      setCartItem(newData);
      console.log("Delete cart item 1", newData);
    }
  };

  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  console.log(isAdded);

  const handleRemoveFromCart = () => {
    setCount(0);
    setIsAdded(false);
    han(product);
  };

  const hanldeIncrement = () => {
    setCount((prev) => prev + 1);
    handleAddCart(product);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      handleRemoveCart(product);
    } else if (count === 1) {
      handleRemoveFromCart();
    }
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setCount(1);
    onAddToCart(product);
  };

  // Mahsulotlarni API orqali olish
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://213.148.31.6:5050/store/onlineStoreProductsHot",
        {
          type: "hot",
        }
      );
      setProducts(response.data);
    } catch (err) {
      setError("Mahsulotlar yuklab olinmadi");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Mahsulot qo'shish
  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        "https://api.example.com/products",
        product
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      setError("Mahsulot qo'shishda xatolik");
      console.log(err);
    }
  };

  // Mahsulot o'chirish
  const removeProduct = async (id) => {
    try {
      await axios.delete(`https://api.example.com/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      setError("Mahsulotni o'chirishda xatolik");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        setCartItem,
        cartItem,
        removeProduct,
        loading,
        error,
        handleAddCart,
        handleRemoveCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook - useProducts
export const useProducts = () => {
  return useContext(ProductContext);
};

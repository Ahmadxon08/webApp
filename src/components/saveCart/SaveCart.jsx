import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useDrawerStore } from "../../store/useStore";
import { useProducts } from "../../context/useContext";
import "./SaveCart.scss";
const SaveCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItem, handleAddCart, handleRemoveCart } = useProducts();
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  console.log(isAdded);

  const handleRemoveFromCart = () => {
    setCount(0);
    setIsAdded(false);
    handleRemoveCart(product);
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
    handleAddCart(product);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const price = cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalPrice(price);
    };

    calculateTotalPrice();
  }, [cartItem]);
  const { isDrawerOpen, closeDrawer } = useDrawerStore();

  const drawerContent = (
    <Box
      sx={{
        width: {
          xs: "250px",
          sm: "400px",
          md: "500px",
        },
        padding: 2,
      }}
      className="cartBody"
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={closeDrawer}
      inert={isDrawerOpen ? null : "true"}
    >
      <h2>
        Savatdagi tovarlar naxlari{" "}
        <span>
          {totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </h2>

      {cartItem.map((item, i) => (
        <div className="cartItem" key={i}>
          <div className="img_container">
            <img
              src={item.image}
              alt=""
              width={70}
              height={50}
              style={{ objectFit: "cover" }}
            />
          </div>
          <button onClick={hanldeIncrement}>+</button>
          <h4>{item.quantity}</h4>
          <button onClick={handleDecrement} disabled={count === 0}>
            -
          </button>
        </div>
      ))}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={isDrawerOpen}
      onClose={closeDrawer}
      onOpen={() => {}}
      disableEnforceFocus
      disableRestoreFocus
      sx={{ zIndex: 133300 }}
    >
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default SaveCart;

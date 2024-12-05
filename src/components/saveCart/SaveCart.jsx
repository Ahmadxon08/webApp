import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useDrawerStore } from "../../store/useStore";
import { useProducts } from "../../context/useContext";
import "./SaveCart.scss";
import Cart from "../cart/Cart";
const SaveCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItem } = useProducts();

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
          <h4>{item.quantity}</h4>
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

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDrawerStore } from "../../store/useStore";
import { useProducts } from "../../context/useContext";
import { MdDelete } from "react-icons/md";

import "./SaveCart.scss";
import { Button, IconButton } from "@mui/material";

const SaveCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItem, handleAddCart, handleDelete, handleRemoveCart } =
    useProducts();
  const [isAdded, setIsAdded] = useState(false);

  const handleRemoveFromCart = (product) => {
    handleRemoveCart(product);
    setIsAdded(false);
  };
  const handleDeleteItem = (productId) => {
    handleDelete(productId); // `handleRemoveCart` to'g'ri chaqirilganiga ishonch hosil qilish
  };
  const handleIncrement = (product) => {
    handleAddCart(product);
  };

  // Decrement product quantity in cart
  const handleDecrement = (product) => {
    handleRemoveCart(product);
  };

  // Add product to cart

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
      <div className="head">
        <h2>
          Savatdagi tovarlar naxlari{" "}
          <span>
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </h2>
      </div>

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
          <div className="text">
            <p>{item.title}</p>
          </div>
          <div className="btnAndAct">
            <span>X{item.quantity}</span>
            <button onClick={() => handleDeleteItem(item.id)}>
              <MdDelete size={32} color="#7421b0" />
            </button>{" "}
          </div>
        </div>
      ))}
      <div className="buy">
        <Button variant="contained">Sotib olish</Button>
      </div>
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

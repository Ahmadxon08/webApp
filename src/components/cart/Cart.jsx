import { useState, useEffect } from "react";
import "./Cart.scss";

const Cart = ({ cartItem, handleCheckOut }) => {
  const [totalPrice, setTotalPrice] = useState(0);

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

  console.log(cartItem);

  return (
    <div className="cart">
      <span>
        {totalPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      <button onClick={handleCheckOut}>Buy Now</button>
    </div>
  );
};

export default Cart;

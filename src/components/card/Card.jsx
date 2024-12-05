import React, { useState } from "react";
import ProductImages from "../tab/ProductImages";

const Card = ({ product, onAddToCart, onRemoveFromCart }) => {
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  console.log(isAdded);

  const handleRemoveFromCart = () => {
    setCount(0);
    setIsAdded(false);
    onRemoveFromCart(product);
  };

  const hanldeIncrement = () => {
    setCount((prev) => prev + 1);
    onAddToCart(product);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      onRemoveFromCart(product);
    } else if (count === 1) {
      handleRemoveFromCart();
    }
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setCount(1);
    onAddToCart(product);
  };

  return (
    <div key={product.id} className="product">
      <span className={`count ${count === 0 ? "count_hidden" : ""}`}>
        {count}
      </span>

      <ProductImages product={product} />
      <div className="productText">
        <h4>{product.category}</h4>
        <p>{product.description.slice(0, 80)}..</p>
        <span>
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}{" "}
        </span>

        <div className="btnBody">
          {count === 0 ? (
            <button className="btn1" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="btns">
              <button onClick={hanldeIncrement}>+</button>
              <button onClick={handleDecrement} disabled={count === 0}>
                -
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

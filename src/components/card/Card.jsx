import React, { useState } from "react";
import ProductImages from "../tab/ProductImages";

const Card = ({ product, onAddToCart, onRemoveFromCart }) => {
  const [count, setCount] = useState(0);

  const hanldeIncrement = () => {
    setCount((pre) => pre + 1);
    onAddToCart(product);
  };

  const handleDecriment = () => {
    if (count > 0) {
      setCount((pre) => pre - 1);
      onRemoveFromCart(product);
    }
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

        <div className="btns">
          <button onClick={hanldeIncrement}>+</button>

          {count > 0 && <button onClick={handleDecriment}>-</button>}
        </div>
      </div>
    </div>
  );
};

export default Card;

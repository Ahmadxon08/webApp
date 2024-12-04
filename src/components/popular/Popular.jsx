import "./Popular.scss";
import { useCallback, useEffect, useState } from "react";
// import ProductDetailModal from "../productModal/ProductDatailModal";
// import { useProducts } from "../../context/useContext.jsx";
import useLanguageStore from "../lang/languageStore.js";
import axios from "axios";
import Cart from "../cart/Cart.jsx";
import Card from "../card/Card.jsx";

const cube = "./assets/images/cube.png";
const elps = "./assets/images/elips.png";
const btmImage = "./assets/images/btm.png";

const telegram = window.Telegram.WebApp;

const Popular = () => {
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { selectedLanguage } = useLanguageStore();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    telegram.ready();
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);

      const data = await res.data;

      console.log("data for testing", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(selectedLanguage);

  // const { products } = useProducts();

  // console.log("saaalommm", products);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);
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

  const handleCheckOut = () => {
    telegram.MainButton.text = "Sotib olish";

    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    const quearyId = telegram.initDataUnsafe?.quary_id;

    if (quearyId) {
      fetch("http://localhost:800/web-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: quearyId }),
      });
    } else {
      telegram.sendData(
        JSON.stringify({
          products: cartItem,
          quearyId: quearyId,
        })
      );
    }
  }, [cartItem]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => {
      telegram.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);
  // const getTitle = (product) => {
  //   if (selectedLanguage.value === "en") {
  //     return {
  //       subtitle: product.subTitleEn,
  //       title: product.titleEn,
  //     };
  //   } else if (selectedLanguage.value === "ru") {
  //     return {
  //       subtitle: product.subTitleRu,
  //       title: product.titleRu,
  //     };
  //   } else {
  //     return {
  //       subtitle: product.subTitleUz,
  //       title: product.titleUz,
  //     };
  //   }
  // };

  return (
    <section>
      <div className="imgs">
        <img src={cube} alt="" className="cube" />
        <img src={elps} alt="" className="elps" />
      </div>

      <div className="container">
        <Cart cartItem={cartItem} handleCheckOut={handleCheckOut} />

        <div className="popularHead">
          <h2>
            Popular <span>Products</span>
          </h2>
          <h3>
            The best <span>selling</span> products
          </h3>
        </div>
        <div className="pupularBody">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                product={product}
                onAddToCart={handleAddCart}
                onRemoveFromCart={handleRemoveCart}
              />
            ))
          )}
        </div>
      </div>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      <div className="btmImage">
        <img src={btmImage} alt="" />
      </div>
    </section>
  );
};

export default Popular;

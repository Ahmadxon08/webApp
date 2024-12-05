// import Filtered from "../filtered/Filtered";
import Popular from "../popular/Popular";
import SaveCart from "../saveCart/SaveCart";

import "./Main.scss";
const Main = () => {
  return (
    <main>
      <Popular />
      <SaveCart />
      {/* <Filtered /> */}
    </main>
  );
};

export default Main;

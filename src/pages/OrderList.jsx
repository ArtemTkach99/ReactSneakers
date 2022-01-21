import axios from "axios";
import React, { useState } from "react";
import Card from "../components/Card";
import AppContext from "../context";

function OrderList() {
  const { onAddToCart, onAddToFavorite } = React.useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isReady, setIsReady] = useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://618254ec84c2020017d89de4.mockapi.io/order"
        );

        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));

        setIsReady(false);
      } catch (e) {
        alert("Error wrong order submit");
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои покупки</h1>{" "}
        </div>
        <div className="d-flex flex-wrap">
          {(isReady ? [...Array(8)] : orders).map((a, index) => (
            <Card
              key={index}
              {...a}
              onFavorite={onAddToFavorite}
              onCart={onAddToCart}
              loading={isReady}
              favorited={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderList;

import axios from "axios";
import React from "react";
import { useCart } from "./hooks/useCart";

import Info from "./Info";

function Drawer({ onClose, removeItem }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://618254ec84c2020017d89de4.mockapi.io/order",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://618254ec84c2020017d89de4.mockapi.io/cart/" + item.id
        );
      }
    } catch (e) {
      alert("Не отправился заказ");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div>
        {cartItems.length === 0 ? (
          <Info
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пуста"}
            description={
              isOrderCompleted
                ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderCompleted
                ? "/img/complete-order.jpg"
                : "/img/emptyCart.jpg"
            }
          />
        ) : (
          <div className="drawer">
            <h2 className="d-flex justify-between mb-30">
              Корзина{" "}
              <img
                onClick={onClose}
                className="removeBt n cu-p"
                src="/img/btn-remove-side.svg"
                alt="Remove"
              />
            </h2>

            <div className="items">
              {cartItems.map((a) => {
                return (
                  <div
                    className="cartItem d-flex align-center mb-20"
                    key={a.id}
                  >
                    {console.log(a.id)}
                    <div
                      style={{ backgroundImage: `url(${a.img})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{a.name}</p>
                      <b>{a.price} uah.</b>
                    </div>
                    <img
                      className="removeBtn"
                      src="/img/btn-remove-side.svg"
                      onClick={() => removeItem(a.id)}
                      alt="Remove"
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} uah.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} uah.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onClickOrder}
              >
                Оформить заказ <img src="/img/arrow-right.svg" alt="arrow" />{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;

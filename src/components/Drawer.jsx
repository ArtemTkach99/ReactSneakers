import React from "react";

function Drawer({ cartItems, onClose, removeItem }) {
  return (
    <div className="overlay">
      <div>
        {cartItems.length === 0 ? (
          <div className="drawer">
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img src="/img/emptyCart.jpg" alt="cartEmpty" />
              <h2>Корзина пустая</h2>
              <p className="text-center">
                Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
              </p>
              <button className="greenButton mt-30" onClick={onClose}>
                <img className="leftArrow" src="/img/arrow-left.svg" alt="" />
                Вернуться назад
              </button>
            </div>
          </div>
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
                  <b>11074 uah.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 uah.</b>
                </li>
              </ul>
              <button className="greenButton">
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

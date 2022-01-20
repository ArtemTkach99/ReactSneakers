import React from "react";
import AppContext from "../context";

function Info({ title, description, image }) {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="drawer">
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img src={image} alt="cartEmpty" />
        <h2>{title}</h2>
        <p className="text-center">{description}</p>
        <button
          className="greenButton mt-30"
          onClick={() => setCartOpened(false)}
        >
          <img className="leftArrow" src="/img/arrow-left.svg" alt="" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
}

export default Info;

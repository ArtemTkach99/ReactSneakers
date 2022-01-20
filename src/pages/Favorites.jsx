import React from "react";
import Card from "../components/Card/index";

import AppContext from "../context";

export default function Favorites() {
  const { favorites, onAddToCart, onAddToFavorite } =
    React.useContext(AppContext);

  return (
    <div className="home clear">
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои закладки</h1>{" "}
        </div>

        <div className="d-flex flex-wrap">
          {favorites.map((a, index) => (
            <Card
              key={index}
              {...a}
              onFavorite={onAddToFavorite}
              onCart={onAddToCart}
              favorited={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

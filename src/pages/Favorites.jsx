import React from "react";
import Card from "../components/Card/index";

export default function Favorites({
  onAddToCart,
  onAddToFavorite,
  favorites = false,
}) {
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
              name={a.name}
              price={a.price}
              img={a.img}
              id={a.id}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onCart={(obj) => onAddToCart(obj)}
              favorited={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

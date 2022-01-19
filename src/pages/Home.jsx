import React from "react";
import Card from "../components/Card/index";

export default function Home({
  items,
  cartItems,
  onAddToCart,
  searchValue,
  setSearchValue,
  onAddToFavorite,
  onChangeSearchInput,
}) {
  const renderItems = () => {
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )

      .map((a, index) => (
        <Card
          key={index}
          name={a.name}
          price={a.price}
          img={a.img}
          id={a.id}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onCart={(obj) => onAddToCart(obj)}
          added={cartItems.some((obj) => Number(obj.id) === Number(a.id))}
          loading={false}
        />
      ));
  };

  return (
    <div className="home clear">
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>{" "}
          <div className="searchBlock d-flex">
            <img src="/img/Search.svg" alt="Search" />
            <input
              type="text"
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Search..."
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="cu-p"
                src="/img/btn-remove-side.svg"
                alt="Remove"
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
    </div>
  );
}

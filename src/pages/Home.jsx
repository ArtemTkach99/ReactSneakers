import React from "react";
import Card from "../components/Card/index";
import AppContext from "../context";

export default function Home({
  onAddToCart,
  searchValue,
  setSearchValue,
  onAddToFavorite,
  onChangeSearchInput,
  isReady,
}) {
  const { items } = React.useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isReady ? [...Array(8)] : filteredItems).map((a, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onCart={(obj) => onAddToCart(obj)}
        loading={isReady}
        {...a}
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

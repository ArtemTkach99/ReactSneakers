import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

import "./App.css";
import "./components/style.scss";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "https://618254ec84c2020017d89de4.mockapi.io/items"
      );

      const cartResponse = await axios.get(
        "https://618254ec84c2020017d89de4.mockapi.io/cart"
      );

      const favoritesResponse = await axios.get(
        "https://618254ec84c2020017d89de4.mockapi.io/favorites"
      );
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://618254ec84c2020017d89de4.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://618254ec84c2020017d89de4.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://618254ec84c2020017d89de4.mockapi.io/cart/${id}`);
    setCartItems(cartItems.filter((a) => a.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id) === obj.id) {
        axios.delete(
          `https://618254ec84c2020017d89de4.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((a) => a.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://618254ec84c2020017d89de4.mockapi.io/favorites/",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="home clear">
      {cartOpened ? (
        <Drawer
          cartItems={cartItems}
          onClose={() => setCartOpened(false)}
          removeItem={onRemoveItem}
        />
      ) : null}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              onChangeSearchInput={onChangeSearchInput}
              cartItems={cartItems}
              isLoading={!items.length}
            />
          }
        />
        <Route
          path="/favorites"
          exact
          element={
            <Favorites
              favorites={favorites}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

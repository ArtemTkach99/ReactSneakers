import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import AppContext from "./context";

import "./App.css";
import "./components/style.scss";
import OrderList from "./pages/OrderList";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favoritesResponse] =
          await Promise.all([
            axios.get("https://618254ec84c2020017d89de4.mockapi.io/items"),
            axios.get("https://618254ec84c2020017d89de4.mockapi.io/cart"),
            axios.get("https://618254ec84c2020017d89de4.mockapi.io/favorites"),
          ]);

        setIsReady(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (e) {
        alert("Ошибка при запросам данных!");
        console.error(e);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://618254ec84c2020017d89de4.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://618254ec84c2020017d89de4.mockapi.io/cart",
          obj
        );

        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (e) {
      alert("Не добавился товар в корзину!");
      console.error(e);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://618254ec84c2020017d89de4.mockapi.io/cart/${id}`);
      setCartItems(cartItems.filter((a) => Number(a.id) !== Number(id)));
    } catch (e) {
      alert("Не удалили кросовок!");
      console.error(e);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://618254ec84c2020017d89de4.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((a) => Number(a.id) !== Number(obj.id))
        );
        alert("Удалили лайк");
      } else {
        const { data } = await axios.post(
          "https://618254ec84c2020017d89de4.mockapi.io/favorites/",
          obj
        );
        setFavorites((prev) => [...prev, data]);
        alert("Add лайк");
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  let isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="home clear">
        {cartOpened ? (
          <Drawer
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
                searchValue={searchValue}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                onChangeSearchInput={onChangeSearchInput}
                cartItems={cartItems}
                isReady={isReady}
              />
            }
          />
          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/order" exact element={<OrderList />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

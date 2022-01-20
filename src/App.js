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

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isReady, setIsReady] = useState(true);

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
      setIsReady(false);
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

  let sumAllSneackers = () => {
    let sum = cartItems
      .map((sneakers) => sneakers.price)
      .reduce((a, b) => a + b, 0);
    return sum;
  };

  let taxAllSneackers = (sum) => {
    return (sum / 100) * 5;
  };

  let isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
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
            cartItems={cartItems}
            // onClose={() => setCartOpened(false)}
            removeItem={onRemoveItem}
            sumAllSneackers={sumAllSneackers}
            taxAllSneackers={taxAllSneackers}
          />
        ) : null}

        <Header
          onClickCart={() => setCartOpened(true)}
          sumAllSneackers={sumAllSneackers}
        />

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
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

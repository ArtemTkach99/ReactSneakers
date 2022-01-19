import React, { useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

function Card({
  name,
  price,
  img,
  id,
  onCart,
  onFavorite,
  favorited,
  added,
  loading = false,
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onHandleButton = () => {
    onCart({ name, price, img, id });
    setIsAdded(!isAdded);
  };

  const onHandleHeart = () => {
    onFavorite({ name, price, img, id });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="d-flex">
      <div className={styles.card}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={211}
            height={250}
            viewBox="0 0 211 260"
            backgroundColor="#F2F2F2"
            foregroundColor="#ecebeb"
          >
            <rect x="3" y="3" rx="3" ry="3" width="151" height="120" />
            <rect x="3" y="133" rx="3" ry="3" width="151" height="25" />
            <rect x="3" y="168" rx="3" ry="3" width="125" height="25" />
            <rect x="3" y="223" rx="9" ry="9" width="95" height="32" />
            <rect x="123" y="223" rx="9" ry="9" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.favorite}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="Unliked"
                onClick={onHandleHeart}
              />
            </div>
            <img width={133} height={112} src={img} alt="" />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} грн.</b>
              </div>
              <img
                className={styles.plus}
                onClick={onHandleButton}
                src={
                  isAdded ? "/img/btn-checked.jpg" : "/img/btn-unchecked.svg"
                }
                alt=""
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;

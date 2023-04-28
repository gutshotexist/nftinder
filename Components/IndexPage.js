import React, { useState, useEffect } from "react";
import Card from "./Card";
import { users } from "./users";

const IndexPage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setCurrentUserIndex(Math.floor(Math.random() * users.length));
  }, []);

  const handleNopeClick = () => {
    const nextIndex = (currentUserIndex + 1) % users.length;
    setCurrentUserIndex(nextIndex);
  };

  const handleLikeClick = () => {
    const nextIndex = (currentUserIndex + 1) % users.length;
    setCurrentUserIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const previousIndex = (currentUserIndex - 1 + users.length) % users.length;
    setCurrentUserIndex(previousIndex);
  };

  const { name, price, volume, collectionName, image } =
    users[currentUserIndex];
  const urlLink = `https://element.market/collections/${collectionName}`;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <Card
          key={name}
          name={name}
          price={`floor price: ${price} BNB`}
          volume={`Volume: ${volume} BNB`}
          collectionName={<a href={urlLink}>{collectionName}</a>}
          image={image}
          onPrevClick={handlePrevClick}
          onNopeClick={handleNopeClick}
          onLikeClick={handleLikeClick}
          user={users[currentUserIndex]}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </div>
    </div>
  );
};

export default IndexPage;

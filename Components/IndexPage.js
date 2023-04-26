import React, { useState, useEffect } from "react";
import Card from "./Card";

const users = [
  {
    name: "ESG Panda",
    price: "0.359",
    volume: "235",
    collectionName: "esg-panda",
    image: [
      "https://i.nfte.ai/ia/l201/578480/2879308866908200026_840014253.avif",
    ],
  },
  {
    name: "Yuliverse NFT",
    price: "0,11",
    volume: "3,993",
    collectionName: "yuliversenft",
    image:
      "https://storage.nfte.ai/nft/img/bsc/0x38/5565412240811531137_7534176.webp?x-oss-process=image/resize,m_lfit,h_900",
  },
  {
    name: "Origines Citizen 82e49d",
    price: "1.66",
    volume: "158",
    collectionName: "origines-citizen-82e49d",
    image:
      "https://i.nfte.ai/ia/l201/422197/4646285471756277981_1104381657.avif",
  },
  {
    name: "Radio Caca",
    price: "0.0007",
    volume: "30",
    collectionName: "Radio-Caca",
    image:
      "https://storage.nfte.ai/nft/img/bsc/0x38/7013187559098604490.png?x-oss-process=image/resize,m_lfit,h_900",
  },
];

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

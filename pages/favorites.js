import React from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = React.useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Favorites Page</h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-gray-500 mb-4">
            You haven't added any favorites yet.
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-red-600 text-white rounded-full uppercase tracking-wide font-semibold transition duration-300 hover:bg-red-700"
          >
            Browse
          </a>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={favorite.image} alt={favorite.name} />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold mb-2">{favorite.name}</h2>
                <button
                  onClick={() => removeFromFavorites(index)}
                  className="inline-block ml-4 mr-12 px-8 py-3 bg-red-600 text-white rounded-full text-xs uppercase tracking-wide font-semibold transition duration-300 hover:bg-red-700"
                >
                  Remove
                </button>

                <a
                  href={`https://element.market/collections/${favorite.collectionName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full text-xs uppercase tracking-wide font-semibold ml-4"
                >
                  View Collection
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;

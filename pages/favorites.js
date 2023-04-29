import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
          setFavorites(storedFavorites);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Local storage is not supported.");
    }
  }, []);

  const removeFromFavorites = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="container mx-auto py-8 h-screen flex flex-col items-center justify-center">
      <nav className="bg-white-100 px-4 py-2 flex justify-between items-center fixed top-0 left-0 right-0 w-full z-10">
        <div className="logo">
          <button onClick={() => router.push("/")}>
            <Image src="/logo.png" alt="Logo" width={300} height={50} />
          </button>
        </div>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Favorites Page</h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <p className="text-gray-500 mb-4 text-center">
            You haven&apos;t added any favorites yet.
          </p>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-full uppercase tracking-wide font-semibold transition duration-300 hover:bg-red-700"
          >
            Browse
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={favorite.image}
                alt={favorite.name}
                width={1024}
                height={1024}
              />
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

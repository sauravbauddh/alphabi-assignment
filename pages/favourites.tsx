import React, { useEffect, useState } from "react";
import GifDisplay from "../components/GifDisplay";
import Gif from "../models/Gif";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Gif[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Gif[];
    setFavorites(storedFavorites);
  }, []);

  const handleToggleFavorite = (gif: Gif) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== gif.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Favorites</h2>
      <div className="favorites-container">
        {favorites.length === 0 ? (
          <p style={{ textAlign: "center" }}>No favorites yet</p>
        ) : (
          <GifDisplay
            isFavoritesPage={true}
            gifs={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;

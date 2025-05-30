import React, { useState, useEffect } from "react";
import { FavoriteContext } from "./FavoritesContext";

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (meal) => {
    const isFav = favorites.some((i) => i.idMeal === meal.idMeal);

    const updated = isFav
      ? favorites.filter((i) => i.idMeal !== meal.idMeal)
      : [...favorites, meal];

    const sorted = [...updated].sort((a, b) =>
      a.strMeal.localeCompare(b.strMeal),
    );
    setFavorites(sorted);
  };

  const isFavorite = (meal) => {
    return favorites.some((i) => i.idMeal === meal.idMeal);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

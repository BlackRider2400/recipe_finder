import { useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import RecipeList from "./components/RecipeList";
import MealModal from "./components/MealModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
    );
    const data = await response.json();

    const sorted = (data.meals || []).sort((a, b) =>
      a.strMeal.localeCompare(b.strMeal),
    );
    setMeals(sorted);
  };

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

  const visibleMeals = showFavoritesOnly ? favorites : meals;

  return (
    <>
      <h1>Recipe Finder</h1>
      <div className="top-bar">
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        <button
          className="show-favorites-btn"
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
        >
          {showFavoritesOnly ? "Show all" : "Show favorites"}
        </button>
      </div>
      <RecipeList
        meals={visibleMeals}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
      {selectedMeal && (
        <>
          <MealModal
            meal={selectedMeal}
            onClose={() => setSelectedMeal(null)}
          />
        </>
      )}
    </>
  );
}

export default App;

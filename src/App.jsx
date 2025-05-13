import { useContext, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import RecipeList from "./components/RecipeList";
import MealModal from "./components/MealModal";
import { FavoriteContext } from "./contexts/FavoritesContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // hook, moved logic to other file
  const { favorites } = useContext(FavoriteContext);

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

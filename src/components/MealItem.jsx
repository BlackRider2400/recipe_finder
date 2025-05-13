import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoritesContext";

function MealItem({ meal, setSelectedMeal }) {
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);

  return (
    <div className="recipe-card" key={meal.idMeal}>
      <h3>{meal.strMeal}</h3>
      <button className="favorite-btn" onClick={() => toggleFavorite(meal)}>
        {isFavorite(meal) ? "⭐" : "☆"}
      </button>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "200px" }}
        onClick={() => {
          setSelectedMeal(meal);
        }}
      />
    </div>
  );
}

export default MealItem;

import MealItem from "./MealItem";

function RecipeList({
  meals,
  selectedMeal,
  setSelectedMeal,
  toggleFavorite,
  favorites,
}) {
  if (!meals || meals.length === 0) {
    return <p>No results.</p>;
  }

  return (
    <div className="recipe-grid">
      {meals.map((meal) => (
        <MealItem
          key={meal.idMeal}
          meal={meal}
          selectedMeal={selectedMeal}
          setSelectedMeal={setSelectedMeal}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some((fav) => fav.idMeal === meal.idMeal)}
        />
      ))}
    </div>
  );
}

export default RecipeList;

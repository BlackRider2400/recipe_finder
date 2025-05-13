function MealItem({ meal, setSelectedMeal, toggleFavorite, isFavorite }) {
  return (
    <div className="recipe-card" key={meal.idMeal}>
      <h3>{meal.strMeal}</h3>
      <button className="favorite-btn" onClick={() => toggleFavorite(meal)}>
        {isFavorite ? "⭐" : "☆"}
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

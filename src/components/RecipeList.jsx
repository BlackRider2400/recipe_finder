import MealItem from "./MealItem";

function RecipeList({ meals, selectedMeal, setSelectedMeal }) {
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
        />
      ))}
    </div>
  );
}

export default RecipeList;

import React, { useState, useEffect } from "react";

function MealModal({ meal, onClose }) {
  // animation for MealModal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // wait before destroing object so animation can happen
  const handleClose = () => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      <div
        className={`modal-overlay ${showModal ? "show" : ""}`}
        onClick={handleClose}
      />
      <div className={`modal ${showModal ? "show" : ""}`}>
        <h2>{meal.strMeal}</h2>
        <p>
          <strong>Category:</strong> {meal.strCategory}
        </p>
        <p>
          <strong>Area:</strong> {meal.strArea}
        </p>
        <p>
          <strong>Instructions:</strong> {meal.strInstructions}
        </p>
        <button onClick={handleClose}>❌</button>
      </div>
    </>
  );
}

export default MealModal;

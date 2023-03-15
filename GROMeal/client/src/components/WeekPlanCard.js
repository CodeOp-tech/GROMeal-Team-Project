import React, { useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import "./WeekPlanCard.css";

function WeekPlanCard(props) {
    const {recipe} = props
    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();

// DELETE a recipe
async function deleteRecipe(id) {
    let confirm = window.confirm("Are you sure you want to delete this recipe?")
      
    if (confirm) {
    // Define fetch() options
    let options = {
        method: 'DELETE'
    };
  
    try { //Do I need the last id?
        let response = await fetch(`/api/recipes/${planId}/${id}`, options);
        if (response.ok) {
            let recipes = await response.json();
            setRecipes(recipes);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
  }
  }

return (
    <div className="row card bg-light" key={recipe.id}>
        <p><button id="deleteButtonRecipe" className="btn btn-danger col-2" onClick={(e) => deleteRecipe(recipe.id)} title="delete" type="button">X</button> </p>
        <p id="title">{recipe.recipe_title}</p>
        <img src={recipe.recipe_image}/>                  
    </div> 
);
}



export default WeekPlanCard;
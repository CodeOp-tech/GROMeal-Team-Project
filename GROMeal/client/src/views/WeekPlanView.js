import { useEffect } from "react";
import React, { useState } from "react";
import './ExercisesView.css';
import { useParams, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import RecipesView from "./RecipesView";

function RecipesView(props) {

    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();
  
    useEffect(() => {
      getRecipes();
    }, []);
  
  // Get All recipes from a plan
  async function getRecipes() {
  
    try {
      let response = await fetch(`/recipes/${planId}`);
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
  
  
// DELETE a recipe
async function deleteRecipe(id) {
  let confirm = window.confirm("Are you sure you want to delete this recipe?")
    
  if (confirm) {
  // Define fetch() options
  let options = {
      method: 'DELETE'
  };

  try {
      let response = await fetch(`/recipes/${planId}/${id}`, options);
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
      <div class="bg-white">
      <div class="container-fluid mx-auto col-xl-9 col-lg-7 col-md-6 col-12">
      <div class="row d-flex justify-content-center">

        <div className="bg-white">          
          <RecipesList recipes={recipes} deleteRecipe={deleteRecipe}/>
        </div>
      </div>
      </div>
      </div>
     
    );
}



export default WeekPlanView;
import { useEffect } from "react";
import React, { useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
//import { Link } from 'react-router-dom';

function WeekPlanView(props) {

    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();
  
    useEffect(() => {
      getRecipes();
    }, []);
  
  // Get All recipes from a plan
  async function getRecipes() {
  
    try {
      let response = await fetch(`/api/recipes/${planId}`);
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
  
  
// // DELETE a recipe
// async function deleteRecipe(id) {
//   let confirm = window.confirm("Are you sure you want to delete this recipe?")
    
//   if (confirm) {
//   // Define fetch() options
//   let options = {
//       method: 'DELETE'
//   };

//   try {
//       let response = await fetch(`/api/recipes/${planId}/${id}`, options);
//       if (response.ok) {
//           let recipes = await response.json();
//           setRecipes(recipes);
//       } else {
//           console.log(`Server error: ${response.status} ${response.statusText}`);
//       }
//   } catch (err) {
//       console.log(`Server error: ${err.message}`);
//   }
// }
// }

 return (
    //   <div class="bg-white">
    //   <div class="container-fluid mx-auto col-xl-9 col-lg-7 col-md-6 col-12">
    //   <div class="row d-flex justify-content-center">


    //   <div class="row">
    //   <div class="row">
    //   <div class="row">
    <div class="row">
        <div class="col"></div>
         <div class="col">MONDAY</div>
         <div class="col">TUESDAY</div>
         <div class="col">WEDNESDAY</div>
         <div class="col">THURSDAY</div>
         <div class="col">FRIDAY</div>
         <div class="col">SATURDAY</div>
         <div class="col">SUNDAY</div>
         <div class="w-100"></div>
    
        <div class="col">Breakfast</div>
        <div class="col"></div>
        <div class="col">
          {
            recipes.map(recipe => (
                <div className="row card bg-light" key={recipe.id}>
                    <h5>{recipe.recipe_title}</h5>
                    <img src={recipe.recipe_image}/>
             </div>       
          ))}
        </div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="w-100"></div>

        <div class="col">Lunch</div>
        <div class="col">
        {
            recipes.map(recipe => (
                <div className="row card bg-light" key={recipe.id}>
                    <h5>{recipe.recipe_title}</h5>
                    <img src={recipe.recipe_image}/>
             </div>       
          ))}
        </div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="w-100"></div>

        <div class="col">Dinner</div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col">
             {
                 recipes.map(recipe => (
                    <div className="row card bg-light" key={recipe.id}>
                        <h5>{recipe.recipe_title}</h5>
                        <img src={recipe.recipe_image}/>
                    </div>       
            ))} 
        </div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="w-100"></div>
 
  </div>

       /* <div className="bg-white">     
        {
            recipes.map(recipe => (
                <div className="row card bg-light" key={recipe.id}>
                    <h5>{recipe.recipe_title}</h5>
                    <img src={recipe.recipe_image}/>
             </div>       
        ))}      */
          /* <RecipesList recipes={recipes} deleteRecipe={deleteRecipe}/> */
    //     </div>
    //   </div>
    //   </div>
    //   </div>
     
    );
}



export default WeekPlanView;
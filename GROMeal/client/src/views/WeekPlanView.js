import { useEffect } from "react";
import React, { useState } from "react";
import { useParams, Routes, Route, NavLink } from "react-router-dom";
import "./WeekPlanView.css";
import WeekPlanCard from "../components/WeekPlanCard";
//import RecipesView from "./RecipesView";
import Spoonacular from "./Spoonacular";
//import './App.css';
//import { Link } from 'react-router-dom';

function WeekPlanView(props) {



    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();
    //const navigate = useNavigate()=
    // const [editingRec, setEditingRec] = useState(null);
  
    useEffect(() => {
      getRecipes();
    }, []);
  
    // function handleClick(rId) {
    //   setEditingRec(rId)
    // }

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

let mondayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "monday");
let mondayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "monday");
let mondayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "monday");
//console.log(mondayLunch);

let tuesdayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "tuesday");
let tuesdayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "tuesday");
let tuesdayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "tuesday");

let wednesdayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "wednesday");
let wednesdayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "wednesday");
let wednesdayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "wednesday");

let thursdayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "thursday");
let thursdayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "thursday");
let thursdayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "thursday");

let fridayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "friday");
let fridayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "friday");
let fridayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "friday");

let saturdayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "saturday");
let saturdayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "saturday");
let saturdayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "saturday");

let sundayBreakfast = recipes.filter(r => r.meal_type === "breakfast" && r.week_day === "sunday");
let sundayLunch = recipes.filter(r => r.meal_type === "lunch" && r.week_day === "sunday");
let sundayDinner = recipes.filter(r => r.meal_type === "dinner" && r.week_day === "sunday");


 return (
    //   <div class="bg-white">
      //  <div class="container-fluid mx-auto col-xl-9 col-lg-7 col-md-6 col-12">
    //  <div class="row d-flex justify-content-center"> 
 //<div className="RecipeBlock">

    <div class="row g-2">
        <div class="col"></div>
         <div class="col">MONDAY</div>
         <div class="col">TUESDAY</div>
         <div class="col">WEDNESDAY</div>
         <div class="col">THURSDAY</div>
         <div class="col">FRIDAY</div>
         <div class="col">SATURDAY</div>
         <div class="col">SUNDAY</div>
         <div class="w-100"></div>
    
         <div class="col">BREAKFAST</div>
            <div className="col">    
           {
               mondayBreakfast.map(recipe => ( 
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe} />                
            ))}   
        </div>

        <div class="col">
        {
            tuesdayBreakfast.map(recipe => (
               <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            wednesdayBreakfast.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            thursdayBreakfast.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe} />
          ))}
        </div>

        <div class="col">
        {
            fridayBreakfast.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            saturdayBreakfast.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            sundayBreakfast.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="w-100"></div>
        

        <div class="col">LUNCH</div>
        <div class="col">    
        {
            mondayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
         
        </div>
        <div class="col">
        {
            tuesdayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            wednesdayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            thursdayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            fridayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            saturdayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            sundayLunch.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="w-100"></div>


        <div class="col">DINNER</div>
        <div class="col">    
        {
            mondayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}         
        </div>

        <div class="col">
        {
            tuesdayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            wednesdayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            thursdayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            fridayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            saturdayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}
        </div>

        <div class="col">
        {
            sundayDinner.map(recipe => (
              <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
          ))}          
        </div>

        <div class="w-100"></div> 

        <div className="bottomButtons">
        <button id="GoBack" variant="outline-primary" className="col-2" title="delete" type="button">
             <NavLink to="/recepies">GO BACK</NavLink>  
        </button>

        <button id="SeeSL" className="btn btn-danger col-2" title="delete" type="button">
            <NavLink to={`/shoppinglist/${planId}`}>SEE SHOPING LIST</NavLink>  
        </button>

          <Routes>
            {/* <Route path="/api/recipes" element={<RecipesView />}> */}
            <Route path="/spoon" element={<Spoonacular /> } />
            {/* <Route path="/shoppingList" element={<ShoppingList />}></Route> */}
          </Routes>
      </div>

  
  </div>

     /* I did the map first to show some recipes in the grid to see how they were displayed
          {
            recipes.map(recipe => (
                <div className="row card bg-light" key={recipe.id}>
                    <h5>{recipe.recipe_title}</h5>
                    <img src={recipe.recipe_image}/>
             </div>       
          ))} */
     
    );
}



export default WeekPlanView;
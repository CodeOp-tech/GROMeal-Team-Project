import { useEffect } from "react";
import React, { useState } from "react";
import { useParams, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./WeekPlanView.css";
import WeekPlanCard from "../components/WeekPlanCard";
//import RecipesView from "./RecipesView";
import Spoonacular from "./Spoonacular";
//import './App.css';
//import { Link } from 'react-router-dom';


function WeekPlanView(props) {

    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();
    const navigate = useNavigate();
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
    
    <div className="weekPlanView">
      <div className="bottomButtons">
        <button className="NavButton-WeekPlanView" id="GoBack" variant="outline-primary" title="delete" type="button">
              <NavLink className="NavLink-WeekPlanView" to={`/recipes/${planId}`}>← GO BACK</NavLink>  
        </button>

        <button className="NavButton-WeekPlanView" id="SeeSL" variant="outline-primary" title="delete" type="button">
          {
           <NavLink className="NavLink-WeekPlanView"
            to={`/shoppinglist/${planId}`}>SEE SHOPPING LIST →</NavLink>  
          }
        </button>

        <Routes>
            {/* <Route path="/api/recipes" element={<RecipesView />}> */}
          <Route path="/spoon" element={<Spoonacular /> } />
            {/* <Route path="/shoppingList" element={<ShoppingList />}></Route> */}
        </Routes>
      </div>
      <div>
        <h1 className="favoriteTitle">Week Planning</h1>
      </div>
      <div id="weekNamesGrid" class="row g-2">
          <div class="w-100"></div> 
          <div id="weekNames" class="col"></div>
          <div id="weekName" class="col">MONDAY</div>
          <div id="weekName" class="col">TUESDAY</div>
          <div id="weekName" class="col">WEDNESDAY</div>
          <div id="weekName" class="col">THURSDAY</div>
          <div id="weekName" class="col">FRIDAY</div>
          <div id="weekName" class="col">SATURDAY</div>
          <div id="weekName" class="col">SUNDAY</div>
          <div id="weekName" class="w-100"></div>
      
          <div id="mealType1"className="col"> BREAKFAST   
          </div>

          <div id="mealType"class="col">
          {
              mondayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              tuesdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              wednesdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              thursdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe} />
            ))}
          </div>

          <div id="mealType" class="col">
          {
              fridayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              saturdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              sundayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div class="w-100"></div>
          
          <div id="mealType1" class="col">LUNCH</div>
          <div id="mealType" class="col">    
          {
              mondayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          
          </div>
          
          <div id="mealType" class="col">
          {
              tuesdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              wednesdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              thursdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              fridayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              saturdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              sundayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div class="w-100"></div>

          <div id="mealType1"class="col">DINNER</div>
          <div id="mealType" class="col">    
          {
              mondayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}         
          </div>

          <div  id="mealType" class="col">
          {
              tuesdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              wednesdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              thursdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              fridayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              saturdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="col">
          {
              sundayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}          
          </div>

          <div class="w-100"></div> 
        </div> 
        
    </div>
  
  );
}



export default WeekPlanView;
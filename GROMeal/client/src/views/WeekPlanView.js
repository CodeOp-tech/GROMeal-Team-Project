import { useEffect, useContext } from "react";
import React, { useState } from "react";
import { useParams, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./WeekPlanView.css";
import WeekPlanCard from "../components/WeekPlanCard";
//import planRecipesView from "./planRecipesView";
import Spoonacular from "./Spoonacular";
//import './App.css';
//import { Link } from 'react-router-dom';
import RecipesContext from "../components/RecipesContext";
import ProgressBar from '../components/ProgressBar';

function WeekPlanView(props) {

    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();
    const navigate = useNavigate();
    // const [editingRec, setEditingRec] = useState(null);
    const {planRecipes, updatePlanRecipes} = useContext(RecipesContext);

    useEffect(() => {
      getRecipes();
    }, []);
  
    // function handleClick(rId) {
    //   setEditingRec(rId)
    // }

  // Get All Recipes from a plan
  async function getRecipes() {
  
    try {

      let response = await fetch(`/api/recipes/${planId}`);

      if (response.ok) {
          let planRecipes = await response.json();
          updatePlanRecipes(planRecipes);
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
          let planRecipes = await response.json();
          updatePlanRecipes(planRecipes);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}
}

let mondayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "monday");
let mondayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "monday");
let mondayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "monday");
//console.log(mondayLunch);

let tuesdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "tuesday");
let tuesdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "tuesday");
let tuesdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "tuesday");

let wednesdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "wednesday");
let wednesdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "wednesday");
let wednesdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "wednesday");

let thursdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "thursday");
let thursdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "thursday");
let thursdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "thursday");

let fridayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "friday");
let fridayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "friday");
let fridayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "friday");

let saturdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "saturday");
let saturdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "saturday");
let saturdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "saturday");

let sundayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "sunday");
let sundayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "sunday");
let sundayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "sunday");


 return (
    
    <div className="weekPlanView">

      <ProgressBar activeStep={1}/> 

    <div>
      <div className="container sticky-top">
      <div className="mx-auto col-10 col-md-8 col-lg-4 align-items-center">
        <button className="btn btn-warning px-3 btn-md" id="buttonA" variant="outline-primary" title="delete" type="button">
              <NavLink className="NavLink-WeekPlanView" to={`/recipes/${planId}`}>← GO BACK</NavLink>  
        </button>

        <button className="btn btn-warning px-3 btn-md" id="buttonA" variant="outline-primary" title="delete" type="button">
          {
           <NavLink className="NavLink-WeekPlanView"
            to={`/shoppinglist/${planId}`}>SEE SHOPPING LIST →</NavLink>  
          }
        </button>
      </div>
      </div>
    <div id="weekPlanView" className="justify-content-center container-fluid-md">
{/* <ProgressBar/> */}
    
      <div>
        <h1 className="mb-4 mt-5 mx-5"id="title">My Week Plan</h1>
      </div>
      <div id="weekNamesGrid" class="row col-12">
          <div id="mealTypeEmpty"></div>
          <div id="weekName" class="col">MONDAY</div>
          <div id="weekName" class="col">TUESDAY</div>
          <div id="weekName" class="col">WEDNESDAY</div>
          <div id="weekName" class="col">THURSDAY</div>
          <div id="weekName" class="col">FRIDAY</div>
          <div id="weekName" class="col">SATURDAY</div>
          <div id="weekName" class="col">SUNDAY</div>
          <div></div>
      
          <div id="mealType1"> BREAKFAST   
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
          
          <div id="mealType1">LUNCH</div>
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

          <div id="mealType1">DINNER</div>
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
    </div>
    </div>
  
  );
}



export default WeekPlanView;
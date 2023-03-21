import React, { useState, useEffect, useContext} from 'react';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import "./RecipesView.css";
import Api from '../helpers/Api';
import RecipesContext from "../components/RecipesContext";
import LoginView from "./LoginView";


// const EMPTY_FORM = {
//     API_id: 0,
//     recipe_title: '',
//     recipe_image: '',
//     servings: 1,
//     meal_type: '',
//     week_day: '',
// };

const EMPTY_SEARCH = {
    dishType: '',
    vegan: false,
    vegetarian: false,
    glutenfree: false,
};


function RecipesView(props){
    
    const { planId } = useParams();
    const [featVisible, setfeatVisible] = useState(true);
    const [filter, setFilter] = useState(EMPTY_SEARCH);
    const {recipes, setRecipes, setAddedRecipe, featRecipe, addedRecipe, setFeatRecipe } = useContext(RecipesContext);
    
    useEffect(() => {
        getRandomRecipes();
    }, []);

    async function getRandomRecipes() {
        let uresponse = await SpoonApi.getRandomRecipes();
        console.log(uresponse);
        if (uresponse.ok) {
            setRecipes(uresponse.data.recipes);
            
        } else {
            console.log('Error:', uresponse.error);
        }

    }

    
    //WORKING
    //FETCH POST NEW RECIPE FROM USER
    const addRecipe = async () => {
    
        try {
            let response = await Api._doFetch(`/api/recipes/${planId}`, 'POST', addedRecipe);
            console.log(response);
            if (response.ok) {            
                console.log('Recipe added!')
            } else {
                console.log(`Server error: ${response.status}:
                ${response.statusText}`);
            }
            
        } catch (err) {
            console.log(`Network error: ${err.message}`);
        }
        console.log(addedRecipe)
      };

   
    //WORKING 
    //FUNCTION TO CLICK ON RECIPE, VISUALIZE RECIPE ON TOP & ADDS RECIPE'S DATA TO CONST addedRecipe
    function showFeatRecipe(id){
        let selectedRecipe = recipes.find(r => r.id === id);
        setFeatRecipe(selectedRecipe);
        // const [reloadRecipe, setReloadRecipes] = useState([]);
        // console.log(selectedRecipe.title);
        setAddedRecipe((addedRecipe) => ({...addedRecipe, API_id: selectedRecipe.id, recipe_title: selectedRecipe.title, recipe_image: selectedRecipe.image}));
    };
    
    
    //WORKING
    const handleChangeView = (featVisible) => {
        setfeatVisible(featVisible);
      };

    //FORM INPUT
    const handleChange = event => {
    // console.log(event.target.id)

    let  value  = event.target.value;
    let name = event.target.name;
    
    setAddedRecipe((addedRecipe) => ({...addedRecipe, [name]: value}));
    };

    const handleSubmit = event => {
        
        event.preventDefault();
        addRecipe(addedRecipe);
        setAddedRecipe((addedRecipe) => ({...addedRecipe, meal_type: "", week_day: "", servings: 1}));

    };
    
    let weekDayArray = ['monday', 'tuesday', 'wednesday', 'thursday', "friday", "saturday", "sunday"];
    let mealType = ['breakfast', "lunch", "dinner"];
    let dishType = ["soup","lunch","main course ","main dish","dinner","dessert","side dish","bread","antipasti","starter","snack","appetizer","antipasto","hor d'oeuvre","morning meal","brunch","breakfast"];
    let cuisines = ["Italian","Mediterranean","European","Mexican","French","Greek"];
    let diets = ["gluten free","dairy free ","paleolithic ","lacto ovo vegetarian ","primal ","whole 30 ","vegan"];

    
    // console.log(recipes.dishTypes)
    let recipeSteps = featRecipe && featRecipe.analyzedInstructions[0].steps;

    return (
        <div className="RecipesView">
           
            <div className='NavSection-RecipesView'>
                <button className='NavButton-RecipesView'>
                    <NavLink className='NavLink-RecipesView' to="/">
                        ← GO BACK 
                    </NavLink>
                </button>
                <button className='NavButton-RecipesView'>
                     <NavLink className='NavLink-RecipesView'to={`/weekPlan/${planId}`}>
                        Weekplan →
                    </NavLink>
                </button>

            </div>
            <h1 className='favoriteTitle'>Select your favorite meals</h1>

            <form className="featLegendform">
                                <label className="featLegendform">
                                    Dish type(lunch, soup, dessert, etc)
                                    <select required className = "mealInput" name='dishType' id="selected"
                                        >
                                        <option selected id="editOptions"></option> 
                                        { dishType.map(dish => (
                                            <option id="editOptions" value={dish}>{dish}</option>
                                        )) }

                                    </select>
                                </label>
                                <label className="featLegendform">
                                    food type(Italian, French, etc)
                                    <select required className = "mealInput" name='cuisines' id="selected"

                                        >
                                        <option selected id="editOptions" value={""}></option> 
                                        { cuisines.map(food => (
                                            <option id="editOptions" value={food}>{food}</option>
                                        )) }

                                    </select>
                                </label>
                                <label className="featLegendform">
                                    food type(Italian, French, etc)
                                    <select required className = "mealInput" name='diets' id="selected"

                                        >
                                        <option selected id="editOptions" value={""}></option> 
                                        { diets.map(diets => (
                                            <option id="editOptions" value={diets}>{diets}</option>
                                        )) }

                                    </select>
                                </label>
                            </form>
            
            {featRecipe && <div id={featRecipe.id} className= { featVisible ? "invisible" : 'visible' }> 
                <div className="featBlock">
                    <img src={featRecipe.image} alt="recipe" className="featImage"></img>
                    <div className="featLegend">
                        <h3 className="featLegendText">{featRecipe.title}</h3>
                        <h4 className="featLegendText">Ready in: {featRecipe.readyInMinutes} min</h4>
                        
                        <ol className="featLegend">
                            {
                                recipeSteps.map(steps =>
                                <li>{steps.step}</li>
                                    )
                            }
                        </ol>
                        <h5 className="featLegend">I want to eat this meal on :</h5>
                        <div className="featBlockform">
                            <form className="featLegendform" onSubmit = {handleSubmit}>
                                <label className="featLegendform">
                                    Select a day
                                    <select required className = "mealInput" name='week_day' id="selected" value={addedRecipe.week_day}
                                        onChange = { handleChange }
                                        >
                                        <option selected id="editOptions" value={""}></option> 
                                        { weekDayArray.map(day => (
                                            <option id="editOptions" value={day}>{day}</option>
                                        )) }

                                    </select>
                                </label>
                                <label className="featLegendform">
                                    Select a meal
                                    <select required className = "mealInput" name='meal_type' id="selected" value={addedRecipe.meal_type}
                                        onChange = { handleChange }
                                        >
                                        <option selected id="editOptions" value={""}></option> 
                                        { mealType.map(meal => (
                                            <option id="editOptions" value={meal}>{meal}</option>
                                        )) }

                                    </select>
                                </label>
                                <label className="featLegendform">
                                    Serving
                                    <input className = "mealInput" type="number" id="serving" name="servings" value={addedRecipe.servings}
                                    min="1"
                                    onChange = { handleChange }
                                    ></input>
                                </label>
                                <label className="buttonFeatLegendform">
                                    <button className="buttonFeatLegendform">
                                        add recipe
                                    </button>

                                </label>

                            </form>
                        </div>

                    </div>

                </div>
            </div>
                }            
            <div className="recipesGrid" >
                {
                recipes.map(recipe => (
                    <div  onClick={() => handleChangeView(false)}>
                        <div className="recipeBlock" id={recipe.id} key={recipe.id} onClick={() => showFeatRecipe(recipe.id)}>
                            <img src={recipe.image} alt="recipe"></img>
                            <h5 className="imageLeg" id='recipeTitle'>{recipe.title}</h5>
                            <h6 className="imageLeg">Ready in: {recipe.readyInMinutes} min</h6>
                        </div>
                    </div>
                ))
            }

            </div>
          

            </div>
            
    );





}




export default RecipesView;
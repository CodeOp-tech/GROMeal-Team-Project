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
    cuisines: '',
    diets: ''
};


function RecipesView(props){
    
    const { planId } = useParams();
    //const [featVisible, setfeatVisible] = useState(true);
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const {recipes, setRecipes, setPlanRecipes, editingRecipeId, setEditingRecipeId, featVisible, setfeatVisible, showFeatRecipe, setAddedRecipe, featRecipe, addedRecipe, setFeatRecipe } = useContext(RecipesContext);

    useEffect(() => {
        getRandomRecipes();
    }, []);

    useEffect(() => {
        setFilteredRecipes(recipes);
    }, [recipes]);

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

    //PUT function to modify a recipe
    async function modifyRecipe() {

        let options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addedRecipe)
        };

        try {
            let response = await fetch(`/api/recipes/${planId}/${editingRecipeId}`, options);
            if (response.ok) {
                let recipes = await response.json();
                setPlanRecipes(recipes);
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
    }

   
    
    //WORKING
    const handleChangeView = (featVisible) => {
        setfeatVisible(featVisible);
      };

    //FORM INPUT
    const handleChange = event => {
        // console.log(event.target.id)

        let  value  = event.target.value;
        console.log(value)
        let name = event.target.name;
        
        setAddedRecipe((addedRecipe) => ({...addedRecipe, [name]: value}));
    };


    //WHEN SUBMITTING FORM -> ADD RECIPE
    const handleSubmit = event => {
        event.preventDefault();
        if (editingRecipeId) {
            modifyRecipe();
            setEditingRecipeId(null);
        } else {        
        addRecipe(addedRecipe);
        setAddedRecipe((addedRecipe) => ({...addedRecipe, meal_type: "", week_day: "", servings: 1}));
        };

    };
    
    //SEARCH INPUT
    const handleSearchChange = event => {
        // console.log(event.target.id)
    
        let  value  = event.target.value;
        console.log(value)
        let name = event.target.name;
        
        setSearch((search) => ({...search, [name]: value}));
            
    };
    
    // WHEN SUBMITTING ON SEARCH BAR
    const handleSearchSubmit = event => {
        event.preventDefault();     
        // console.log("hello")
        let newGrid = recipes;
        if(search.dishType){
            newGrid = newGrid.filter(recipe => recipe.dishTypes.includes(search.dishType));
        }
        if(search.cuisines){
            newGrid = newGrid.filter(recipe => recipe.cuisines.includes(search.cuisines));
        }
        if(search.diets){
            newGrid = newGrid.filter(recipe => recipe.diets.includes(search.diets));
        }

        setFilteredRecipes(newGrid)
    };

    const clearSearch = event => {
        event.preventDefault(); 
        setFilteredRecipes(recipes)
    }


    //DRAGGABLE MENU
    const handleDragEnd = (event) => {
        setX(event.clientX);
        setY(event.clientY);
        };
    
    //ARRAYS NEEDED FOR DROPDOWNS
    let weekDayArray = ['monday', 'tuesday', 'wednesday', 'thursday', "friday", "saturday", "sunday"];
    let mealType = ['breakfast', "lunch", "dinner"];
    let dishType = ["soup","main dish","dessert","side dish","starter","snack","dinner","lunch","breakfast"];
    let cuisines = ["Italian","Mediterranean","European","Mexican","French","Greek"];
    let diets = ["vegan","vegetarian","gluten free","dairy free","lacto ovo vegetarian"];

    
    // console.log(recipes.dishTypes)
    let recipeSteps = featRecipe && featRecipe.analyzedInstructions[0].steps;

    return (
        <div className="RecipesView">
           <div className='NavAbsolute-RecipesView' 
                draggable
                onDragEnd = {handleDragEnd}
                style={{
                        position: "absolute",
                        left: x,
                        top: y
                }}
           >
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
           </div>
            <h1 className='favoriteTitle'>Select your favorite meals</h1>

            <form className="featLegendform" onSubmit={ handleSearchSubmit }>
                    <label className="featLegendform" >
                        Dish type(lunch, soup, dessert, etc)
                        <select className = "mealInput" name='dishType' id="selected" value={search.dishType}
                            onChange = { handleSearchChange }
                            >
                            <option selected id="editOptions" value={""}></option> 
                            { dishType.map(dish => (
                                <option id="editOptions" value={dish}>{dish}</option>
                            )) }

                        </select>
                    </label>
                    <label className="featLegendform">
                        Food type(Italian, French, etc)
                        <select className = "mealInput" name='cuisines' id="selected" value={search.cuisines}
                            onChange = { handleSearchChange }
                            >
                            <option selected id="editOptions" value={""}></option> 
                            { cuisines.map(food => (
                                <option id="editOptions" value={food}>{food}</option>
                            )) }

                        </select>
                    </label>
                    <label className="featLegendform">
                        Diet type
                        <select className = "mealInput" name='diets' id="selected"  value={search.diets}
                            onChange = { handleSearchChange }
                            >
                            <option selected id="editOptions" value={""}></option> 
                            { diets.map(diets => (
                                <option id="editOptions" value={diets}>{diets}</option>
                            )) }

                        </select>
                    </label>
                    <button>Search</button>
                    <button onClick={ clearSearch }>Clear all</button>
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
                filteredRecipes.map(recipe => (
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
import React, { useState, useEffect } from 'react';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import "./RecipesView.css";
import Api from '../helpers/Api';

const EMPTY_FORM = {
    API_id: 0,
    recipe_title: '',
    recipe_image: '',
    servings: 1,
    meal_type: '',
    week_day: '',
};


function RecipesView(props){
    
    const { planId } = useParams();
    const [featVisible, setfeatVisible] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [featRecipe, setFeatRecipe] = useState([]);
    // // let [userRecipe, setUserRecipe] = useState([]);  //FECTH PUT & GET  //FECTH PUT & GET
    const [ addedRecipe, setAddedRecipe ] = useState(EMPTY_FORM);

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

//  //FETCH GET NEW RECIPE FROM USER
//     function getUserRecipe() { 
//         fetch(`/1`)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error(
//                         `Server error: ${response.status}: ${response.statusText}`
//                     );
//                 }
//             })
//             .then(data => {
//                 setUserRecipe(data);
//             })
//             .catch (error =>  {
//                 console.log(`Error: ${error}`);
//             });
//     }

//  //FETCH PUT TO UPDATE RECIPE FROM USER
//     const updateRecipe = async id => {
//     let recipe = userRecipe.find(r => r.id === id);
//     recipe.complete = !recipe.complete;
//     console.log(id)
//     let options = {
//         method: "PUT",
//         headers: { "Content-Type": "application/json"},
//         body: JSON.stringify(recipe)
//     };
    
//     try { 
//         let response = await fetch(`/:planId`, options);
//         if (response.ok) {
//             getUserRecipe();
//         } else {
//             console.log(`Server error: ${response.status}:
//             ${response.statusText}`);
//         }
//     } catch (err) {
//         console.log(`Network error: ${err.message}`);
//     }
//     };

    
    //WORKING
    //FETCH POST NEW RECIPE FROM USER
    const addRecipe = async () => {
    
        try {
            let response = await Api._doFetch(`/api/recipes/1`, 'POST', addedRecipe);
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

    //FETCH PUT TO UPDATE RECIPE FROM USER
    const updateRecipe = async id => {
    let recipe = userRecipe.find(r => r.id === id);
    recipe.complete = !recipe.complete;
    console.log(id)
    let options = {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(recipe)
    };
    
    try { 
        let response = await fetch(`/:planId`, options);
        if (response.ok) {
            getUserRecipe();
        } else {
            console.log(`Server error: ${response.status}:
            ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Network error: ${err.message}`);
    }
    };
    //WORKING 
    //FUNCTION TO CLICK ON RECIPE, VISUALIZE RECIPE ON TOP & ADDS RECIPE'S DATA TO CONST addedRecipe
    function showFeatRecipe(id){
        let selectedRecipe = recipes.find(r => r.id === id);
        setFeatRecipe(selectedRecipe);
        // const [reloadRecipe, setReloadRecipes] = useState([]);
        console.log(selectedRecipe);
        // console.log(selectedRecipe.title);
        setAddedRecipe((addedRecipe) => ({...addedRecipe, API_id: selectedRecipe.id, recipe_title: selectedRecipe.title, recipe_image: selectedRecipe.image}));
        // console.log(addedRecipe);
    };
    
    // console.log(addedRecipe);
    
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
   
    let weekDayArray = ['monday', 'tuesday', 'wednesday', 'thursday', "friday", "saturday", "sunday"];
    let mealType = ['breakfast', "lunch", "dinner"];

    return (

        <div className="RecipesView">

            <h1 className='favoriteTitle'>Select your favorite meals</h1>
            
            <div id={featRecipe.id} className= { featVisible ? "invisible" : 'visible' }> 
                <div className="featBlock">
                    <img src={featRecipe.image} alt="recipe" className="featImage"></img>
                    <div className="featLegend">
                        <h3 className="featLegendText">{featRecipe.title}</h3>
                        <h4 className="featLegendText">Ready in: {featRecipe.readyInMinutes} min</h4>
                        <h5 className="featLegend">{featRecipe.instructions}</h5>
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
                                <select className = "dropdown" name='meal_type' id="selected"
                                    onChange = { handleChange }
                                    >
                                    <option selected id="editOptions"> Select a meal </option> 
                                    { mealType.map(recipe => (
                                        <option id="editOptions" value={recipe}>{recipe}</option>
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

            <div className='NavSection-RecipesView'>
                <button className='NavButton-RecipesView'>
                    <NavLink className='NavLink-RecipesView' to="/">
                        Home 
                    </NavLink>
                </button>
                <button className='NavButton-RecipesView'>
                    <NavLink className='NavLink-RecipesView'to={`/weekPlan/1`}>
                        weekplan 
                    </NavLink>
                </button>
            </div>
            <div className="recipesGrid" >
                {
                recipes.map(recipe => (
                    <div  onClick={() => handleChangeView(false)}>
                        <div className="recipeBlock" id={recipe.id} key={recipe.id} onClick={() => showFeatRecipe(recipe.id)}>
                            <img src={recipe.image} alt="recipe"></img>
                            <h5 className="imageLeg" id='recipeTitle'>{recipe.title}</h5>
                            <h6 className="imageLeg">Ready in: {recipe.readyInMinutes} min</h6>
                            
                            {/* <Link to="/page2">
                            </Link> */}

                            
                            {/* <h6 className="imageLeg">Servings: {recipe.servings} persons</h6> */}
                            {/* <h6 className="imageLeg">Food: {recipe.cuisines} </h6> */}
                        
                                {/* <button onClick={(e) => props.modifyEx(ex.id)} title="modify" type="button">
                                    <input type="text">...</input>
                                    MODIFY
                                </button> */}

                            {/* <div id="divButton" className="col-6 content-right">
                            <button className="col-6" onClick={(e) => props.deleteEx(ex.id)} title="delete" type="button">DELETE</button>
                            </div> */}
                        </div>
                    </div>
                ))
            }

            </div>


            </div>
    );





}




export default RecipesView;
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import "./RecipesView.css"

function RecepiesView(props){
    
    const [featClicked, setfeatClicked] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [featRecipe, setFeatRecipe] = useState([]);
    
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

    function showFeatRecipe(id){
        let selectedRecipe = recipes.find(r => r.id === id);
        setFeatRecipe(selectedRecipe);
        console.log(featRecipe);
    };

    const handleChangeView = (featClicked) => {
        setfeatClicked(featClicked);
      };

    // const handleCheckbox = event => {
    //     let input = `SELECT MONTH(${input}) AS Month;`;
    //     event.preventDefault();
    //     props.addRequestCb(input);
    //     setInput("");
    // };
    
    // const handleChange = event => {
    //     setInput(event.target.value);
    // };

    return (
        <div className="App">
            <h1>Select your favorite meals</h1>
            <div id={featRecipe.id} className= { featClicked ? "invisible" : 'visible' }> 
                <div className="featBlock">
                    <img src={featRecipe.image} alt="recipe" className="featImage"></img>
                    <div>
                        <h3 className="featLegend">{featRecipe.title}</h3>
                        <h5 className="featLegend">Ready in: {featRecipe.readyInMinutes} min</h5>
                        <h5 className="featLegend">{featRecipe.instructions}</h5>
                        <h5>I want to eat this meal on :</h5>
                        <form>
                            <input type="checkbox" id="monday"/> Monday
                            <input type="checkbox" id="tuesday"/> Tuesday
                            <input type="checkbox" id="wednesday"/> Wednesday
                            <input type="checkbox" id="thursday"/> Thursday
                            <input type="checkbox" id="friday"/> Friday
                            <input type="checkbox" id="saturday"/> Saturday
                            <input type="checkbox" id="sunday"/> Sunday
                        </form>

                    </div>

                </div>
                            
            </div>
            <div className="recepiesGrid" >
                {
                recipes.map(recipe => (
                    <div  onClick={() => handleChangeView(false)}>
                        <div className="recipeBlock" id={recipe.id} key={recipe.id} onClick={() => showFeatRecipe(recipe.id)}>
                            <img src={recipe.image} alt="recipe"></img>
                            <h5 className="imageLeg">{recipe.title}</h5>
                            <h6 className="imageLeg">Ready in: {recipe.readyInMinutes} min</h6>
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




export default RecepiesView;
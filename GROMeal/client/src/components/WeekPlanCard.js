//import { useParams, Routes, Route } from "react-router-dom";
import "./WeekPlanCard.css";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import { useContext } from "react";

function WeekPlanCard(props) {
    const {recipe} = props
    //const { planId } = useParams();
    const navigate = useNavigate();
    const {recipes, setRecipes, setEditingRecipeId, showFeatRecipe, featVisible, setfeatVisible, setAddedRecipe, featRecipe, addedRecipe, setFeatRecipe } = useContext(RecipesContext);
    
function handleClick(recipe) {
    const { id, API_id, recipe_title, recipe_image, servings, meal_type, week_day, plan_id} = recipe;
    setAddedRecipe({ API_id, recipe_title, recipe_image, servings, meal_type, week_day});
    showFeatRecipe(API_id);
    setfeatVisible(false);
    setEditingRecipeId(id);
    navigate(`/recipes/${plan_id}`);
}
 
return (
    <div id="WPcard"className="row p-0 m-0" key={recipe.id} >

        <p><button id="deleteButtonRecipe" className="btn btn-danger col-2" onClick={(e) => props.deleteRecipe(recipe.id)} title="delete" type="button">X</button></p>
        {/* </div><div id="WPcard" title="Click here to modify" onClick={e => handleClick(recipe)}> */}
        {/* <div id="WPcard" title="Click here to modify" > */}
        <p id="titleRec">{recipe.recipe_title}</p>
        <img className="recImg" src={recipe.recipe_image} title="Click here to modify" onClick={e => handleClick(recipe)}/>  
        {/* </div>        */}
        <div>
        </div>     
    </div> 
 );   
}



export default WeekPlanCard;
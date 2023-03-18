//import { useParams, Routes, Route } from "react-router-dom";
import "./WeekPlanCard.css";
import { useNavigate } from "react-router-dom";
// import RecipesContext from "../RecipesContext";

function WeekPlanCard(props) {
    const {recipe} = props
    //const { planId } = useParams();
    const navigate = useNavigate();
    // const recipes = useContext(RecipesContext);
    // const featRecipe = useContext(RecipesContext);

function handleClick() {
navigate("/recipes");
props.showFeatRecipe(recipe.id); 
}
 
//the function delete and the state are in the parent (WeekPlanView). It's dangerous to have it here. The state
//must be only in one place, the parent, and pass the delete function as a prop.
return (
    <div className="row WPcard bg-light" key={recipe.id}>
        <p><button id="deleteButtonRecipe" className="btn btn-danger col-2" onClick={(e) => props.deleteRecipe(recipe.id)} title="delete" type="button">X</button></p>
        <p id="titleRec">{recipe.recipe_title}</p>
        <img className="recImg" src={recipe.recipe_image} onClick={e => props.showFeatRecipe(recipe.id)} />  
        {/* DO I NEED THIS TO NAVIGATE TO THAT RECIPE IN THE PREVIOUS PAGE?
        <NavLink to="/recipes">See this recipe</NavLink>  */}   
        <div>
        </div>     
    </div> 
 );   
}



export default WeekPlanCard;
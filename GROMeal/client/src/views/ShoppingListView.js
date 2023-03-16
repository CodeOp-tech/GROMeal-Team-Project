import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";

const ANAMARI_KEY3 = "44cd6e5f97844750bb59d8bb5f69370d";
const ANAMARI_KEY4 = "2249a308392d4fefb388c16c01db781a";

function ShoppingListView() {


    const [planRecipes, setPlanRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const { planId } = useParams();
  
    useEffect(() => {
      getPlanRecipes();
    }, []);

    useEffect(() => {
        getIngredients();
      }, [planRecipes]);
  
  // Get All recipes from a plan
  async function getPlanRecipes() {
  
    try {
      let response = await fetch(`/api/recipes/${planId}`);
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
  console.log(planRecipes);


  
   
  const getIngredients = async () => {
   
    const api = await Promise.all(planRecipes.map(recipe => {
    return fetch(
        `https://api.spoonacular.com/recipes/${recipe.API_id}/ingredientWidget.json?apiKey=${ANAMARI_KEY3}`
       )}
    ) )
    console.log(api);
    const data = await Promise.all(api.map(ingredients => {
    return ingredients.json()}));  
      setIngredients(data);
    
  };
  console.log(ingredients);


  const shoppingList = {};
  for (let index in ingredients) {
    if (ingredients[index]) {
        shoppingList[index] = ingredients[index];
    }
  } console.log(ingredients);
//   ingredients = shoppingList;

//   ingredients.map((ingredient) => shoppingList.push(ingredient.name)= shoppingList.push[ingredient.name]+ingredient.amount)
  console.log(shoppingList);

    return (
        <div className="App">
            {
            planRecipes.map(recipe => (
                <div className="row card" key={recipe.id}>
                    
                   
                    
                    <h6>Recipe name: {recipe.API_id}</h6>
                    {/* <h6>Servings: {recipe.servings} </h6>
                    <h6>Notes: {recipe.cuisines} </h6>
                    <img src={recipe.image} alt="recipe"></img> */}
                  
                        {/* <button onClick={(e) => props.modifyEx(ex.id)} title="modify" type="button">
                            <input type="text">...</input>
                            MODIFY
                        </button> */}

                    {/* <div id="divButton" className="col-6 content-right">
                    <button className="col-6" onClick={(e) => props.deleteEx(ex.id)} title="delete" type="button">DELETE</button>
                    </div> */}
                </div>
            ))
        }
        
        <div>
            {
            ingredients.map(ingredient => (
                <div className="row card" key={ingredient.id}>
                    
                   
                    
                    <h6>Recipe name: {ingredient.name}</h6>
      
    
                </div>
            ))
        }
        </div>
        </div>
    );
}
export default ShoppingListView;
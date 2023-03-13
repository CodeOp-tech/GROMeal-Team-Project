import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";

function Spoonacular() {
//    const [ search, setSearch ] = useState([]);
    
    //Calling Api data
    // useEffect(() => {
    //     searchRecipes();
    // },[]);

    // const searchRecipes = async () => {
    //   const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`);
    //   const data = await api.json();
    //   console.log(data);
    //   setSearch(data.recipes);
    // }

    
        const [recipes, setRecipes] = useState([]);
    
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
    
        return (
            <div className="App">
                <h1>Random Recipes from Spoonacular</h1>
               
                </div>
        );
    }



export default Spoonacular;
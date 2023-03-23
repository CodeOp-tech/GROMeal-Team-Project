import React, { useEffect, useState, useContext } from 'react';
//import { useParams } from 'react-router-dom';
//import { Link, Outlet } from "react-router-dom";
import Api from '../helpers/Api';
import ShowOldPlans from '../components/ShowOldPlans';
import RecipesContext from "../components/RecipesContext";

function OldPlansView(props) {
   
    const { userPlans } = useContext(RecipesContext);

    return (
        <div className="OldPlansView">
           
            <h1>Old Plans</h1>
            <ShowOldPlans plans={userPlans} /> 
            {/* I CHANGED props.plans FOR userPlans */}
            
           {/* <Outlet />       */}
        </div>
        
    );
}


export default OldPlansView;
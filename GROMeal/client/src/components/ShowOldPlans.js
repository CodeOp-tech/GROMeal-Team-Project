import React, { useState, useEffect, useContext } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import AddPlanForm from './AddPlanForm';
import Api from '../helpers/Api';


function ShowOldPlans(props) {
 
  //const navigate = useNavigate();

  const { editingPlan, setEditingPlan, userPlans, setUserPlans, getUserPlans, newPlan, setNewPlan } = useContext(RecipesContext);

  function handleClick(planId) {
    setEditingPlan(planId)}
   
    useEffect(() => {
        getUserPlans();        
    }, []);

  //   useEffect(() => {
  //     getUserPlans();
  // }, []);

async function onDeletePlan(planId) {
  await deletePlan(planId);
  getUserPlans();
}

async function onModifyPlan(plan) {
  await modifyPlanTitle(plan);
  setEditingPlan(null);
  getUserPlans();
  
}

//Delete a plan
async function deletePlan(planId) {
  let confirm = window.confirm("Are you sure you want to delete this plan with all the recipes associated to it?")
  
  if (confirm) {
  // Define fetch() options
  
  try {
      let response = await Api._doFetch(`/api/plans/${planId}`, 'DELETE');
      if (response.ok) {
          //let plans = response.data;
          //setUserPlans(plans);         
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}
}
console.log(editingPlan);
//console.log(plan);
// MODIFY THE TITLE OF A PLAN
  async function modifyPlanTitle(plan) {

    try {
        let response = await Api._doFetch(`/api/plans/${editingPlan}`, 'PUT', plan);
        if (response.ok) {
            let plans = response.data;
            setUserPlans(plans);            
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
  }
   

  return (
    <div className="ShowOldPlans">
    
          <div className="card">
           <h4>Plans</h4>
           
          {
                userPlans.map(p => (
                  <div key={p.id}>
                  {editingPlan === p.id ? ( 
                    //<AddPlanForm addPlanCb={addPlan} plans={props.plans} /> 
                    <AddPlanForm addPlanCb={ p => onModifyPlan(p)} setEditingPlan={setEditingPlan}/> 
                    ) : ( 
                  <div>
                  <Link to={`/weekPlan/${p.id}`} key={p.id}>Title: {p.plan_title} 
                  
                  </Link>
                  <button id="modifyButtonP" className="col-2" onClick={(e) => handleClick(p.id)} title="modify" type="button">MODIFY  TITLE</button>  
                  <button id="deleteButtonP" className="btn btn-danger col-2" onClick={(e) => onDeletePlan(p.id)} title="delete" type="button"> DELETE  PLAN </button>
                  
                  </div>
                  )
                  } </div>
                ))
              }           
    
    </div>
    </div>

    
  );
}

export default ShowOldPlans;
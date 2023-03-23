import React, { useState, useEffect, useContext } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import AddPlanForm from './AddPlanForm';
import Api from '../helpers/Api';


function ShowOldPlans(props) {
 // const [recipes, setRecipes] = useState([]);
  const { planId } = useParams();
  const {recipe} = props
  const [editingPlan, setEditingPlan] = useState(null);

  const navigate = useNavigate();

  const {setPlans, plans, newPlan, setNewPlan } = useContext(RecipesContext);

  function handleClick(planId) {
    setEditingPlan(planId)
}

    //const [user, setUser] = useState(null);
    const [ oldPlans, setOldPlans] =useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    let { userId } = useParams();
   
    useEffect(() => {
        getOldPlans();
    }, []);

    async function getOldPlans() {
  
      try {
        let response = await fetch(`/api/plans/${userId}`); //`/api/plans/${userId}`
        console.log(oldPlans);
        if (response.ok) {
            let oldPlans = await response.json();
            setOldPlans(oldPlans);
            console.log(oldPlans);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
    }

//Delete a plan
async function deletePlan(planId) {
  let confirm = window.confirm("Are you sure you want to delete this plan with all the recipes associated to it?")
  
  if (confirm) {
  // Define fetch() options
  
  try {
      let response = await Api._doFetch(`/api/plans/${planId}`, 'DELETE');
      if (response.ok) {
          let plans = response.data;
          setOldPlans(plans);
          console.log(oldPlans);
          console.log(plans);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}
}

// MODIFY THE TITLE OF A PLAN
  async function modifyPlanTitle(plan) {
 console.log(plan);
    try {
        let response = await Api._doFetch(`/api/plans/${plan.id}`, 'PUT', plan);
        if (response.ok) {
            let plans = response.data;
            setPlans(plans);
            console.log(plans);
            console.log(oldPlans);
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
                oldPlans.map(p => (
                  <div key={p.id}>
                  {editingPlan === p.id ? ( 
                    //<AddPlanForm addPlanCb={addPlan} plans={props.plans} /> 
                    <AddPlanForm addPlanCb={ p => modifyPlanTitle(p)} setEditingPlan={setEditingPlan} /> 
                    ) : ( 
                  <div>
                  <Link to={`/weekPlan/${p.id}`} key={p.id}>Title: {p.plan_title} 
                  
                  </Link>
                  <button id="modifyButtonP" className="col-2" onClick={(e) => handleClick(p.id)} title="modify" type="button">MODIFY  TITLE</button>  
                  <button id="deleteButtonP" className="btn btn-danger col-2" onClick={(e) => deletePlan(p.id)} title="delete" type="button"> DELETE  PLAN </button>
                  
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
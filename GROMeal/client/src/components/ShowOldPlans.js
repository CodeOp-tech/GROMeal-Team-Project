import React, { useState, useEffect } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ShowOldPlans(props) {
  const [recipes, setRecipes] = useState([]);
  const { planId } = useParams();
  const {recipe} = props

  const navigate = useNavigate();

//   const [editingPlan, setEditingPlan] = useState(null);

//   function handleClick(planId) {
//     setEditingPlan(planId)
// }

//DO I NEED A FUNCTION TO MODIFY PLAN TITLE AND DELETE PLAN? IF SO WHERE? HERE? THE FETCH TO MODIFY PLAN (THE RECIPES) IS IN OLDPLANSVIEW.
    const [user, setUser] = useState(null);
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

// async function getOldPlans() {
//   try {
//   // let myresponse = await fetch(`/plans/${userId}`);
//   let myresponse = await fetch(`/api/plans/${userId}`);//`/api/allplans`
//   if (myresponse.ok) {
//       setOldPlans(oldPlans);
//       console.log(oldPlans);
//       setErrorMsg('');
//   } else {
//       setUser(null);
//       let msg = `Error ${myresponse.status}: ${myresponse.error}`;
//       setErrorMsg(msg);
//   }
// } catch (err) {

// if (errorMsg) {
//   return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
// }

// if (!user) {
//   return <h2>Loading...</h2>;
// }
// }
// }

   
  return (
    <div className="ShowOldPlans">
    
          <div className="card">
           <h4>Plans</h4>
           
          {
                oldPlans.map(p => 
                
                  <Link to={`/weekPlan/${p.id}`} key={p.id}>Title: {p.plan_title}</Link>
                                  
                
                  )}
             
                     
                        {/* <div className= "container">
                          
                            <button id="modifyButtonP" className="col-3" onClick={(e) => handleClick(p.id)} title="modify" type="button">MODIFY TITLE</button> 
                        
                            <button id="deleteButtonP" className="btn btn-danger col-4" onClick={(e) => props.deletePlanCb(p.id)} title="delete" type="button"> DELETE PLAN</button>
                             
                          </div> */}               
    
    </div>
    </div>

    
  );
}

export default ShowOldPlans;
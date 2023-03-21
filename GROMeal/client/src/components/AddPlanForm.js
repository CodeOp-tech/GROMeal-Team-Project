import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EMPTY_PLAN = {
  plan_title: ''
};

function AddPlanForm(props) {

  const [newPlan, setNewPlan] = useState(EMPTY_PLAN);
  const navigate = useNavigate();
  
 
 async function handleSubmit(event) {
    event.preventDefault();
    
    let plan = await props.addPlanCb(newPlan);
    console.log(newPlan);
    setNewPlan(EMPTY_PLAN);
    console.log(plan);
    navigate(`/recipes/${plan[0].id}`);
  }

  function handleChange(event) {
    let { name, value } = event.target;
        setNewPlan(data => ({
            ...data, 
            [name]: value
        }));
    }

  
return (
  <div>
    
    <form onSubmit={handleSubmit} className="col-8">
                
         <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                {/* <h5 style={{ color: 'white', fontWeight: 'initial'}} className="mb-2">Start by giving a title to your plan</h5> */}
                <label className="form-control-label px-1"></label>
                <input required className="form-control form-control-lg" style={{ fontSize: 'large'}} type="text" id="ans" name="plan_title" placeholder="My first plan title..."
                value={newPlan.plan_title}
                onChange={handleChange}
            />  
          </div>
          </div>
          {/* <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="date" id="ans" name="creationDate" placeholder="Toda's Date"
                value={newProgram.creationDate}
                onChange={handleChange}
            />  
          </div>
          </div> */}

        <div className="row mt-3">
            <div> 
            <button className="btn btn-warning px-5 btn-lg" style={{ backgroundColor: '#FF5733', color: 'white', fontWeight: 'bold'}} type="submit">START</button> 
            </div>
        </div>
    </form>
    </div>
);

} 

  export default AddPlanForm;
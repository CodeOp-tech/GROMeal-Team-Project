import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Api from '../helpers/Api';
import AddPlanForm from '../components/AddPlanForm';
import header2 from "./header2.jpg";
import Api from '../helpers/Api';

function HomeView(props) {
  

    // const { userId } = useParams();
    // console.log(useParams());
  
  // Get All plans from that user
//   async function getPlans() {
  
//     try {
//       let response = await fetch(`/api/plans/${userId}`);
//       if (response.ok) {
//           let plans = await response.json();
//           setPlans(plans);
//           console.log(plans);
//       } else {
//           console.log(`Server error: ${response.status} ${response.statusText}`);
//       }
//   } catch (err) {
//       console.log(`Server error: ${err.message}`);
//   }
//   }
  
  //POST a new program to a userid
//   async function addPlan (plan) {
//     console.log(plan);
//     let options = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(plan)
//     };
//     try {
//       let response = await fetch(`/api/plans/${userId}`, options);
//       if (response.ok) {
//         let plans = await response.json();
//         setPlans(plans);
//       } else {
//         console.log(`Server error: ${response.status} ${response.statusText}`);
//       }
//     } catch (err) {
//       console.log(`Server error: ${err.message}`);
//     }
//   }
   
  //POST a new plan
  async function addPlan (plan) {
    try {
      
      let response = await Api._doFetch(`/api/allplans`, "POST", plan);
      console.log(response);
      if (response.ok) {  
        let plan = response.data;
        return plan;   
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  //POST a new plan to a user if logged in
  async function addPlanUser (userPlan) {
    try {
      
      let response = await Api._doFetch(`/api/plans/${props.user.id}`, "POST", userPlan);
      console.log(response);
      if (response.ok) {  
        let plan = response.data;
        return plan;   
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

    return (    
    <header>
  <div>
    <div className="row"
         style={{backgroundImage: `url(${header2}`, height: '600px'}}>
      <div className="col-lg-9" style={{ paddingLeft: '130px', paddingTop: '110px'}}>
        <h1 className="col-6" style={{ marginBottom: '15px', lineHeight:'45px', color: 'white', fontWeight: 900, fontFamily:'Segoe UI', textShadow: '1px 1px 1px grey'}}>What do I need to buy this week?</h1>
        <p className="col-9" style={{ color: 'black', fontWeight:'lighter' }}>Organise your recipes in a weekly planning and get your shopping list magically.
        Start by giving a title to your plan:</p>
        <div className="col-10">
        <AddPlanForm addPlanCb={addPlan} plans={props.plans} addPlanUser={addPlanUser} user={props.user} />
        </div>
      </div>
    </div>
  </div>
</header>        
    
    );
  }
  
  export default HomeView;
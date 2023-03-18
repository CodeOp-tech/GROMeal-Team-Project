import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Api from '../helpers/Api';
import AddPlanForm from '../components/AddPlanForm';
import header2 from "./header2.jpg";
import Api from '../helpers/Api';
import "./HomeView.css";

import ProgressBar from '../components/ProgressBar';

function HomeView(props) {
//IF I COMMENT OUT THE CODE FOR THE PROGRESS BAR, EACH TIME I RELOAD
//THE PAGE EVERYTHING DISSAPEARS

  // //CODE FOR THE PROGRESS BAR
  // const progressBar = document.getElementById("progress-bar");
  // const progressNext = document.getElementById("progress-next");
  // const progressPrev = document.getElementById("progress-prev");
  // const steps = document.querySelectorAll(".step");
  // let active = 1;


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
   
  //POST a new program
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

  // //CODE FOR THE PROGRESS BAR
  // progressNext.addEventListener("click", () => {
  //   active++;
  //   if (active > steps.length) {
  //     active = steps.length;
  //   }
  //   updateProgress();
  // });
  
  // progressPrev.addEventListener("click", () => {
  //   active--;
  //   if (active < 1) {
  //     active = 1;
  //   }
  //   updateProgress();
  // });

  // const updateProgress = () => {
  //   // toggle active class on list items
  //   steps.forEach((step, i) => {
  //     if (i < active) {
  //       step.classList.add("active");
  //     } else {
  //       step.classList.remove("active");
  //     }
  //   });
  //   // set progress bar width  
  //   progressBar.style.width = 
  //     ((active - 1) / (steps.length - 1)) * 100 + "%";
  //   // enable disable prev and next buttons
  //   if (active === 1) {
  //     progressPrev.disabled = true;
  //   } else if (active === steps.length) {
  //     progressNext.disabled = true;
  //   } else {
  //     progressPrev.disabled = false;
  //     progressNext.disabled = false;
  //   }
  // };



    return (    
    <header className="container" style={{borderRadius:"100px"}}>
{/* <div>
  <ProgressBar.js></ProgressBar.js>
</div> */}
{/* <div className="progress">
  <div className="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
</div> */}

{/* CODE FOR THE PROGRESS BAR */}

  <div>
  <div id="progress">
  <div id="progress-bar"></div>
  <ul id="progress-num">
    <li class="step active">1</li>
    <li class="step">2</li>
    <li class="step">3</li>
    <li class="step">4</li>
  </ul>
</div>
<button id="progress-prev" class="btn" disabled>Prev</button>
<button id="progress-next" class="btn">Next</button>
  </div>

{/* I WANT TO PUT HERE THE COMPONENT CALLED PROGRESSBAR AND PASS THE PROPS */}

{/* <div>
  <ProgressBar></ProgressBar>
</div> */}

    <div className="row"
         style={{backgroundImage: `url(${header2}`, height: '600px'}}>
      <div className="col-lg-9" style={{ paddingLeft: '130px', paddingTop: '110px'}}>
        <h1 className="col-6" style={{ marginBottom: '15px', lineHeight:'45px', color: 'white', fontWeight: 900, fontFamily:'Segoe UI', textShadow: '1px 1px 1px grey'}}>What do I need to buy this week?</h1>
        <p className="col-9" style={{ color: 'black', fontWeight:'lighter' }}>Organise your recipes in a weekly planning and get your shopping list magically.
        Start by giving a title to your plan:</p>
        <div className="col-10">
        <AddPlanForm addPlanCb={addPlan} plans={props.plans} />
        </div>
      </div>
  
  

  </div>
</header>        
    
    );
  }
  
  export default HomeView;
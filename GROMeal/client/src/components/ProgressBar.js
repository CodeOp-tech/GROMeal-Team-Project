import React from 'react';
import "./ProgressBar.css";

 //CODE FOR THE PROGRESS BAR

function ProgressBar(props) {
   
    const progressBar = document.getElementById("progress-bar");
    const progressNext = document.getElementById("progress-next");
    const progressPrev = document.getElementById("progress-prev");
    const steps = document.querySelectorAll(".step");
    let active = 1;

progressNext.addEventListener("click", () => {
    active++;
    if (active > steps.length) {
      active = steps.length;
    }
    updateProgress();
  });
  
  progressPrev.addEventListener("click", () => {
    active--;
    if (active < 1) {
      active = 1;
    }
    updateProgress();
  });

  const updateProgress = () => {
    // toggle active class on list items
    steps.forEach((step, i) => {
      if (i < active) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
    // set progress bar width  
    progressBar.style.width = 
      ((active - 1) / (steps.length - 1)) * 100 + "%";
    // enable disable prev and next buttons
    if (active === 1) {
      progressPrev.disabled = true;
    } else if (active === steps.length) {
      progressNext.disabled = true;
    } else {
      progressPrev.disabled = false;
      progressNext.disabled = false;
    }
  };


return (   
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
  );
}

export default ProgressBar;



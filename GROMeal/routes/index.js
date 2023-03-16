const express = require('express');
const router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');
const db = require("../model/helper");


/**
 * GET /
 **/

router.get('/', function(req, res) {
    res.send({ message: 'Welcome to the GROMeal homepage! Try /users' });
});


// GET all plans (NO USER)
router.get("/allplans", async function(req, res, next) {
    // let userId = req.params.userId
   //  let programId = req.params.programId;
   
     try {
       let results = await db(`SELECT * FROM plans`);
       let plans = results.data;
       // if (programs.length === 0) {
       
       //   res.status(404).send({ error: "Programs not found" });
       // } else {
       //   res.send(programs);
       // }
       res.send(plans);
     } catch (err) {
       res.status(500).send({ error: err.message });
     }
   });
   

  //POST A NEW PLAN (NO USER)
 router.post("/allplans", async (req, res, next) => {
  let { plan_title } = req.body;
//   let userId = req.params.userId;
  let sql = `
      INSERT INTO plans (plan_title)
      VALUES ('${plan_title}')
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM plans`);
      let exercises = result.data;
      res.status(201).send(exercises);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

module.exports = router;
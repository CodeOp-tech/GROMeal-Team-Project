var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET plans by UserId
router.get("/:userId", async function(req, res, next) {
    let userId = req.params.userId
   //  let programId = req.params.programId;
   
     try {
       let results = await db(`SELECT * FROM plans WHERE user_id = ${userId}`);
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
   

  //POST A NEW PLAN
 router.post("/:userId", async (req, res, next) => {
  let { plan_title } = req.body;
  let userId = req.params.userId;
  let sql = `
      INSERT INTO plans (plan_title, user_id)
      VALUES ('${plan_title}', ${userId})
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM plans WHERE user_id = ${userId}`);
      let exercises = result.data;
      res.status(201).send(exercises);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

   
module.exports = router;
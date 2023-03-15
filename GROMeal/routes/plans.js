var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET plans by UserId WORKING
router.get("/user/:userId", async function(req, res, next) {
    let userId = req.params.userId
   //  let programId = req.params.programId;
   
     try {
       let results = await db(`SELECT * FROM plans WHERE userId = ${userId}`);
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

  //POST A NEW PLAN (nata para la home)

   
module.exports = router;
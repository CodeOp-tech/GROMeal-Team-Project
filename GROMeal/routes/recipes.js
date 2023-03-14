var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");


/**
 * Get all users
 **/

router.get('/', async function(req, res, next) {
    let sql = 'SELECT * FROM users ORDER BY username';

    try {
        let results = await db(sql);
        let users = results.data;
        users.forEach(u => delete u.password);  // don't return passwords
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


/**
 * Get one user.
 * A user can only see his/her own profile info.
 **/

router.get('/:userId', ensureSameUser, async function(req, res, next) {
    let { userId } = req.params;
    let sql = 'SELECT * FROM users WHERE id = ' + userId;
    
    try {
        let results = await db(sql);
        // We know user exists because he/she is logged in!
        let user = results.data[0];
        delete user.password;  // don't return the password
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// GET programs by patienId
router.get("/:patientId", async function(req, res, next) {
    let patientId = req.params.patientId
   //  let programId = req.params.programId;
   
     try {
       let results = await db(`SELECT * FROM programs WHERE patientId = ${patientId}`);
       let programs = results.data;
       // if (programs.length === 0) {
       
       //   res.status(404).send({ error: "Programs not found" });
       // } else {
       //   res.send(programs);
       // }
       res.send(programs);
     } catch (err) {
       res.status(500).send({ error: err.message });
     }
   });
   
   //GET each program
   router.get("/program/:id", async function(req, res, next) {
     let id = req.params.id;
    
      try {
        let results = await db(`SELECT * 
        FROM programs
        LEFT JOIN patients ON programs.patientId = patients.id
        WHERE programs.id = ${id}
       `);
   
        let programs = results.data;
       //  if (programs.length === 0) {
        
       //    res.status(404).send({ error: "Programs not found" });
       //  } else {
       //    res.send(programs);
       //  }
        res.send(programs);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

//GET some recipe's info from SPOONACULAR
// GET https://api.spoonacular.com/recipes/{id}/information

   
module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const nodeCron = require("node-cron");

//Add Staff
router.post("/add-staff", (req, res, next) => {
  var name = req.body.name;
  var license_number = req.body.license_number;
  var dob = req.body.dob;
  var age = req.body.age;
  var status = 1;
  const dateTime = new Date();

  let post = {
    name: name,
    license_number: license_number,
    dob: dob,
    age: age,
    status: status,
    created_at: dateTime,
    updated_at: dateTime,
  };
  let sql = "INSERT INTO staffs SET ?";
  db.query(sql, post, async (err, result) => {
    if (err) {
      return res.status(400).json({ dbError: err });
    }

    runQuery(`SELECT * FROM staffs WHERE id=${result.insertId}`)
      .then(function (results) {
        return res.json(results);
      })
      .catch(function (err) {
        return res.status(400).json({ dbError: err });
      });
  });
});

//Get Staff
router.get("/get-staff", (req, res, next) => {
  runQuery(`SELECT * FROM staffs`)
    .then(function (results) {
      return res.json(results);
    })
    .catch(function (err) {
      return res.status(400).json({ dbError: err });
    });
});

//Edit Staff
router.put("/edit-staff", (req, res, next) => {
  var name = req.body.name;
  var license_number = req.body.license_number;
  var dob = req.body.dob;
  var age = req.body.age;
  var id = req.body.id;

  let post = {
    name: name,
    license_number: license_number,
    dob: dob,
    age: age,
  };
  let sql = 'UPDATE staffs SET ? WHERE id ="' + id + '"';
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      return res.status(400).json({ dbError: err });
    }
    runQuery(`SELECT * FROM staffs WHERE id=${id}`)
      .then(function (results) {
        return res.json(results);
      })
      .catch(function (err) {
        return res.status(400).json({ dbError: err });
      });
  });
});

//Delete Staff
router.delete("/crud", (req, res, next) => {
  var id = req.body.id;

  let sql = `DELETE FROM staffs WHERE id=${req.body.id};`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ dbError: err });
    }

    return res.json({ delete: "true" });
  });
});

async function runQuery(sqlQuery) {
  return new Promise(async function (resolve, reject) {
    db.query(sqlQuery, async function (error, result, fields) {
      if (error) reject(error);
      else {
        resolve(result);
      }
    });
  });
}

module.exports = router;

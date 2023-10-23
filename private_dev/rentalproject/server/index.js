const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rental_schema",
});

const port = 8080;

//get cars table

app.get("/getcars", (req, res) => {
  const sqlSelect = "SELECT * FROM cars_table";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

//get clients table

app.get("/getclients", (req, res) => {
  const sqlSelect = "SELECT * FROM clients_table";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

//NEW CAR INSERT

app.post("/insertnewcar", (req, res) => {
  const sqlInsert =
    "INSERT INTO cars_table (carmodel, transmition, fuel, year, color, doors, images, price, carId, carLabel, insurance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const {
    carmodel,
    transmition,
    fuel,
    year,
    color,
    doors,
    price,
    carId,
    carLabel,
    insurance,
    images,
  } = req.body;
  const imagesStringArray = JSON.stringify(images);

  db.query(
    sqlInsert,
    [
      carmodel,
      transmition,
      fuel,
      year,
      color,
      doors,
      imagesStringArray,
      price,
      carId,
      carLabel,
      insurance,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          title: "error",
          message: "Error while adding new car",
        });
      } else {
        console.log("Success!");
        res.status(200).json({
          title: "success",
          message: "Car added successfully",
        });
      }
    }
  );
});

// Handle POST request to update a car
app.post("/updatecar", (req, res) => {
  const {
    id,
    carmodel,
    transmition,
    fuel,
    year,
    color,
    doors,
    images,
    price,
    carId,
    carLabel,
    insurance,
    condition,
  } = req.body;

  console.log(condition);

  const sqlUpdate = `
    UPDATE cars_table
    SET
      carmodel = ?,
      transmition = ?,
      fuel = ?,
      year = ?,
      color = ?,
      doors = ?,
      images = ?,
      price = ?,
      carId = ?,
      carLabel = ?,
      insurance = ?,
      \`condition\` = ?
    WHERE id = ?;
  `;

  db.query(
    sqlUpdate,
    [
      carmodel,
      transmition,
      fuel,
      year,
      color,
      doors,
      images,
      price,
      carId,
      carLabel,
      insurance,
      condition,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          title: "error",
          message: "Error while updating car details",
        });
      } else {
        res.status(200).json({
          title: "success",
          message: "Car updated successfully",
        });
      }
    }
  );
});

//Delete Cars

app.delete("/deletecars", (req, res) => {
  const { selectedRows } = req.body;

  if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
    return res
      .status(400)
      .json({ title: "error", message: "Invalid or empty request" });
  }

  const sql = `DELETE FROM cars_table WHERE id IN (?)`;
  // Replace 'cars_table' with your actual table name

  db.query(sql, [selectedRows], (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res
        .status(500)
        .json({ title: "error", message: "Failed to delete selected rows" });
    }

    console.log(`Deleted ${result.affectedRows} rows from cars_table`);
    return res.status(200).json({
      title: "success",
      message: "Selected rows deleted successfully",
    });
  });
});

//HANDLE POST REQUEST FOR NEW CLIENT INSERT
app.post("/insertnewclient", (req, res) => {
  const sqlInsert =
    "INSERT INTO clients_table (name, birthdate, IdNumber, location) VALUES (?, ?, ?, ?)";
  const { name, birthdate, IdNumber, location } = req.body;

  db.query(
    sqlInsert,
    [name, birthdate, IdNumber, location],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          title: "error",
          message: "Error while adding new client",
        });
      } else {
        console.log("Success insert of client!");
        res.status(200).json({
          title: "success",
          message: "Client added successfully",
        });
      }
    }
  );
});

//GET events

app.get("/getevents", (req, res) => {
  const sqlSelect = "SELECT * FROM reservations_table";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

//ADD NEW EVENT

app.post("/addnewevent", (req, res) => {
  const eventObject = req.body.newEvent;

  // Check for conflicting events
  const sqlCheckConflict = `
    SELECT id, start, end
    FROM reservations_table
    WHERE carmodel = ? AND
          ((start <= ? AND end >= ?) OR (start <= ? AND end >= ?))
  `;

  db.query(
    sqlCheckConflict,
    [
      eventObject.carmodel,
      eventObject.start,
      eventObject.start,
      eventObject.end,
      eventObject.end,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ title: "error", message: "Something happened" });
      } else if (result.length > 0) {
        const conflictingEvent = result[0];

        // Fetch the existing reservation details from the database
        const existingReservation = conflictingEvent;

        // Format the dates
        const existingStartDate = new Date(existingReservation.start);
        const existingEndDate = new Date(existingReservation.end);

        const startDate = `${existingStartDate.getDate()}/${
          existingStartDate.getMonth() + 1
        }/${existingStartDate.getFullYear()}`;
        const endDate = `${existingEndDate.getDate()}/${
          existingEndDate.getMonth() + 1
        }/${existingEndDate.getFullYear()}`;

        const conflictMessage = `Car is currently rented from ${startDate} until ${endDate}`;
        res.status(200).json({ title: "error", message: conflictMessage });
      } else {
        // If no conflicts, proceed to insert the event
        const sqlInsert =
          "INSERT INTO reservations_table (title, description, start, end, clientname, carmodel) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
          sqlInsert,
          [
            eventObject.title,
            eventObject.description,
            eventObject.start,
            eventObject.end,
            eventObject.clientname,
            eventObject.carmodel,
          ],
          (error, result) => {
            if (error) {
              console.log(error);
              res
                .status(500)
                .json({ title: "error", message: "Something happened" });
            } else {
              console.log("Successful insert of event!");
              res.status(200).json({
                title: "success",
                message: "Event added successfully",
              });
            }
          }
        );
      }
    }
  );
});

//UPDATE event

app.post("/updateevent/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const { title, description, start, end, clientname, carmodel } = req.body;

  const sqlUpdate = `
    UPDATE reservations_table
    SET
      title = ?,
      description = ?,
      start = ?,
      end = ?,
      clientname = ?,
      carmodel = ?
    WHERE id = ?;
  `;
  db.query(
    sqlUpdate,
    [title, description, start, end, clientname, carmodel, eventId],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          title: "error",
          message: "Error while updating event",
        });
      } else {
        res.status(200).json({
          title: "success",
          message: "Event updated successfully",
        });
      }
    }
  );
});

//DELETE event

app.post("/deleteevent/:eventId", (req, res) => {
  // Extract the event ID from the request parameters
  const eventId = req.params.eventId;

  const sqlDelete = "DELETE FROM reservations_table WHERE id = ?";

  db.query(sqlDelete, [eventId], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        title: "error",
        message: "Error while deleting event",
      });
    } else {
      res.status(200).json({
        title: "success",
        message: "Event deleted successfully",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

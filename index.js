const express = require("express");
const app = express();
const knex = require("knex")(require("./knexfile").development); // import knex with db config
const PORT = process.env.PORT || 8080;

// get all warehouses data
app.get("/warehouses", (req, res) => {
  knex
    .select("*")
    .from("warehouses")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send("Error getting warehouses data"));
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

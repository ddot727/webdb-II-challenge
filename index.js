const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
  // debug: true
};

const db = knex(knexConfig);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post("/api/zoos", async (req, res) => {
  try {
    await db("zoos").insert(req.body);
    res.status(201).json({
      message: "Some useful message"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some useful error message"
    });
  }
});

server.get("/api/zoos", async (req, res) => {
  try {
    const zoos = await db("zoos");
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json({
      message: "Some useful error message"
    });
  }
});

server.get("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const zoos = await db("zoos").where({ id });
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json({
      message: "Some useful error message"
    });
  }
});

server.put("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const count = await db("zoos")
      .where({ id })
      .update(req.body);
    if (count > 0) {
      res.status(200).json(count);
    } else {
      res.status(404).json({
        message: "Some useful 404 message"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some useful Error message"
    });
  }
});

server.delete("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const count = await db("zoos")
      .where({ id })
      .del();

    if (count > 0) {
      res.status(200).end;
    } else {
      res.status(404).json({
        message: "Some useful 404 message"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some useful Error message"
    });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  debug: true
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

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

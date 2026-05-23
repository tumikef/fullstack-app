const express = require("express");
const cors = require("cors");
const redis = require("redis");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "redis"}:${process.env.REDIS_PORT || 6379}`,
});

redisClient.connect();

const pgPool = new Pool({
  host: process.env.POSTGRES_HOST || "postgres",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DATABASE || "postgres",
  port: process.env.POSTGRES_PORT || 5432,
});

pgPool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text TEXT
  )
`);

app.get("/ping", (req, res) => {
  res.json({ message: "it's working, SUCCESS" });
});

app.get("/visits", async (req, res) => {
  let visits = await redisClient.get("visits");

  if (!visits) {
    visits = 0;
  }

  visits++;

  await redisClient.set("visits", visits);

  res.json({ visits });
});

app.post("/messages", async (req, res) => {
  const { text } = req.body;

  await pgPool.query(
    "INSERT INTO messages(text) VALUES($1)",
    [text]
  );

  res.json({ success: true });
});

app.get("/messages", async (req, res) => {
  const result = await pgPool.query(
    "SELECT * FROM messages ORDER BY id DESC"
  );

  res.json(result.rows);
});

app.listen(8081, () => {
  console.log("Backend running on port 8081");
});

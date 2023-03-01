const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9098;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.get("/api", (req, res) => {
  res.json({ message: "Hello world" });
});

app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;

  const id = generateID();
  console.log({ email, password, username, id });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

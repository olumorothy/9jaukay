const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9098;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

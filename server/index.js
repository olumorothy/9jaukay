const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9098;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
const threadList = [];

const generateID = () => Math.random().toString(36).substring(2, 10);

app.get("/api", (req, res) => {
  res.json({ message: "Hello world" });
});

app.post("/api/register", async (req, res) => {
  console.log("users at first", users);
  const { email, password, username } = req.body;

  const id = generateID();

  // no existing user with the same credentials
  const result = users.filter(
    (user) => user.email === email && user.username === username
  );
  console.log("result is ", result.length);

  //if true
  if (result.length === 0) {
    const newUser = { id, email, password, username };

    users.push(newUser);

    return res.json({ message: "Account created successfully" });
  }
  res.json({ error_message: "User already exists" });
  console.log({ email, password, username, id });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  if (result.length !== 1) {
    return res.json({ error_message: "Incorrect credentials" });
  }

  res.json({ message: "Login successful", id: result[0].id });
});

app.post("/api/create/thread", async (req, res) => {
  const { thread, userId, category } = req.body;
  const threadId = generateID();

  threadList.unshift({
    id: threadId,
    title: thread,
    userId,
    replies: [],
    likes: [],
  });

  // console.log({ thread, userId, threadId, category });
  res.json({ message: "Thread created", threads: threadList });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

import express from "express";
import db  from "@repo/db/db";
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test Route" });
});

app.get("/users", async (req, res) => {
  const users = await db.user.findMany();
  res.json({ users });
});

app.post("/users", async (req, res) => {
    const { email, name } = req.body;
  const user = await db.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(user);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
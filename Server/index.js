// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const TodoModel = require("./Models/Todo");

// const app = express();
// app.use(cors());
// app.use(express.json());
// mongoose.connect("mongodb://127.0.0.1:27017/todo-list");

// app.get("/get", (req, res) => {
//   TodoModel.find()
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.put("/update/:id", (req, res) => {
//   const { id } = req.params;
//   TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app
//   .delete("/delete/:id", (req, res) => {
//     const { id } = req.params;
//     TodoModel.findOneAndDelete({ _id: id })
//       .then((result) => res.json(result))
//       .catch((err) => res.json(err));
//   })

//   .app.post("./add", (req, res) => {
//     const task = req.body.task;
//     TodoModel.create({
//       task: task,
//     })
//       .then((result) => res.json(result))
//       .catch((err) => res.json(err));
//   });
// app.listen(5173, () => {
//   console.log("server is running");
// });

// +++++++++gpt
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo-list");

// GET all todos
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// UPDATE todo to mark as done
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// DELETE todo
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ADD new todo
app.post("/add", (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});

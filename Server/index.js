const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://fnaaz2002a:aayat%401122@cluster0.rijq7da.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// GET all todos
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// UPDATE todo to mark as completed
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { completed: true }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(result);
    })
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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

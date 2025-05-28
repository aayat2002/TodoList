import { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => {
        console.log("✅ Backend response:", result.data);
        setTodos(result.data);
      })
      .catch((err) => console.log("❌ Error:", err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then((result) => {
        console.log("Update successful:", result.data);
        // ✅ Update the state to reflect changes immediately
        setTodos(todos.map((todo) => (todo._id === id ? result.data : todo)));
      })
      .catch((err) => console.log("Update failed:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(() => {
        // ✅ Update state instead of reloading page
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Records</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.completed ? ( // ✅ Change from 'done' to 'completed'
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.completed ? "line_through" : ""}>
                {todo.task}
              </p>{" "}
              {/* ✅ Change from 'done' to 'completed' */}
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

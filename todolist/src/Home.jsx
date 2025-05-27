// import React, { useState, useEffect } from "react"; // ✅ fix 1: import useState
// import Create from "./Create";
// import axios from "axios";

// function Home() {
//   const [todos, setTodos] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5173/get")
//       .then((result) => setTodos(result.data))
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <div className="home">
//       <h2>Todo List</h2>
//       <Create />
//       {todos.length === 0 ? (
//         <p>No Records</p>
//       ) : (
//         todos.map((todo, index) => <div key={index}>{todo}</div>)
//       )}
//     </div>
//   );
// }

// export default Home;
// gpt
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

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5173/get")
  //       .then((result) => {
  //         setTodos(result.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  //   +++++++++
  useEffect(() => {
    axios
      .get("http://localhost:5173/get")
      .then((result) => {
        console.log("✅ Backend response:", result.data);
        setTodos(result.data);
      })
      .catch((err) => console.log("❌ Error:", err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:5173/update/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5173/delete/" + id)
      .then(() => location.reload())
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
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
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

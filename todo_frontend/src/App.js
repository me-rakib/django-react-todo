import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("api/todos/")
      .then((res) => setTodos(res.data))
      .catch(() => alert("Something Went Wrong!"));
  }, []);

  return (
    <div>
      <Navbar bg="light" style={{ marginBottom: "20px", fontSize: "10px" }}>
        <Container>
          <Navbar.Brand href="#" >Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm todos={todos} setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default App;

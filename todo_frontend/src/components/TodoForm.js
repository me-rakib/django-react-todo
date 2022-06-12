import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

export default function TodoForm(props) {
  const { todos, setTodos } = props;
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please provide a valid value for todo.");
    } else {
      axios
        .post("/api/todos/", { name: name })
        .then((res) => {
          setName("");
          setTodos([...todos, res.data]);
        })
        .catch(() => alert("Something went wrong!"));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="New Todo"
          onChange={handleChange}
          value={name}
        />
        <Button type="submit">Add</Button>
      </InputGroup>
    </Form>
  );
}

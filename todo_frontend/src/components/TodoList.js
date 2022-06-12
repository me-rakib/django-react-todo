import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { useState } from "react";

export default function TodoList(props) {
  const { todos, setTodos } = props;
  const [showModal, setShowModal] = useState(false);
  const [record, setRecord] = useState(null);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/todos/${id}/`)
      .then(() => {
        const newTodos = todos.filter((t) => t.id !== id);
        setTodos(newTodos);
      })
      .catch(() => alert("Something went wrong!"));
  };

  const handleUpdate = async (id, value) => {
    return axios
      .patch(`api/todos/${id}/`, value)
      .then((res) => {
        const { data } = res;
        const newTodos = todos.map((t) => {
          if (t.id === id) {
            return data;
          }
          return t;
        });
        setTodos(newTodos);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  const renderListGroupItem = (todo) => {
    return (
      <ListGroup.Item
        key={todo.id}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          <span
            style={{ cursor: "pointer", marginRight: "12px" }}
            onClick={() =>
              handleUpdate(todo.id, { completed: !todo.completed })
            }
          >
            {todo.completed === true ? (
              <MdCheckBox />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </span>
          <span>{todo.name}</span>
        </div>
        <div>
          {todo.completed ? (
            ""
          ) : (
            <MdEdit
              style={{ marginRight: "12px", cursor: "pointer" }}
              onClick={() => {
                setRecord(todo);
                handleModal();
              }}
            />
          )}
          <MdDelete
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(todo.id)}
          />
        </div>
      </ListGroup.Item>
    );
  };

  const handleTodoEdit = (e) => {
    setRecord({
      ...record,
      name: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, { name: record.name });
    handleModal();
  };

  const completedTodoList = todos.filter((t) => t.completed === true);
  const incompletedTodoList = todos.filter((t) => t.completed === false);

  return (
    <div>
      <h5 className="mb-2">Incompleted List ({incompletedTodoList.length})</h5>
      {incompletedTodoList.length === 0 ? (
        <p className="text-sm">Relax! Everything is completed.</p>
      ) : (
        <ListGroup>{incompletedTodoList.map(renderListGroupItem)}</ListGroup>
      )}

      <h5 className="mb-2 mt-4">Completed List ({completedTodoList.length})</h5>
      <ListGroup>{completedTodoList.map(renderListGroupItem)}</ListGroup>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl
            value={record ? record.name : ""}
            onChange={handleTodoEdit}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

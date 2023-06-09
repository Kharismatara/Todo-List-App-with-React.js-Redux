import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo, toggleTodo, deleteTodo, editTodo, showAll, showActive, showCompleted } from "../redux/action/todoAction";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import "./todo.css";
function TodoListApps(params) {
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(
        addTodo({
          id: Date.now(),
          text: newTodo,
          completed: false,
        })
      );
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editTodoText.trim() !== "") {
      dispatch(
        editTodo({
          id: editTodoId,
          text: editTodoText,
        })
      );
      setEditTodoId(null);
      setEditTodoText("");
    }
  };

  const handleFilterAll = () => {
    dispatch(showAll());
  };

  const handleFilterActive = () => {
    dispatch(showActive());
  };

  const handleFilterCompleted = () => {
    dispatch(showCompleted());
  };
  return (
    <>
      <div className="fs-1 text-center mt-5 fw-bold mb-5 "> What's the plan for today</div>
      <Container className=" border-5  mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} className="d-flex justify-content-center">
            <Form.Control type="text" value={newTodo} onChange={handleInputChange} placeholder="Whaat Todo..." />
            <div className="mx-2 mt-2 mt-sm-0">
              <Button variant="primary" onClick={handleAddTodo}>
                Add
              </Button>
            </div>
          </Col>
        </Row>

        <div className="mt-5 d-flex flex-wrap justify-content-center">
          <Button className="me-3 mb-3 rounded-4" variant={filter === "SHOW_ALL" ? "primary" : "secondary"} onClick={handleFilterAll}>
            All
          </Button>
          <Button className="me-3 mb-3 rounded-4" variant={filter === "SHOW_ACTIVE" ? "primary" : "secondary"} onClick={handleFilterActive}>
            Active
          </Button>
          <Button className="me-3 mb-3 rounded-4" variant={filter === "SHOW_COMPLETED" ? "primary" : "secondary"} onClick={handleFilterCompleted}>
            Completed
          </Button>
        </div>

        <ListGroup>
          {todos
            .filter((todo) => {
              if (filter === "SHOW_ACTIVE") {
                return !todo.completed;
              } else if (filter === "SHOW_COMPLETED") {
                return todo.completed;
              } else {
                return true;
              }
            })
            .map((todo) => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex align-items-center mt-5 fs-4 mx-auto"
                style={{
                  width: "50%",
                }}
              >
                <div className="d-flex align-items-center flex-grow-1">
                  <input className="inputchek me-2" type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />

                  {editTodoId === todo.id ? (
                    <div className="d-flex align-items-center flex-grow-1">
                      <input className="form-control me-2" type="text" value={editTodoText} onChange={handleEditInputChange} />
                      <Button variant="primary" onClick={handleSaveEdit}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center flex-grow-1">
                      <span className={todo.completed ? "text-decoration-line-through me-2" : "me-2"}>{todo.text}</span>
                    </div>
                  )}
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                  <Button variant="link" onClick={() => handleEditTodo(todo)}>
                    <PencilSquare size={20} />
                  </Button>
                  <Button variant="link" onClick={() => handleDeleteTodo(todo.id)}>
                    <Trash size={20} />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </>
  );
}

export default TodoListApps;

<ul>
  {" "}
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
      <li key={todo.id}>
        <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />{" "}
        {editTodoId === todo.id ? (
          <div>
            <input type="text" value={editTodoText} onChange={handleEditInputChange} /> <button onClick={handleSaveEdit}> Save </button>{" "}
          </div>
        ) : (
          <div>
            <span> {todo.text} </span> <button onClick={() => handleEditTodo(todo)}> Edit </button>{" "}
          </div>
        )}{" "}
        <button onClick={() => handleDeleteTodo(todo.id)}> Delete </button>{" "}
      </li>
    ))}{" "}
</ul>;

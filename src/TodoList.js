import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TodoActions } from "../src/store/ducks/todos";
import "./styles.css";

const TodoList = ({ todos, addTodo, editTodo, removeTodo }) => {
  const inputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputRef.current.value);
    inputRef.current.value = "";
  };

  const handleEditStart = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditedText("");
  };

  const handleEditSave = (id) => {
    editTodo(id, editedText);
    setEditingId(null);
    setEditedText("");
  };

  return (
    <section className="section">
      <form onSubmit={handleSubmit} className="form">
        <input
          ref={inputRef}
          placeholder="Tarefa"
          size="small"
          className="form-input"
        />
        <button type="submit"  className="form-button">
          Adicionar 
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder="Editar tarefa"
                  size="small"
                  className="form-input"
                />
                <button
                  onClick={() => handleEditSave(todo.id)}
                  className="button-save"
                >
                  Salvar
                </button>
                <button onClick={handleEditCancel} className="button-cancel">
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                {todo.complete ? <s>{todo.text}</s> : todo.text}
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  Editar
                </button>
                <button onClick={() => removeTodo(todo.id)}>Remover</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

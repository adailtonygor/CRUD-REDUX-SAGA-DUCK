import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  addTodo: ["text"],
  editTodo: ["id", "text"],
  removeTodo: ["id"]
});

const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  { id: Math.random(), text: action.text, complete: false }
];

const edit = (state = INITIAL_STATE, action) =>
  state.map(
    todo =>
      todo.id === action.id ? { ...todo, text: action.text } : todo
  );

const remove = (state = INITIAL_STATE, action) =>
  state.filter(todo => todo.id !== action.id);

export default createReducer(INITIAL_STATE, {
  [Types.ADD_TODO]: add,
  [Types.EDIT_TODO]: edit,
  [Types.REMOVE_TODO]: remove
});
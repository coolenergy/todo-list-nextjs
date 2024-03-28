export function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  let updatedTodos: Todo[] = [];
  switch (action.type) {
    case "INIT":
      return action.todos;
    case "ADD":
      const newTodo = {
        id: crypto.randomUUID(),
        content: action.content,
        done: false,
      };
      updatedTodos = [newTodo, ...state];
      break;
    case "TOGGLE":
      updatedTodos = state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
      break;
    case "EDIT":
      updatedTodos = state.map((todo) =>
        todo.id === action.id ? { ...todo, content: action.content } : todo,
      );
      break;
    case "DELETE":
      updatedTodos = state.filter((todo) => todo.id !== action.id);
      break;
  }
  if (localStorage) localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return updatedTodos;
}

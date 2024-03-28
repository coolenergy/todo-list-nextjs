type Todo = {
  id: string;
  content: string;
  done: boolean;
};

type TodoAction =
  | { type: "INIT"; todos: Todo[] }
  | { type: "ADD"; content: string }
  | { type: "TOGGLE"; id: string }
  | { type: "EDIT"; id: string; content: string }
  | { type: "DELETE"; id: string };

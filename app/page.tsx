"use client";
import { useEffect, useState, useMemo, useReducer } from "react";
import { Plus, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo-list";
import { todosReducer } from "@/state/todos-reducer";

export default function Home() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [newTodoText, setNewTodoText] = useState("");
  const [showDone, setShowDone] = useState(true);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) dispatch({ type: "INIT", todos: JSON.parse(localTodos) });
  }, []);

  const doneTodos = useMemo(() => todos.filter((t) => t.done), [todos]);
  const undoneTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);

  return (
    <main className="flex flex-col items-center gap-2 p-1 text-xl lg:container">
      {/* Todos section */}
      <section className="w-full">
        {todos.length === 0 && (
          <p className="py-5 text-center font-black text-muted-foreground opacity-50">
            Add a to-do to get started!
          </p>
        )}
        <TodoList todos={undoneTodos} dispatch={dispatch} />
        {doneTodos.length !== 0 && (
          <Button
            onClick={() => setShowDone(!showDone)}
            className="mb-2 mt-4 flex gap-2 bg-muted font-semibold hover:bg-muted"
          >
            <ChevronRight
              className={cn("duration-200", {
                "rotate-90": showDone,
              })}
            />
            Done
            <span className="text-opacity-50">{doneTodos.length}</span>
          </Button>
        )}
        {showDone && <TodoList todos={doneTodos} dispatch={dispatch} />}
      </section>

      {/* Input section */}
      <section className="sticky bottom-1 w-full">
        <div className="relative">
          <Input
            className="px-4 py-8 pl-16 text-xl placeholder:text-muted-foreground placeholder:opacity-60"
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTodoText) {
                dispatch({ type: "ADD", content: newTodoText });
                setNewTodoText("");
              }
            }}
            value={newTodoText}
            placeholder="Add a to-do..."
          />
          <Button
            onClick={() => {
              if (newTodoText) {
                dispatch({ type: "ADD", content: newTodoText });
                setNewTodoText("");
              }
            }}
            className="absolute left-3 top-4 h-fit rounded-full bg-background p-0 hover:bg-muted"
          >
            <Plus className="h-9 w-9" />
          </Button>
        </div>
      </section>
    </main>
  );
}

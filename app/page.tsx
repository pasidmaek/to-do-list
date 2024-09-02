'use client'
import { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";

import { fetchTodoList } from "@/services/fetchTodo";
import { TodoProps } from "@/types";
import CardTodo from "@/components/card";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [todoStatus, setTodoStatus] = useState<"TODO" | "DOING" | "DONE">(
    "TODO",
  );
  const [todoLists, setTodoLists] = useState<TodoProps[] | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchList = async () => {
    const res = await fetchTodoList(todoStatus, 0, 10);

    setTodoLists(res.data);
  };

  useEffect(() => {
    fetchList();
  }, [todoStatus]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ButtonGroup>
        <Button
          className={todoStatus === "TODO" ? "bg-blue-500 text-white" : ""}
          onClick={() => setTodoStatus("TODO")}
        >
          TODO
        </Button>
        <Button
          className={todoStatus === "DOING" ? "bg-blue-500 text-white" : ""}
          onClick={() => setTodoStatus("DOING")}
        >
          DOING
        </Button>
        <Button
          className={todoStatus === "DONE" ? "bg-blue-500 text-white" : ""}
          onClick={() => setTodoStatus("DONE")}
        >
          DONE
        </Button>
      </ButtonGroup>
      {todoLists &&
        todoLists.map((todo) => <CardTodo key={todo.id} todoData={todo} />)}
      {showScrollButton && (
        <Button className="fixed bottom-4 right-4" onClick={scrollToTop}>
          Scroll to Top
        </Button>
      )}
    </section>
  );
}

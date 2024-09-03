"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { fetchTodoList } from "@/services/fetchTodo";
import { TodoProps } from "@/types/todo";
import CardTodo from "@/components/card";
import { AuthContext } from "@/context/AuthContext";
import { ArrowUpIcon } from "@/public/ArrowUpIcon";

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [todoStatus, setTodoStatus] = useState<"TODO" | "DOING" | "DONE">(
    "TODO",
  );
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [todoLists, setTodoLists] = useState<TodoProps[] | null>(null);
  const lastTodoRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchList = async (status: "TODO" | "DOING" | "DONE", page: number) => {
    const result = await fetchTodoList(status, page, 10);

    setPage(page + 1);
    setIsLastPage(result?.isLastPage ?? false);
    setTodoLists(result.data);
  };

  const loadMore = async () => {
    setLoadingMore(true);
    const result = await fetchTodoList(todoStatus, page, 10);

    if (result.data && todoLists) {
      setTodoLists([...todoLists, ...result.data]);
      setPage(page + 1);
      setIsLastPage(result?.isLastPage ?? false);
    }
    setLoadingMore(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Do you want to delete task id : ${id}`) && todoLists) {
      setTodoLists(todoLists.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    const initialPage = 0;

    if (user) {
      fetchList(todoStatus, initialPage);
    }
  }, [todoStatus, user]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (!lastTodoRef.current || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLastPage) {
          loadMore();
        }
      },
      {
        root: null,
        threshold: 0.9,
      },
    );

    observer.observe(lastTodoRef.current);

    return () => {
      if (lastTodoRef.current) {
        observer.unobserve(lastTodoRef.current);
      }
    };
  }, [loadMore, lastTodoRef, loadingMore]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {user ? (
        <>
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
          {todoLists ? (
            todoLists.length > 0 ? (
              todoLists.map((todo, index) => (
                <CardTodo
                  key={todo.id}
                  ref={index === todoLists.length - 1 ? lastTodoRef : null}
                  handleDelete={handleDelete}
                  todoData={todo}
                />
              ))
            ) : (
              <p>No Todo Task</p>
            )
          ) : (
            <Spinner />
          )}
          {loadingMore && <Spinner />}
          {showScrollButton && (
            <Button
              isIconOnly
              aria-label="Delte"
              className="fixed bottom-4 right-4"
              onClick={scrollToTop}
            >
              <ArrowUpIcon
                filled
                fill="#000000"
                height={28}
                label="Delete item"
                size={28}
                width={28}
              />
            </Button>
          )}
        </>
      ) : (
        <Button onClick={() => router.push("login")}>Go to Login</Button>
      )}
    </section>
  );
}

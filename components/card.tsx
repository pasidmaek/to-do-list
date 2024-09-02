import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import { TodoProps } from "@/types";

type CardTodoProps = {
  todoData: TodoProps;
}

function CardTodo({ todoData }: CardTodoProps) {
  const date = new Date(todoData.createdAt);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[400px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <Chip
                  color={
                    todoData.status === "TODO"
                      ? "primary"
                      : todoData.status === "DOING"
                        ? "default"
                        : "success"
                  }
                  radius="sm"
                  size="sm"
                >
                  {todoData.status}
                </Chip>
                <h3 className="font-semibold text-foreground/90">
                  {todoData.title}
                </h3>
                <p className="text-small text-foreground/80">
                  {todoData?.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <p className="text-small">
                {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card >
  )
}

export default CardTodo;
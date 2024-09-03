import React, { forwardRef } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";

import { TodoProps } from "@/types/todo";
import { DeleteIcon } from "@/public/DeleteIcon";

type CardTodoProps = {
  todoData: TodoProps;
  handleDelete: (id: string) => void;
};

const CardTodo = forwardRef<HTMLDivElement, CardTodoProps>(
  ({ todoData, handleDelete }, ref) => {
    const date = new Date(todoData.createdAt);

    return (
      <Card
        ref={ref}
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-[500px]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 gap-6 md:gap-4 items-center justify-center">
            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between">
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
                    <Button
                      isIconOnly
                      aria-label="Delte"
                      color="danger"
                      onClick={() => handleDelete(todoData.id)}
                    >
                      <DeleteIcon
                        filled
                        fill="white"
                        height={24}
                        label="Delete item"
                        size={24}
                        width={24}
                      />
                    </Button>
                  </div>
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
                  {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  },
);

CardTodo.displayName = "CardTodo";

export default CardTodo;

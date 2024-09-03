"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";

export default function Login() {
  const router = useRouter();
  const { user, addUser } = useUser();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      userInput.email === "harry@email.com" &&
      userInput.password === "harry1234"
    ) {
      addUser(userInput);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else console.error("wrong email or password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-sm w-full p-6">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>
            <Input
              required
              className="mb-4"
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
            <Input
              required
              className="mb-6"
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
            <Button
              className="w-full"
              color="primary"
              type="submit"
              variant="solid"
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

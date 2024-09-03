"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { useUser } from "@/hooks/useUser";
import { AuthContext } from "@/context/AuthContext";

export const Navbar = () => {
  const router = useRouter();
  const { removeUser } = useUser();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    removeUser();
    router.push("/login");
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">TODO</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <Popover placement="bottom" showArrow={true}>
          <Tooltip content={user?.email}>
            <PopoverTrigger>
              <Avatar
                isBordered
                radius="sm"
                src={
                  user ? "https://i.pravatar.cc/150?u=a04258a2462d826712d" : ""
                }
              />
            </PopoverTrigger>
          </Tooltip>
          <PopoverContent>
            <Listbox aria-label="Actions">
              <ListboxItem
                key={user ? "logout" : "login"}
                className={user ? "text-danger" : "text"}
                color={user ? "danger" : "default"}
                onClick={user ? handleLogout : () => router.push("/login")}
              >
                {user ? "Log out" : "Log in"}
              </ListboxItem>
            </Listbox>
          </PopoverContent>
        </Popover>
      </NavbarContent>
    </NextUINavbar>
  );
};

"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { doctor } from "@/data/doctor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Ellipsis, MoreHorizontal } from "lucide-react";
import { SidebarMenuAction } from "@/components/ui/sidebar";

const DoctorPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  console.log(darkMode);

  const filterDoctorName = (e) => {
    e.preventDefault();
    // const filterDoctor = doctorName.filter((item)=> item )
  };
  console.log(doctorName);

  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-red-700">Doctors</span>
        <div>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={darkMode}
              onCheckedChange={(e) => setDarkMode(!darkMode)}
            />
            <Label htmlFor="airplane-mode">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Label>
          </div>
        </div>
      </div>
      <form className="flex gap-10 py-3">
        <Input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Enter the doctor name"
        />
        <Button type="submit" onSubmit={filterDoctorName}>
          Search
        </Button>
      </form>
      <div className="pt-5 grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((item, index) => (
          <div key={index}>
            <Card>
              <CardHeader className="flex items-end">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="flex items-center flex-col gap-3">
                <Avatar className="w-[100px] h-[100px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-bold text-xl">Arshad</span>
                <span className="mt-[-10px]">Neuro surgon</span>
                <Button className="w-[150px]">Chat</Button>
                <Button className="w-[150px] bg-blue-600 text-gray-200">
                  Book{" "}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;

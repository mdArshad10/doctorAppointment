"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { doctor } from "@/data/doctor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const BookAppointment = dynamic(() => import("@/components/book-appointment"), {
  loading: () => <div className="flex items-center">Loading...</div>,
  ssr: false,
});

const DoctorPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorDetails, setDoctorDetails] = useState([...doctor]);
  const { setTheme } = useTheme();

  const filterDoctorName = (e) => {
    e.preventDefault();
    let filterDoctor;
    if (doctorName == "") {
      filterDoctor = [...doctor];
    } else {
      filterDoctor = doctorDetails.filter((item) =>
        item.doctorName.includes(doctorName.toUpperCase())
      );
    }
    console.log(filterDoctor);

    setDoctorDetails(filterDoctor);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const theme = darkMode ? "light" : "dark";
    setTheme(theme);
  };

  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-red-700">Doctors</span>
        <div>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
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
        <Button type="button" onClick={filterDoctorName}>
          Search
        </Button>
      </form>
      <div className="pt-5 grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
        {doctorDetails.length == 0 ? (
          <p>No Doctor is present</p>
        ) : (
          doctorDetails.map((item, index) => (
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
                      src={
                        item.url ? item.url : "https://github.com/shadcn.png"
                      }
                      className="object-cover"
                      alt={item.doctorName}
                    />
                  </Avatar>
                  <span className="font-bold text-sm text-center">
                    {item.doctorName}
                  </span>
                  <span className="mt-[-10px]">{item.doctorSpecialist}</span>
                  <Button className="w-[150px]">Chat</Button>

                  <BookAppointment doctorId={index} />
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorPage;

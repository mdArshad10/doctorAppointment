"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addAppointment } from "@/lib/features/doctor/doctorSlice";
import { getFormattedDate } from "@/lib/formattedDate";

const timeZoneItem = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00",
];

const BookAppointment = ({ doctorId }) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [checkup, setCheckup] = useState();
  const dispatch = useDispatch();

  const handleAppointmentTime = (value) => {
    setTime(value);
  };

  const bookAppointmentSubmit = ( checkup, date, time) => {

    const newDate = getFormattedDate(date);
    const startDate = `${newDate}T${time}`;

    const value = {
      title: checkup,
      start: startDate,
    };

    dispatch(addAppointment({ ...value }));
    toast.success("Appointment is booked");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[150px] bg-blue-600 text-gray-200"
        >
          Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add the Appointment</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gird-cols-4 items-center gap-4">
            <Label htmlFor="title" className="">
              Description:
            </Label>
            <Input
              type="text"
              placeholder="eg. For General Checkup"
              name="checkup"
              value={checkup}
              onChange={(e) => setCheckup(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground`}
                >
                  <CalendarIcon />
                  {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Select onValueChange={handleAppointmentTime}>
              <SelectTrigger className="w-[245px]">
                <SelectValue placeholder="Book timestamp" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {timeZoneItem.map((item, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() =>
                bookAppointmentSubmit(checkup, date, time)
              }
            >
              Book Appointment
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;

"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  addAppointment,
  deleteAppointment,
  updateAppointment,
} from "@/lib/features/doctor/doctorSlice";

const EventForm = ({ appointment }) => {
  const [title, setTitle] = useState("");

  const label = appointment.id ? "update" : "create";
  console.log(label);

  const dispatch = useDispatch();

  const deleteEventHandler = (id) => {
    console.log("delete the event");
    console.log(id);
    dispatch(deleteAppointment(id));
    toast.success("event is deleted successfully");
  };
  const updateEventHandler = (id, title) => {
    console.log("update the event");
    dispatch(updateAppointment({ id, title }));
    toast.success("event is update successfully");
  };

  const addEventHandler = (appointment, title) => {
    const start = new Date(appointment.start);
    const end = new Date(appointment?.end);
    dispatch(addAppointment({ title, start, end }));
    setTitle("");
    toast.success("event is added");
  };

  return (
    <div className="my-4">
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Title</Label>
            <Input
              id="title"
              placeholder="Enter the description"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {label == "update" ? (
            <div>
              <Button
                type="button"
                onClick={() => deleteEventHandler(appointment.id)}
              >
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => updateEventHandler(appointment.id, title)}
                className="ml-4"
              >
                Update
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={() => addEventHandler(appointment, title)}
              className="w-fit"
            >
              Create
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;

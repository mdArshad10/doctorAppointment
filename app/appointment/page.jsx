"use client";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import EventForm from "@/components/EventForm/EventForm";



const ChatPage = () => {
  const [appointment, setAppointment] = useState();
  
  return (
    <div>
      <div className="h-[90vh]">
        <CalendarComponent
          onShowAppointmentView={(appointment) => setAppointment(appointment)}
        />
      </div>
      {appointment && <EventForm appointment={appointment} />}
    </div>
  );
};

export default ChatPage;

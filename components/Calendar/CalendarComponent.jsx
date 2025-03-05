"use Client";
import React, { useState } from "react";
import {
  momentLocalizer,
  Views,
  Calendar as BigCalendar,
} from "react-big-calendar";
import moment from "moment";
import AppointmentEvent from "../EventForm/AppointmentEvent";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

const initProps = {
  localizer: localizer,
  max: moment("2025-12-30T16:00:00").toDate(),
  min: moment("2025-01-01T08:00:00").toDate(),
  step: 15,
  timeslots: 4,
};


const CalendarComponent = ({ onShowAppointmentView }) => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const data = useSelector((store) => store.appointmentReducer.appointments);
  const components = {
    event: ({ event }) => {
      const data = event?.data;
      if (data?.appointment)
        return (
          <AppointmentEvent
            appointment={data?.appointment}
            onDoubleClick={() => {}}
          />
        );
      return null;
    },
  };

  const appointments = data?.map((appointment) => ({
    start: new Date(appointment.start),
    end: new Date(appointment?.end),
    data: { appointment },
  }));
  return (
    <BigCalendar
      onSelectSlot={({ start, end }) => {
        onShowAppointmentView({ start, end });
      }}
      onDoubleClickEvent={(event) => {
        const appointment = event?.data?.appointment;
        appointment && onShowAppointmentView(appointment);
      }}
      events={appointments}
      style={{ width: "100%" }}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={view}
      view={view}
      date={date}
      onView={(view) => setView(view)}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
      components={components}
      selectable
      {...initProps}
    />
  );
};

export default CalendarComponent;

"use Client";
import React from "react";
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
  defaultView: Views.MONTH,
  max: moment("2022-10-10T16:00:00").toDate(),
  min: moment("2022-10-10T08:00:00").toDate(),
  step: 15,
  timeslots: 4,
};


const CalendarComponent = ({ onShowAppointmentView }) => {
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
      defaultDate={"2025-02-28"}
      views={["month", "day", "week"]}
      style={{ width: "100%" }}
      components={components}
      selectable
      {...initProps}
    />
  );
};

export default CalendarComponent;

"use client";
import React from "react";

const AppointmentEvent = ({ appointment, onDoubleClick }) => {

  return (
    <div onDoubleClick={() => onDoubleClick(appointment)}>
      <div>{appointment.title}</div>
    </div>
  );
};

export default AppointmentEvent;

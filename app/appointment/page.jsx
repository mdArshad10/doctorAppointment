"use client";
import React, { useState } from "react";
import { Calendar } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalenderPage = () => {
  const [events, setEvents] = useState([
    // Use state to manage events
    {
      id: "1", // Important: Add unique IDs
      title: "Morning Meeting",
      start: "2025-02-28T10:00:00",
      // end: "2025-02-28T10:30:00",
    },
    {
      id: "2",
      title: "Lunch Break",
      start: "2025-03-02T13:00:00",
      end: "2025-03-02T13:30:00",
    },
  ]);

  function handleEventClick(clickInfo) {
    console.log(clickInfo);

    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event}'`
      )
    ) {
      console.log(clickInfo.event);

      clickInfo.event.remove();
    }
  }

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
        };
      }
      return event;
    });
    console.log(updatedEvents);

    setEvents(updatedEvents);
  };

  const handleEventResize = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
        };
      }
      return event;
    });
    console.log(updatedEvents);

    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        weekends={true}
        slotMinTime="08:00:00" // Set the earliest time shown
        slotMaxTime="20:00:00" // Set the latest time shown
        slotDuration="00:30:00" // Set the slot duration (30 minutes)
        nowIndicator={true}
        dateClick={handleEventClick}
        events={events} // Use state events
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventContent={renderEventContent}
        // eventClick={handleEventClick}
      />
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalenderPage;

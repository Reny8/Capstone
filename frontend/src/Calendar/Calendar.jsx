import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css"
const CalendarDisplay = (props) => {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const events = [
    {
      title: "Big Meeting",
      start: new Date(2022, 5, 0),
      end: new Date(2022, 5, 0),
    },
    {
      title: "Vacation",
      start: new Date(2022, 5, 0),
      end: new Date(2022, 5, 0),
    },
  ];
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px", marginLeft: "15rem", paddingTop: "2rem"}}
      />
    </div>
  );
};

export default CalendarDisplay;

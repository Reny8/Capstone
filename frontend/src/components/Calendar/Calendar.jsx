import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"

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
    function handleEvents() {
        let projectTitlesAndDates = props.projects.map((project)=>{
            return {
                title: `Project: ${project.title} `,
                start: new Date(project.due_date),
                end: new Date(project.due_date)
            }
        })
        let taskTitlesAndDates = props.tasks.map((task)=>{
            return {
                title: `Task: ${task.description}`,
                start: new Date(task.due_date),
                end: new Date(task.due_date)
            }
        })
    const events = [...taskTitlesAndDates,...projectTitlesAndDates ]
    return events
    }
  return (
    <div className="calendar-box">
      <h2>Team Agenda</h2>
      <Calendar
        localizer={localizer}
        events={handleEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px", marginLeft: "9rem", paddingTop: "2rem", padding: "2rem"}}
      />
    </div>
  );
};

export default CalendarDisplay;

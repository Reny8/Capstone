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
                title: `${project.title} Project`,
                start: new Date(project.due_date),
                end: new Date(project.due_date)
            }
        })
        console.log(projectTitlesAndDates)
        let taskTitlesAndDates = props.tasks.map((task)=>{
            return {
                title: `Task:${task.description}`,
                start: new Date(task.due_date),
                end: new Date(task.due_date)
            }
        })
    console.log(taskTitlesAndDates)
    const events = [...taskTitlesAndDates,...projectTitlesAndDates ]
    return events
    }
  return (
    <div>
      <h2 style={{marginLeft: "9rem"}}>Team Agenda</h2>
      <Calendar
        localizer={localizer}
        events={handleEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px", marginLeft: "15rem", paddingTop: "2rem", padding: "2rem"}}
      />
    </div>
  );
};

export default CalendarDisplay;

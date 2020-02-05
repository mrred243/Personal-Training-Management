import {React, useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from '@fullcalendar/moment';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import moment from 'moment';



export default function  MyCalendar()  {

  const [events, setEvents] = useState([{
      title:'', start:'', duration:''
  }]);


  const fetchEvents = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then( response => response.json())
    .then( data => { console.log(data)
      setEvents([{title: data.activity, start: data.date, duration: data.duration}])}
        );
  };

  const calendar =
      <div>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin]}
          defaultView="dayGridMonth"
          header={{
             center:"title",
             right:"today prev,next",
             left:"dayGridMonth, timeGridWeek"
           }}
        />
      </div>

      return(
          {calendar}
      )

}

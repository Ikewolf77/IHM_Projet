import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


var calendarEl = document.getElementById('calendar');

var calendar = new Calendar(calendarEl, {
plugins: [ dayGridPlugin ]
});

calendar.render();
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useEvent } from '../context/EventContext';
import EventForm from './EventForm';

const Calendar = () => {
  const { events,setEvents } = useEvent();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading,setLoading] = useState(false)
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const daysInMonth = Array.from({ length: endOfMonth.date() }, (_, i) => startOfMonth.date(i + 1));
  const firstDayOfWeek = startOfMonth.day();
  const [monthsFetched,setMonthsFetched] = useState({})

  useEffect(()=>{
    //API call to fetch any pre-existing events
    const month =currentMonth.month()+1;
    const year =currentMonth.year();
    if(monthsFetched[`${year}-${month}`]){
      // if month data is fetched then no need to api call
      return
    }
    else{
      setMonthsFetched({...monthsFetched,[`${year}-${month}`]:true})
    }
    setLoading(true);
    setTimeout(()=>{
      //below data mimicing some event for month
      setEvents([...events,
        {
            "id": Date.now(),
            "date": `${year}-${month}-10`,
            "description": "saptami"
        },
        {
            "id": Date.now()+1,
            "date": `${year}-${month}-11`,
            "description": "ashtami"
        },
        {
            "id": Date.now()+3,
            "date": `${year}-${month}-12`,
            "description": "navami"
        }
    ])
    setLoading(false)
    },500)
  },[currentMonth])

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setSelectedDay(null)
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setSelectedDay(null)
  };

  return (
    <div className="calendar">
      <div className="navigation">
        <button 
          disabled={dayjs().month()=== currentMonth.month()} 
          className={dayjs().month()=== currentMonth.month() && 'disabled'} 
          onClick={prevMonth}>
            {"<"}
        </button>
        <h4>{currentMonth.format('MMMM YYYY')}</h4>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div className="dayOfWeek">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="dayHeader">{day}</div>
        ))}
      </div>
      {
        loading ? <h1>Loading...</h1> : 
          <div className="grid">
            {Array.from({ length: firstDayOfWeek }, (_, i) => <div key={i} className="emptyDay"></div>)}
            {daysInMonth.map((day) => {
              const dayEvent = events.filter((event)=>day.format('YYYY-MM-DD') === dayjs(event.date).format('YYYY-MM-DD')).length
              const isDisabled = dayjs().month()=== currentMonth.month() ? day.date() < dayjs().date() :false
              return(
              <div
                key={day.format('DD-MM-YYYY')}
                className={`day ${selectedDay && selectedDay.isSame(day) ? 'selected' : ''} ${isDisabled ? 'disabled':''}`}
                onClick={() => !isDisabled && setSelectedDay(day)}
              >
                {day.date()}
                {dayEvent >0 &&<div className='eventCount'>{dayEvent} events</div>}
              </div>
            )}
            )}
          </div>
      }
      {selectedDay && <EventForm 
          selectedDate={dayjs(selectedDay).format('YYYY-MM-DD')} 
        />}
      
    </div>
  );
};

export default Calendar;

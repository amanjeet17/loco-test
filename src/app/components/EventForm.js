"use client";
import { useState } from 'react';
import { useEvent } from '../context/EventContext';
import dayjs from 'dayjs';

const EventForm = ({ selectedDate }) => {
    const { addEvent, updateEvent, deleteEvent, events } = useEvent();
    const [description, setDescription] = useState('');
    const [editId,setEditId]= useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (description) {
            if(editId===null){
                //API call to add event
                addEvent(selectedDate, description);
            }
            else{
                //API call to update event
                updateEvent(editId.id, description);
            }
            setDescription('');
            setEditId(null)
        }
    };

    const handleEdit = (id)=>{
        const eventToEdit = events.find(event => event.id === id);
        setEditId(eventToEdit)
        if (eventToEdit) {
            setDescription(eventToEdit.description);
        }
    }

    const cancelEdit =()=>{
        setEditId(null)
        setDescription('')
    }

    return (
        <>
            <h3>Add Event for {dayjs(selectedDate).format('DD MMM YYYY')} </h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Event description"
                    required
                />
                <button type="submit">{editId===null ? 'Add':'Edit'}</button>
                {editId!==null && <button type="button" onClick={cancelEdit}>Cancel</button>}
            </form>
            <div className="eventList">
              {events.filter(event => event.date === selectedDate).map(event => {
                    if(editId?.id===event.id){
                        return null
                    }
                return(
                <div key={event.id} className="event">
                  <div>{event.description}</div>
                  <div className="eventButtons">
                    <button onClick={() => handleEdit(event.id)} className="editButton">✎</button>
                    <button onClick={() => deleteEvent(event.id)} className="deleteButton">✖</button>
                  </div>
                </div>
              )}
              )}
        </div>
        </>

    );
};

export default EventForm;

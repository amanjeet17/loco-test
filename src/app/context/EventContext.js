import { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const addEvent = (date, description) => {
        const newEvent = { id: Date.now(), date, description };
        setEvents((prev) => [...prev, newEvent]);
    };

    const updateEvent = (id,description)=>{
        setEvents((prev) => events.map((el)=>{
            if(el.id===id){
                el.description= description
            }
            return el
        }));
    }

    const deleteEvent = (id) => {
        setEvents((prev) => prev.filter(event => event.id !== id));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent,updateEvent,setEvents }}>
            {children}
        </EventContext.Provider>
    );
};

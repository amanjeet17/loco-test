"use client"
import Calendar from '../components/Calendar';
import { EventProvider } from '../context/EventContext';


const App = () => {
    return(
    <EventProvider>
        <Calendar  />
    </EventProvider>
    )

}

export default App;

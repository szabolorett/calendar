import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Create() {

  // Get the list of events from webstorage/local storage
  // as a string an format is as a list of event objects.

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  let navigate = useNavigate();

  // Save events to webstorage/local storage as a string.
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // When the user press create button, i find the highest
  // id value in the list, thereafter I add 1 to thT NUMBER
  // AND IT BECOMES THE ID OF THE NEW EVENT.
  function createHandler (e) {
      e.preventDefault();
      const highestId = events.length > 0 ? Math.max(...events.map(event => event.id)) : 0;
      const newEvent = { id: highestId + 1, title: title, date: date, description: description };
      setEvents([...events, newEvent]);
      navigate('/');
    }
 return (
  <form onSubmit={createHandler}>
    <h2>Create New Event</h2>
    <div>
      <label htmlFor='title'>Title:</label>
        <input type="text" id='title' name='title' value={title} required onChange={(e) => setTitle(e.target.value)}/>
    </div>
    <div>
      <label htmlFor='date'>Date:</label>
      <input type="date" id='date' name='date' value={date} required onChange={(e) => setDate(e.target.value)}/>
    </div>
    <div>
      <label htmlFor='description'>Description:</label>
      <textarea id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
    </div>
    <button type="submit">Create Event</button>
  </form>
 );
 };
import '../App.css'
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import myimage from '../assets/calendarimg.jpg';
import Searchfield from '../components/Searchfield';
import { useEffect, useState } from 'react';

const events = [
  {id: 1, title: "Meeting", date: "2026-04-22", description: "About party in Aarhus"},
  {id: 2, title: "Workshop", date: "2026-04-02", description: "Designing a new app"},
  {id: 3, title: "DIY", date: "2026-02-18", description: "Trying out colorful pottery"},
  {id: 4, title: "Color palette", date: "2026-02-13", description: "Learning about colors"}
  ];

function DefaultPage() {

  //Looks for information in webstorage, if there are some,
  //filterText is equal to this value, else it is an empty string.
   const [filterText, setFilterText]= useState(() => {
    const savedFilter = localStorage.getItem("filterTextinStorage");
    return savedFilter ? savedFilter : "";
  });

  //Everytime the filterText variable changes, the information
  // is saved to webstorage, with the key "filterTextinStorage"
  useEffect(() => {
    localStorage.setItem("filterTextinStorage", filterText);
  }, [filterText]);

  // sort the events in alphabetical order
  const sortedEvents = events.toSorted((a,b) =>
  a.date.localeCompare(b.date, "en", {sensitivity: "base"})
);

// Filter events based on user input
const filteredEvents = sortedEvents.filter( event =>
  event.title.toLowerCase().includes(filterText.toLowerCase()) ||
  event.description.toLowerCase().includes(filterText.toLowerCase())
)

// Event handler function
// Change the value of variable "filtertext"
//makes the component rerender
//function handleInputChange(event) {...
const handleInputChange = (event) => {
  setFilterText(event.target.value);
}

  return (
    <div>
      <img src={myimage} alt='This is my image'/>
      <Header/>
      <Searchfield handleinput={handleInputChange} filter={filterText}/>
      <EventList events={filteredEvents} />
      <Footer/>
    </div>
  )
}

export default DefaultPage;
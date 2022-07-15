import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./Components/Header";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import ContactDetail from "./Components/ContactDetail";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    const [contacts, setContacts] = useState([]);

    const addContactHandler = (contact) => {
        setContacts([...contacts, contact])
        localStorage.setItem('contacts',JSON.stringify([...contacts, contact]))
    };
    const removeContactHandler = (id) => {
        const newContactList = contacts.filter((contact) => {
            return contact.id !== id;
        });
        localStorage.setItem('contacts',JSON.stringify(newContactList))
        setContacts(newContactList)
    }


    useEffect(() => {
        const retrieveContacts = JSON.parse(localStorage.getItem('contacts'))
        console.log(retrieveContacts)
        if (retrieveContacts) setContacts(retrieveContacts);
    }, []);

    return <div>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/add"
                       element={<AddContact
                           addContactHandler={addContactHandler}/>}
                />
                <Route path="/contact/:id"
                       element={<ContactDetail
                           contacts={contacts}
                       />}/>
                <Route path="/"
                       element={ <ContactList
                           contacts={contacts}
                           getContactID={removeContactHandler}/>}/>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;

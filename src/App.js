import { Component } from "react";
import { nanoid } from "nanoid";

import './App.css';
import Filter from "components/Filter";
import ContactForm from "components/ContactForm";
import ContactList from "components/ContactList";
import { Layout } from "./components/Layout.styles";

class App extends Component{
    state = {
        contacts: [],
        filter:'',
    }

    localeStorageKey = "contact";

    formSubmitHandler = data => {
        if (!this.state.contacts.find(
            contact =>
                contact.name.toLowerCase() === data.name.toLowerCase()))
        {
            this.setState(prevState => ({
                contacts:[...prevState.contacts,{...data, id:nanoid()}],
            }))
            return true;
        } else {
            alert('Rosie Simpson is already in contacts.');
            }
    }

    removeContact = e => {
        this.setState({
            contacts: this.state.contacts.filter(contact=>contact.id !== e.target.dataset.id),
        })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        const data = localStorage.getItem(this.localeStorageKey);
        if (!data) { return }
        this.setState({
            contacts:JSON.parse(data),
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem(this.localeStorageKey, JSON.stringify(this.state.contacts));
        }
    }

    render() {
        const { formSudmitHandler, handleChange, removeContact } = this;
        const { filter, contacts } = this.state;
        return (
            <Layout>
            <h2>Phonebook</h2>
            <ContactForm onSubmit={formSudmitHandler} />
            <h2>Contacts</h2>
            <Filter handleChange={handleChange} />
            <ContactList
                filter={filter}
                contacts={contacts}
                removeContact={removeContact}
            />
        </Layout>
        );
    }
}

export default App;
import { Component} from 'react'
import { nanoid } from 'nanoid'

import './App.css';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import {Layout} from './components/Layout.styles'

class App extends Component{
  state = {
    contacts: [],
    filter: '',
  }

localStoregeKey = "contact";

formSudmitHandler = data => {
  if(!this.state.contacts.find(
    contact=>
    contact.name.toLowerCase() === data.name.toLowerCase()))
      {
        this.setState(prevState => ({
        contacts:[...prevState.contacts,{...data , id:nanoid()}],
        }))
        return true;
      }else{
        alert('Rosie Simpson is already in contacts.'); 
      }
}

removeContact = evt=>{
this.setState({
  contacts: this.state.contacts.filter(contact=> contact.id !== evt.target.dataset.id),
})
}

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

componentDidMount(){
  const data = localStorage.getItem(this.localStoregeKey);
  if(!data){return}
  this.setState({
    contacts: JSON.parse(data),
  })
}


componentDidUpdate(prevProps, prevState){
  if(prevState.contacts!==this.state.contacts){
    localStorage.setItem(this.localStoregeKey, JSON.stringify(this.state.contacts));
  }
}
  render() {
    const {formSudmitHandler,handleChange,removeContact} = this;
    const {filter, contacts} = this.state;
  return (
    <Layout>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={formSudmitHandler}/> 
      <h2>Contacts</h2>
      <Filter  handleChange={handleChange}/>
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

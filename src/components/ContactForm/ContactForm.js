import {React, Component } from "react";
import { nanoid } from "nanoid";
import {Form} from './Form.styles';
import { InputForm } from "./InputForm.styles";


class ContactForm extends Component  {
    state = {
        name: '',
        number: '',
    }
    nameInputId = nanoid();
    numberInputId = nanoid();

    handleChange = evt => {
        const { name, value } = evt.target;
        this.setState({ [name]: value });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const statusWrite = this.props.onSubmit(this.state);
      if(!statusWrite){return} 
       this.reset();
    };

    reset = () => {
        this.setState({ name: '',number: '' });
    };

    render() {
        return(
            <Form className='form' onSubmit={this.handleSubmit}>

                <label htmlFor={this.nameInputId}> Name </label>

                <InputForm
                    id={this.nameInputId}
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                
                <label htmlFor={this.numberInputId}> Number </label>

                <InputForm
                    id={this.numberInputId}
                    type="tel"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />

                <button type="submit">add contact</button>
                
            </Form>
        )
    }
}

export default ContactForm;
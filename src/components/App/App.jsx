import { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', nameContact: 'Rosie Simpson', tel: '459-12-56' },
      { id: 'id-2', nameContact: 'Hermione Kline', tel: '443-89-12' },
      { id: 'id-3', nameContact: 'Eden Clements', tel: '645-17-79' },
      { id: 'id-4', nameContact: 'Annie Copeland', tel: '227-91-26' },
    ],
    filter: '',
  };

  ////////додає контакт

  addContacts = ({ name, number }) => {
    if (
      this.state.contacts.some(
        ({ id, nameContact, tel }) => nameContact === this.state.name,
      )
    ) {
      alert(`name "${this.state.name}" is already in list`);
      return;
    }
    const newContact = {
      id: nanoid(),
      nameContact: name,
      tel: number,
    };
    console.log(newContact);
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  // шукає контакт

  handleFilterChange = value => this.setState({ filter: value });

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ nameContact }) =>
      nameContact.toLowerCase().includes(normalizedFilter),
    );
  };

  ////видаляє контакт

  // deleteContacts = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== id),
  //   }));
  // };

  deleteContacts = id => () => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebooc</h1>
        <ContactForm onSubmit={this.addContacts} />

        <Filter
          value={this.state.filter}
          onChange={e => this.handleFilterChange(e.target.value)}
        />

        <ContactList
          onDelete={this.deleteContacts}
          filteredContacts={this.getFilteredContacts()}
        />
      </div>
    );
  }
}

export default App;

import { Component } from 'react';
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
    name: '',
    number: '',
    activeCity: '',
  };
  ////// записує контакт
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  ////////додає контакт
  addContacts = evt => {
    evt.preventDefault();
    if (
      this.state.contacts.some(
        ({ id, nameContact, tel }) => nameContact === this.state.name,
      )
    ) {
      alert(`name "${this.state.name}" is already in list`);
      return;
    }

    const { name, number } = this.state;
    const newContact = {
      id: nanoid(),
      nameContact: name,
      tel: number,
      active: '',
    };
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
  handleStartDeleting = activeCity =>
    this.setState({
      isDeleteModalOpen: true,
      activeCity: activeCity,
    });

  deleteContacts = () => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        ({ nameContact }) => nameContact !== prevState.activeCity,
      ),
      activeCity: '',
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    // console.log(this.deleteContacts());
    return (
      <div>
        <h1>Phonebooc</h1>
        <form onSubmit={this.addContacts}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.name}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.name}
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
        <label>
          Find contact by name
          <input
            type="text"
            name="filter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.filter}
            onChange={e => this.handleFilterChange(e.target.value)}
          />
        </label>

        <ul>
          {filteredContacts.map(({ id, nameContact, tel }) => (
            <li key={id}>
              {nameContact} : {tel}
              <button
                type="button"
                onClick={() => this.handleStartDeleting(nameContact)}
              >
                Delete {nameContact}
              </button>
            </li>
          ))}
        </ul>
        {/* {this.state.contacts.map(({ id, nameContact, tel }) => (
          <ul>
            <li key={id}>
              {nameContact} : {tel}
            </li>
          </ul>
        ))} */}
      </div>
    );
  }
}

export default App;

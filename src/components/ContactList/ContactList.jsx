import PropTypes from 'prop-types';

const ContactList = ({ filteredContacts, onDelete }) => (
  <ul>
    {filteredContacts.map(({ id, nameContact, tel }) => (
      <li key={id}>
        {nameContact} : {tel}
        <button type="button" onClick={onDelete(id)}>
          Delete {nameContact}
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  filteredContacts: PropTypes.array,
  onDelete: PropTypes.func,
};

export default ContactList;

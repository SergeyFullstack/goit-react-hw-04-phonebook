import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { Form } from './ContactForm.styled';

export function ContactForm({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = (value, name) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    onSubmitForm(newContact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => {
            handleInputChange(e.target.value, e.target.name);
          }}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={e => {
            handleInputChange(e.target.value, e.target.name);
          }}
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};


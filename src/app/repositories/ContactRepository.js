const { v4: uuid } = require('uuid');

let contacts = [
  {
    id: uuid(),
    name: 'Mateus',
    email: 'mateus@gmail.com',
    phone: '(92) 2789-8788',
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Laura',
    email: 'laura@gmail.com',
    phone: '(98) 2768-6521',
    category_id: '86c39d94-c678-41e0-aa08-20169d13caa8',
  },
  {
    id: 'da26aec6-f2a0-4ff0-9927-de77f1e1c0b3',
    name: 'Henrique',
    email: 'henrique@gmail.com',
    phone: '(65) 2556-7112',
    category_id: uuid(),
  },
];

/**
 * @typedef {typeof contacts[0]} Contact
 */

class ContactRepository {
  /**
   * @returns {Promise<Contact[]>}
   */
  findAll() {
    return Promise.resolve(contacts);
  }

  /**
   * @param {string} id
   * @returns {Promise<Contact | null>}
   */
  findById(id) {
    return Promise.resolve(contacts.find((contact) => contact.id === id) ?? null);
  }

  /**
   * @param {string} email
   * @returns {Promise<Contact | null>}
   */
  findByEmail(email) {
    return Promise.resolve(contacts.find((contact) => contact.email === email) ?? null);
  }

  /**
   * @param {string} id
   */
  delete(id) {
    contacts = contacts.filter((contact) => contact.id !== id);
    return Promise.resolve();
  }

  /**
   * @param {Omit<Contact, "id">} contact
   * @returns {Promise<Contact>}
   */
  create({
    name, email, phone, category_id,
  }) {
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
      category_id,
    };
    contacts.push(newContact);
    return Promise.resolve(newContact);
  }

  /**
   *
   * @param {string} id
   * @param {Omit<Contact, "id">} contact
   * @returns {Contact}
   */
  update(id, {
    name, email, phone, category_id,
  }) {
    const updatedContact = {
      id, name, email, phone, category_id,
    };

    contacts = contacts.map((contact) => (
      contact.id === id ? updatedContact : contact
    ));

    return Promise.resolve(updatedContact);
  }
}

module.exports = new ContactRepository();

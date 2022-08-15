const { v4: uuid } = require('uuid');

let contacts = [
  {
    id: uuid(),
    name: 'Mateus',
    email: 'mateus@gmail.com',
    phone: '47986542598',
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Laura',
    email: 'laura@gmail.com',
    phone: '23947122678',
    category_id: uuid(),
  },
  {
    id: 'da26aec6-f2a0-4ff0-9927-de77f1e1c0b3',
    name: 'Henrique',
    email: 'henrique@gmail.com',
    phone: '33956477852',
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    return Promise.resolve(contacts);
  }

  findById(id) {
    return Promise.resolve(contacts.find((contact) => contact.id === id) ?? null);
  }

  delete(id) {
    contacts = contacts.filter((contact) => contact.id !== id);
    return Promise.resolve();
  }
}

module.exports = new ContactRepository();

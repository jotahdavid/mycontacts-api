const { v4: uuid } = require('uuid');

const contacts = [
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
    id: uuid(),
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
}

module.exports = new ContactRepository();

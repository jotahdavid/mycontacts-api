const db = require('../../database');

/**
 * @typedef {{
 *  id: string;
 *  name: string;
 *  email: string;
 *  phone: string;
 *  category_id: string;
 * }} Contact
 */

class ContactRepository {
  /**
   * @param {string} orderQuery
   * @returns {Promise<Contact[]>}
   */
  async findAll(orderQuery = 'ASC') {
    const direction = orderQuery.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  /**
   * @param {string} id
   * @returns {Promise<Contact | undefined>}
   */
  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  /**
   * @param {string} email
   * @returns {Promise<Contact | undefined>}
   */
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  /**
   * @param {Omit<Contact, "id">} contact
   * @returns {Promise<Contact>}
   */
  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);
    return row;
  }

  /**
   * @param {string} id
   * @param {Omit<Contact, "id">} contact
   * @returns {Contact}
   */
  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    const [row] = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return row;
  }
}

module.exports = new ContactRepository();

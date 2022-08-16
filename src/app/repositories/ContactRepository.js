const db = require('../../database');

const TABLE_NAME = 'contacts';

/**
 * @typedef {{
 *  id: string;
 *  name: string;
 *  email: string | null;
 *  phone: string | null;
 *  category_id: string | null;
 * }} Contact
 */

class ContactRepository {
  /**
   * @param {string} orderQuery
   * @returns {Promise<(Contact & { category_name: string | null; })[]>}
   */
  async findAll(orderQuery = 'ASC') {
    const direction = orderQuery.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM ${TABLE_NAME}
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
    `);
    return rows;
  }

  /**
   * @param {string} id
   * @returns {Promise<Contact | undefined>}
   */
  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM ${TABLE_NAME}
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
    `, [id]);
    return row;
  }

  /**
   * @param {string} email
   * @returns {Promise<Contact | undefined>}
   */
  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM ${TABLE_NAME}
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.email = $1
    `, [email]);
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
      INSERT INTO ${TABLE_NAME}(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);
    return row;
  }

  /**
   * @param {string} id
   * @param {Omit<Contact, "id">} contact
   * @returns {Promise<Contact>}
   */
  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE ${TABLE_NAME}
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
    await db.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
  }
}

module.exports = new ContactRepository();

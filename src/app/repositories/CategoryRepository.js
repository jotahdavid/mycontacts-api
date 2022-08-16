const db = require('../../database');

const TABLE_NAME = 'categories';

/**
 * @typedef {{
 *  id: string;
 *  name: string;
 * }} Category
 */

class CategoryRepository {
  /**
   * @returns {Category[]}
   */
  async findAll(orderQuery = 'ASC') {
    const direction = orderQuery.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM ${TABLE_NAME} ORDER BY name ${direction}`);
    return rows;
  }

  /**
   * @param {string} id
   * @returns {Category}
   */
  async findById(id) {
    const [row] = await db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id]);
    return row;
  }

  /**
   * @param {{ name: string; }}
   * @returns {Category}
   */
  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO ${TABLE_NAME}(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  /**
   * @param {string} id
   * @param {Omit<Category, "id">} category
   */
  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE ${TABLE_NAME}
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);
    return row;
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    await db.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
  }
}

module.exports = new CategoryRepository();

const ContactRepository = require('../repositories/ContactRepository');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

class ContactController {
  /**
   * Listar todos os registros
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const contacts = await ContactRepository.findAll();
    return res.status(200).json(contacts);
  }

  /**
   * Obter UM registro
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(contact);
  }

  /**
   * Criar um novo registro
   */
  store() {

  }

  /**
   * Editar um registro
   */
  update() {

  }

  /**
   * Deletar um registro
   * @param {Request} req
   * @param {Response} res
   */
  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found' });
    }

    await ContactRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new ContactController();

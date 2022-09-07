const { validate: validateUUID } = require('uuid');

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
    const { orderBy } = req.query;
    const contacts = await ContactRepository.findAll(orderBy);
    return res.status(200).json(contacts);
  }

  /**
   * Obter UM registro
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const { id } = req.params;
    if (!validateUUID(id)) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const contact = await ContactRepository.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.status(200).json(contact);
  }

  /**
   * Criar um novo registro
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Property name is missing' });
    }

    const contactExists = await ContactRepository.findByEmail(email);
    if (contactExists) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    return res.status(201).json(contact);
  }

  /**
   * Editar um registro
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;
    if (!validateUUID(id)) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const contactExistsById = await ContactRepository.findById(id);
    if (!contactExistsById) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const contactExistsByEmail = await ContactRepository.findByEmail(email);
    if (contactExistsByEmail && contactExistsByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const updatedContact = {
      name: name ?? contactExistsById.name,
      email: email ?? contactExistsById.email,
      phone: phone ?? contactExistsById.phone,
      category_id: category_id ?? contactExistsById.category_id,
    };
    const contact = await ContactRepository.update(id, updatedContact);

    return res.status(200).json(contact);
  }

  /**
   * Deletar um registro
   * @param {Request} req
   * @param {Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    if (!validateUUID(id)) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const contact = await ContactRepository.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new ContactController();

const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  /**
   * Listar todos os registros
   */
  async index(req, res) {
    const contacts = await ContactRepository.findAll();
    res.status(200).json(contacts);
  }

  /**
   * Obter UM registro
   */
  show() {

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
   */
  delete() {

  }
}

module.exports = new ContactController();

class ContactController {
  /**
   * Listar todos os registros
   */
  index(req, res) {
    res.status(200).send({ hello: 'world' });
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

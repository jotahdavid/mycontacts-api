const { validate: validateUUID } = require('uuid');

const CategoryRepository = require('../repositories/CategoryRepository');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

class CategoryController {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoryRepository.findAll(orderBy);
    res.status(200).json(categories);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const { id } = req.params;
    if (!validateUUID(id)) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = await CategoryRepository.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json(category);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Property name is missing' });
    }

    const category = await CategoryRepository.create({ name });

    return res.status(201).json(category);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!validateUUID(id)) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const categoryById = await CategoryRepository.findById(id);
    if (!categoryById) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const categoryUpdated = {
      name: name ?? categoryById.name,
    };
    const category = await CategoryRepository.update(id, categoryUpdated);

    return res.status(200).json(category);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    if (validateUUID(id)) {
      await CategoryRepository.delete(id);
    }
    return res.sendStatus(204);
  }
}

module.exports = new CategoryController();

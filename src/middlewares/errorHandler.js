module.exports = (error, req, res, next) => {
  if (error.routine === 'string_to_uuid') {
    console.error(error);
    return res.status(404).json({ error: 'Invalid ID syntax for type uuid' });
  }
  console.error(error);
  return res.sendStatus(500);
};

module.exports = (req, res) => {
  if (req.user) {
    // here you can fetch the user from the database
    return res.json(req.user);
  }
  return res
    .status(401)
    .send({ message: 'not authenticated' });
};

module.exports = {
  async index(req, res) {
    res.render('index', { title: 'hola' });
  }
}
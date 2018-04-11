module.exports = {
  async index(req, res) {
    res.render('index', { title: 'Home' });
  },
  async about(req, res) {
    res.render('index', { title: 'About' });
  }
}
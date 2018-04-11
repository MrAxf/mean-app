module.exports = {
  async locationInfo(req, res){
    res.render('index', { title: 'Location Info' });
  },
  async addReview(req, res){
    res.render('index', { title: 'Add review' });
  }
}
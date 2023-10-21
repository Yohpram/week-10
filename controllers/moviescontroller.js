const MoviesModel = require('../model/moviemodel');

class MoviesController {

  static async getAllMovies(req, res) {
    try {
      const movies = await MoviesModel.getAllMovies(); 
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
// masih keluar null
  static addPost(req, res){
    const { title, genres, year, photo} = req.body; 
    const objMovies = { 
        title, genres, year, photo
  }
    MoviesModel.addPost( objMovies, (err, movie) => {
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/movies");
        }
    });

  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    const {  title, genres, year, photo } = req.body;
    const updatedMovie = { id, title, genres, year, photo };
    try {
      const success = await MoviesModel.updateMovie(id, updatedMovie);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;
    try {
      const success = await MoviesModel.deleteMovie(id);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = MoviesController;

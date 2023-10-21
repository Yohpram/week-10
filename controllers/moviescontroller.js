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

  static addPost(req, res){
<<<<<<< HEAD
    const { title, genres, year, photo } = req.body; 
    const objmovies = { 
        title, genres, year, photo
=======
    const {id, title, genres, year, photos } = req.body; 
    const objmovies = { 
       id, title, genres, year, photos
>>>>>>> 6ef50dfa793b8b27f7e3c0c861bf1b51d518b480
  }
    MoviesModel.addPost( objmovies, (err, movie) => {
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
<<<<<<< HEAD
    const {  title, genres, year, photo } = req.body;
    const updatedMovie = { id, title, genres, year, photo };
=======
    const {  title, genres, year, photos } = req.body;
    const updatedMovie = { id, title, genres, year, photos };
>>>>>>> 6ef50dfa793b8b27f7e3c0c861bf1b51d518b480
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

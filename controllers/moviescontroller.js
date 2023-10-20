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

  static async createMovie(req, res) {
    const {  title, genre, year, photos } = req.body;
    const movie = {  title, genre, year, photos };
    try {
      const id = await MoviesModel.createMovie(movie);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    const { title, genre, year, photos } = req.body;
    const updatedMovie = { title, genre, year, photos };
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
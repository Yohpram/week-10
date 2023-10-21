const pool = require ("../config/connection");

class MoviesModel {
  constructor(id, title, genres, year, photos) {
    this.id = +id;
    this.title = title;
    this.genres = genres;
    this.year = year;
    this.photos = photos;
  }

  static async getAllMovies() {
    const query = 'SELECT * FROM public.movies;';
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static addPost(objmovies, callback) {
    const query = `INSERT INTO public.movies ("id", "title", "genres", "year", "photos") VALUES ($1, $2, $3, $4, $5);`;

    const arrData = [objmovies.id, objmovies.title, objmovies.genres, objmovies.year, objmovies.photos];

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(`${objmovies.title} sudah masuk datanya`);
        callback(null, null);
      }
    });
  }

  static async updateMovie(id, updatedMovie) {
    const { title, genres, year, photos } = updatedMovie;
    const query = 'UPDATE public.movies SET title = $1, genres = $2, year = $3, photos = $4 WHERE id = $5';
    try {
      const { rows } = await pool.query(query, [title, genres, year, photos, id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMovie(id) {
    const query = 'DELETE FROM public.movies WHERE id = $1;';
    try {
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MoviesModel;

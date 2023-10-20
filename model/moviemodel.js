const pool = require ("../config/connection");


class MoviesModel {
    static async getAllMovies() {
      const query = 'SELECT * FROM public.movies;';
      try {
        const { rows } = await pool.query(query);
        return rows;
      } catch (error) {
        throw error;
      }
    }

    static async createMovie(movie) {
        const { title, genres, year, photos } = movie;
        const query = 'INSERT INTO public.movies (title, genres, year, photos) VALUES ($1, $2, $3, $4) RETURNING id;';
        try {
          const { rows } = await pool.query(query, [title, genres, year, photos]);
          return rows[0].id;
        } catch (error) {
          throw error;
        }
      }
    
      static async updateMovie(id, updatedMovie) {
        const { title, genre, year, photo } = updatedMovie;
        const query = 'UPDATE public.movies SET title = $1, genres = $2, year = $3, photos = $4 WHERE id = $5;';
        try {
          await pool.query(query, [title, genres, year, photos, id]);
          return true;
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

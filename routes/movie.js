const express = require('express');
const MoviesController = require('../controllers/moviescontroller');
const router = express.Router();

router.get('/movies', MoviesController.getAllMovies);
router.post('/movies', MoviesController.createMovie);
router.put('/movies/:id', MoviesController.updateMovie);
router.delete('/movies/:id', MoviesController.deleteMovie);

module.exports = router;
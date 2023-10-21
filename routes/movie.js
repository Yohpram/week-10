const express = require('express');
const MoviesController = require('../controllers/moviescontroller');
const router = express.Router();

router.get('/movies', MoviesController.getAllMovies);
<<<<<<< HEAD
router.post('/add', MoviesController.addPost);
=======
router.post('/movies/add', MoviesController.addPost);
>>>>>>> 6ef50dfa793b8b27f7e3c0c861bf1b51d518b480
router.put('/movies/:id', MoviesController.updateMovie);
router.delete('/movies/:id', MoviesController.deleteMovie);

module.exports = router;

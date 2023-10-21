const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movie');
const UserRoutes = require('./routes/User');


app.use(express.json());


app.use('/', moviesRoutes);
app.use('/', UserRoutes);






const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







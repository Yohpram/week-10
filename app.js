const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const moviesRoutes = require('./routes/movie');


app.use(express.json());


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


app.use('/', moviesRoutes);
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







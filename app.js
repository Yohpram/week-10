const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movie');
const UserRoutes = require('./routes/User');
const bodyParser = require('body-parser')

app.use(express.json());


app.use('/', moviesRoutes);
app.use('/', UserRoutes);

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())




const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







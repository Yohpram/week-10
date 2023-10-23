const express = require('express');
const app = express();

const multer = require('multer');
const path = require("path");

const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  port: 5432,
  database: 'week-10'
});

// tes foto
const profiles = [
    {
        name : 'yohanes walwiyo',
        phone:'08888888888',
    },
    {
        name: 'john',
        phone:'077777777',
    },
];
app.use('/upload', express.static(path.join(__dirname, 'upload')));

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/upload'));
    },
    filename: (req, file, cb) =>{
        cb(null,file.fieldname+ ' '+ Date.now()+ path.extname(file.originalname));
    }

});

app.put('/profile/upload',multer({storage : diskStorage}).single('photo'), (req, res) => {
    const file = req.file.path;
    console.log(file)
    if(!file){
        res.status(400).send({
            status: false,
            data: 'no file is selected.'
        })
    }
    profiles[req.query.index].photo = req.file.path;
    res.send(file);
});


//upload foto movie ke database

const upload = multer({ storage: diskStorage });

app.put('/movies/upload/:id', upload.single('photo'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            status: false,
            data: 'No file is selected',
        });
    }

    const photoPath = file.path; 

    // Extract the relative path from the full path
    const relativePhotoPath = file.path.split('/').slice(-1)[0];

    const insertQuery = 'UPDATE public.movies SET photo = $1 WHERE id = $2 RETURNING *';

    pool.query(insertQuery, [relativePhotoPath, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: 'Error karena memproses request.',
            });
        }
        const savedMovies = result.rows[0];

        // Use the relative path in the response
        savedMovies.photo = relativePhotoPath;

        res.json({
            status: true,
            data: savedMovies,
        });
    });
});


app.listen(3007, function(){
    console.log('server running');
});

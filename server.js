const express = require('express');

const knex = require('knex');

const cloudinary = require('cloudinary').v2

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'drime',
      database : 'petscout',
      port: '5433',
      debug: true
    }
});


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});




const app = express();



app.listen(process.env.PORT || 3001);

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res) => {
    // res.send('App works 1234!!');

    db('posts').select('*').then(data => {
        res.json(data);
    })
})


app.post('/addPost', (req, res) => {
    const {title, longitude, latitude} = req.body;
    db('posts').insert({
        title: title,
        longitude: longitude,
        latitude: latitude
    }).then(data => {
        res.json('success')
    })
    .catch(err => res.json(err))

})


//radius = 0.07
const express = require('express'); //we import the Express Package
const mongoose = require('mongoose');
require('dotenv/config');
const app = express(); //Express Object create ! now, we can handle our routes...
const bodyParser = require('body-parser');
const cors = require('cors');

//Connect to DB MongoAtlas
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true},
    () => console.log('Connected to DB'+'\nListen on Port : '+process.env.PORT)  
);

//Import Routes
const authRoutes = require('./routes/auth');  
const collectionsRoutes = require('./routes/collections');
const editorsRoutes = require('./routes/editors');
const festivalsRoutes = require('./routes/festivals');
const festivalDetailsRoutes = require('./routes/festivaldetails');
const reservationsRoutes = require('./routes/reservations');
const usersRoutes = require('./routes/user');
const gamesRoutes = require('./routes/games');
const areasRoutes = require('./routes/areas');
const billsRoutes = require('./routes/bills');

//Middlewares 
//it's functions execute when a specific route is being hit !

app.use(cors());
app.use(bodyParser.json()); // the BodyParser allows to take json infos in a request

app.use('/user', authRoutes);
app.use('/users', usersRoutes);
app.use('/collections', collectionsRoutes);
app.use('/editors', editorsRoutes);
app.use('/festivals', festivalsRoutes);
app.use('/festival', festivalDetailsRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/games', gamesRoutes);
app.use('/areas', areasRoutes);
app.use('/bills', billsRoutes);

//Routes 
app.get('/home', (req,res) => {
    res.send('ok ça joue, c\'est parti !')
});

//How to we start listening to the server
app.listen(process.env.PORT);

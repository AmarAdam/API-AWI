const express = require('express');

const Festival = require('../models/Festival');
const Reservation = require('../models/Reservation');
const Area = require('../models/Area');
const Game = require('../models/Game');
const Editor = require('../models/Editor');
const Place = require('../models/Place');
const Bill = require('../models/Bill');

const router = express.Router();

//Get All Reservations
router.get('/', async (req,res) => {  //the verify middleware, use the function in verify, to check if the token is O.K., not K.O.
    try{
        const reservations = await Reservation.find();
        res.json(reservations);
    }catch(err){
        res.json({message: err});
    }
});

//Post a Reservation
router.post('/', /*verify,*/ async (req,res) => {
    const reservation = new Reservation({
        name: req.body.name,
        note: req.body.note,
        workflow : "null",
        festivalId: req.body.festivalId,
        games: req.body.games,
        exhibitor: req.body.exhibitor,
        places: req.body.places
    });
    try{
        // Reservation
        const SavedReservation = await reservation.save();

        var billPrice = 0;

        for (const p of req.body.places) {
            const place = new Place({
                type: "emplacement",
                size: p.value,
                areaId: p.id,
                reservationId: SavedReservation._id
            })
            // Places
            const SavedPlace = await place.save();

            // Areas
            const area = await Area.findById(p.id);
            var newSize = area.sizeAvailable - p.value;
            area.sizeAvailable = newSize;
            //area.save();

            billPrice = billPrice + area.price * p.value;
        };

        // Bill
        const festival = await Festival.findById(req.body.festivalId);
        const bill = new Bill({
            state: "à payer",
            price: billPrice,
            reservationId: SavedReservation._id,
            festivalName: festival.date
        });
        const SavedBill = await bill.save();

        const resa = await Reservation.findById(SavedReservation._id);
        resa.billPrice = bill.price;
        const FinalReservation = await resa.save();

        res.json(FinalReservation);
    }catch(err){
        console.log(err);
        res.json({message: err });
    }
});

// Get all reservations from festival current
router.get('/listgames', async (req,res) => {
    try{
        const reservations = await Reservation.find({'festivalId': '606586755666ec145cd4a242'});
        const games = []
        console.log(reservations.length)
        var i = 0
        var stringgames = ""
        var tabgames = []

        while(i<reservations.length){
            console.log(reservations[i].games)
            var j = 0 
            while(j<reservations[i].games.length){
                stringgames = stringgames + "\n -"+ reservations[i].games[j] +  " (" + reservations[i].exhibitor + "), visible en Zone "+reservations[i].places[0].areaNumber
                tabgames.push(reservations[i].games[j] +  " (" + reservations[i].exhibitor + "), visible en Zone "+reservations[i].places[0].areaNumber)
                j++
            }
            i++
        }
        
        console.log(stringgames)
        res.json({listgames: stringgames, tabgames: tabgames});
        //res.json(reservations);
    }catch(err){
        res.json({message: err })
    }
});


// Get all reservations from festival current
router.get('/listgamesm', async (req,res) => {
    try{
        const reservations = await Reservation.find({'festivalId': '606586755666ec145cd4a242'});
        const games = []
        console.log(reservations.length)
        var i = 0
        var stringgames = ""
        var tabgames = []

        while(i<reservations.length){
            console.log(reservations[i].games)
            var j = 0 
            while(j<reservations[i].games.length){
                stringgames = stringgames + "\n -"+ reservations[i].games[j] +  " (" + reservations[i].exhibitor + "), visible en Zone "+reservations[i].places[0].areaNumber
                tabgames.push(reservations[i].games[j] +  " (" + reservations[i].exhibitor + "), visible en Zone "+reservations[i].places[0].areaNumber)
                j++
            }
            i++
        }
        
        console.log(stringgames)
        res.json({listgames: stringgames});
        //res.json(reservations);
    }catch(err){
        res.json({message: err })
    }
});

//Get a Reservation with an Id
router.get('/getOne/:reservationId', async (req,res) => {
    try{
        const reservation = await Reservation.findById(req.params.reservationId);
        res.json(reservation);
    }catch(err){
        res.json({message: err })
    }    
});

//Delete a Reservation
router.delete('/:reservationId', async (req,res) => {
    try{
        const removedReservation= await Reservation.remove({_id: req.params.reservationId});
        res.deleteOne(removedReservation);
    }catch(err){
        res.json({message: err})
    }
});

//Update a Reservation
router.patch('/:reservationId', async (req, res) => {
    console.log("on est dans la route "+req.params.reservationId)
    console.log("on est dans la route "+req.body.workflow)
    console.log("on est dans la route "+req.body.note)
    
    try{        
        const updateReservation = await Reservation.updateOne(
            { _id: req.params.reservationId}, //filter
            {$set:{
                workflow: req.body.workflow, 
                note : req.body.note
                }
            } //update
        )
        res.json(updateReservation);
    }catch(err){
        res.json({message: err})
    }
});

// Sends data necessary to create a reservation (all areas, games, editors)
router.get('/new/:festivalId', async (req,res) => {
    try{
        const areas = await Area.find({festivalId: req.params.festivalId});
        const games = await Game.find();
        const exhibitors = await Editor.find({exhibitor: true});
        var data = { areas, games, exhibitors }
        res.json(data);
    }catch(err){
        res.json({message: err })
    }    
});

module.exports = router
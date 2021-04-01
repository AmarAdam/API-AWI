const express = require('express');
const Bill = require('../models/Bill');

const router = express.Router();

// Get one festival by id with reservations
router.get('/', async (req,res) => {
    try{
        const bills = await Bill.find();

        var result = {};
        for (var i = 0; i < bills.length; i++) {
            console.log(bills[i])
            if(result.hasOwnProperty(bills[i].festivalName)){
                result[bills[i].festivalName] = result[bills[i].festivalName] + bills[i].price;
            } else {
                result[bills[i].festivalName] = bills[i].price;
            }
        }
        console.log("result");
        console.log(result);
        res.json({
            bills: bills,
            results: result
        });
    }catch(err){
        res.json({message: err })
    }
});

module.exports = router
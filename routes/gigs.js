const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Gigdetails = require('..//models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => console.log(err)));

// Display add gig form
router.get('/add', (req, res) => res.render('add' , { layout : 'landing'}));

//Display bike details
router.get('/:id/details' , (req,res) => {
  res.render('bikedetails');
  Gigdetails.findByPk()
    .then(gigs => res.render('bikedetails' , {
      gigs
    }))
    .catch(err => console.log(err));
});

// Add a gig
router.post('/add', (req, res) => {
  let { title, pickup, rate_per_day, description , engine } = req.body;


  // Insert into table
    Gig.create({
      title,
      rate_per_day,
      description,
      engine,
      pickup
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
});

// Search for gigs
router.get('/search', (req, res) => {
  const term = req.query.pickup;
console.log(JSON.stringify(term));

  // Make lowercase
  

  Gig.findAll({ where: { pickup: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});


module.exports = router;
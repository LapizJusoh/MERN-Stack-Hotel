/*======================
  DEPENDENCIES
======================*/

const express = require(`express`);
const router = express.Router();
const Hotels = require(`../models/hotels.js`);

/*======================
  ROUTERS
======================*/

router.get(`/`,(req,res)=>{
  Hotels.find({},(err,hotelData)=>{
    if(err){
      res.status(400).json({ err: err.message })
    } else {
      res.status(200).json(myHolidays)
    }
  }).sort({name:1})
})

// TO create/insert holiday
router.post(`/`,(req,res)=>{
  Hotels.create(req.body,(err,created)=>{
    if(err){
      res.status(400).json({ err: err.message })
    } else{
      res.send(created)
    }
  })
});

// TO update/put Hotels
router.put(`/:id`,(req,res)=>{
  Hotels.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,updatedHotel)=>{
    if(err){
      res.status(400).json({ err: err.message })
    } else{
      res.status(200).json(updatedHotel)
    }
  })
});

// TO delete Hotels
router.delete(`/:id`,(req,res)=>{
  Hotels.findByIdAndDelete(req.params.id,(err,deletedHotel)=>{
    if(err){
      res.status(400).json({ err: err.message })
    } else{
      res.status(200).json(deletedHotel)
    }
  })
});

module.exports = router;
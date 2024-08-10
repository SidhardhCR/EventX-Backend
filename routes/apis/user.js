var express = require('express');
var router = express.Router();

var event_helpers = require('../../helpers/event-helpers');


router.get('/user',(req,res)=>{
    res.json("api call")
});

router.post('/event_submit',(req,res)=>{
    console.log(req.body)
    console.log(req.files.file)
    event_helpers.create_event(req.body).then((id)=>{
        let image = req.files.file
        image.mv('./public/event-images/'+id+'.jpg')
        console.log('added successfully')
        res.status(200).json({message:'success'})
    })
   
})



module.exports = router;
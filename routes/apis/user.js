var express = require('express');
var router = express.Router();
var path = require('path')

var event_helpers = require('../../helpers/event-helpers');


router.get('/user', (req, res) => {
    res.json("api call")
});

router.post('/event_submit', (req, res) => {
    console.log(req.body)
    console.log(req.files.file)
    event_helpers.create_event(req.body).then((id) => {
        let image = req.files.file
        image.mv('./public/event-images/' + id + '.jpg')
        console.log('added successfully')
        res.status(200).json({ message: 'success' })
    })

});

router.get('/images/:filename', (req, res) => {

    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../public/event-images', filename);
  
    console.log(filePath)

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    })
});

router.get('/events',(req,res)=>{

    event_helpers.get_events().then((events)=>{
        console.log(events)
        res.status(200).json({events:events})
    })
    
})



module.exports = router;
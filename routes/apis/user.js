var express = require('express');
var router = express.Router();
var path = require('path')
var db = require('../../config/db_connection')

var event_helpers = require('../../helpers/event-helpers');


router.get('/user', (req, res) => {
    res.json("api call")
});

router.post('/event_submit', (req, res) => {
    console.log(req.body);
    console.log(req.files.file);

    event_helpers.create_event(req.body).then((id) => {
        let image = req.files.file;
        const gfs = db.getGFS(); // Get GridFS instance

        const writeStream = gfs.createWriteStream({
            filename: id + '.jpg',
            content_type: image.mimetype,
            metadata: { event_id: id }
        });

        writeStream.write(image.data);
        writeStream.end();

        writeStream.on('close', (file) => {
            console.log('Image stored successfully in GridFS');
            res.status(200).json({ message: 'success', file_id: file._id });
        });

        writeStream.on('error', (err) => {
            console.error('Error storing image in GridFS:', err);
            res.status(500).json({ error: 'Failed to store image' });
        });
    });
});

router.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const gfs = db.getGFS(); // Get GridFS instance

    gfs.files.findOne({ filename: filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).send('Image not found');
        }

        const readStream = gfs.createReadStream({ filename: file.filename });
        readStream.pipe(res);
    });
});
router.get('/events', (req, res) => {

    db.connect((err) => {
        if (err) {
          console.log("Database connection Error")
        }
        else {
          console.log("Database Connected successfully")
          event_helpers.get_events().then((events) => {
            console.log(events)
            res.status(200).json({ events: events })
        })
        }
      })

    

})



module.exports = router;
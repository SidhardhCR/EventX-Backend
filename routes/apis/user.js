var express = require('express');
var router = express.Router();


router.get('/user',(req,res)=>{
    res.json("api call")
});



module.exports = router;
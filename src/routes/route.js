const express = require('express');
const router = express.Router();
const CollegeController = require('../controller/collegeController')
const InternController = require('../controller/internController')

// test API
router.get('/test', function(req, res){
    res.status(200).send({status: true, message: "test api working fine"})
})

// new college entry
router.post('/functionup/colleges', CollegeController.registerCollege)

// get college details with interns
router.get('/functionup/collegeDetails', CollegeController.getCollegeDetailsWithInterns)

// new intern entry
router.post('/functionup/interns', InternController.registerIntern )


module.exports = router;
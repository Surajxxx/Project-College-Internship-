const express = require('express');
const router = express.Router();
const CollegeController = require('../controller/collegeController')
const InternController = require('../controller/internController')

// test API
router.get('/test', function(req, res){
    res.status(200).send({status: true, message: "test api working fine"})
})

// new college entry
router.post('/functionup/colleges', CollegeController.createCollege)

// get college details
router.get('/functionup/collegeDetails', CollegeController.getCollegeDetails)

// new intern entry
router.post('/functionup/interns', InternController.createIntern )


module.exports = router;
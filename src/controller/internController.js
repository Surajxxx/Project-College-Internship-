const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')
const { default: mongoose } = require('mongoose')

const isValid = function(value){
    if(typeof (value) === 'undefined' || value === null) return false
    if(typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}

const isValidRequestBody = function(reqBody){
    return Object.keys(reqBody).length > 0
}

const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}

const registerIntern = async function (req, res){

    try{
        const requestBody = req.body

    // validation

    if(!isValidRequestBody(requestBody)){
        return res.status(400).send({status: false, message: "please provide input data"})
    }

    const {name, email, mobile, collegeId} = requestBody

    if(!isValid(name)){
        return res.status(400).send({status: false, message: "Name is required"})
    }

    if(!isValid(email)){
        return res.status(400).send({status: false, message: "email is required"})
    }
    
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return res.status(400).send({status: false, message: "enter a valid email"})
    }

    if(!isValid(mobile)){
        return res.status(400).send({status: false, message: "mobile number is required"})
    }

    if(! /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile)){
        return res.status(400).send({status: false, message: `enter a valid mobile number. like:[ "7578541254", "+917578541254", "07578541254", "917578541254"]`})
    }   

    if(!isValidObjectId(collegeId)){
        return res.status(400).send({status: false, message: "enter a valid college ID"})
    }

    const isEmailUnique = await InternModel.findOne({email : email})

    if(isEmailUnique){
        return res.status(400).send({status: false, message: "email already exist"})
    }

    const isMobileUnique = await InternModel.findOne({mobile : mobile})

    if(isMobileUnique){
        return res.status(400).send({status: false, message: "mobile number already exist"})
    }

    const college = await CollegeModel.findById(collegeId)
    
    if(!college){
        return  res.status(400).send({status: false, message: `no college found by this ${collegeId} ID`})
    }
    
    // validation ends here
    
    const newIntern = await InternModel.create(requestBody)

    res.status(201).send({status: true, message: "new intern entry done", data: newIntern})


    }catch (error){
        res.status(500).send({error : error.message})
    }

}

module.exports.registerIntern = registerIntern






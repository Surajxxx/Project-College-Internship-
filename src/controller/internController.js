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


const registerIntern = async function (req, res){

    try{
        const requestBody = req.body

    // validation

    if(!isValidRequestBody(requestBody)){
        return res.status(400).send({status: false, message: "please provide input data"})
    }

    const {name, email, mobile, collegeName} = requestBody

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


    const isEmailUnique = await InternModel.findOne({email : email})

    if(isEmailUnique){
        return res.status(400).send({status: false, message: "email already exist"})
    }

    const isMobileUnique = await InternModel.findOne({mobile : mobile})

    if(isMobileUnique){
        return res.status(400).send({status: false, message: "mobile number already exist"})
    }
    
    if(!isValid(collegeName)){
        return res.status(400).send({status: false, message: "collegeName is required"})
    }
    
    // validation ends here

    const college = await CollegeModel.findOne({name : collegeName})
        
    if(!college){
        return  res.status(404).send({status: false, message: `no college found by ${collegeName} name`})
    }
    
    
    const collegeId = college._id

    const newRequestBody = requestBody

    newRequestBody.collegeId = collegeId
    
    delete newRequestBody.collegeName

    const newIntern = await InternModel.create(newRequestBody)

    res.status(201).send({status: true, message: "new intern entry done", data: newIntern})


    }catch (error){
        res.status(500).send({error : error.message})
    }

}

module.exports.registerIntern = registerIntern






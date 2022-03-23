const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const emailValidation = function(email){
    let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(email)
}

const mobileValidation = function(mobile){
    let regexForMobile = /^[6-9]\d{9}$/
    return regexForMobile.test(mobile)
}


const internSchema = new mongoose.Schema({

    name: {
        type : String ,
        required : [true, "name is mandatory"],
        trim : true },
    email: {
        type : String,
        required :[true, "email is mandatory"],
        unique: [true, "email already exist"],
        validate: [emailValidation, "please enter a valid email"],
        trim : true,
        lowercase : true },
    mobile: {
        type : String,
        required : [true, "mobile number is mandatory"],
        unique: [true, "mobile number already exist"],
        validate:[mobileValidation, "please enter a valid mobile number"],
        trim :true},
    collegeId: {
        type: ObjectId,
        ref : "College" },
    isDeleted: {
        type: Boolean,
        default: false}
   
    },
        {timestamps : true})

module.exports = mongoose.model('Intern', internSchema)



const mongoose = require("mongoose");

const validLink = function(logoLink){
  let regexForLinks = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
  return regexForLinks.test(logoLink)
}

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true, "Name must be provided"],
      unique: [true, "Name already exist"],
      trim: true,
      lowercase : true
    },
    fullName: {
      type: String,
      required: [true, "Full name must be provided"],
      trim: true,
    },
    logoLink: { 
      type: String,
      required:[ true, "Logo link must be provided"],
      unique : [true, "logoLink already exist"],
      validate : [validLink, "please enter a valid link"],
      trim : true 
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);

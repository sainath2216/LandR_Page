const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.WhatIsYourName, {
    expiresIn: "7d",
  });
  return token;
};


const User = mongoose.model("user", userSchema);

const validate = (data) => {
  // complexity rules
  const complexityOptions = {
    min: 5, // Minimum length of 8 characters
    max: 30, // Maximum length of 30 characters
    lowerCase: 1, // At least 1 lowercase letter
    upperCase: 0, // At least 1 uppercase letter
    numeric: 0, // At least 1 numeric character
    symbol: 0, // At least 1 special symbol
    requirementCount: 3, // Password must meet at least 3 of these criteria
  };

  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions).required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = { User, validate };

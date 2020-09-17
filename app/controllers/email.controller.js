const express = require('express')
const Email = require('../models/email.model.js');
const auth = require('../middleware/auth')

/**
 * Create a user
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const email = new Email(req.body)
        await email.save()
        // const token = await user.generateAuthToken()
        res.status(201).send({ email })
    } catch (error) {
        res.status(400).send(error)
    }

    //console.log(req.body);

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Email.find()
        .then(email => {
            res.send(email);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving emails."
            });
        });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
    Email.findById(req.params.emailId)
        .then(email => {
            if (!email) {
                return res.status(404).send({
                    message: "email not found with id " + req.params.emailId
                });
            }
            res.send(email);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Email not found with id " + req.params.emailId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.emailId
            });
        });
};
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
        const email = new Email(req.body)
        await email.save()
        // const token = await user.generateAuthToken()
        res.status(201).send({ email })
    } catch (error) {
        res.status(400).send(error)
    }

    //console.log(req.body);

};
const express = require('express')
const User = require('../models/user.model.js');
const auth = require('../middleware/auth')

/**
 * Create a user
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

    //console.log(req.body);

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {

    var bodyObject = Object.keys(req.body);
    var str = '';
    var insertObject = {}

    // Validate Request
    if (!req.body.userId || !req.params.userId) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // ok now lets check what is being passed and only update those
    // remember this will update your complete simulation if you just want
    // to update one or part of simulation then you need to use some other method

    bodyObject.forEach(function (element, index) {
        if (element !== 'userId') {
                insertObject[element]=req.body[element];
        }
    });
    User.findByIdAndUpdate(req.params.userId
        ,insertObject
        , { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};

// Bulk Delete
exports.bulkDelete = (req, res) => {
    if(req.body.userId){
        User.deleteMany({ _id: { $in: req.body.userId } }, function(err) {})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
    }
    
};

/**
 *  AUTHENTICATION METHODS
 *   May be we should put it in authentication controller later on 
 */

// user login
//
exports.login = async (req, res) => {

    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
};

/**
 * Logout method
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = async (req, res) => {
    // Log user out of the application
    try {
        console.log(req.user)

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};



const express = require('express')
const Email = require('../models/email.model.js');
const auth = require('../middleware/auth');
const multer = require('multer');

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  
  const upload = multer({
    dest: "/email/upload"
    
});

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

exports.uploadFile = (req,res) => {
    Email.upload(req.file.path)
    const tempPath = req.file.path;
    const targetPath = path.join(__upload, "");

    if (path.extname(req.file.upload).toLowerCase() === ".png") {
      fs.upload(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.upload(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
    });
    }
}        

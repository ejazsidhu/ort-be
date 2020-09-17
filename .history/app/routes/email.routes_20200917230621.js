module.exports = (app) => {
    const email = require('../controllers/email.controller.js');
    const auth = require('../middleware/auth');
    /**
     * 
     * 
     * Routes for USERS
     * Use auth function to secure the endpont with jwt token
     */
    // Create a new User
    // if you dont have a user, to create the user, take out auth function 
    // so that it lets you create your first user for tests
    //app.post('/users/create', users.create);
    app.post('/email/create', email.create);

    // Retrieve all email
    app.get('/email', email.findAll);

    // Retrieve a single User with userId
    app.get('/email/:emailId', email.findOne);

    // // Update a User with userId
    // // make sure you pass id in body and in url of request
    // app.post('/email/update/:userId', auth, email.update);

    // // Delete a User with noteId
    // app.get('/email/delete/:userId', auth, email.delete);

    // // Delete a User with noteId
    // app.post('/email/bulkdelete', auth, email.bulkDelete);




}
module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
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
    app.post('/users/create', auth, users.create);

    // Retrieve all Users
    app.get('/users', auth, users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', auth, users.findOne);

    // Update a User with userId
    // make sure you pass id in body and in url of request
    app.post('/users/update/:userId', auth, users.update);

    // Delete a User with noteId
    app.get('/users/delete/:userId', auth, users.delete);

    // Delete a User with noteId
    app.post('/users/bulkdelete', auth, users.bulkDelete);


    //logout a user
    app.post('/users/logout', auth, users.logout)


    /**
     *  NON AUTH routers
     */
    // Login a  User
    app.post('/users/login', users.login)




}
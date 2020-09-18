const multer = require("multer");
const upload = multer({
    dest: "/public"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

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
    // app.get('/email', email.findAll);

    // Retrieve a single User with userId
    app.get('/email/:emailId', email.findOne);

    app.post('/email/upload',email.uploadFile)

    // // Update a User with userId
    // // make sure you pass id in body and in url of request
    // app.post('/email/update/:userId', auth, email.update);

    // // Delete a User with noteId
    // app.get('/email/delete/:userId', auth, email.delete);

    // // Delete a User with noteId
    // app.post('/email/bulkdelete', auth, email.bulkDelete);

    app.post(
        "/upload",
        upload.single("file" /* name attribute of <file> element in your form */),
        (req, res) => {
            console.log("files",req.file)
          const tempPath = req.file.path;
          const targetPath = path.join(__dirname, "./uploads/image.png");
      
          if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
              if (err) return handleError(err, res);
      
              res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
            });
          } else {
            fs.unlink(tempPath, err => {
              if (err) return handleError(err, res);
      
              res
                .status(403)
                .contentType("text/plain")
                .end("Only .png files are allowed!");
            });
          }
        }
      );


}
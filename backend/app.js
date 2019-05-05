const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/users.model');
const multer = require('multer');


mongoose.connect("mongodb://localhost:27017/bewgledb", { useNewUrlParser: true })
.then(() => {
  console.log("db connected");
})
.catch((err) => {
  console.log(err);
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// defining storage for images
// const MIME_TYPE_MAP = {
//   'images/png': 'png',
//   'images/jpeg': 'jpg',
//   'images/jpg': 'jpg'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(' ').join('-');
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + '-' + Date.now() + '.' + ext);
//   }
// });

// Add User
app.post("/api/users", (req, res) => {
  const users = new Users({
    username: req.body.username,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email
  });
  users.save();
  res.status(201).json({
    message: "user added successfully"
  });
});

// add Image
// app.post("/api/users/img", multer({storage: storage}).single("image"), (req, res) => {
//   console.log(res, 'hihihihihi');
// });

// Get Users
app.get("/api/users", (req, res) => {
  Users.find().then((data) => {
    res.status(200).json({
      message: "successfully",
      users: data
    });
  });
});

// Get User's Data By ID
app.get("/api/users/:id", (req,res) => {
  Users.findById(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'getting userId',
        users: result
      });
    });
});

// Updated UserData by ID
app.put("/api/users/:id", (req,res) => {
  const users = {
    username: req.body.username,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact
  };
  console.log(users);
  Users.findByIdAndUpdate(req.params.id, users, {upsert: true}, (err, result) => {
    if(err){
      console.log(err);
    }else{
      console.log(result, 'success');
    }
  });
});

// Delete User
app.delete("/api/users/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "User deleted!" });
    });
});


module.exports = app;

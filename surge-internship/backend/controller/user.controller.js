//implement bussiness logic here
//CRUD functionalities

//import customer model
const User = require("../model/user.model");

const signUpUser = (req, res) => {
  const fName = req.body.fName;
  const email = req.body.email;
  const userName = req.body.userName;
  const password = req.body.password;

  const newUser = new User({
    fName,
    email,
    userName,
    password,
  });

  newUser
    .save()
    .then((User) => {
      res.json(User);
    })
    .catch((err) => {
      res.json(err);
    });
};

const loginUser = (req, res) => {
  const userName = req.body.logUN;
  const password = req.body.logpw;

  User.find({ userName: userName })
    .then((User) => {
      if (!User[0] || User[0].password != password) {
        res.json("Invalid");
      } else {
        res.json(User[0].id);
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.params.id)
    .then((User) => {
      res.json(User);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateUser = (req, res) => {
  const fName = req.body.fullName;
  const email = req.body.email;
  const userName = req.body.userName;
  const password = req.body.newPassword;

  const newUser = new User({
    fName,
    email,
    userName,
    password,
  });

  User.findByIdAndUpdate(req.params.id, {
    $set: {
      fName: req.body.fullName,
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.newPassword,
    },
  })
    .then(() => res.json("Good"))
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports = {
  signUpUser,
  loginUser,
  getUserInfo,
  updateUser,
};

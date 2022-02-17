import React, { Component } from "react";
import "./register.css";
import axios from "axios";
import validator from "validator";

class register extends React.Component {
  constructor(props) {
    super(props);

    this.setUserFullName = this.setUserFullName.bind(this);
    this.setUserEmail = this.setUserEmail.bind(this);
    this.setUserPassword = this.setUserPassword.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.setConfPw = this.setConfPw.bind(this);

    this.regUser = this.regUser.bind(this);

    this.state = {
      fName: "",
      email: "",
      userName: "",
      password: "",
      confPw: "",
    };
  }

  setUserFullName(e) {
    this.setState({ fName: e.target.value });
  }

  setUserEmail(e) {
    this.setState({ email: e.target.value });
  }

  setUserName(e) {
    this.setState({ userName: e.target.value });
  }

  setUserPassword(e) {
    this.setState({ password: e.target.value });
  }

  setConfPw(e) {
    this.setState({ confPw: e.target.value });
  }

  regUser(e) {
    e.preventDefault();
    let hit = 0;
    if (!/^[A-Za-z\s]{5,}$/.test(this.state.fName)) {
      alert("wronge name input");
      hit = 1;
    }
    if (!/^[A-Za-z\s]{5,}$/.test(this.state.userName)) {
      alert("wronge username input");
      hit = 1;
    }
    if (!validator.isEmail(this.state.email)) {
      alert("wrong email");
      hit = 1;
    }
    if (!validator.isStrongPassword(this.state.password)) {
      alert(
        "password must contain min 8 characters, 1 or more uppercase, 1 or more lowercase, 1 or more number, 1 or more symbol"
      );
      hit = 1;
    }
    if (
      validator.isEmpty(this.state.password) ||
      this.state.password != this.state.confPw
    ) {
      alert("confirm password match failed");
      hit = 1;
    }
    if (hit == 0) {
      const regUser = {
        fName: this.state.fName,
        email: this.state.email,
        userName: this.state.userName,
        password: this.state.password,
      };

      axios
        .post("http://localhost:3001/api/User/signup", regUser)
        .then((res) => {
          window.location = "/";
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }

  render() {
    return (
      <div>
        <div className="container regcon">
          <center>
            <h1>Register</h1>
          </center>
          <br />
          <br />
          <form onSubmit={this.regUser}>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name *"
              value={this.state.fName}
              onChange={this.setUserFullName}
              aria-label="Full Name *"
              aria-describedby="basic-addon1"
            />
            <br />
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Email *"
              value={this.state.email}
              onChange={this.setUserEmail}
              aria-label="Email *"
              aria-describedby="basic-addon1"
            />
            <br />
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="User Name *"
              value={this.state.userName}
              onChange={this.setUserName}
              aria-label="User Name *"
              aria-describedby="basic-addon1"
            />

            <br />
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Password *"
              value={this.state.password}
              onChange={this.setUserPassword}
              aria-label="Password *"
              aria-describedby="basic-addon1"
            />

            <br />
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password *"
              value={this.state.confPw}
              onChange={this.setConfPw}
              aria-label="Confirm Password *"
              aria-describedby="basic-addon1"
            />
            <br />
            <br />
            <input
              type="submit"
              className="form-control regbtn"
              value="Register"
            />
          </form>
        </div>
      </div>
    );
  }
}
export default register;

import React, { Component } from "react";
import "./register.css";
import axios from "axios";

class login extends React.Component {
  constructor(props) {
    super(props);

    this.setUserName = this.setUserName.bind(this);
    this.setUserPassword = this.setUserPassword.bind(this);

    this.loginUser = this.loginUser.bind(this);

    this.state = {
      userName: "",
      password: "",
    };
  }

  setUserName(e) {
    this.setState({ userName: e.target.value });
  }

  setUserPassword(e) {
    this.setState({ password: e.target.value });
  }

  loginUser(e) {
    const logUser = {
      logUN: this.state.userName,
      logpw: this.state.password,
    };

    axios
      .post("http://localhost:3001/api/User/login", logUser)
      .then((res) => {
        if (res.data == "Invalid") {
          alert("Invalid username or password");
        } else {
          window.location = "/profile/" + res.data;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="container regcon">
          <center>
            <h1>Login</h1>
          </center>
          <br />
          <br />
          <form onSubmit={this.loginUser}>
            <input
              type="text"
              className="form-control"
              placeholder="UserName *"
              value={this.state.userName}
              onChange={this.setUserName}
              aria-label="UserName *"
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
              type="submit"
              className="form-control regbtn"
              value="Login"
            />
          </form>
          <br />
          <h6>
            <a href="/reg">Register here</a>
          </h6>
        </div>
      </div>
    );
  }
}
export default login;

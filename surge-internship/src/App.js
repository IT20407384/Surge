import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

import login from "./components/login";
import register from "./components/register";
import UserProfile from "./components/userProfile";

function App() {
  return (
    <Router>
      <Route path="/" exact component={login} />
      <Route path="/reg" component={register} />
      <Route path="/profile/:id" component={UserProfile} />
    </Router>
  );
}

export default App;

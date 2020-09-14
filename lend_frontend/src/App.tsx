import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { TabBar } from "./components/organizations/TabBar/TabBar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <TabBar/>
      <Login />
    </div>
  );
}

export default App;

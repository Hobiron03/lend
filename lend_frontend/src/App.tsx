import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import { TabBar } from "./components/organizations/TabBar/TabBar";
import AppBar from "./components/organizations/AppBar/AppBar";
import BottomBar from "./components/organizations/BottomBar/BottomBar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <TabBar />
      <AppBar />
      <Login />
      <BottomBar />
    </div>
  );
}

export default App;

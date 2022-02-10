import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Food from "./Components/Food/Food";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import NewFood from "./Components/NewFood/NewFood";
import NewStudent from "./Components/NewStudent/NewStudent";
import Serve from "./Components/Serve/Serve";
import Student from "./Components/Student/Student";
export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/foods">
            <Food />
          </Route>
          <Route exact path="/new_food">
            <NewFood />
          </Route>
          <Route exact path="/students">
            <Student />
          </Route>
          <Route exact path="/new_student">
            <NewStudent />
          </Route>
          <Route exact path="/serve">
            <Serve />
          </Route>
          <Route path="*">
            <p>No Match Found</p>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

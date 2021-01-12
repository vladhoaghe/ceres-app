import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Reports from "./components/pages/Reports";
import Login from "./components/pages/Login";

function App() {
    return (
        <Router>
            <Route path="/" exact component={Login} />
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/reports" component={Reports} />
            </Switch>
        </Router>
    );
}

export default App;

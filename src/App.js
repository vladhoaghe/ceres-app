import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Reports from "./components/pages/Reports";

function App() {
    return (
        <Router>
            {/* <Sidebar/> */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/reports" component={Reports} />
            </Switch>
        </Router>
    );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TotalsPanel from "./components/TotalsPanel";
import Header from "./components/Header";
import WrapperComponent from "./components/WrapperComponent";
import LastPanel from "./components/lastUserProduct";
import NotFound from "./components/NotFound";
import Products from "./components/Products";

function App() {
  return (
    <Router>
      <div className="App">
        <Header logoImage="./Logo.jpg" />
        <WrapperComponent>
          <Switch>
            <Route exact path="/">
              <TotalsPanel />
              <LastPanel />
            </Route>
            <Route exact path="/products" component={Products} />
            <Route exact path="/users" component={Products} />
            <Route component={NotFound} />
          </Switch>
        </WrapperComponent>
      </div>
    </Router>
  );
}

export default App;

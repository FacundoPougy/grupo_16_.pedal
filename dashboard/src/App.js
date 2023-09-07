import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import TotalsPanel from './components/TotalsPanel';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header logoImage= "./Logo.jpg"/>
        
        <TotalsPanel/> 
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

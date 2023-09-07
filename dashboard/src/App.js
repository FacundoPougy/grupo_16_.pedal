import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import TotalsPanel from './components/TotalsPanel';
import Header from './components/Header';
import WrapperComponent from './components/WrapperComponent';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Header logoImage= "./Logo.jpg"/>
        <WrapperComponent>
          <Switch>
          <Route exact path="/" component={TotalsPanel}/>
          <Route exact path="/about" component={Header} />
          <Route exact path="/contact" component={WrapperComponent} />
          <Route component={NotFound} /> 
        </Switch>
        </WrapperComponent>
      </div>
    </Router>
  );
}

export default App;

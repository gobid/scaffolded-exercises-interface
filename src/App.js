import React from 'react';
import './App.css';
import Step1 from './pages/step1';
import Step2 from './pages/step2';
import Home from './pages/home';
// based on: https://blog.cloudboost.io/creating-a-react-js-app-from-scratch-part-3-routing-basics-edfb4c10346d
import { BrowserRouter, Route } from 'react-router-dom';


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )} />
          <Route exact={true} path='/step-one' render={() => (
            <div className="App">
              <Step1 />
            </div>
          )} />
          <Route exact={true} path='/step-two' render={() => (
            <div className="App">
              <Step2 />
            </div>
          )} />
        </div>
      </BrowserRouter>
    )
  }
}
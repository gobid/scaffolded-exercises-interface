import React from 'react';
import './App.css';
import Step1 from './pages/step1';
import Step2 from './pages/step2';
import Step3 from './pages/step3';
import Step4 from './pages/step4';
import Home from './pages/home';
// router setup based on: https://blog.cloudboost.io/creating-a-react-js-app-from-scratch-part-3-routing-basics-edfb4c10346d
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
          <Route exact={true} path='/step-three' render={() => (
            <div className="App">
              <Step3 />
            </div>
          )} />
          <Route exact={true} path='/step-four' render={() => (
            <div className="App">
              <Step4 />
            </div>
          )} />
        </div>
      </BrowserRouter>
    )
  }
}
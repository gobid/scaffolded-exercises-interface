import React from 'react';
import './App.css';
import ExerciseAG1 from './pages/auto-exercise1.js';
import ExerciseG from './pages/exerciseg';
import Exercise1 from './pages/exercise1';
import Exercise2 from './pages/exercise2';
import Exercise3 from './pages/exercise3';
import Exercise35 from './pages/exercise35';
import Exercise4 from './pages/exercise4';
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
          <Route exact={true} path='/exercise-auto1' render={() => (
            <div className="App">
              <ExerciseAG1 />
            </div>
          )} />
          <Route exact={true} path='/exercise-general' render={() => (
            <div className="App">
              <ExerciseG />
            </div>
          )} />
          <Route exact={true} path='/exercise-one' render={() => (
            <div className="App">
              <Exercise1 />
            </div>
          )} />
          <Route exact={true} path='/exercise-two' render={() => (
            <div className="App">
              <Exercise2 />
            </div>
          )} />
          <Route exact={true} path='/exercise-three' render={() => (
            <div className="App">
              <Exercise3 />
            </div>
          )} />
            <Route exact={true} path='/exercise-three-five' render={() => (
                <div className="App">
                    <Exercise35 />
                </div>
            )} />
          <Route exact={true} path='/exercise-four' render={() => (
            <div className="App">
              <Exercise4 />
            </div>
          )} />
        </div>
      </BrowserRouter>
    )
  }
}
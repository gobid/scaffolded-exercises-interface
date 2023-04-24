import React from 'react';
import './App.css';
import ExerciseAG0 from './pages/auto-exercise0.js';
import ExerciseAG1 from './pages/auto-exercise1.js';
import ExerciseAG2 from './pages/auto-exercise2.js';
import ExerciseAG3 from './pages/auto-exercise3.js';
import ExerciseAG4 from './pages/auto-exercise4.js';
import ExerciseAG5 from './pages/auto-exercise5.js';
import ExerciseAG6 from './pages/auto-exercise6.js';
import ExerciseAG7 from './pages/auto-exercise7.js';
import ExerciseAG8 from './pages/auto-exercise8.js';
import ExerciseAG9 from './pages/auto-exercise9.js';

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
          <Route exact={true} path='/exercise-auto0' render={() => (
            <div className="App">
              <ExerciseAG0 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto1' render={() => (
            <div className="App">
              <ExerciseAG1 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto2' render={() => (
            <div className="App">
              <ExerciseAG2 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto2' render={() => (
            <div className="App">
              <ExerciseAG2 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto3' render={() => (
            <div className="App">
              <ExerciseAG3 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto4' render={() => (
            <div className="App">
              <ExerciseAG4 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto5' render={() => (
            <div className="App">
              <ExerciseAG5 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto6' render={() => (
            <div className="App">
              <ExerciseAG6 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto7' render={() => (
            <div className="App">
              <ExerciseAG7 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto8' render={() => (
            <div className="App">
              <ExerciseAG8 />
            </div>
          )} />
          <Route exact={true} path='/exercise-auto9' render={() => (
            <div className="App">
              <ExerciseAG9 />
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
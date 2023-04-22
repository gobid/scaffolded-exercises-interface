import React from 'react';
import './../App.css';

export default class Home extends React.Component {
    state = {
    }
    render() {
        return (
            <div id='homepage-container'>
                <h1>Scaffolded Exercises</h1>
                <ul style={{textAlign: 'left'}}>
                    <li><a href="exercise-auto1">Exercise auto1</a></li>
                    <li><a href="exercise-auto2">Exercise auto2</a></li>
                    <li><a href="exercise-auto3">Exercise auto3</a></li>
                    <li><a href="exercise-auto4">Exercise auto4</a></li>
                    <li><a href="exercise-auto5">Exercise auto5</a></li>
                    <li><a href="exercise-auto6">Exercise auto6</a></li>
                    <li><a href="exercise-auto7">Exercise auto7</a></li>
                    <li><a href="exercise-auto8">Exercise auto8</a></li>
                    <li><a href="exercise-auto9">Exercise auto9</a></li>
                    <li><a href="exercise-auto10">Exercise auto10</a></li>

                    <li><a href="exercise-general">Exercise general</a></li>
                    <li><a href="exercise-one">Exercise one</a></li>
                    <li><a href="exercise-two">Exercise two</a></li>
                    <li><a href="exercise-three">Exercise three</a></li>
                    <li><a href="exercise-three-five">Exercise three.five</a></li>
                    <li><a href="exercise-three-five-six">Exercise three.five.six</a></li>
                    <li><a href="exercise-three">Exercise four</a></li >
                </ul>
            </div>
        )
    }
}
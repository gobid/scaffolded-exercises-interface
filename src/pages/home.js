import React from 'react';
import './../App.css';

export default class Home extends React.Component {
    state = {
    }
    render() {
        return (
            <div id='container'>
                <a href="step-one">step one</a>
                <a href="step-two">step two</a>
                <a href="step-three">step three</a>
                <a href="step-three">step four</a>
            </div>
        )
    }
}
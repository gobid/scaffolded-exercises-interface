import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview32 extends React.Component {
    render() {
        return (
            <div className="#codeview1" id="codeview32">
                <div className="xxx">
                    <span style={{ backgroundColor: 'yellow' }} className="clamp">var clamp</span>
                    {` = function(x, min, max){ `}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`return Math.max(Math.min(x, max), min);}`}

                </div>
            </div>
        )
    }
}
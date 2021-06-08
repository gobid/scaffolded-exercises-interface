import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview345 extends React.Component {
    render() {
        return (
            <div className="#codeview1" id="codeview345">
                <div className="xxx">
                    <span style={{ backgroundColor: 'yellow' }} className="clamp">var container_size</span>
                    {` = [$container.width(),`}
                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    {`$container.height()];`}
                </div>
            </div>
        )
    }
}
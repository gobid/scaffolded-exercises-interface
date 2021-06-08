import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview342 extends React.Component {
    render() {
        return (
            <div className="#codeview1" id="codeview342">
                <div className="xxx">
                    <span style={{ backgroundColor: 'yellow' }} className="clamp">function eventPos(e)</span>
                    {` {`}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    {`if(e.type.match(/^touch/)) {`}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    {`e = e.originalEvent.changedTouches[0];`}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    {`}`}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    {` return {pageX: e.pageX, pageY: e.pageY};`}
                    &nbsp;&nbsp; &nbsp;&nbsp;

                    &nbsp;&nbsp; &nbsp;&nbsp;
                    {`}`}
                </div>
            </div>
        )
    }
}
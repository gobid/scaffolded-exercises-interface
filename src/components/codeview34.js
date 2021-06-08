import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
import Codeview341 from '../components/codeview341';
window.$ = $;

export default class Codeview34 extends React.Component {
    clickToInspectCode(e) {
        if (e.target.classList.contains("pos")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview341')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview341')[0].style.display = modalDisplay

        }
    }


    render() {
        return (
            <div className="#codeview1" id="codeview34">
                <div className="xxx">
                    <span style={{ backgroundColor: 'yellow' }} className="scrollDelta">scroll_delta</span>
                    {` = [`}
                    {`position[0]`}
                    {` - `}
                    <span className="var-value-code-inspect pos" onClick={this.clickToInspectCode}>{`pos.pageX`}</span>
                    {`, `}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`position[1]`}
                    {` - `}
                    <span className="var-value-code-inspect pos" onClick={this.clickToInspectCode}>{`pos.pageY`}</span>
                    {`];`}
                    <Codeview341 style = {{style: "none"}} id="codeview3411"/>
                </div>
            </div>
        )
    }
}
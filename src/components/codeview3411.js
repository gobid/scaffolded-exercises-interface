import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
import Codeview342 from '../components/codeview342';
window.$ = $;

export default class Codeview3411 extends React.Component {
    clickToInspectCode(e) {
        if (e.target.classList.contains("eventpos")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview342')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview342')[0].style.display = modalDisplay

        }
    }

    render() {
        return (
            <div className="#codeview1" id="codeview3411">
                <div className="xxx">
                    <span style={{ backgroundColor: 'yellow' }} className="clamp">var pos</span>
                    {` = `}
                    <span className="var-value-code-inspect eventpos" onClick={this.clickToInspectCode}>{`eventPos(e)`}</span>
                    {`;`}
                    <Codeview342 style = {{style: "none"}} id="codeview342"/>
                </div>
            </div>
        )
    }
}
import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
import Codeview32 from '../components/codeview32';
import Codeview33 from '../components/codeview33';
import Codeview34 from '../components/codeview34';
import Codeview341 from '../components/codeview341';
import Codeview3411 from '../components/codeview3411';
import Codeview345 from '../components/codeview345';
import Codeview36 from '../components/codeview36';
window.$ = $;

export default class Codeview31 extends React.Component {

    clickToInspectCode(e) {
        if (e.target.classList.contains("clamp")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview32')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview32')[0].style.display = modalDisplay

        }
        if (e.target.classList.contains("size")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview33')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview33')[0].style.display = modalDisplay

        }

        if (e.target.classList.contains("scrollDelta")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview34')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview34')[0].style.display = modalDisplay

        }

        /*
        if (e.target.classList.contains("page")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview3411')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview3411')[0].style.display = modalDisplay

        }
        */

        if (e.target.classList.contains("containerSize")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = 'rgba(0,0,255,0.54)';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview345')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview345')[0].style.display = modalDisplay

        }
        if (e.target.classList.contains("tilesize")) {
            let elem = e.target;
            if (elem.style.backgroundColor == 'yellow') {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }
            else {
                elem.style.backgroundColor = 'yellow';
                elem.style.color = 'black';
            }

            let modalDisplay = $('#codeview36')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview36')[0].style.display = modalDisplay

        }

    }

    render() {
        return (
            <div className="code-editor code-editor-window" id={this.props.id}>
                <div className="window-body1" style={{textAlign: "left"}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`position[0] = Math.round(`}
                    <span className="var-value-code-inspect clamp" onClick={this.clickToInspectCode}>{`clamp`}</span>
                    {`(`}
                    <span className="page" onClick={this.clickToInspectCode}>{`pos.pageX`}</span>
                    {`+`}
                    <span className="var-value-code-inspect scrollDelta" onClick={this.clickToInspectCode}>{`scroll_delta[0]`}</span>
                    {`,-(`}
                    <span className="var-value-code-inspect size" onClick={this.clickToInspectCode}>{`size[1]`}</span>
                    {`+`}
                    <span className="var-value-code-inspect size" onClick={this.clickToInspectCode}>{`size[3]`}</span>
                    {`)*`}
                    <span className="var-value-code-inspect tilesize" onClick={this.clickToInspectCode}>{`tilesize`}</span>
                    {`+`}
                    <span className="var-value-code-inspect containerSize" onClick={this.clickToInspectCode}>{`container_size[0]`}</span>
                    {`,0));`}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {`position[1] = Math.round(`}
                    <span className="var-value-code-inspect clamp" onClick={this.clickToInspectCode}>{`clamp`}</span>
                    {`(`}
                    <span className="page" onClick={this.clickToInspectCode}>{`pos.pageY`}</span>
                    {`+`}
                    <span className="var-value-code-inspect scrollDelta" onClick={this.clickToInspectCode}>{`scroll_delta[1]`}</span>
                    {`,-(`}
                    <span className="var-value-code-inspect size" onClick={this.clickToInspectCode}>{`size[0]`}</span>
                    {`+`}
                    <span className="var-value-code-inspect size" onClick={this.clickToInspectCode}>{`size[2]`}</span>
                    {`)*`}
                    <span className="var-value-code-inspect tilesize" onClick={this.clickToInspectCode}>{`tilesize`}</span>
                    {`+`}
                    <span className="var-value-code-inspect containerSize" onClick={this.clickToInspectCode}>{`container_size[1]`}</span>
                    {`,0));`}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Codeview32 style = {{style: "none"}} id="codeview32"/>
                    <Codeview33 style = {{style: "none"}} id="codeview33"/>
                    <Codeview34 style = {{style: "none"}} id="codeview34"/>
                    {/* <Codeview3411 style = {{style: "none"}} id="codeview3411"/> --> */}
                    <Codeview345 style = {{style: "none"}} id="codeview345"/>
                    <Codeview36 style = {{style: "none"}} id="codeview36"/>

                </div>
            </div>
        )
    }
}
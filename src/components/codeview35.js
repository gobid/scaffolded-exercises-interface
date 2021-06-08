import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
import Codeview36 from '../components/codeview36';
window.$ = $;

export default class Codeview35 extends React.Component {

    clickToInspectCode(e) {
        if (e.target.classList.contains('math-floor-function')) {
            let elem = e.target;
            $('#image-elem')[0].style.backgroundColor = 'yellow';
            elem.style.backgroundColor = 'yellow';
            elem.style.color = 'black';
            setTimeout(function () {
                $('#image-elem')[0].style.backgroundColor = 'initial';
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }, 2000);
        }

        if (e.target.classList.contains('negative-position-0')) {
            let elem = e.target;
            $('#position-0')[0].style.backgroundColor = 'yellow';
            elem.style.backgroundColor = 'yellow';
            elem.style.color = 'black';
            setTimeout(function () {
                $('#position-0')[0].style.backgroundColor = 'initial';
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }, 2000);
        }

        if (e.target.classList.contains("negative-position-1")) {
            let elem = e.target;
            $('#position-0')[0].style.backgroundColor = 'yellow';
            elem.style.backgroundColor = 'yellow';
            elem.style.color = 'black';
            setTimeout(function () {
                $('#position-0')[0].style.backgroundColor = 'initial';
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }, 2000);
        }

        if (e.target.classList.contains("tilesize")) {
            let elem = e.target;
            elem.style.backgroundColor = 'yellow';
            elem.style.color = 'black';


            let modalDisplay = $('#codeview36')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview36')[0].style.display = modalDisplay

            setTimeout(function () {
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }, 2000);
        }
    }

    render() {
        return (
            <div className="code-editor code-editor-window" id={this.props.id}>
                <div className="window-body1">
                    {`center = [`}
                    <span className="math-floor-function" onClick={this.clickToInspectCode}>Math.floor</span>
                    {`(`}
                    <span className = "var-value-code-inspect negative-position-0" onClick={this.clickToInspectCode}>{`-position[0]`}</span>
                    {`/`}
                    <span className = "var-value-code-inspect tilesize" onClick={this.clickToInspectCode}>{`tilesize`}</span>
                    {`),`}
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="math-floor-function" onClick={this.clickToInspectCode}>{`Math.floor`}</span>
                    {`(`}
                    <span className = "var-value-code-inspect negative-position-1" onClick={this.clickToInspectCode}>{`-position[1]`}</span>
                    {`/`}
                    <span className = "var-value-code-inspect tilesize" onClick={this.clickToInspectCode}>{`tilesize`}</span>
                    {`)]`}
                    <Codeview36 style = {{style: "none"}} id="codeview36" />

                </div>
            </div>
        )
    }
}
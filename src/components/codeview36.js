import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview35 extends React.Component {
   /* clickToInspectCode(e) {
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
            $('#image-elem-val')[0].style.backgroundColor = 'yellow';
            elem.style.backgroundColor = 'yellow';
            elem.style.color = 'black';
            setTimeout(function () {
                $('#image-elem-val')[0].style.backgroundColor = 'initial';
                elem.style.backgroundColor = '#0000ff8a';
                elem.style.color = 'white';
            }, 2000);
        }
    }*/



    render() {
        return (
            <div className="#codeview1" id="codeview36">
                <div className="xxx">
                    <span style={{ backgroundColor: 'yellow' }} className="tilesize">tilesize</span>
                    {` = 2048`}

                </div>
            </div>
        )
    }
}
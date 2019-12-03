import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview4 extends React.Component {
  clickToInspectCode(e) {
    if (e.target.classList.contains('image-code-display')) {
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

    if (e.target.classList.contains('name-code-display')) {
      let elem = e.target;
      $('#name-elem')[0].style.backgroundColor = 'yellow';
      elem.style.backgroundColor = 'yellow';
      elem.style.color = 'black';
      setTimeout(function () {
        $('#name-elem')[0].style.backgroundColor = 'initial';
        elem.style.backgroundColor = '#0000ff8a';
        elem.style.color = 'white';
      }, 2000);
    }

    if (e.target.classList.contains('css-computation-code-display')) {
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

    if (e.target.classList.contains('y-iter') || e.target.classList.contains('x-iter')) {
      console.log("iter hit")
      const iterClass = e.target.classList.contains('y-iter') ? '.y-iter' : '.x-iter';
      $(iterClass).css('background-color', 'yellow');
      $(iterClass).css('color', 'black');
      setTimeout(function () {
        $(iterClass).css('background-color', '#0000ff8a');
        $(iterClass).css('color', 'white');
      }, 2000)
    }

    if (e.target.id === 'map-code-display') {
      $('#map-elem-val')[0].style.backgroundColor = 'yellow';
      $('#map-code-display')[0].style.backgroundColor = 'yellow';
      $('#map-code-display')[0].style.color = 'black';
      setTimeout(function () {
        $('#map-elem-val')[0].style.backgroundColor = 'initial';
        $('#map-code-display')[0].style.backgroundColor = '#0000ff8a';
        $('#map-code-display')[0].style.color = 'white';
      }, 2000);
    }
  }

  render() {
    return (
      <div className="code-editor code-editor-window" id={this.props.id}>
        <div className="window-body">
          {`for (var `}
          <span className="var-value-code-inspect y-iter" onClick={this.clickToInspectCode}>y</span>
          {` = -1; `}
          <span className="var-value-code-inspect y-iter" onClick={this.clickToInspectCode}>y</span>
          {` <= +1; `}
          <span className="var-value-code-inspect y-iter" onClick={this.clickToInspectCode}>y</span>
          {`++) {`}
          <br></br>
          &nbsp;&nbsp;
          {`for (var `}
          <span className="var-value-code-inspect x-iter" onClick={this.clickToInspectCode}>x</span>
          {` = -1; `}
          <span className="var-value-code-inspect x-iter" onClick={this.clickToInspectCode}>x</span>
          {` <= +1; `}
          <span className="var-value-code-inspect x-iter" onClick={this.clickToInspectCode}>x</span>
          {`++) {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          ...
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span className="var-value-code-inspect image-code-display" onClick={this.clickToInspectCode}>$image</span>
          {` = $('<img class="img-tile tile' + `}
          <span className="var-value-code-inspect name-code-display" onClick={this.clickToInspectCode}>name</span>
          {` + " src="http://imgs.xkcd.com/clickdrag/' + `}
          <span className="var-value-code-inspect name-code-display" onClick={this.clickToInspectCode}>name</span>
          {` + '.png" style="top:' + `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>((centre[1] + <span className="y-iter">y</span>) * tilesize)</span>
          {` + 'px; left:' + `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>((centre[0] + <span className="x-iter">x</span>) * tilesize)</span>
          {` + 'px; z-index: -1; position: absolute;;" style="display:none" />');`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span
            className="var-value-code-inspect image-code-display"
            onClick={this.clickToInspectCode}>
            $image
          </span>
          .
          <span className="tutorons-code-inspect">
            load
            <span
              className="tutorons-text">
              Load data from the server and place the returned HTML into the matched elements.
            </span>
          </span>
          {`(function () {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`$(this).`}
          <span className="tutorons-code-inspect">
            show()
            <span
              className="tutorons-text">
              Display the matched elements.
            </span>
          </span>
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`}).`}
          <span className="tutorons-code-inspect">
            error
            <span
              className="tutorons-text">
              Bind an event handler to the "error" JavaScript event.
            </span>
          </span>
          {`(function () {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`$(this).`}
          <span className="tutorons-code-inspect">
            remove()
            <span
              className="tutorons-text">
              Remove the set of matched elements from the DOM.
            </span>
          </span>
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`});`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span
            className="var-value-code-inspect"
            id="map-code-display"
            onClick={this.clickToInspectCode}>
            $map
          </span>
          .
          <span className="tutorons-code-inspect">
            append
            <span
              className="tutorons-text">
              Remove the set of matched elements from the DOM.
            </span>
          </span>
          {`(`}
          <span
            className="var-value-code-inspect image-code-display"
            onClick={this.clickToInspectCode}>
            $image
          </span>
          {`);`}
          <br></br>
          &nbsp;&nbsp;
          {`}`}
          <br></br>
          {`}`}
        </div>
      </div>
    )
  }
}
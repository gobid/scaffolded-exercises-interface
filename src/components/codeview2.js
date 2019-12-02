import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview1 extends React.Component {
  clickToInspectCode(e) {
    if (e.target.id === 'image-code-display') {
      $('#image-elem')[0].style.backgroundColor = 'yellow';
      $('#image-code-display')[0].style.backgroundColor = 'yellow';
      $('#image-code-display')[0].style.color = 'black';
      setTimeout(function () {
        $('#image-elem')[0].style.backgroundColor = 'initial';
        $('#image-code-display')[0].style.backgroundColor = '#0000ff8a';
        $('#image-code-display')[0].style.color = 'white';
      }, 2000);
    }

    if (e.target.id === 'position1-code-display') {
      $('#position-0')[0].style.backgroundColor = 'yellow';
      $('#position1-code-display')[0].style.backgroundColor = 'yellow';
      $('#position1-code-display')[0].style.color = 'black';
      setTimeout(function () {
        $('#position-0')[0].style.backgroundColor = 'initial';
        $('#position1-code-display')[0].style.backgroundColor = '#0000ff8a';
        $('#position1-code-display')[0].style.color = 'white';
      }, 2000);
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

  clickToInspectDocs(e) {

  }

  render() {
    return (
      <div className="code-editor-window" id={this.props.id}>
        <div className="window-body">
          {`for (var `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>y</span>
          {` = -1; `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>y</span>
          {` <= +1; `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>y</span>
          {`++) {`}
          <br></br>
          &nbsp;&nbsp;
          {`for (var `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>x</span>
          {` = -1; `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>x</span>
          {` <= +1; `}
          <span className="var-value-code-inspect css-computation-code-display" onClick={this.clickToInspectCode}>x</span>
          {`++) {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          ...
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span 
          className="var-value-code-inspect" 
          id="image-code-display" 
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
              Insert content, specified by the parameter, to the end of each element in the set of matched elements.
            </span>
          </span>
          {`(`}
          <span 
            className="var-value-code-inspect" 
            id="image-code-display" 
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
import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview1 extends React.Component {
  clickToInspectCode(e) {
    if (e.target.id === 'position0-code-display') {
      $('#position-0')[0].style.backgroundColor = 'yellow';
      $('#position0-code-display')[0].style.backgroundColor = 'yellow';
      $('#position0-code-display')[0].style.color = 'black';
      setTimeout(function () {
        $('#position-0')[0].style.backgroundColor = 'initial';
        $('#position0-code-display')[0].style.backgroundColor = '#0000ff8a';
        $('#position0-code-display')[0].style.color = 'white';
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
  }

  clickToInspectDocs(e) {

  }

  render() {
    return (
      <div className="code-editor-window" id={this.props.id}>
        <div className="window-body">
          {`$map.css({`}
          <br></br>
          &nbsp;&nbsp;
          <span className="tutorons-code-inspect">left
            <span class="tutorons-text">The left CSS property participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements.</span> 
            {/* will use the <meta name="description" content=""> content values for this to do it programmatically on https://developer.mozilla.org/en-US/docs/Web/CSS (AND/OR PLY) */}
          </span>: 
          <span className="var-value-code-inspect" id="position0-code-display" onClick={this.clickToInspectCode}>position[0]</span>,
          <br></br>
          &nbsp;&nbsp;
          <span className="tutorons-code-inspect">top</span>:
          <span className="var-value-code-inspect" id="position1-code-display" onClick={this.clickToInspectCode}>position[1]</span>,
          <br></br>
          {`})`}
        </div>
      </div>
    )
  }
}
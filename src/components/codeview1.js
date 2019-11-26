import React from 'react';
import $ from 'jquery';
import './styles/codeview.css';
window.$ = $;

export default class Codeview1 extends React.Component {
  inputVal(elem, str) {
    elem.value = 'hi';
    if ($('#position-0')[0] !== undefined) {
      let positionVals = $('#position-0')[0].innerText.match(/\[(.*?) \]/);
      let position0 = positionVals
      let position1 = positionVals
      if (str === 'position[0]') return position0;
      if (str === 'position[1]') return position1;
    }
  }

  render() {
    return (
      <div className="code-editor-window" id={this.props.id}>
        <div className="window-body">
          {`$map.css({`}
          <br></br>
          &nbsp;&nbsp;
          <span className="tutorons-code-inspect">left</span>: 
          <span className="var-value-code-inspect">position[0]</span>,
          <br></br>
          &nbsp;&nbsp;
          <span className="tutorons-code-inspect">top</span>:
          <span className="var-value-code-inspect" onLoad={this.inputVal(this, 'position[1]')}>position[1]</span>,
          <br></br>
          {`})`}
        </div>
      </div>
    )
  }
}
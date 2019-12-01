import React from 'react';
import $ from 'jquery';
window.$ = $;

export default class Position17 extends React.Component {

  handleClick(e) {
    if (e.target.classList.contains('pos64')) {
      console.log("contains pos64")
    }
    if (e.target.classList.contains('scroll_delta')) {
      console.log("contains scrollDelta")
      $('#scroll_delta-1')[0].style.display = 'block';
    }

    if (e.target.classList.contains('drag')) {
      console.log("at line: ", e.target.innerText)
      // will want to swap to drag window here
    }
  }

  render() {
    return (
      <div className="nested" id={this.props.id}>
        <div className="window">
          <div className="window-body">
            <div className="code-input">
              <div className="line-wrap">
                <span className="line-num drag" value="65" contentEditable="false" onClick={this.handleClick}>SEE DRAG - 65</span>
                <div className="line-code-wrap">
                  <div className="original-code">position[0] = Math.round(<span className="inspect-code pos64" onClick={this.handleClick}>pos</span>.pageY + <span className="inspect-code scroll_delta" onClick={this.handleClick}>scroll_delta</span>[0])</div>
                  <div className="modified-code" id="modified-position0-code-1" contenteditable="true"></div>
                </div>
              </div>
              <div className="line-wrap">
                <span className="line-num drag" contentEditable="false">SEE DRAG - 66</span>
                <div className="line-code-wrap">
                  <div className="original-code" id="original-position1-code" contentEditable="true">position[1] = Math.round(<span className="inspect-code pos64">pos</span>.pageY + <span className="inspect-code scroll_delta">scroll_delta</span>[1])</div>
                  <div className="modified-code" id="modified-position1-code-1" contentEditable="true"></div>
                </div>
              </div>
            </div>
            <pre className="code-output">
              <code className="language-javascript">
              </code>
            </pre>
          </div>
        </div>
      </div>
    )
  }
}
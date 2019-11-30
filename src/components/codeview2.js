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
          {`for (var y = -1; y <= +1; y++) {`}
          <br></br>
          &nbsp;&nbsp;
          {`for (var x = -1; x <= +1; x++) {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          ...
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span className="var-value-code-inspect" id="image-code-display" onClick={this.clickToInspectCode}>$image</span>{` = $('<img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" style="display:none" />');`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span className="var-value-code-inspect" id="image-code-display" onClick={this.clickToInspectCode}>$image</span>{`.load(function () {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`$(this).show()`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`}).error(function () {`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`$(this).remove();`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          {`});`}
          <br></br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <span className="var-value-code-inspect" id="map-code-display" onClick={this.clickToInspectCode}>$map</span>{`.append(`}<span className="var-value-code-inspect" id="image-code-display" onClick={this.clickToInspectCode}>$image</span>{`);`}
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
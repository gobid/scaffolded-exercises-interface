import React from 'react';
import './App.css';
import Position17 from './components/position17';
import $ from 'jquery';
window.$ = $;

export default class App extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      // track state
    }
    // bind functions
  }
  */

  componentDidMount() {
    function eventPos(e) {
      if (e.type.match(/^touch/)) {
        e = e.originalEvent.changedTouches[0];
      }
      return {
        pageX: e.pageX,
        pageY: e.pageY
      };
    }

    var Map = function ($map) {
      var $servImg = $('#server-images');
      var size = [14, 48, 25, 33];
      var tilesize = 2048;
      var scroll_delta = null;
      var serverImages = [[], [], [], [], [], [], [], [], []];

      $map.css({
        position: 'absolute'
      });

      var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];
      $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
      $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
      var centre = [-1, 0];

      var update = function () {
        $('#position-0')[0].innerHTML = `<b>position</b> = [${position}]`; // CONSOLE HELP
        $map.css({
          left: position[0],
          top: position[1]
        });

        var centre_last = centre;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        const tile_name = function (x, y) {
          x -= size[3];
          y -= size[0];

          return (y >= 0 ? (y + 1) + 's' : -y + 'n') + (x >= 0 ? (x + 1) + 'e' : -x + 'w');
        };

        if (centre[0] !== centre_last[0] || centre[1] !== centre_last[1]) {

          var $remove = $map.children();
          var $removeServerImgs = $servImg.children();

          let allNames = [];
          let ctr = 0;
          for (var y = -1; y <= +1; y++) {
            for (var x = -1; x <= +1; x++) {
              var name = tile_name(centre[0] + x, centre[1] + y);
              allNames.push(name);
              var tile = $map.find('.tile' + name);
              if (tile.length) {
                $remove = $remove.not(tile);
              } 
              else {
                let $image;
                $image = $('<img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" style="display:none" />');

                $image.on('load', function () {
                  $(this).show()
                })
                $image.on('error', function () {
                  $(this).remove();
                })
                $map.append($image);
              }
              serverImages[ctr].push(name);

              // create new elem to be added to area showing "loaded" items
              var serverImageElem = '<img alt="img not found"class="server-img-tile server-' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" />'

              var serverImgWithName = '<div class="serv-img-container"><span class="var-name">var name: $image</span>' + serverImageElem + '</div>';

              // append it to the container
              $servImg.append(serverImgWithName);

              ctr++
            }
            $remove.remove();
            $removeServerImgs.remove();
          }
        }
      }

      update();

      function drag(e) {
        if (scroll_delta) {
          var pos = eventPos(e);
          position[0] = Math.round(pos.pageX + scroll_delta[0])
          position[1] = Math.round(pos.pageY + scroll_delta[1])
          $('#modified-position0-code-1')[0].innerHTML = `position[0] = Math.round(${pos.pageX} + ${scroll_delta[0]})`
          $('#modified-position1-code-1')[0].innerHTML = `position[1] = Math.round(${pos.pageY} + ${scroll_delta[1]})`
          update();
        }
      }

      $(".map")
        .on('mousedown touchstart', function (e) {
          var pos = eventPos(e);
          scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
          $(document).on(e.type === 'mousedown' ? 'mousemove' : 'touchmove', drag);
          e.preventDefault();
        });
      $(document)
        .on('mouseup touchend', function (e) {
          $(document).off('mousemove touchmove', drag)
          scroll_delta = null;
          $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
          $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
        });
    };

    $(function () {
      var map = new Map($('.map'));
    });

    /* opens/closes the information pane */
    $('#toggle-console').click(() => {
      let consoleDisplay = $('#change-demos-wrapper')[0].style.display;
      if (consoleDisplay === "flex") {
        consoleDisplay = "none" 
        $('#toggle-console')[0].innerText = 'Show information'
      } else {
        consoleDisplay = "flex";
        $('#toggle-console')[0].innerText = 'Hide information';
      }
      $('#change-demos-wrapper')[0].style.display = consoleDisplay;
    })

    /* opens/closes the "more info" modals that extend off the main console. NOTE: need to connect the chevrons and the open modals more intuitively / automatically */
    $('#position-nested-lvl-1-chevron').click(() => {
      let modalDisplay = $('#position-1')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#position-1')[0].style.display = modalDisplay;
    })
  }

  render() {
    return (
      <div className="App">
        <button id="toggle-console">Hide information</button>
        <div id="change-demos-wrapper">
          <div>
            <div>var name: $map</div> {/* will add span highlighting for var inspection in next steps */}
            <div id="server-images"></div>
          </div>
          <div id="change-console">
            {/* Step 1 */}
            <div className="value-def">
              <p id="position-0"></p>
              <p className="more-chevron" id="position-nested-lvl-1-chevron">></p>
              <Position17 id="position-1" />
            </div>
          </div>
        </div> {/* closes div that wraps the entire information pane */}
        <div className="map"></div>
      </div>
    )
  }
}
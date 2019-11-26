import React from 'react';
import './App.css';
import $ from 'jquery';
window.$ = $;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // track state
    }
    // bind functions
  }

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
        markFxnActive($('#update-btn'));
        $('#position-0')[0].innerHTML = `<b>position</b> = [${position}]`; // CONSOLE HELP
        $map.css({
          left: position[0],
          top: position[1]
        });

        var centre_last = centre;
        $('#centre_last')[0].innerHTML = `<b>centre_last</b> = ${centre_last}`;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        $('#centre-modified-code')[0].innerHTML = (
          `centre = [Math.floor(${position[0]} / ${tilesize}), Math.floor(${position[1]} / ${tilesize})]`
        )

        $('#jq-map')[0].innerHTML = `<b>$map</b> = div class="map" ... div`
        $('#centre')[0].innerHTML = `<b>centre</b> = [${centre}]`;

        const tile_name = function (x, y) {
          x -= size[3];
          y -= size[0];

          return (y >= 0 ? (y + 1) + 's' : -y + 'n') + (x >= 0 ? (x + 1) + 'e' : -x + 'w');
        };

        $('#tile_name')[0].innerHTML = `<b>tile_name</b> = function(x, y) { ... }`;

        $('#y')[0].innerHTML = `<b>y</b> = null ??`;
        $('#x')[0].innerHTML = `<b>x</b> = null ??`;
        if (centre[0] !== centre_last[0] || centre[1] !== centre_last[1]) {

          var $remove = $map.children();
          var $removeServerImgs = $servImg.children();

          let allNames = [];
          let ctr = 0;
          for (var y = -1; y <= +1; y++) {
            $('#y')[0].innerHTML = `<b>y</b> = ${y} ??`;
            for (var x = -1; x <= +1; x++) {
              $('#x')[0].innerHTML = `<b>x</b> = ${x} ??`;
              var name = tile_name(centre[0] + x, centre[1] + y);
              allNames.push(name);
              $('#name')[0].innerHTML = `<b>name</b> = ${allNames}` // CONSOLE HELP
              var tile = $map.find('.tile' + name);
              // var serverTile = $servImg.find('.server-' + name);
              if (tile.length) {
                $remove = $remove.not(tile);
                if (showRemoveInfo) {
                  console.group(`value of $remove in if (tile.length):`)
                  console.dir($remove)
                  console.groupEnd(`value of $remove in if (tile.length):`);
                } // CONSOLE HELP
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

              // create lil div display of image
              // var completeServerImgExample = '<div class="serv-img-container">' + '<span id="coords" style="z-index: 2;">name: ' + name + '<br>top: ' + ((centre[1] + y) * tilesize) + '<br> left: ' + ((centre[0] + x) * tilesize) + '</span>' + serverImageElem + '</div>';

              /*
  <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
  </div>
  */

              let prevVals = `<div class="prevValsDropdown"><button class="dropdownBtn">previous >></button><div class="dropdownContent">`
              let modImages = serverImages[ctr].slice(0, serverImages[ctr].length - 1);
              modImages.forEach((imgName) => {
                prevVals += `<a href="#" class="prevVal">${imgName}</a>`
              })

              prevVals += '</div></div>'

              var serverImgWithName = '<div class="serv-img-container">' + '<span class="coords">classname: tile' + name + prevVals + '</span>' + serverImageElem + '</div>';

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
      markFxnInactive($('#update-btn'))

      function drag(e) {
        markFxnActive($('#drag-btn'));
        markFxnActive($('#mousemove-btn'));
        if (scroll_delta) {
          var pos = eventPos(e);
          position[0] = Math.round(pos.pageX + scroll_delta[0])
          position[1] = Math.round(pos.pageY + scroll_delta[1])
          markFxnActive($('#active-fxn-tag'));
          const selectedFxn = $('.active')[0].name;
          $('#active-fxn-tag')[0].innerHTML = `${selectedFxn}: ACTIVE`;
          $('#modified-position0-code-1')[0].innerHTML = `position[0] = Math.round(${pos.pageX} + ${scroll_delta[0]})`
          $('#modified-position1-code-1')[0].innerHTML = `position[1] = Math.round(${pos.pageY} + ${scroll_delta[1]})`
          update();
        }
      }

      $(".map")
        .on('mousedown touchstart', function (e) {
          markFxnActive($('#mousedown-btn'));
          e.originalEvent.customAttrib = function () {
            console.log("custom attrib");
          }
          var pos = eventPos(e);
          scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
          $('#scroll_delta')[0].innerHTML = (`<b>scroll_delta</b> = [${scroll_delta}]`)
          $('#scroll_delta-line-num')[0].innerHTML = (
            `SEE MOUSEDOWN - 74`
          )
          $('#scroll_delta-original-code')[0].innerHTML = (
            `scroll_delta = [<span class="inspect-code position17" onClick={this.handleClick}>position</span>[0] - <span class="inspect-code pos73" onClick={this.handleClick}>pos</span>.pageX, <span class="inspect-code position17" onClick={this.handleClick}>position</span>[1] - <span class="inspect-code pos73" onClick={this.handleClick}>pos</span>.pageY]`
          )
          $('#scroll_delta-modified-code')[0].innerHTML = (
            `scroll_delta = [${position[0]} - ${pos.pageX}, ${position[1]} - ${pos.pageY}]`
          )
          $(document).on(e.type === 'mousedown' ? 'mousemove' : 'touchmove', drag);

          $('#scroll_delta-non-null').on('click', () => {
            // nothing
          })

          e.preventDefault();
        });
      $(document)
        .on('mouseup touchend', function (e) {
          $(document).off('mousemove touchmove', drag)
          scroll_delta = null;
          $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
          $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
          markFxnInactive($('#active-fxn-tag'));
          const selectedFxn = $('.active')[0].name;
          $('#active-fxn-tag')[0].innerHTML = `${selectedFxn}: NOT ACTIVE`;
          markFxnInactive($('#drag-btn'));
          markFxnInactive($('#update-btn'));
          markFxnInactive($('#mousedown-btn'));
          markFxnInactive($('#mousemove-btn'));
          $('#scroll_delta')[0].innerHTML = ("<b>scroll_delta</b> = " + scroll_delta)
          $('#scroll_delta-original-code')[0].innerHTML = (
            `scroll_delta = null`
          )
          $('#scroll_delta-line-num')[0].innerHTML = (
            `SEE MOUSEUP - 82`
          )
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

    /* shows the elements in $remove var in update */
    let showRemoveInfo = false;
    $('#removebtn').click(() => {
      (showRemoveInfo === true) ? showRemoveInfo = false : showRemoveInfo = true;
      if (showRemoveInfo) {
        console.group(`value of $remove:`)
        // console.dir($('.map').children())
        console.groupEnd(`value of $remove:`);
      }
    })

    /* opens/closes the "more info" modals that extend off the main console. NOTE: need to connect the chevrons and the open modals more intuitively / automatically */
    $('#position-nested-lvl-1-chevron').click(() => {
      let modalDisplay = $('#position-1')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#position-1')[0].style.display = modalDisplay;
    })

    $('#centre-nested-lvl-1-chevron').click(() => {
      let modalDisplay = $('#centre-1')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#centre-1')[0].style.display = modalDisplay;
    })

    $('#scroll_delta-nested-lvl-1-chevron').click(() => {
      let modalDisplay = $('#scroll_delta-1')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#scroll_delta-1')[0].style.display = modalDisplay;
    })

    $('#scroll_delta-chevron-mousedown').click(() => {
      let modalDisplay = $('#scroll_delta-2')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#scroll_delta-2')[0].style.display = modalDisplay;
    })

    const markFxnActive = ((selector) => {
      selector[0].style.backgroundColor = '#28ce28'; // green
      if (selector[0].classList.contains('active') ||
        selector[0].id === 'active-fxn-tag') {
        selector[0].style.color = 'black';
        selector[0].style.border = '2px solid cornflowerblue';
      };
    })

    const markFxnInactive = ((selector) => {
      if (selector[0].classList.contains('active') ||
        selector[0].id === 'active-fxn-tag') {
        selector[0].style.backgroundColor = 'cornflowerblue';
        selector[0].style.border = '1px solid white';
      } else {
        selector[0].style.backgroundColor = '#f1f1f1';
      }
    })
  }

  // unused, but would like to call this in the handle clicks instead of reusing the same code eek
  removeStyles() {
    let dragBtn = $('#drag-btn')[0];
    let updateBtn = $('#update-btn')[0];
    let mousedownBtn = $('#mousedown-btn')[0];
    let mousemoveBtn = $('#mousemove-btn')[0];

    let dragPane = $('#drag-fxn-pane')[0];
    let updatePane = $('#update-fxn-pane')[0];
    let mousedownPane = $('#mousedown-fxn-pane')[0];
    let mousemovePane = $('#mousemove-fxn-pane')[0];

    const allPanes = [dragPane, updatePane, mousedownPane, mousemovePane];

    allPanes.forEach((pane) => {
      pane.style.display = 'none';
    })

    const allBtns = [dragBtn, updateBtn, mousedownBtn, mousemoveBtn];

    allBtns.forEach((btn) => {
      btn.classList.remove('active')
    });
  }

  handleUpdateBtnClick() {
    let dragBtn = $('#drag-btn')[0];
    let updateBtn = $('#update-btn')[0];
    let mousedownBtn = $('#mousedown-btn')[0];
    let mousemoveBtn = $('#mousemove-btn')[0];

    let dragPane = $('#drag-fxn-pane')[0];
    let updatePane = $('#update-fxn-pane')[0];
    let mousedownPane = $('#mousedown-fxn-pane')[0];
    let mousemovePane = $('#mousemove-fxn-pane')[0];

    const allPanes = [dragPane, updatePane, mousedownPane, mousemovePane];

    allPanes.forEach((pane) => {
      pane.style.display = 'none';
    })

    const allBtns = [dragBtn, updateBtn, mousedownBtn, mousemoveBtn];

    allBtns.forEach((btn) => {
      btn.classList.remove('active')
    });

    updateBtn.classList.add('active');
    updatePane.style.display = 'block';
  }


  handleMousedownBtnClick() {
    let dragBtn = $('#drag-btn')[0];
    let updateBtn = $('#update-btn')[0];
    let mousedownBtn = $('#mousedown-btn')[0];
    let mousemoveBtn = $('#mousemove-btn')[0];

    let dragPane = $('#drag-fxn-pane')[0];
    let updatePane = $('#update-fxn-pane')[0];
    let mousedownPane = $('#mousedown-fxn-pane')[0];
    let mousemovePane = $('#mousemove-fxn-pane')[0];

    const allPanes = [dragPane, updatePane, mousedownPane, mousemovePane];

    allPanes.forEach((pane) => {
      pane.style.display = 'none';
    })

    const allBtns = [dragBtn, updateBtn, mousedownBtn, mousemoveBtn];

    allBtns.forEach((btn) => {
      btn.classList.remove('active')
    });

    mousedownBtn.classList.add('active');
    mousedownPane.style.display = 'block';
  }

  handleMousemoveBtnClick() {
    let dragBtn = $('#drag-btn')[0];
    let updateBtn = $('#update-btn')[0];
    let mousedownBtn = $('#mousedown-btn')[0];
    let mousemoveBtn = $('#mousemove-btn')[0];

    let dragPane = $('#drag-fxn-pane')[0];
    let updatePane = $('#update-fxn-pane')[0];
    let mousedownPane = $('#mousedown-fxn-pane')[0];
    let mousemovePane = $('#mousemove-fxn-pane')[0];

    const allPanes = [dragPane, updatePane, mousedownPane, mousemovePane];

    allPanes.forEach((pane) => {
      pane.style.display = 'none';
    })

    const allBtns = [dragBtn, updateBtn, mousedownBtn, mousemoveBtn];

    allBtns.forEach((btn) => {
      btn.classList.remove('active')
    });

    mousemoveBtn.classList.add('active');
    mousemovePane.style.display = 'block';
  }

  handleDragBtnClick() {
    let dragBtn = $('#drag-btn')[0];
    let updateBtn = $('#update-btn')[0];
    let mousedownBtn = $('#mousedown-btn')[0];
    let mousemoveBtn = $('#mousemove-btn')[0];

    let dragPane = $('#drag-fxn-pane')[0];
    let updatePane = $('#update-fxn-pane')[0];
    let mousedownPane = $('#mousedown-fxn-pane')[0];
    let mousemovePane = $('#mousemove-fxn-pane')[0];

    const allPanes = [dragPane, updatePane, mousedownPane, mousemovePane];

    allPanes.forEach((pane) => {
      pane.style.display = 'none';
    })

    const allBtns = [dragBtn, updateBtn, mousedownBtn, mousemoveBtn];

    allBtns.forEach((btn) => {
      btn.classList.remove('active')
    });

    dragBtn.classList.add('active');
    dragPane.style.display = 'block';
  }

  render() {
    return (
      <div className="App">
        <button id="toggle-console">Hide information</button>
        <div id="change-demos-wrapper">
          <ul class="all-learning-steps">
            <li class="learning-step active">step 1 - intuitions</li>
            <li class="learning-step">step 2 - steps</li>
            <li class="learning-step">step 3 - conditions</li>
            <li class="learning-step">step 4 - calculations</li>
            <li class="learning-step">step 5 - connections</li>
          </ul>
          <div id="server-images"></div>
          <div id="change-console">
            {/* Step 1 */}
            <div className="value-def">
              <p id="position-0"></p>
              <p className="more-chevron" id="position-nested-lvl-1-chevron">></p>
              <Position17 id="position-1" />
            </div>
          </div>

        </div> {/* closes div that wraps the entire information pane */}

      </div>
    )
  }
}
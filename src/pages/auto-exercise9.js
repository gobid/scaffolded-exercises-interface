import React from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

function addNewlines(str) {
    var result = '';
    while (str.length > 0) {
        result += str.substring(0, 40) + '\n';
        str = str.substring(40);
    }
    return result;
}

export default class ExerciseAG9 extends React.Component {

    componentDidMount() {
        function eventPos(e) {
    if (e.type.match(/^touch/)) {
        e = e.originalEvent.changedTouches[0];

            console.log('e', e);
            if (JSON.stringify(`${e}`).includes("object") && e[0]) {
                $('#e')[0].innerHTML = `<plaintext class="pt">${addNewlines(e[0].outerHTML)}`
            }
            else {
                if (e && e.selector) {
                    $('#e')[0].innerHTML = `${e.selector}`
                }
                else if (e && e.originalEvent) {
                    $('#e')[0].innerHTML = `${e.type}`
                }
                else if (typeof(e) == 'object') {
                    try {
                        $('#e')[0].innerHTML = JSON.stringify(e)
                    }
                    catch {
                        $('#e')[0].innerHTML = `${e}`
                    }
                }
                else {
                    $('#e')[0].innerHTML = `${e}`
                }
            }
        
    }
    return {
        pageX: e.pageX,
        pageY: e.pageY
    };
} // here is a comment

var Map = function ($container) {
    $container.css({
        "z-index": 1,
        overflow: "hidden",
        width: "740px",
        height: "694px",
        margin: "0px auto 0",
        background: "#fff",
        position: "relative"
    }); /** another comment */

    var $overlay = $container.children("img");
    $overlay.css({
        background: "transparent",
        position: "relative"
    });

    var sign = function (x) {
        return x > 0 ? +1 : x < 0 ? -1 : 0;
    };
    var pow = function (x, y) {
        return Math.pow(Math.abs(x), y) * sign(x);
    };
    var clamp = function (x, min, max) {
        return Math.max(Math.min(x, max), min);
    };

    var offset = $container.offset();

    var padding_top = 200;
    var size = [14, 48, 25, 33];
    var tilesize = 2048;

            console.log('tilesize', tilesize);
            if (JSON.stringify(`${tilesize}`).includes("object") && tilesize[0]) {
                $('#tilesize')[0].innerHTML = `<plaintext class="pt">${addNewlines(tilesize[0].outerHTML)}`
            }
            else {
                if (tilesize && tilesize.selector) {
                    $('#tilesize')[0].innerHTML = `${tilesize.selector}`
                }
                else if (tilesize && tilesize.originalEvent) {
                    $('#tilesize')[0].innerHTML = `${tilesize.type}`
                }
                else if (typeof(tilesize) == 'object') {
                    try {
                        $('#tilesize')[0].innerHTML = JSON.stringify(tilesize)
                    }
                    catch {
                        $('#tilesize')[0].innerHTML = `${tilesize}`
                    }
                }
                else {
                    $('#tilesize')[0].innerHTML = `${tilesize}`
                }
            }
        
    var visible = [];
    var container_size = [$container.width(), $container.height()];

            console.log('container_size', container_size);
            if (JSON.stringify(`${container_size}`).includes("object") && container_size[0]) {
                $('#container_size')[0].innerHTML = `<plaintext class="pt">${addNewlines(container_size[0].outerHTML)}`
            }
            else {
                if (container_size && container_size.selector) {
                    $('#container_size')[0].innerHTML = `${container_size.selector}`
                }
                else if (container_size && container_size.originalEvent) {
                    $('#container_size')[0].innerHTML = `${container_size.type}`
                }
                else if (typeof(container_size) == 'object') {
                    try {
                        $('#container_size')[0].innerHTML = JSON.stringify(container_size)
                    }
                    catch {
                        $('#container_size')[0].innerHTML = `${container_size}`
                    }
                }
                else {
                    $('#container_size')[0].innerHTML = `${container_size}`
                }
            }
        
    var scroll_delta = null;

            console.log('scroll_delta', scroll_delta);
            if (JSON.stringify(`${scroll_delta}`).includes("object") && scroll_delta[0]) {
                $('#scroll_delta')[0].innerHTML = `<plaintext class="pt">${addNewlines(scroll_delta[0].outerHTML)}`
            }
            else {
                if (scroll_delta && scroll_delta.selector) {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta.selector}`
                }
                else if (scroll_delta && scroll_delta.originalEvent) {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta.type}`
                }
                else if (typeof(scroll_delta) == 'object') {
                    try {
                        $('#scroll_delta')[0].innerHTML = JSON.stringify(scroll_delta)
                    }
                    catch {
                        $('#scroll_delta')[0].innerHTML = `${scroll_delta}`
                    }
                }
                else {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta}`
                }
            }
        

    var $map = $container.children(".map");

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });

    var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];


            console.log('position', position);
            if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                $('#position')[0].innerHTML = `<plaintext class="pt">${addNewlines(position[0].outerHTML)}`
            }
            else {
                if (position && position.selector) {
                    $('#position')[0].innerHTML = `${position.selector}`
                }
                else if (position && position.originalEvent) {
                    $('#position')[0].innerHTML = `${position.type}`
                }
                else if (typeof(position) == 'object') {
                    try {
                        $('#position')[0].innerHTML = JSON.stringify(position)
                    }
                    catch {
                        $('#position')[0].innerHTML = `${position}`
                    }
                }
                else {
                    $('#position')[0].innerHTML = `${position}`
                }
            }
        
    $map.find(".ground").css({
        top: size[0] * tilesize,
        height: size[2] * tilesize,
        position: "absolute",
        width: "100%",
        zIndex: -1,
        background: "#000"
    });

    var centre = [-1, 0];

    var update = function () {
        $map.css({
            left: position[0],
            top: position[1]
        });

        var centre_last = centre;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        var tile_name = function (x, y) {
            x -= size[3];
            y -= size[0];
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");

try { $('#name')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); } try { $('#tile')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); } try { $('#dremove')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); } try { $('#dimage')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); } 
            for (var y = -1; y <= +1; y++) {
                for (var x = -1; x <= +1; x++) {
                    var name = tile_name(centre[0] + x, centre[1] + y);
                    var tile = $map.find(".tile" + name);
                    if (tile.length) {
                        $remove = $remove.not(tile);
                    } else {
                        var $image = $(
                            '<img class="tile' +
                                name +
                                '" src="http://imgs.xkcd.com/clickdrag/' +
                                name +
                                '.png" style="top:' +
                                (centre[1] + y) * tilesize +
                                "px;left:" +
                                (centre[0] + x) * tilesize +
                                'px; z-index: -1; position: absolute;;" style="display:none" />'
                        );
                        $image
                            .load(function () {
                                $(this).show();
                            })
                            .error(function () {
                                $(this).remove();
                            });
                        $map.append($image);
                    }
                }
            }

            $remove.remove();
        }
    };

    update();

    function drag(e) {
        if (scroll_delta) {
            var pos = eventPos(e);

            console.log('pos', pos);
            if (JSON.stringify(`${pos}`).includes("object") && pos[0]) {
                $('#pos')[0].innerHTML = `<plaintext class="pt">${addNewlines(pos[0].outerHTML)}`
            }
            else {
                if (pos && pos.selector) {
                    $('#pos')[0].innerHTML = `${pos.selector}`
                }
                else if (pos && pos.originalEvent) {
                    $('#pos')[0].innerHTML = `${pos.type}`
                }
                else if (typeof(pos) == 'object') {
                    try {
                        $('#pos')[0].innerHTML = JSON.stringify(pos)
                    }
                    catch {
                        $('#pos')[0].innerHTML = `${pos}`
                    }
                }
                else {
                    $('#pos')[0].innerHTML = `${pos}`
                }
            }
        
            position[0] = Math.round(
                clamp(pos.pageX + scroll_delta[0], -(size[1] + size[3]) * tilesize + container_size[0], 0)
            );

            console.log('position', position);
            if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                $('#position')[0].innerHTML = `<plaintext class="pt">${addNewlines(position[0].outerHTML)}`
            }
            else {
                if (position && position.selector) {
                    $('#position')[0].innerHTML = `${position.selector}`
                }
                else if (position && position.originalEvent) {
                    $('#position')[0].innerHTML = `${position.type}`
                }
                else if (typeof(position) == 'object') {
                    try {
                        $('#position')[0].innerHTML = JSON.stringify(position)
                    }
                    catch {
                        $('#position')[0].innerHTML = `${position}`
                    }
                }
                else {
                    $('#position')[0].innerHTML = `${position}`
                }
            }
        
            position[1] = Math.round(
                clamp(pos.pageY + scroll_delta[1], -(size[0] + size[2]) * tilesize + container_size[1], 0)
            );

            console.log('position', position);
            if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                $('#position')[0].innerHTML = `<plaintext class="pt">${addNewlines(position[0].outerHTML)}`
            }
            else {
                if (position && position.selector) {
                    $('#position')[0].innerHTML = `${position.selector}`
                }
                else if (position && position.originalEvent) {
                    $('#position')[0].innerHTML = `${position.type}`
                }
                else if (typeof(position) == 'object') {
                    try {
                        $('#position')[0].innerHTML = JSON.stringify(position)
                    }
                    catch {
                        $('#position')[0].innerHTML = `${position}`
                    }
                }
                else {
                    $('#position')[0].innerHTML = `${position}`
                }
            }
        
            update();
        }
    }

    $container.on("mousedown touchstart", function (e) {
        if (e.button && e.button >= 2) {
            return;
        }
        var pos = eventPos(e);

            console.log('pos', pos);
            if (JSON.stringify(`${pos}`).includes("object") && pos[0]) {
                $('#pos')[0].innerHTML = `<plaintext class="pt">${addNewlines(pos[0].outerHTML)}`
            }
            else {
                if (pos && pos.selector) {
                    $('#pos')[0].innerHTML = `${pos.selector}`
                }
                else if (pos && pos.originalEvent) {
                    $('#pos')[0].innerHTML = `${pos.type}`
                }
                else if (typeof(pos) == 'object') {
                    try {
                        $('#pos')[0].innerHTML = JSON.stringify(pos)
                    }
                    catch {
                        $('#pos')[0].innerHTML = `${pos}`
                    }
                }
                else {
                    $('#pos')[0].innerHTML = `${pos}`
                }
            }
        
        scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];

            console.log('scroll_delta', scroll_delta);
            if (JSON.stringify(`${scroll_delta}`).includes("object") && scroll_delta[0]) {
                $('#scroll_delta')[0].innerHTML = `<plaintext class="pt">${addNewlines(scroll_delta[0].outerHTML)}`
            }
            else {
                if (scroll_delta && scroll_delta.selector) {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta.selector}`
                }
                else if (scroll_delta && scroll_delta.originalEvent) {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta.type}`
                }
                else if (typeof(scroll_delta) == 'object') {
                    try {
                        $('#scroll_delta')[0].innerHTML = JSON.stringify(scroll_delta)
                    }
                    catch {
                        $('#scroll_delta')[0].innerHTML = `${scroll_delta}`
                    }
                }
                else {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta}`
                }
            }
        
        $(document).on(e.type == "mousedown" ? "mousemove" : "touchmove", drag);
        e.preventDefault();

            console.log('e', e);
            if (JSON.stringify(`${e}`).includes("object") && e[0]) {
                $('#e')[0].innerHTML = `<plaintext class="pt">${addNewlines(e[0].outerHTML)}`
            }
            else {
                if (e && e.selector) {
                    $('#e')[0].innerHTML = `${e.selector}`
                }
                else if (e && e.originalEvent) {
                    $('#e')[0].innerHTML = `${e.type}`
                }
                else if (typeof(e) == 'object') {
                    try {
                        $('#e')[0].innerHTML = JSON.stringify(e)
                    }
                    catch {
                        $('#e')[0].innerHTML = `${e}`
                    }
                }
                else {
                    $('#e')[0].innerHTML = `${e}`
                }
            }
        
    });
    $(document).on("mouseup touchend", function (e) {
        $(document).off("mousemove touchmove", drag);
        scroll_delta = null;

            console.log('scroll_delta', scroll_delta);
            if (JSON.stringify(`${scroll_delta}`).includes("object") && scroll_delta[0]) {
                $('#scroll_delta')[0].innerHTML = `<plaintext class="pt">${addNewlines(scroll_delta[0].outerHTML)}`
            }
            else {
                if (scroll_delta && scroll_delta.selector) {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta.selector}`
                }
                else if (scroll_delta && scroll_delta.originalEvent) {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta.type}`
                }
                else if (typeof(scroll_delta) == 'object') {
                    try {
                        $('#scroll_delta')[0].innerHTML = JSON.stringify(scroll_delta)
                    }
                    catch {
                        $('#scroll_delta')[0].innerHTML = `${scroll_delta}`
                    }
                }
                else {
                    $('#scroll_delta')[0].innerHTML = `${scroll_delta}`
                }
            }
        
    });
};

/* 50:72:6f:50:75:6b:65:20:69:73:20:61:77:65:73:6f:6d:65 */

$(function () {
    var map = new Map($("#comic"));
});

    }

    render() {
        return (
            <div className="App">
                <div id="app-title">Scaffolded Exercises</div>
                <br/><br/><br/>
                DOM
                <div id="comic"><div className="map"><div className="ground"></div></div></div>
                <br/>
                <div className="exercises">
                    Variables:
                    <br/><br/>
                    <p id='e_p'>e = <span id='e'> </span> </p>
<p id='scroll_delta_p'>scroll_delta = <span id='scroll_delta'> </span> </p>
<p id='pos_p'>pos = <span id='pos'> </span> </p>
<p id='position_p'>position = <span id='position'> </span> </p>
<p id='tilesize_p'>tilesize = <span id='tilesize'> </span> </p>
<p id='container_size_p'>container_size = <span id='container_size'> </span> </p>

                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is happening in the code?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is the relationship between the following variables: scroll_delta, position, container_size, tilesize, pos, e?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                    </div>
                </div>
                <a href='/exercise-auto10'>Next Exercise</a>
            </div>
        )
    }
}
    
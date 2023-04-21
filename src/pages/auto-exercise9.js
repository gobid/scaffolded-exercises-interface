import React from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

export default class ExerciseAG9 extends React.Component {
    componentDidMount() {
        function eventPos(e) {
    if (e.type.match(/^touch/)) {
        e = e.originalEvent.changedTouches[0];
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
$('#size')[0].innerHTML = `size = ${size}`
    var tilesize = 2048;
$('#tilesize')[0].innerHTML = `tilesize = ${tilesize}`
    var visible = [];
    var container_size = [$container.width(), $container.height()];
    var scroll_delta = null;

    var $map = $container.children(".map");
$('#dmap')[0].innerHTML = `$map = ${$map}`

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });
$('#dmap')[0].innerHTML = `$map = ${$map}`

    var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];
$('#position')[0].innerHTML = `position = ${position}`

    $map.find(".ground").css({
        top: size[0] * tilesize,
        height: size[2] * tilesize,
        position: "absolute",
        width: "100%",
        zIndex: -1,
        background: "#000"
    });

    var centre = [-1, 0];
$('#centre')[0].innerHTML = `centre = ${centre}`

    var update = function () {
        $map.css({
            left: position[0],
            top: position[1]
        });
$('#dmap')[0].innerHTML = `$map = ${$map}`

        var centre_last = centre;
$('#centre_last')[0].innerHTML = `centre_last = ${centre_last}`
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];
$('#centre')[0].innerHTML = `centre = ${centre}`

        var tile_name = function (x, y) {
            x -= size[3];
$('#x')[0].innerHTML = `x = ${x}`
            y -= size[0];
$('#y')[0].innerHTML = `y = ${y}`
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");
$('#dremove')[0].innerHTML = `$remove = ${$remove}`

            for (var y = -1; y <= +1; y++) {
                for (var x = -1; x <= +1; x++) {
                    var name = tile_name(centre[0] + x, centre[1] + y);
$('#name')[0].innerHTML = `name = ${name}`
                    var tile = $map.find(".tile" + name);
$('#tile')[0].innerHTML = `tile = ${tile}`
                    if (tile.length) {
                        $remove = $remove.not(tile);
$('#dremove')[0].innerHTML = `$remove = ${$remove}`
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
$('#dimage')[0].innerHTML = `$image = ${$image}`
                        $image
                            .load(function () {
                                $(this).show();
                            })
                            .error(function () {
                                $(this).remove();
                            });
                        $map.append($image);
$('#dmap')[0].innerHTML = `$map = ${$map}`
                    }
                }
$('#x')[0].innerHTML = `x = ${x}`
            }
$('#y')[0].innerHTML = `y = ${y}`

            $remove.remove();
$('#dremove')[0].innerHTML = `$remove = ${$remove}`
        }
    };

    update();

    function drag(e) {
        if (scroll_delta) {
            var pos = eventPos(e);
            position[0] = Math.round(
                clamp(pos.pageX + scroll_delta[0], -(size[1] + size[3]) * tilesize + container_size[0], 0)
            );
$('#position')[0].innerHTML = `position = ${position}`
            position[1] = Math.round(
                clamp(pos.pageY + scroll_delta[1], -(size[0] + size[2]) * tilesize + container_size[1], 0)
            );
$('#position')[0].innerHTML = `position = ${position}`
            update();
        }
    }

    $container.on("mousedown touchstart", function (e) {
        if (e.button && e.button >= 2) {
            return;
        }
        var pos = eventPos(e);
        scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
        $(document).on(e.type == "mousedown" ? "mousemove" : "touchmove", drag);
        e.preventDefault();
    });
    $(document).on("mouseup touchend", function (e) {
        $(document).off("mousemove touchmove", drag);
        scroll_delta = null;
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
                <div id="comic"><div class="map"><div class="ground"></div></div></div>
                <br/>
                <div class="exercises">
                    Variables:
                    <br/><br/>
                    <p>$map = <span id='dmap'> </span> </p>
<p>position = <span id='position'> </span> </p>
<p>centre_last = <span id='centre_last'> </span> </p>
<p>centre = <span id='centre'> </span> </p>
<p>tilesize = <span id='tilesize'> </span> </p>
<p>x = <span id='x'> </span> </p>
<p>y = <span id='y'> </span> </p>
<p>size = <span id='size'> </span> </p>
<p>$remove = <span id='dremove'> </span> </p>
<p>name = <span id='name'> </span> </p>
<p>tile = <span id='tile'> </span> </p>
<p>$image = <span id='dimage'> </span> </p>

                </div>
            </div>
        )
    }
}
    
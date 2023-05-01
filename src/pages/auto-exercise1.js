import React from 'react';
import { useState } from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

const selectors = {};
const annotables = []; // keys are the specific annotations

function addNewlines(str, variable_name) {
    // this runs every time a DOM element is shown as a variable on the page, so we should update the selectors at this stage
    // we do it by classes for now
    let class_loc = str.indexOf('class="') + 'class="'.length;
    let end_class_loc = str.substring(class_loc).indexOf('"');
    let class_name = str.substring(class_loc, class_loc + end_class_loc);
    // console.log("in addNewLines class_name:", class_name);
    if (selectors[variable_name]) {
        if (!selectors[variable_name].includes(class_name)) {
            selectors[variable_name].push(class_name);
        }
    }
    else {
        selectors[variable_name] = [];
    }

    var result = '';
    while (str.length > 0) {
        result += str.substring(0, 80) + '\n';
        str = str.substring(80);
    }
    let dotdotdot = "...";
    if (result.length < 150) 
        dotdotdot = " ";
    return result.substring(0,150) + dotdotdot;
}

function h2t(src) { // html to text
    return src.replaceAll("<", "&lt;").replaceAll(">", "&gt;"); //.replace("&", " &amp; "); 
}

function HAButton(props) {
    const [toggle, setToggle] = useState(true);
    const annotations_to_show_by_tag = [ 'dimage', 'tile' ];
    
    function reAnnotate(){ // for reannotating when user behavior erases annotations
        console.log("in reAnnotate");
        let existing_annotations = document.getElementsByClassName("annotation");
        if (existing_annotations.length < 1) { // only reannotate if the annotations aren't already there
            for (var elem_to_annotate of annotables) {
                addAnnotation(elem_to_annotate);
            }
        }
    }
    
    function addAnnotation(element) {
        if (toggle) {
            let text_to_display = element.outerHTML; // .replaceAll("<", "&lt;").replaceAll(">", "&gt;") - not needed apparently
            var para = document.createElement("p");
            var variable_from_exercise = props.id.split("_")[0];
            if (variable_from_exercise.substring(0,1) == 'd') // assumes variable can't start with a d
                variable_from_exercise = "$" + variable_from_exercise.substring(1);
            var node = document.createTextNode(variable_from_exercise + " " + text_to_display);
            para.appendChild(node);
            para.style.top = element.style.top;
            para.style.left = element.style.left;
            para.style.margin = "20px";
            para.style.position = "absolute";
            para.classList.add("annotation");
            para.style.color = "gray";
            document.getElementsByClassName('map')[0].appendChild(para);
            annotables.push(element);
        }
        else {
            $(".annotation").remove();
        }
        // add element html at the corners of the html element
        // console.log("element", element);
    }

    function markBorder(element) {
        // console.log("markBorder", element);
        if (element) {
            if (toggle) {
                element.style.border = "5px solid black";
            }
            else {
                element.style.border = "0px solid black";
            }
        }
    }

    function annotateTag(tag) {
        let tag_elems = document.getElementsByTagName(tag);
        // console.log("tag_elems", tag_elems);
        for (var tag_elem of tag_elems) {
            markBorder(tag_elem);
            addAnnotation(tag_elem);
        }
    }

    function annotate(variable, element) {
        console.log("in annotate", variable, element, toggle);
        element = element[0];
        if (!element) return;
        if (annotations_to_show_by_tag.includes(variable)) {
            // console.log(variable, "in annotations_to_show_by_tag");
            let tag = element.tagName;
            console.log("tag", tag);
            annotateTag(tag);
            /*if (toggle) {
                $(document).on("mouseup keydown keyup", function(){
                    annotateTag(tag);
                });
            }
            else {
                $(document).off("mouseup keydown keyup", function(){
                    annotateTag(tag);
                });
            }*/
        }
        else {   
            markBorder(element);
            addAnnotation(element);
        }
    }
    
    function highlightInCode(element) {
    
    }

    function handleClick() {
        if (toggle)
            alert("Annotated! Play around and check.");
        console.log("in handleClick", toggle, props.id);
        let element_to_a_h = props.id.split("_")[0];
        // console.log("element_to_a_h", element_to_a_h);
        // console.log("selectors[", element_to_a_h, "]", selectors[element_to_a_h]);
        for (var selector of selectors[element_to_a_h]) {
            let element_to_a_h_html = document.getElementsByClassName(selector);
            // console.log("selector", selector, "element_to_a_h_html", element_to_a_h_html);
            annotate(element_to_a_h, element_to_a_h_html);
        }
        // the annotation should also be retained upon user actions (mousemove / mousedown / mouseup / keyboard)
        /*if (toggle) {
            $(document).on("mouseup keydown keyup", reAnnotate);
        }
        else {
            $(document).off("mouseup keydown keyup", reAnnotate);
        }*/
        setToggle(!toggle);
    }

    function buttonText(t) {
        if (t) return "Annotate / Highlight";
        else return "Unannotate / Unhighlight";
    }
    
    return (
      <button onClick={handleClick}>
          {buttonText(toggle)}
      </button>
    );
}

export default class ExerciseAG1 extends React.Component {

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
    var tilesize = 2048;
    var visible = [];
    var container_size = [$container.width(), $container.height()];
    var scroll_delta = null;

    var $map = $container.children(".map");

            // console.log('$map', $map);
            if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
            }
            else {
                if ($map && $map.selector) {
                    $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                }
                else if ($map && $map.originalEvent) {
                    $('#dmap')[0].innerHTML = `${$map.type}`;
                }
                else if (typeof($map) == 'object') {
                    try {
                        $('#dmap')[0].innerHTML = JSON.stringify($map);
                    }
                    catch {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
                else {
                    $('#dmap')[0].innerHTML = `${$map}`;
                }
            }
        

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });

            // console.log('$map', $map);
            if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
            }
            else {
                if ($map && $map.selector) {
                    $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                }
                else if ($map && $map.originalEvent) {
                    $('#dmap')[0].innerHTML = `${$map.type}`;
                }
                else if (typeof($map) == 'object') {
                    try {
                        $('#dmap')[0].innerHTML = JSON.stringify($map);
                    }
                    catch {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
                else {
                    $('#dmap')[0].innerHTML = `${$map}`;
                }
            }
        

    var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];

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

            // console.log('$map', $map);
            if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
            }
            else {
                if ($map && $map.selector) {
                    $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                }
                else if ($map && $map.originalEvent) {
                    $('#dmap')[0].innerHTML = `${$map.type}`;
                }
                else if (typeof($map) == 'object') {
                    try {
                        $('#dmap')[0].innerHTML = JSON.stringify($map);
                    }
                    catch {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
                else {
                    $('#dmap')[0].innerHTML = `${$map}`;
                }
            }
        

        var centre_last = centre;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        var tile_name = function (x, y) {
            x -= size[3];
            y -= size[0];
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");


            // console.log('$remove', $remove);
            if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                $('#dremove')[0].innerHTML = `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
            }
            else {
                if ($remove && $remove.selector) {
                    $('#dremove')[0].innerHTML = `${$remove.selector} (we output the selector when length is 0)`;
                }
                else if ($remove && $remove.originalEvent) {
                    $('#dremove')[0].innerHTML = `${$remove.type}`;
                }
                else if (typeof($remove) == 'object') {
                    try {
                        $('#dremove')[0].innerHTML = JSON.stringify($remove);
                    }
                    catch {
                        $('#dremove')[0].innerHTML = `${$remove}`;
                    }
                }
                else {
                    $('#dremove')[0].innerHTML = `${$remove}`;
                }
            }
        
try { $('#name')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#tile')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dremove')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dimage')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }selectors['dremove'] = [];selectors['tile'] = [];selectors['dimage'] = [];selectors['dmap'] = [];
            for (var y = -1; y <= +1; y++) {
                for (var x = -1; x <= +1; x++) {
                    var name = tile_name(centre[0] + x, centre[1] + y);
                    var tile = $map.find(".tile" + name);

            // console.log('tile', tile);
            if (JSON.stringify(`${tile}`).includes("object") && tile[0]) {
                $('#tile')[0].innerHTML += ' <br> ' + `${h2t(addNewlines(tile[0].outerHTML, 'tile'))}`;
            }
            else {
                if (tile && tile.selector) {
                    $('#tile')[0].innerHTML += ' <br> ' + `${tile.selector} (we output the selector when length is 0)`;
                }
                else if (tile && tile.originalEvent) {
                    $('#tile')[0].innerHTML += ' <br> ' + `${tile.type}`;
                }
                else if (typeof(tile) == 'object') {
                    try {
                        $('#tile')[0].innerHTML += ' <br> ' + JSON.stringify(tile);
                    }
                    catch {
                        $('#tile')[0].innerHTML += ' <br> ' + `${tile}`;
                    }
                }
                else {
                    $('#tile')[0].innerHTML += ' <br> ' + `${tile}`;
                }
            }
        
                    if (tile.length) {
                        $remove = $remove.not(tile);

            // console.log('$remove', $remove);
            if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                $('#dremove')[0].innerHTML += ' <br> ' + `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
            }
            else {
                if ($remove && $remove.selector) {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${$remove.selector} (we output the selector when length is 0)`;
                }
                else if ($remove && $remove.originalEvent) {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${$remove.type}`;
                }
                else if (typeof($remove) == 'object') {
                    try {
                        $('#dremove')[0].innerHTML += ' <br> ' + JSON.stringify($remove);
                    }
                    catch {
                        $('#dremove')[0].innerHTML += ' <br> ' + `${$remove}`;
                    }
                }
                else {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${$remove}`;
                }
            }
        
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

            // console.log('$image', $image);
            if (JSON.stringify(`${$image}`).includes("object") && $image[0]) {
                $('#dimage')[0].innerHTML += ' <br> ' + `${h2t(addNewlines($image[0].outerHTML, 'dimage'))}`;
            }
            else {
                if ($image && $image.selector) {
                    $('#dimage')[0].innerHTML += ' <br> ' + `${$image.selector} (we output the selector when length is 0)`;
                }
                else if ($image && $image.originalEvent) {
                    $('#dimage')[0].innerHTML += ' <br> ' + `${$image.type}`;
                }
                else if (typeof($image) == 'object') {
                    try {
                        $('#dimage')[0].innerHTML += ' <br> ' + JSON.stringify($image);
                    }
                    catch {
                        $('#dimage')[0].innerHTML += ' <br> ' + `${$image}`;
                    }
                }
                else {
                    $('#dimage')[0].innerHTML += ' <br> ' + `${$image}`;
                }
            }
        
                        $image
                            .load(function () {
                                $(this).show();
                            })
                            .error(function () {
                                $(this).remove();
                            });
                        $map.append($image);

            // console.log('$map', $map);
            if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap'))}`;
            }
            else {
                if ($map && $map.selector) {
                    $('#dmap')[0].innerHTML = `${$map.selector} (we output the selector when length is 0)`;
                }
                else if ($map && $map.originalEvent) {
                    $('#dmap')[0].innerHTML = `${$map.type}`;
                }
                else if (typeof($map) == 'object') {
                    try {
                        $('#dmap')[0].innerHTML = JSON.stringify($map);
                    }
                    catch {
                        $('#dmap')[0].innerHTML = `${$map}`;
                    }
                }
                else {
                    $('#dmap')[0].innerHTML = `${$map}`;
                }
            }
        
                    }
                }
            }

            $remove.remove();

            // console.log('$remove', $remove);
            if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                $('#dremove')[0].innerHTML = `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
            }
            else {
                if ($remove && $remove.selector) {
                    $('#dremove')[0].innerHTML = `${$remove.selector} (we output the selector when length is 0)`;
                }
                else if ($remove && $remove.originalEvent) {
                    $('#dremove')[0].innerHTML = `${$remove.type}`;
                }
                else if (typeof($remove) == 'object') {
                    try {
                        $('#dremove')[0].innerHTML = JSON.stringify($remove);
                    }
                    catch {
                        $('#dremove')[0].innerHTML = `${$remove}`;
                    }
                }
                else {
                    $('#dremove')[0].innerHTML = `${$remove}`;
                }
            }
        
        }
    };

    update();

    function drag(e) {
        if (scroll_delta) {
            var pos = eventPos(e);
            position[0] = Math.round(
                clamp(pos.pageX + scroll_delta[0], -(size[1] + size[3]) * tilesize + container_size[0], 0)
            );
            position[1] = Math.round(
                clamp(pos.pageY + scroll_delta[1], -(size[0] + size[2]) * tilesize + container_size[1], 0)
            );
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
        let codeToShow = '"/* rhs-method-$remove:87:87 */\n            var $remove = $map.children().not(\".ground\");"'
        codeToShow = codeToShow.substring(1, codeToShow.length - 2)
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
                    <p id='dremove_p'>$remove = <span className ="pt" id='dremove'> </span> </p>
<p id='dmap_p'>$map = <span className ="pt" id='dmap'> </span> </p>
<p id='dimage_p'>$image = <span className ="pt" id='dimage'> </span> </p><HAButton id="dimage_button"/> Note undoing and then redoing can annotate/highlight new elements on the page.
<p id='tile_p'>tile = <span className ="pt" id='tile'> </span> </p><HAButton id="tile_button"/>

                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <pre>{codeToShow}</pre>
                        <p>What is happening in the code?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is the relationship between the following variables: tile, $image, $remove, $map? </p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                    </div>
                    <a href='/exercise-auto2'>Next Exercise</a>
                </div>
            </div>
        )
    }
}
    
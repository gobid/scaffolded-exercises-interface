import React from 'react';
import { useState } from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

// store variable notes in exercises
$('textarea').on("change keyup paste", function(){
    console.log("text area has changed 2", $(this).val(), $(this).prop("id"), window.location.href.at(-1));
    localStorage.setItem($(this).prop("id") + "_ex" + window.location.href.at(-1), $(this).val());
})

const selectors = {};
const annotables = []; // keys are the specific annotations
const tutorons = {
    "left": "The left CSS property participates in specifying the horizontal placing of an element.",
    "top": "The top CSS property participates in specifying the vertical placing of an element.",
    "load": "Load data from the server and place the returned HTML into the matched elements.",
    "show()": "Display the matched elements.",
    "error": "Bind an event handler to the JavaScript event of a runtime err.",
    "remove()": "Remove the set of matched elements from the DOM.",
    "append": "Insert content, specified by the parameter, to the end of each element in the set of matched elements.",
    "Math.floor": "The static method always rounds down and returns the largest integer less than or equal to a given number.", // JS MDN site
    "children": "Returns a live HTMLCollection which contains all of the child elements of the element upon which it was called",
    "not": "A.not(B) returns all A elements that do not have the class name B",
    "find": "Returns the first element in the provided array that satisfies the provided testing function.",
    "height": "Specifies the height of an element.",
    "position": "Specifies the type of positioning method used for an element.", // W3
    "width": "Specifies the width of an element.",
    "zIndex": "Sets the z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one.",
    "Math.round": "Returns the value of a number rounded to the nearest integer"
};

$(document).on("ready", function(){
    // store variable notes in exercises
    $('textarea').on("change keyup paste", function(){
        // console.log("text area has changed 2", $(this).val(), $(this).prop("id"), window.location.href.at(-1));
        // console.log("going to set", $(this).prop("id") + "_ex" + window.location.href.at(-1), "to", $(this).val());
        localStorage.setItem($(this).prop("id") + "_ex" + window.location.href.at(-1), $(this).val());
    });
});

function createHTMLArray(html_array) {
    var html_array_str = '';
    var i = 0;
    for (var html_var of html_array) {
        html_array_str += html_var.outerHTML + ' and ';
        if (i > 3) {
            html_array_str += "many more.";
            break;
        }
        i++;
    }
    if (html_array_str.substr(-5) == ' and ')
        return html_array_str.substring(0, html_array_str.length - 5)
    else
        return html_array_str.substring(0, 500)
}

function getPrevNotes() {
    var prev_notes = "<ul style='position: fixed; left: 100px;'>";
    var prev_ex = parseInt(window.location.href.at(-1)) - 1;
    if (prev_ex > -1) {
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i);
            if (k.includes("_ex" + prev_ex)) {
                console.log("prev ex notes: ", localStorage.getItem(k));
                prev_notes += "<li style='text-align:left; margin:20px;'>" + k + ": " + localStorage.getItem(k) + " <br></li>";
            }
        }
    }
    prev_notes += "</ul>";
    return prev_notes;
}

function getTutoronifiedHTML(code) {
    code = code.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    for (const [key, value] of Object.entries(tutorons)) {
        var tutorons_html = "<span class='border-underline' title='" + value + "'>" + key + "</span>";
        code = code.replaceAll(key, tutorons_html);
    }
    return code;
}

function addNewlines(str, variable_name, perform=1) {
    if (perform) {
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
    else return str;
}

function h2t(src) { // html to text
    return src.replaceAll("<", "&lt;").replaceAll(">", "&gt;"); //.replace("&", " &amp; "); 
}

function splitByLastUnderscore(splittable) {
    var split_index = splittable.lastIndexOf("_");
    return splittable.substr(0, split_index);
}

function HAButton(props) {
    const [toggle, setToggle] = useState(true);
    const annotations_to_show_by_tag = [ 'dimage', 'tile', 'dremove' ];
    const noannotations = [ 'dmap', 'position', 'centre_last', 'centre', 'tilesize', 'name', 'e', 'scroll_delta', 'pos', 'container_size' ];
    
    function reAnnotate(){ // for reannotating when user behavior erases annotations
        let existing_annotations = document.getElementsByClassName("annotation");
        if (existing_annotations.length < 1) { // only reannotate if the annotations aren't already there
            for (var elem_to_annotate of annotables) {
                addAnnotation(elem_to_annotate);
            }
        }
    }

    function dollarifyVar(variable_from_exercise) {
        if (variable_from_exercise.substring(0,1) == 'd') // assumes variable can't start with a d
            return "$" + variable_from_exercise.substring(1);
        else
            return variable_from_exercise;
    }

    function addAnnotation(element) {
        // console.log("element", element, "props.id", props.id);
        let text_to_display = element.outerHTML; // .replaceAll("<", "&lt;").replaceAll(">", "&gt;") - not needed apparently
        var para = document.createElement("p");
        var variable_from_exercise = splitByLastUnderscore(props.id);
        variable_from_exercise = dollarifyVar(variable_from_exercise);
        var node = document.createTextNode(text_to_display);
        para.appendChild(node);
        para.style.top = element.style.top;
        para.style.left = element.style.left;
        para.style.margin = "20px";
        para.style.position = "absolute";
        para.classList.add("annotation");
        para.style.color = "gray";
        document.getElementsByClassName('map')[0].appendChild(para);
    }

    function addOrRemoveAnnotations(element) {
        if (toggle) {
            addAnnotation(element);
            // the annotation should also be retained upon user actions (mousemove / mousedown / mouseup / keyboard)
            annotables.push(element);
            $(document).on("mouseup keydown keyup", reAnnotate);
        }
        else {
            $(".annotation").remove();
            $(document).off("mouseup keydown keyup", reAnnotate);
        }
        // add element html at the corners of the html element
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
        // console.log("tag", tag);
        let tag_elems = document.getElementsByTagName(tag);
        // console.log("tag_elems", tag_elems);
        for (var tag_elem of tag_elems) {
            markBorder(tag_elem);
            addOrRemoveAnnotations(tag_elem);
        }
    }

    function annotate(variable, element) {
        // console.log("in annotate", variable, element, toggle);
        element = element[0];
        if (!element) return;
        if (annotations_to_show_by_tag.includes(variable)) {
            // console.log(variable, "in annotations_to_show_by_tag");
            let tag = element.tagName;
            annotateTag(tag);
            $("body").on("mouseup keydown keyup", function() {
                annotateTag(tag); // redo the annotation if in new territory
                if (!toggle) {
                    $("body").off();
                }
            });
        }
        else {   
            markBorder(element);
            addOrRemoveAnnotations(element);
        }
    }
    
    function highlightInCode(variable) {
        let codetoshow = document.getElementById("codetoshow");
        if (toggle) {
            let vartohighlight = dollarifyVar(variable);
            // console.log("vartohighlight: ", vartohighlight, "codetoshow", codetoshow);
            codetoshow.outerHTML = codetoshow.outerHTML.replaceAll(vartohighlight, "<mark>" + vartohighlight + "</mark>");
        }
        else {
            codetoshow.outerHTML = codetoshow.outerHTML.replaceAll("<mark>", "").replaceAll("</mark>", "");
        }
    }

    function handleClick() {
        // console.log("in handleClick", toggle, props.id);

        // remove all existing annotations to avoid confusion
        if (!toggle) {
            $(".annotation").remove(); 
        }
        
        let element_to_a_h = splitByLastUnderscore(props.id);
        if (!noannotations.includes(element_to_a_h)) {
            if (toggle)
                alert("Annotated and highlighted! Play around and check.");
            // console.log("element_to_a_h", element_to_a_h);
            // console.log("selectors[", element_to_a_h, "]", selectors[element_to_a_h]);
            for (var selector of selectors[element_to_a_h]) {
                let element_to_a_h_html = document.getElementsByClassName(selector);
                // console.log("selector", selector, "element_to_a_h_html", element_to_a_h_html);
                annotate(element_to_a_h, element_to_a_h_html);
            }
        }
        else {
            if (toggle)
                alert("Highlighted! Play around and check.");
        }
        highlightInCode(element_to_a_h);
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

export default class ExerciseAG3 extends React.Component {

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
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap', 1))}`;
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
        

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });

            // console.log('$map', $map);
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap', 1))}`;
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
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap', 1))}`;
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
        
        var centre_last = centre;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        var tile_name = function (x, y) {
            x -= size[3];
            y -= size[0];
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");

try { $('#name')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#tile')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dimage')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }selectors['dremove'] = [];selectors['tile'] = [];selectors['dimage'] = [];selectors['dmap'] = [];
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

            // console.log('$map', $map);
            // exclude annotations
            if ($map && $map[0] && $map[0].outerHTML && $map[0].outerHTML.includes("annotation")) {
                console.log("it's annotation so skipping showing");
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `${h2t(addNewlines($map[0].outerHTML, 'dmap', 1))}`;
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
            }

            $remove.remove();
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

        let codeToShow = '"/* rhs-method-$map:48:48 */\n    var $map = $container.children(\".map\");\n    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];\n\n\n/* $map.css({:51:56 */\n    $map.css({\n        width: map_size[0],\n        height: map_size[1],\n        position: \"absolute\",\n        zIndex: -1\n    });\n\n\n\n/* $map.find(\".ground\").css({:60:67 */\n    $map.find(\".ground\").css({\n        top: size[0] * tilesize,\n        height: size[2] * tilesize,\n        position: \"absolute\",\n        width: \"100%\",\n        zIndex: -1,\n        background: \"#000\"\n    });"'
        codeToShow = codeToShow.substring(1, codeToShow.length - 2);
        document.getElementById("codetoshow").innerHTML = getTutoronifiedHTML(codeToShow);
        var prevNotes = getPrevNotes();
        document.getElementById("prev_notes").innerHTML = getPrevNotes();
    }

    render() {
        
        return (
            <div className="App">
                <div id="app-title">Scaffolded Exercises</div>
                <br/><br/><br/>
                DOM
                <div id="comic"><div className="map"><div className="ground"></div></div></div>
                <br/>
                <p id="prev_notes"></p>
                <div className="exercises">
                    Variables:
                    <br/><br/>
                    <p id='dmap_p'>$map = <span className ="pt" id='dmap'> </span> </p><HAButton id="dmap_button"/> Note un/redoing can annotate new elements on the page.<textarea className='reflection-textarea var-notes' rows='2' placeholder='(Optional) Your notes on this variable.' id='dmap_notes'></textarea>

                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</p>
                        <textarea id="visualreflect" className="reflection-textarea" rows="6"></textarea>
                        <pre id="codetoshow"></pre>
                        <p>What is happening in the code?</p>
                        <textarea id="codereflect" className="reflection-textarea" rows="6"></textarea>
                        <p>What is the relationship between the following variables: $image, tile, $map? </p>
                        <textarea id="relationreflect" className="reflection-textarea" rows="6"></textarea>
                    </div>
                    <a href='/exercise-auto4'>Next Exercise</a>
                </div>
            </div>
        )
    }
}
    